

## Crack SSH private key

- Convert to hash using `ssh2john`
```
 ssh2john id_rsa.encrypt > id_rsa.hash
```
- Crack hash password:
```
 john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa.hash
```

$6$zdk0.jUm$Vya24cGzM1duJkwM5b17Q205xDJ47LOAg/OpZvJ1gKbLF8PJBdKJA4a6M.JYPUTAaWu4infDjI88U9yUXEVgL.
