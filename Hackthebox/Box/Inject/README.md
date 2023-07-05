IP=10.10.11.204

Start with `rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Inject]
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
Open 10.10.11.204:22
Open 10.10.11.204:8080
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-05 07:28 EDT
Initiating Ping Scan at 07:28
Scanning 10.10.11.204 [2 ports]
Completed Ping Scan at 07:28, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 07:28
Completed Parallel DNS resolution of 1 host. at 07:28, 0.05s elapsed
DNS resolution of 1 IPs took 0.05s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 07:28
Scanning 10.10.11.204 [2 ports]
Discovered open port 22/tcp on 10.10.11.204
Discovered open port 8080/tcp on 10.10.11.204
Completed Connect Scan at 07:28, 0.27s elapsed (2 total ports)
Nmap scan report for 10.10.11.204
Host is up, received conn-refused (0.11s latency).
Scanned at 2023-07-05 07:28:56 EDT for 0s

PORT     STATE SERVICE    REASON
22/tcp   open  ssh        syn-ack
8080/tcp open  http-proxy syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds
```

Nmap:
