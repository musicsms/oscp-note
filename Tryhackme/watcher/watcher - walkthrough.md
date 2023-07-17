
Start with `rustscan`

```sh
rustscan -a $IP --ulimit 5000 --range 1-65000 -t 2000
```
Output:
```sh
Open 10.10.106.76:22
Open 10.10.106.76:80
Open 10.10.106.76:21
```

Scan full port with `nmap` - incase backup.
```sh
nmap -sC -sV -p- $IP -T4 -o nmap_full.txt -sT
```
Output
```sh
```
Visit port 80 on web browser and view the source code, seam like we have `lfi` vuln.

![[Screenshot 2023-07-15 at 9.35.14 PM.png]]
Get `/etc/passwd`
![[Screenshot 2023-07-15 at 9.36.50 PM.png]]

There are some user
```
will
mat
toby
ftpuser (nologin)
```

Visit `robots.txt` - found 1st flag and a file can not access. But we have `lfi`
```sh
Hi Mat,

The credentials for the FTP server are below. I've set the files to be saved to /home/ftpuser/ftp/files.

Will

----------

ftpuser:givemefiles777
```

We `ftp` to server, there a 2nd flag, and a folder but nothing in there. But i notice the owner of this folder is `ftpuser`. Mean that we can upload file to there.
Combine with we have `lfi` to read file - we can get reverse shell.

![[Screenshot 2023-07-15 at 10.04.06 PM.png]]

Visit the `rev.php` that we uploaded. we have shell.
![[Screenshot 2023-07-15 at 10.04.56 PM.png]]


```sh
EC2 Security Credentials
{
  "Code" : "Success",
  "LastUpdated" : "2023-07-15T15:01:10Z",
  "Type" : "AWS-HMAC",
  "AccessKeyId" : "ASIA2YR2KKQMZ6WPMKUU",
  "SecretAccessKey" : "bNTY7zcFxs52R8NrInYVVGbtDuvgokpfN5SRRyt7",
  "Token" : "IQoJb3JpZ2luX2VjEKf//////////wEaCWV1LXdlc3QtMSJGMEQCIFTMaUOSv4TA38hMQ8r9vRUXgIY8QjIYciFJnEuCcZSeAiBgjCfd6MRbL4cELhetC25PRLTOlqqOydBnmmOvBBxg9CrGBAgwEAMaDDczOTkzMDQyODQ0MSIMA/Oe0ZY4LtzNffEoKqMEjKrxPLVfpZjXag5FlKLkbhYq62DPBxByaFdehCT18/fjPog84+z4fLsO57QYvfHgkcQMx+1SA92WU82zD0HE+bA2F59e6Dx5NZOaVT3Bbxcfkb+uATJrxIphavUsWlVI/pomPL2MojzL90p92FYpkEZOs9tkrsdwcpytRac4NGK5nMjJMhNSJ12iVJqD2kNe6n6W0HCIGf0CouBbdwrIbrVkZbep1GSfSBiU1064wKX6KG5OCZDQGDkBLp+n816+XDv+ZoARvNepkO/hcrt5i/2lahlerf3cUjmyxT7P6vhqrGLj2OyabReGfPTURa4BkUQtbRbhu6TYRfte2yMzzPLN/foc5GLwtN67vW7UJPIsBgIMMKRmtAjbVoqZFTHU2Iueyl6lX5Gin9usQJKos7jGDikFdc4bfJhqbXWI1WL2ZRsTJyqi3ghpY6AN74Gtlsik0jZ+1L/BrYdMpwZdfD6SM982WadyNIWinhDX604M/8SO2FSzdjqsWVWtvChBd9iHAeQljk0OraSUgxK0/Z+h56Ak0O7733Ducnw50UYy6GgqipDX/tjTG6HHnH/jk4CUw7ZIH6H6IJnc219w2Kg19yoS4Au9mbaJg6dLEAeCZm+Vgr0vYV0/oZaU0O5nPAOO7+Yn0FKAuthlC1F9lmDyxWanE4DeF6lqApUo663ZLzgcBn1UvlpUjK9Y9rf0pxL2vFwCRnOOtrSkagpw/PlWTTDW6cqlBjqUAgU7qOYRimqunWA9HrXSVv5RabByPW/InwFNyAVK3/Tc85hMKH7jAwTjBCOp3x2KYY7lmD7glwDoxZpEOH/Lu0zeE86E2D/HMhcJ61Ag0JfP8nz8CZj7R46O9+1JZMu6w/cZNP50h6CW0M82jQR67zd8+i84ZN1JqyEM0mkDDZU2lVA3B2unwsHhan99ZWxsb8tK57gECkrM5I+2ctRrZ0kOKr30+Ds0PAWtecy6nM2/b8iDY+gpITF5Z0YbyGEOTAZuhypYhS93gyDB9pY1+Uls13b/CUkUXjkbHA5aQ8PM6R5uervrYnPxO3mOlDX247DDG+IRPPeGjCa42Fs7rCbZ2MhBLDdw23yIKNRJY85sv/sK6w==",
  "Expiration" : "2023-07-15T21:18:26Z"
```

```sh
will@watcher:~$ id
uid=1000(will) gid=1000(will) groups=1000(will),4(adm)
will@watcher:~$ find / -type f -group adm 2>/dev/null
/opt/backups/key.b64
```