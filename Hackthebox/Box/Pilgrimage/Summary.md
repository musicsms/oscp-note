
IP: 10.10.11.219
Hostname: pilgrimage.htb
Port: 22, 80
Found something:

```bash
22/tcp open  ssh     OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
80/tcp open  http    nginx 1.18.0
| http-git: 
|   10.10.11.219:80/.git/
```

Database:
```
sqlite:/var/db/pilgrimage
```