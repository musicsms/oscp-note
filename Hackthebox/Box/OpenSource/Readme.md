# Enum

## Nmap

Nmap init:
```sh
export IP=10.10.11.164
nmap -sV --open -oA enum/init $IP
```

Open another window and scan full:

```sh
export IP=10.10.11.164
sudo nmap -sC -sV -O -p- -oA enum/full $IP
```

Output:
```sh
Nmap scan report for 10.10.11.164
Host is up (0.040s latency).
Not shown: 997 closed tcp ports (conn-refused), 1 filtered tcp port (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Werkzeug/2.1.2 Python/3.10.3
```

## Whatweb
```sh
┌──(bop㉿Matrix)-[~/Workspace/hackthebox/OpenSource]
└─$ whatweb $IP
http://10.10.11.164 [200 OK] Bootstrap, Country[RESERVED][ZZ], HTTPServer[Werkzeug/2.1.2 Python/3.10.3], IP[10.10.11.164], JQuery[3.4.1], Python[3.10.3], Script, Title[upcloud - Upload files for Free!], Werkzeug[2.1.2]
```

## Gobuster

