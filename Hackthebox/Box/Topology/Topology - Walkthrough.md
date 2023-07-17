
IP: 10.10.11.217

`rustscan`
```sh
┌──(bopbap㉿Matrix)-[~]
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
Open 10.10.11.217:22
Open 10.10.11.217:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-16 04:07 EDT
Initiating Ping Scan at 04:07
Scanning 10.10.11.217 [2 ports]
Completed Ping Scan at 04:07, 0.07s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 04:07
Completed Parallel DNS resolution of 1 host. at 04:07, 0.06s elapsed
DNS resolution of 1 IPs took 0.06s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 04:07
Scanning 10.10.11.217 [2 ports]
Discovered open port 22/tcp on 10.10.11.217
Discovered open port 80/tcp on 10.10.11.217
Completed Connect Scan at 04:07, 0.07s elapsed (2 total ports)
Nmap scan report for 10.10.11.217
Host is up, received syn-ack (0.072s latency).
Scanned at 2023-07-16 04:07:45 EDT for 1s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.24 seconds
```

`nmap`

```sh
┌──(bopbap㉿Matrix)-[~]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-16 04:07 EDT
Nmap scan report for 10.10.11.217
Host is up (0.075s latency).
Not shown: 65533 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 dcbc3286e8e8457810bc2b5dbf0f55c6 (RSA)
|   256 d9f339692c6c27f1a92d506ca79f1c33 (ECDSA)
|_  256 4ca65075d0934f9c4a1b890a7a2708d7 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Miskatonic University | Topology Group
|_http-server-header: Apache/2.4.41 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 33.40 seconds
```


```
lklein@topology.htb

```