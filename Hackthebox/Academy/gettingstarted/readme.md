

## enum

### Nmap

- Command
```bash

```

- Output
```bash
# Nmap 7.92 scan initiated Fri Sep 16 07:54:38 2022 as: nmap -sC -sV -p22,80 -oA enum/full 10.129.42.249
Nmap scan report for 10.129.42.249
Host is up (0.27s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 4c:73:a0:25:f5:fe:81:7b:82:2b:36:49:a5:4d:c8:5e (RSA)
|   256 e1:c0:56:d0:52:04:2f:3c:ac:9a:e7:b1:79:2b:bb:13 (ECDSA)
|_  256 52:31:47:14:0d:c3:8e:15:73:e3:c4:24:a2:3a:12:77 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
| http-robots.txt: 1 disallowed entry
|_/admin/
|_http-title: Welcome to GetSimple! - gettingstarted
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Fri Sep 16 07:54:56 2022 -- 1 IP address (1 host up) scanned in 17.81 seconds
```

### gobuster

`http://10.129.42.249/data/users/admin.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<item><USR>admin</USR><NAME/><PWD>d033e22ae348aeb5660fc2140aec35850c4da997</PWD><EMAIL>admin@gettingstarted.com</EMAIL><HTMLEDITOR>1</HTMLEDITOR><TIMEZONE/><LANG>en_US</LANG></item>
```

- Check the hash is type `SHA1` with [https://gchq.github.io/CyberChef/#recipe=Analyse_hash()&input=ZDAzM2UyMmFlMzQ4YWViNTY2MGZjMjE0MGFlYzM1ODUwYzRkYTk5Nw](https://gchq.github.io/CyberChef/#recipe=Analyse_hash()&input=ZDAzM2UyMmFlMzQ4YWViNTY2MGZjMjE0MGFlYzM1ODUwYzRkYTk5Nw)

Crack the pass - we got `admin`

- Creds `admin:admin`
