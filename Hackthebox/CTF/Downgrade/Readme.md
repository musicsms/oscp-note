```bash
┌──(bop㉿BOP-PC)-[~]
└─$ nc 159.65.49.148 30171

+-----------+---------------------------------------------------------+
|   Title   |                       Description                       |
+-----------+---------------------------------------------------------+
| Downgrade |         During recent auditing, we noticed that         |
|           |     network authentication is not forced upon remote    |
|           |       connections to our Windows 2012 server. That      |
|           |           led us to investigate our system for          |
|           |  suspicious logins further. Provided the server's event |
|           |       logs, can you find any suspicious successful      |
|           |                          login?                         |
+-----------+---------------------------------------------------------+

Which event log contains information about logon and logoff events? (for example: Setup)
> Security
[+] Correct!

What is the event id for logs for a successful logon to a local computer? (for example: 1337)
> 4624
[+] Correct!

Which is the default Active Directory authentication protocol? (for example: http)
> Kerberos
[+] Correct!

Looking at all the logon events, what is the AuthPackage that stands out as different from all the rest? (for example: http)
> ntlm
[+] Correct!

What is the timestamp of the suspicious login (yyyy-MM-ddTHH:mm:ss) UTC? (for example, 2021-10-10T08:23:12)
> 2022-09-28T08:10:57
[-] Wrong Answer.
What is the timestamp of the suspicious login (yyyy-MM-ddTHH:mm:ss) UTC? (for example, 2021-10-10T08:23:12)

> 2022-09-28T20:10:57
[-] Wrong Answer.
What is the timestamp of the suspicious login (yyyy-MM-ddTHH:mm:ss) UTC? (for example, 2021-10-10T08:23:12)

> 2022
[-] Wrong Answer.
What is the timestamp of the suspicious login (yyyy-MM-ddTHH:mm:ss) UTC? (for example, 2021-10-10T08:23:12)
Please wait 1 seconds..
> 2022-09-28T13:10:57
[+] Correct!

[+] Here is the flag: HTB{4n0th3r_d4y_4n0th3r_d0wngr4d3...}

┌──(bop㉿BOP-PC)-[~]
└─$
```


![[Pasted image 20221028211345.png]]


