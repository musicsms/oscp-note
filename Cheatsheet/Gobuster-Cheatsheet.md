## Dir mode
```bash
bop@BOP-PC:~$ gobuster dir --help
Uses directory/file brutceforcing mode

Usage:
  gobuster dir [flags]

Flags:
  -f, --addslash                      Apped / to each request
  -c, --cookies string                Cookies to use for the requests
  -e, --expanded                      Expanded mode, print full URLs
  -x, --extensions string             File extension(s) to search for
  -r, --followredirect                Follow redirects
  -H, --headers stringArray           Specify HTTP headers, -H 'Header1: val1' -H 'Header2: val2'
  -h, --help                          help for dir
  -l, --includelength                 Include the length of the body in the output
  -k, --insecuressl                   Skip SSL certificate verification
  -n, --nostatus                      Don't print status codes
  -P, --password string               Password for Basic Auth
  -p, --proxy string                  Proxy to use for requests [http(s)://host:port]
  -s, --statuscodes string            Positive status codes (will be overwritten with statuscodesblacklist if set) (default "200,204,301,302,307,401,403")
  -b, --statuscodesblacklist string   Negative status codes (will override statuscodes if set)
      --timeout duration              HTTP Timeout (default 10s)
  -u, --url string                    The target URL
  -a, --useragent string              Set the User-Agent string (default "gobuster/3.0.1")
  -U, --username string               Username for Basic Auth
      --wildcard                      Force continued operation when wildcard found
```

Now for the `dir` specific flags, the help is pretty self-explainatory but it is best to spend some time on commenting some flags that might come up more often in our tests.

In many cases especially in CTF like events the SSL certifications are self signed and therefore not verified. Gobuster using the flag `-k` allows us to skip SSL verification and continue our pentesting unbothered. Another thing that comes in pretty handy is that we are able to define which status codes are valid for our test and which are not. This is done through the `-s` and `-b` flags where the `-s` flag works like a whitelist filter and the `-b` as a blacklist filter.

A question that comes up often is, how to specify Gobuster which files to search for? This is done using the -x flag where we can specify the file extensions we are looking for. For example if I am looking for images i could use something similar to `-x jpg,png,gif`.  

Following there is a basic example running gobuster in dir mode.
```bash
gobuster dir -u http://mafialive.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -x php,txt
```

## DNS mode
In the DNS mode we are looking to find subdomains of a specific domain. This is very important in penetration testing as it might reveal areas not as well protected as others.

Lets start here also by showing the help.

```bash
bop@BOP-PC:~$ gobuster help dns
Uses DNS subdomain bruteforcing mode

Usage:
  gobuster dns [flags]

Flags:
  -d, --domain string      The target domain
  -h, --help               help for dns
  -r, --resolver string    Use custom DNS server (format server.com or server.com:port)
  -c, --showcname          Show CNAME records (cannot be used with '-i' option)
  -i, --showips            Show IP addresses
      --timeout duration   DNS resolver timeout (default 1s)
      --wildcard           Force continued operation when wildcard found
```

  
The first thing we notice in the help is the `-d` flag which is used to specify the domain name we want. As you can figure out from the name of the mode, gobuster actually tries to DNS resolve the subdomains it tries so it can verify if they exist or not. As there are cases in pentesting where a specific DNS server is required to be used, Gobuster gives us the possibility to do so using the `-r` flag.

We are not going to spend time analyzing all flags as it is pretty straightforward to understand them. We are going directly to see an example of running Gobuster in dns mode.
```bash
gobuster dns -d shoppy.htb -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -o gobuster_dns.txt -t 30
```

## VHOST mode

This mode should not be mistaken to be the same as the DNS mode. In the DNS mode the tool attempts to DNS resolve the subdomains and based on that we are given the result. In vhosts mode the tool is checking if the subdomain exists by visiting the formed url and verifying the IP address. The following shows the output from the help command
```bash
bop@Bop-PC:~$ gobuster vhost --help
Uses VHOST bruteforcing mode

Usage:
  gobuster vhost [flags]

Flags:
  -c, --cookies string        Cookies to use for the requests
  -r, --followredirect        Follow redirects
  -H, --headers stringArray   Specify HTTP headers, -H 'Header1: val1' -H 'Header2: val2'
  -h, --help                  help for vhost
  -k, --insecuressl           Skip SSL certificate verification
  -P, --password string       Password for Basic Auth
  -p, --proxy string          Proxy to use for requests [http(s)://host:port]
      --timeout duration      HTTP Timeout (default 10s)
  -u, --url string            The target URL
  -a, --useragent string      Set the User-Agent string (default "gobuster/3.0.1")
  -U, --username string       Username for Basic Auth
```

You can see that the flags are a subset from the flags in DIR mode. Once again it is straight forward what its flag is useful for so we are not spending time on that.
Lets go directly and see an example running the vhost mode.

```bash
┌──(bop㉿BOP-PC)-[/mnt/e/OneDrive/Workspace/oscp-note/Hackthebox/Box/Shoppy]
└─$ gobuster vhost -u http://shoppy.htb -w /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt -t 20 -o gobuster_vhost.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:          http://shoppy.htb
[+] Method:       GET
[+] Threads:      20
[+] Wordlist:     /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt
[+] User Agent:   gobuster/3.1.0
[+] Timeout:      10s
===============================================================
2022/09/25 22:26:24 Starting gobuster in VHOST enumeration mode
===============================================================
Found: mattermost.shoppy.htb (Status: 200) [Size: 3122]

===============================================================
2022/09/25 22:32:50 Finished
===============================================================
```

In the example we are trying to find subdomains of `shoppy.htb` using the `bitquark-subdomains-top100000.txt`. We can see that it found the `mattermost.shoppy.htb`.

Gobuster vhost same as this command `ffuf`
```bash
┌──(bop㉿BOP-PC)-[/mnt/e/OneDrive/Workspace/oscp-note/Hackthebox/Box/Trick]
└─$ ffuf -u http://trick.htb -w subdomains-top1million-5000.txt -H "Host: FUZZ.trick.htb" -fw 1697
```