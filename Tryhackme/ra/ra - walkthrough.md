`nmap`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/ra]
└─$ cat nmap_full.txt
# Nmap 7.93 scan initiated Sat Jul 15 22:27:52 2023 as: nmap -sC -sV -p- -T4 -o nmap_full.txt -sT 10.10.75.124
Nmap scan report for 10.10.75.124
Host is up (0.0000010s latency).
Not shown: 52195 filtered tcp ports (no-response), 13310 filtered tcp ports (net-unreach)
PORT      STATE SERVICE    VERSION
53/tcp    open  tcpwrapped
80/tcp    open  tcpwrapped
|_http-server-header: Microsoft-IIS/10.0
|_http-title: Windcorp.
| http-methods:
|_  Potentially risky methods: TRACE
88/tcp    open  tcpwrapped
135/tcp   open  tcpwrapped
139/tcp   open  tcpwrapped
445/tcp   open  tcpwrapped
464/tcp   open  tcpwrapped
593/tcp   open  tcpwrapped
3269/tcp  open  tcpwrapped
3389/tcp  open  tcpwrapped
| ssl-cert: Subject: commonName=Fire.windcorp.thm
| Not valid before: 2023-07-15T02:27:30
|_Not valid after:  2024-01-14T02:27:30
|_ssl-date: 2023-07-16T02:35:48+00:00; 0s from scanner time.
5222/tcp  open  tcpwrapped
|_xmpp-info: ERROR: Script execution failed (use -d to debug)
| ssl-cert: Subject: commonName=fire.windcorp.thm
| Subject Alternative Name: DNS:fire.windcorp.thm, DNS:*.fire.windcorp.thm
| Not valid before: 2020-05-01T08:39:00
|_Not valid after:  2025-04-30T08:39:00
|_ssl-date: 2023-07-16T02:35:50+00:00; -1s from scanner time.
5223/tcp  open  tcpwrapped
5229/tcp  open  tcpwrapped
5262/tcp  open  tcpwrapped
5263/tcp  open  tcpwrapped
5269/tcp  open  tcpwrapped
| xmpp-info:
|   STARTTLS Failed
|   info:
|     xmpp:
|     auth_mechanisms:
|     capabilities:
|     errors:
|       (timeout)
|     unknown:
|     compression_methods:
|_    features:
5270/tcp  open  tcpwrapped
5275/tcp  open  tcpwrapped
5276/tcp  open  tcpwrapped
5985/tcp  open  tcpwrapped
7070/tcp  open  tcpwrapped
9090/tcp  open  tcpwrapped
|_drda-info: TIMEOUT
9091/tcp  open  tcpwrapped
9389/tcp  open  tcpwrapped
49669/tcp open  tcpwrapped
49670/tcp open  tcpwrapped
49672/tcp open  tcpwrapped
49673/tcp open  tcpwrapped
49695/tcp open  tcpwrapped
49896/tcp open  tcpwrapped

Host script results:
| smb2-time:
|   date: 2023-07-16T02:35:04
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sat Jul 15 22:36:09 2023 -- 1 IP address (1 host up) scanned in 496.34 seconds

```

```
lilyleAndSparky
pass:
ChangeMe#1234
```


We have 
```
lilyle
ChangeMe#1234
```

`smbmap`

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/ra]
└─$ smbmap -u lilyle -p ChangeMe#1234 -d fire.windcorp.thm -H windcorp.thm -R
[+] IP: windcorp.thm:445	Name: unknown
        Disk                                                  	Permissions	Comment
	----                                                  	-----------	-------
	ADMIN$                                            	NO ACCESS	Remote Admin
	C$                                                	NO ACCESS	Default share
	IPC$                                              	READ ONLY	Remote IPC
	.\IPC$\*
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	InitShutdown
	fr--r--r--                5 Sun Dec 31 19:03:58 1600	lsass
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	ntsvcs
	fr--r--r--                4 Sun Dec 31 19:03:58 1600	scerpc
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-264-0
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	epmapper
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-2c0-0
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	LSM_API_service
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	eventlog
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-58c-0
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	atsvc
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-720-0
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-348-0
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-348-1
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	RpcProxy\49670
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	c074290aa345142d
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	RpcProxy\593
	fr--r--r--                4 Sun Dec 31 19:03:58 1600	wkssvc
	fr--r--r--                4 Sun Dec 31 19:03:58 1600	srvsvc
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	spoolss
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-b90-0
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	netdfs
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	ROUTER
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-334-0
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	W32TIME_ALT
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	PSHost.133339480116352835.3944.DefaultAppDomain.powershell
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-cf0-0
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	PIPE_EVENTROOT\CIMV2SCM EVENT PROVIDER
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	TermSrv_API_service
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	Ctx_WinStation_API_service
	fr--r--r--                3 Sun Dec 31 19:03:58 1600	SessEnvPublicRpc
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-5e8-0
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	PSHost.133339481383882126.2704.DefaultAppDomain.powershell
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	iisipm7defdfb8-ef32-4a87-9fc9-c85e22d7d855
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	iislogpipe3463a2e4-e8a4-47ac-aa7d-babe3dc03cde
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	PSHost.133339480099313581.3516.DefaultAppDomain.sme
	fr--r--r--                1 Sun Dec 31 19:03:58 1600	Winsock2\CatalogChangeListener-c74-0
	NETLOGON                                          	READ ONLY	Logon server share
	.\NETLOGON\*
	dr--r--r--                0 Sat May  2 06:02:19 2020	.
	dr--r--r--                0 Sat May  2 06:02:19 2020	..
	Shared                                            	READ ONLY
	.\Shared\*
	dr--r--r--                0 Fri May 29 20:45:42 2020	.
	dr--r--r--                0 Fri May 29 20:45:42 2020	..
	fr--r--r--               45 Fri May  1 11:32:36 2020	Flag 1.txt
	fr--r--r--         29526628 Fri May 29 20:45:01 2020	spark_2_8_3.deb
	fr--r--r--         99555201 Sun May  3 07:08:39 2020	spark_2_8_3.dmg
	fr--r--r--         78765568 Sun May  3 07:08:39 2020	spark_2_8_3.exe
	fr--r--r--        123216290 Sun May  3 07:08:39 2020	spark_2_8_3.tar.gz
	SYSVOL                                            	READ ONLY	Logon server share
	.\SYSVOL\*
	dr--r--r--                0 Sat May  2 06:02:20 2020	.
	dr--r--r--                0 Sat May  2 06:02:20 2020	..
	dr--r--r--                0 Sat May  2 06:02:20 2020	NRznLVEcPj
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	windcorp.thm
	.\SYSVOL\windcorp.thm\*
	dr--r--r--                0 Thu Apr 30 11:17:20 2020	.
	dr--r--r--                0 Thu Apr 30 11:17:20 2020	..
	dr--r--r--                0 Sat Jul 15 22:31:56 2023	DfsrPrivate
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	Policies
	dr--r--r--                0 Sat May  2 06:02:19 2020	scripts
	.\SYSVOL\windcorp.thm\Policies\*
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	.
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	..
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	{31B2F340-016D-11D2-945F-00C04FB984F9}
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	{6AC1786C-016F-11D2-945F-00C04fB984F9}
	.\SYSVOL\windcorp.thm\Policies\{31B2F340-016D-11D2-945F-00C04FB984F9}\*
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	.
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	..
	fr--r--r--               23 Fri May  8 09:15:01 2020	GPT.INI
	dr--r--r--                0 Fri May  1 07:32:28 2020	MACHINE
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	USER
	.\SYSVOL\windcorp.thm\Policies\{31B2F340-016D-11D2-945F-00C04FB984F9}\MACHINE\*
	dr--r--r--                0 Thu May  7 03:34:46 2020	.
	dr--r--r--                0 Thu May  7 03:34:46 2020	..
	dr--r--r--                0 Thu May  7 03:34:46 2020	Applications
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	Microsoft
	fr--r--r--             2792 Thu Apr 30 11:18:05 2020	Registry.pol
	dr--r--r--                0 Fri May  1 07:32:28 2020	Scripts
	.\SYSVOL\windcorp.thm\Policies\{31B2F340-016D-11D2-945F-00C04FB984F9}\MACHINE\Microsoft\*
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	.
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	..
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	Windows NT
	.\SYSVOL\windcorp.thm\Policies\{31B2F340-016D-11D2-945F-00C04FB984F9}\MACHINE\Scripts\*
	dr--r--r--                0 Fri May  1 07:32:28 2020	.
	dr--r--r--                0 Fri May  1 07:32:28 2020	..
	dr--r--r--                0 Fri May  1 07:32:28 2020	Shutdown
	dr--r--r--                0 Fri May  1 07:32:28 2020	Startup
	.\SYSVOL\windcorp.thm\Policies\{6AC1786C-016F-11D2-945F-00C04fB984F9}\*
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	.
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	..
	fr--r--r--               23 Thu May  7 03:34:35 2020	GPT.INI
	dr--r--r--                0 Fri May  1 05:55:05 2020	MACHINE
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	USER
	.\SYSVOL\windcorp.thm\Policies\{6AC1786C-016F-11D2-945F-00C04fB984F9}\MACHINE\*
	dr--r--r--                0 Fri May  1 05:55:05 2020	.
	dr--r--r--                0 Fri May  1 05:55:05 2020	..
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	Microsoft
	dr--r--r--                0 Fri May  1 05:55:05 2020	Scripts
	.\SYSVOL\windcorp.thm\Policies\{6AC1786C-016F-11D2-945F-00C04fB984F9}\MACHINE\Microsoft\*
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	.
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	..
	dr--r--r--                0 Thu Apr 30 11:11:10 2020	Windows NT
	.\SYSVOL\windcorp.thm\Policies\{6AC1786C-016F-11D2-945F-00C04fB984F9}\MACHINE\Scripts\*
	dr--r--r--                0 Fri May  1 05:55:05 2020	.
	dr--r--r--                0 Fri May  1 05:55:05 2020	..
	dr--r--r--                0 Fri May  1 05:55:05 2020	Shutdown
	dr--r--r--                0 Fri May  1 05:55:05 2020	Startup
	Users                                             	READ ONLY
	.\Users\*
	dw--w--w--                0 Sat May  2 18:05:58 2020	.
	dw--w--w--                0 Sat May  2 18:05:58 2020	..
	dr--r--r--                0 Sun May 10 07:18:11 2020	Administrator
	dr--r--r--                0 Thu Apr 30 20:33:55 2020	All Users
	dr--r--r--                0 Fri May  1 09:09:44 2020	angrybird
	dr--r--r--                0 Fri May  1 09:09:34 2020	berg
	dr--r--r--                0 Fri May  1 09:09:22 2020	bluefrog579
	dr--r--r--                0 Sun May  3 09:30:02 2020	brittanycr
	dr--r--r--                0 Fri May  1 09:09:08 2020	brownostrich284
	dr--r--r--                0 Sat Jul 15 22:29:05 2023	buse
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	Default
	dr--r--r--                0 Thu Apr 30 20:33:55 2020	Default User
	fr--r--r--              174 Thu Apr 30 20:31:55 2020	desktop.ini
	dr--r--r--                0 Fri May  1 09:08:54 2020	edward
	dr--r--r--                0 Sat May  2 19:30:16 2020	freddy
	dr--r--r--                0 Fri May  1 09:08:28 2020	garys
	dr--r--r--                0 Sat Jul 15 22:56:05 2023	goldencat416
	dr--r--r--                0 Fri May  1 09:08:17 2020	goldenwol
	dr--r--r--                0 Fri May  1 09:08:06 2020	happ
	dr--r--r--                0 Fri May  1 09:07:53 2020	happyme
	dr--r--r--                0 Fri May  1 09:07:42 2020	Luis
	dr--r--r--                0 Fri May  1 09:07:31 2020	orga
	dr--r--r--                0 Fri May  1 09:07:19 2020	organicf
	dr--r--r--                0 Sat Jul 15 22:56:59 2023	organicfish718
	dr--r--r--                0 Fri May  1 09:07:06 2020	pete
	dw--w--w--                0 Thu Apr 30 10:35:47 2020	Public
	dr--r--r--                0 Fri May  1 09:06:54 2020	purplecat
	dr--r--r--                0 Fri May  1 09:06:42 2020	purplepanda
	dr--r--r--                0 Fri May  1 09:06:31 2020	sadswan
	dr--r--r--                0 Sat Jul 15 22:59:23 2023	sadswan869
	dr--r--r--                0 Fri May  1 09:06:20 2020	sheela
	dr--r--r--                0 Fri May  1 09:05:39 2020	silver
	dr--r--r--                0 Fri May  1 09:05:24 2020	smallf
	dr--r--r--                0 Fri May  1 09:05:05 2020	spiff
	dr--r--r--                0 Fri May  1 09:04:49 2020	tinygoos
	dr--r--r--                0 Fri May  1 09:03:57 2020	whiteleopard
	.\Users\Default\*
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	.
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	AppData
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Application Data
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Cookies
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Desktop
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	Documents
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Downloads
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Favorites
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Links
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Local Settings
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Music
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	My Documents
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	NetHood
	fr--r--r--           262144 Thu Apr 30 20:33:04 2020	NTUSER.DAT
	fr--r--r--            57344 Thu Apr 30 20:33:04 2020	NTUSER.DAT.LOG1
	fr--r--r--                0 Thu Apr 30 20:33:35 2020	NTUSER.DAT.LOG2
	fr--r--r--            65536 Thu Apr 30 19:35:11 2020	NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TM.blf
	fr--r--r--           524288 Thu Apr 30 19:35:11 2020	NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000001.regtrans-ms
	fr--r--r--           524288 Thu Apr 30 19:35:11 2020	NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000002.regtrans-ms
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Pictures
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	PrintHood
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Recent
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Saved Games
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	SendTo
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Start Menu
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Templates
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Videos
	.\Users\Default\AppData\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Local
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Roaming
	.\Users\Default\AppData\Local\*
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	.
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	..
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Application Data
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	History
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Microsoft
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Temp
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Temporary Internet Files
	.\Users\Default\AppData\Local\Microsoft\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	InputPersonalization
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Windows
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Windows Sidebar
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	WindowsApps
	.\Users\Default\AppData\Local\Microsoft\InputPersonalization\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	TrainedDataStore
	.\Users\Default\AppData\Local\Microsoft\Windows\*
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	.
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	CloudStore
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	GameExplorer
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	History
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	INetCache
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	INetCookies
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Shell
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	Temporary Internet Files
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	WinX
	.\Users\Default\AppData\Local\Microsoft\Windows Sidebar\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Gadgets
	fr--r--r--               80 Thu Apr 30 20:33:04 2020	settings.ini
	.\Users\Default\AppData\Roaming\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Microsoft
	.\Users\Default\AppData\Roaming\Microsoft\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Internet Explorer
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Windows
	.\Users\Default\AppData\Roaming\Microsoft\Internet Explorer\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Quick Launch
	.\Users\Default\AppData\Roaming\Microsoft\Windows\*
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	.
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	..
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	CloudStore
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Network Shortcuts
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Printer Shortcuts
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Recent
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	SendTo
	dw--w--w--                0 Thu Apr 30 20:33:35 2020	Start Menu
	dr--r--r--                0 Thu Apr 30 20:33:35 2020	Templates
	.\Users\Default\Documents\*
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	.
	dw--w--w--                0 Thu Apr 30 19:35:11 2020	..
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	My Music
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	My Pictures
	dr--r--r--                0 Thu Apr 30 19:35:11 2020	My Videos

┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/ra]
└─$
```


```
──(bopbap㉿Matrix)-[~/Workspace/tryhackme/ra]
└─$ smbclient \\\\windcorp.thm\\Shared -U lilyle --password ChangeMe#1234
```