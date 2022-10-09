# Enum

## Nmap

Nmap init:
```sh
export IP=10.10.11.164
nmap -sV --open -oA enum/init $IP
```

Open another window and scan full:

```sh
export IP=10.10.11.164
sudo nmap -sC -sV -O -p- -oA enum/full $IP
```

Output:
```sh
Nmap scan report for 10.10.11.164
Host is up (0.040s latency).
Not shown: 997 closed tcp ports (conn-refused), 1 filtered tcp port (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Werkzeug/2.1.2 Python/3.10.3
```

## Whatweb
```sh
whatweb $IP
http://10.10.11.164 [200 OK] Bootstrap, Country[RESERVED][ZZ], HTTPServer[Werkzeug/2.1.2 Python/3.10.3], IP[10.10.11.164], JQuery[3.4.1], Python[3.10.3], Script, Title[upcloud - Upload files for Free!], Werkzeug[2.1.2]
```

## Gobuster


Visit the webpage.
![[home-page.png]]
We can download source code to our machine for examine more.
![[source-code.png]]
Lets check the git commit log for version.

```bash
┌──(bop㉿BOP-PC)-[~/Workspace/hackthebox/OpenSource/source]
└─$ git log
commit 2c67a52253c6fe1f206ad82ba747e43208e8cfd9 (HEAD -> public)
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:55:55 2022 +0200

    clean up dockerfile for production use

commit ee9d9f1ef9156c787d53074493e39ae364cd1e05
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:45:17 2022 +0200

    initial

┌──(bop㉿BOP-PC)-[~/Workspace/hackthebox/OpenSource/source]
└─$ git branch -l
  dev
* public

┌──(bop㉿BOP-PC)-[~/Workspace/hackthebox/OpenSource/source]
└─$
```

There are two branch. Look like it is source code for the webpage.
In the `public` branch, there is some route point to `/uploads` but we not find any relate in browser. Instead we have route `/upcloud`. 
Lets check another `dev` branch.

```git
git log
```

Output:
```bash
commit c41fedef2ec6df98735c11b2faf1e79ef492a0f3 (HEAD -> dev)
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:47:24 2022 +0200

    ease testing

commit be4da71987bbbc8fae7c961fb2de01ebd0be1997
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:46:54 2022 +0200

    added gitignore

commit a76f8f75f7a4a12b706b0cf9c983796fa1985820
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:46:16 2022 +0200

    updated

commit ee9d9f1ef9156c787d53074493e39ae364cd1e05
Author: gituser <gituser@local>
Date:   Thu Apr 28 13:45:17 2022 +0200

    initial
```

Check the difference between commit:
```bash
git diff c41fedef2ec6df98735c11b2faf1e79ef492a0f3 a76f8f75f7a4a12b706b0cf9c983796fa1985820
```

Output:
```bash
diff --git a/.gitignore b/.gitignore
deleted file mode 100644
index e50a290..0000000
--- a/.gitignore
+++ /dev/null
@@ -1,26 +0,0 @@
-.DS_Store
-.env
-.flaskenv
-*.pyc
-*.pyo
-env/
-venv/
-.venv/
-env*
-dist/
-build/
-*.egg
-*.egg-info/
-_mailinglist
-.tox/
-.cache/
-.pytest_cache/
-.idea/
-docs/_build/
-.vscode
-
-# Coverage reports
-htmlcov/
-.coverage
-.coverage.*
-*,cover
diff --git a/Dockerfile b/Dockerfile
index 0875eda..76c7768 100644
--- a/Dockerfile
+++ b/Dockerfile
@@ -29,7 +29,7 @@ ENV PYTHONDONTWRITEBYTECODE=1

 # Set mode
 ENV MODE="PRODUCTION"
-ENV FLASK_DEBUG=1
+# ENV FLASK_DEBUG=1

 # Run supervisord
 CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
diff --git a/app/.vscode/settings.json b/app/.vscode/settings.json
new file mode 100644
index 0000000..5975e3f
--- /dev/null
+++ b/app/.vscode/settings.json
@@ -0,0 +1,5 @@
+{
+  "python.pythonPath": "/home/dev01/.virtualenvs/flask-app-b5GscEs_/bin/python",
+  "http.proxy": "http://dev01:Soulless_Developer#2022@10.10.10.128:5187/",
+  "http.proxyStrictSSL": false
+}
(END)
```


We found some creds 
```creds
dev01:Soulless_Developer#2022
```