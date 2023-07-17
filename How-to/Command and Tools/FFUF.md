
Resources / Notes

# A fast web fuzzer written in Go.
https://github.com/ffuf/ffuf

Typical commands & Usage

# Directory discovery
```sh
ffuf -w /path/to/wordlist -u https://target/FUZZ
```



# Adding classical header (some WAF bypass)
```sh
ffuf -c -w "/opt/host/main.txt:FILE" -H "X-Originating-IP: 127.0.0.1, X-Forwarded-For: 127.0.0.1, X-Remote-IP: 127.0.0.1, X-Remote-Addr: 127.0.0.1, X-Client-IP: 127.0.0.1" -fs 5682,0 -u https://target/FUZZ
```

# match all responses but filter out those with content-size 42
```sh
ffuf -w wordlist.txt -u https://example.org/FUZZ -mc all -fs 42 -c -v
```

# Fuzz Host-header, match HTTP 200 responses.
```sh
ffuf -w hosts.txt -u https://example.org/ -H "Host: FUZZ" -mc 200
```

# Virtual host discovery (without DNS records)
```sh
ffuf -w /path/to/vhost/wordlist -u https://target -H "Host: FUZZ" -fs 4242
```


# Playing with threads and wait
```sh
./ffuf -u https://target/FUZZ -w /home/mdayber/Documents/Tools/Wordlists/WebContent_Discovery/content_discovery_4500.txt -c -p 0.1 -t 10
```


# GET param fuzzing, filtering for invalid response size (or whatever)
```sh
ffuf -w /path/to/paramnames.txt -u https://target/script.php?FUZZ=test_value -fs 4242
```

# GET parameter fuzzing if the param is known (fuzzing values) and filtering 401
```sh
ffuf -w /path/to/values.txt -u https://target/script.php?valid_name=FUZZ -fc 401
```



# POST parameter fuzzing
```sh
ffuf -w /path/to/postdata.txt -X POST -d "username=admin\&password=FUZZ" -u https://target/login.php -fc 401
```
# Fuzz POST JSON data. Match all responses not containing text "error".
```sh
ffuf -w entries.txt -u https://example.org/ -X POST -H "Content-Type: application/json" \
      -d '{"name": "FUZZ", "anotherkey": "anothervalue"}' -fr "error"
```
