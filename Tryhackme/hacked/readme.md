#

Examine the pcap file, we got the ftp user, password

```bash
220 Hello FTP World!
USER jenny
331 Please specify the password.
PASS 111111
530 Login incorrect.
USER jenny
331 Please specify the password.
PASS password123
230 Login successful.
```
