# Enum

## Nmap

```bash
export IP=10.129.52.55
ports=$(nmap -p- --min-rate=1000 -T4 $IP | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed s/,$//)
nmap -sC -sV -p$ports $IP -oA enum/full
```