

- Start with `rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Intentions]
└─$ rustscan -a $IP  --ulimit 5000 --range 1-65000
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: http://discord.skerritt.blog           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Real hackers hack time ⌛

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.11.220:22
Open 10.10.11.220:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-02 05:37 EDT
Initiating Ping Scan at 05:37
Scanning 10.10.11.220 [2 ports]
Completed Ping Scan at 05:37, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:37
Completed Parallel DNS resolution of 1 host. at 05:37, 0.03s elapsed
DNS resolution of 1 IPs took 0.03s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 05:37
Scanning 10.10.11.220 [2 ports]
Discovered open port 22/tcp on 10.10.11.220
Discovered open port 80/tcp on 10.10.11.220
Completed Connect Scan at 05:37, 0.14s elapsed (2 total ports)
Nmap scan report for 10.10.11.220
Host is up, received conn-refused (0.078s latency).
Scanned at 2023-07-02 05:37:46 EDT for 0s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.27 seconds
```

And `nmap` again:
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Intentions]
└─$ nmap -sC -sV -p22,80 $IP -o nmap.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-02 05:39 EDT
Nmap scan report for 10.10.11.220
Host is up (0.17s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 47d20066275ee69c808903b58f9e60e5 (ECDSA)
|_  256 c8d0ac8d299b87405f1bb0a41d538ff1 (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Intentions
|_http-server-header: nginx/1.18.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.99 seconds
```
