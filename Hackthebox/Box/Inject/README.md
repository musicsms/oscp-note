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
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Inject]
└─$ nmap -sV -sC -p22,8080 $IP -o nmap.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-05 07:31 EDT
Stats: 0:03:47 elapsed; 0 hosts completed (1 up), 1 undergoing Script Scan
NSE Timing: About 99.29% done; ETC: 07:35 (0:00:00 remaining)
Nmap scan report for 10.10.11.204
Host is up (0.064s latency).

PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 caf10c515a596277f0a80c5c7c8ddaf8 (RSA)
|   256 d51c81c97b076b1cc1b429254b52219f (ECDSA)
|_  256 db1d8ceb9472b0d3ed44b96c93a7f91d (ED25519)
8080/tcp open  http-proxy?
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 253.69 seconds
```

Nothing.
Tried enumerate more.


```sh
frank@inject:~$ cat .m2/settings.xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <servers>
    <server>
      <id>Inject</id>
      <username>phil</username>
      <password>DocPhillovestoInject123</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <filePermissions>660</filePermissions>
      <directoryPermissions>660</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
</settings>
frank@inject:~$
```

We can `su` to `phil` user.
`phil` have group `staff`

Check with
We can write to `/opt/automation/tasks`
