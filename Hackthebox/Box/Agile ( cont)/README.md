
start with `rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Agile]
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
🌍HACK THE PLANET🌍

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.11.203:22
Open 10.10.11.203:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-07 21:31 EDT
Initiating Ping Scan at 21:31
Scanning 10.10.11.203 [2 ports]
Completed Ping Scan at 21:31, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 21:31
Completed Parallel DNS resolution of 1 host. at 21:31, 0.08s elapsed
DNS resolution of 1 IPs took 0.08s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 21:31
Scanning 10.10.11.203 [2 ports]
Discovered open port 80/tcp on 10.10.11.203
Discovered open port 22/tcp on 10.10.11.203
Completed Connect Scan at 21:31, 0.06s elapsed (2 total ports)
Nmap scan report for 10.10.11.203
Host is up, received syn-ack (0.061s latency).
Scanned at 2023-07-07 21:31:44 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.23 seconds

```

Scan again with nmap

```sh
nmap -sV -sC -p22,80 $IP -o nmap.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-07 21:33 EDT
Nmap scan report for 10.10.11.203
Host is up (0.063s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 f4bcee21d71f1aa26572212d5ba6f700 (ECDSA)
|_  256 65c1480d88cbb975a02ca5e6377e5106 (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to http://superpass.htb
|_http-server-header: nginx/1.18.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.95 seconds
```

We have url `superpass.htb`.