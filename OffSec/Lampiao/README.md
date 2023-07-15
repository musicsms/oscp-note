`rustscan`
```sh
┌──(bopbap㉿Matrix)-[~/Workspace/OffSec/Lampiao]
└─$ export IP=192.168.164.48

┌──(bopbap㉿Matrix)-[~/Workspace/OffSec/Lampiao]
└─$ rustscan -a $IP --ulimit 5000 --range 1-65000 -t 2000
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: http://discord.skerritt.blog           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
😵 https://admin.tryhackme.com

[~] The config file is expected to be at "/home/bopbap/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.164.48:22
Open 192.168.164.48:80
[~] Starting Script(s)
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-07-13 01:51 EDT
Initiating Ping Scan at 01:51
Scanning 192.168.164.48 [2 ports]
Completed Ping Scan at 01:51, 2.40s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 01:51
Completed Parallel DNS resolution of 1 host. at 01:51, 0.35s elapsed
DNS resolution of 1 IPs took 0.35s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 01:51
Scanning 192.168.164.48 [2 ports]
Discovered open port 22/tcp on 192.168.164.48
Discovered open port 80/tcp on 192.168.164.48
Completed Connect Scan at 01:51, 0.38s elapsed (2 total ports)
Nmap scan report for 192.168.164.48
Host is up, received conn-refused (0.39s latency).
Scanned at 2023-07-13 01:51:47 EDT for 1s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 3.16 seconds

```
`nmap`
```sh

```


`robot.txt`
```txt
#
# robots.txt
#
# This file is to prevent the crawling and indexing of certain parts
# of your site by web crawlers and spiders run by sites like Yahoo!
# and Google. By telling these "robots" where not to go on your site,
# you save bandwidth and server resources.
#
# This file will be ignored unless it is at the root of your host:
# Used:    http://example.com/robots.txt
# Ignored: http://example.com/site/robots.txt
#
# For more information about the robots.txt standard, see:
# http://www.robotstxt.org/robotstxt.html

User-agent: *
Crawl-delay: 10
# CSS, JS, Images
Allow: /misc/*.css$
Allow: /misc/*.css?
Allow: /misc/*.js$
Allow: /misc/*.js?
Allow: /misc/*.gif
Allow: /misc/*.jpg
Allow: /misc/*.jpeg
Allow: /misc/*.png
Allow: /modules/*.css$
Allow: /modules/*.css?
Allow: /modules/*.js$
Allow: /modules/*.js?
Allow: /modules/*.gif
Allow: /modules/*.jpg
Allow: /modules/*.jpeg
Allow: /modules/*.png
Allow: /profiles/*.css$
Allow: /profiles/*.css?
Allow: /profiles/*.js$
Allow: /profiles/*.js?
Allow: /profiles/*.gif
Allow: /profiles/*.jpg
Allow: /profiles/*.jpeg
Allow: /profiles/*.png
Allow: /themes/*.css$
Allow: /themes/*.css?
Allow: /themes/*.js$
Allow: /themes/*.js?
Allow: /themes/*.gif
Allow: /themes/*.jpg
Allow: /themes/*.jpeg
Allow: /themes/*.png
# Directories
Disallow: /includes/
Disallow: /misc/
Disallow: /modules/
Disallow: /profiles/
Disallow: /scripts/
Disallow: /themes/
# Files
Disallow: /CHANGELOG.txt
Disallow: /cron.php
Disallow: /INSTALL.mysql.txt
Disallow: /INSTALL.pgsql.txt
Disallow: /INSTALL.sqlite.txt
Disallow: /install.php
Disallow: /INSTALL.txt
Disallow: /LICENSE.txt
Disallow: /MAINTAINERS.txt
Disallow: /update.php
Disallow: /UPGRADE.txt
Disallow: /xmlrpc.php
# Paths (clean URLs)
Disallow: /admin/
Disallow: /comment/reply/
Disallow: /filter/tips/
Disallow: /node/add/
Disallow: /search/
Disallow: /user/register/
Disallow: /user/password/
Disallow: /user/login/
Disallow: /user/logout/
# Paths (no clean URLs)
Disallow: /?q=admin/
Disallow: /?q=comment/reply/
Disallow: /?q=filter/tips/
Disallow: /?q=node/add/
Disallow: /?q=search/
Disallow: /?q=user/password/
Disallow: /?q=user/register/
Disallow: /?q=user/login/
Disallow: /?q=user/logout/

```
`$drupal_hash_salt = 'Mky3HW4JeKcETD2HWg8pCOyDvXGqo2MZyVkDpnw974M';`
```salt
Mky3HW4JeKcETD2HWg8pCOyDvXGqo2MZyVkDpnw974M
```

```php
$databases = array (
  'default' =>
  array (
    'default' =>
    array (
      'database' => 'drupal',
      'username' => 'drupaluser',
      'password' => 'Virgulino',
      'host' => 'localhost',
      'port' => '',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);
```

db:
```sql
www-data@lampiao:/var/www/html$ mysql -u drupaluser -h localhost -pVirgulino -D drupal -e "select * from users;"
<h localhost -pVirgulino -D drupal -e "select * from users;"
uid	name	pass	mail	theme	signature	signature_format	created	access	login	status	timezone	language	picture	init	data
0						NULL	0	0	0	0	NULL		0		NULL
1	tiago	$S$DNZ5o1k/NY7SUgtJvjPqNl40kHKwn4yXy2eroEnOAlpmT0TJ9Sx8	lampiao@lampiao.com			filtered_html	1524166911	1524245647	1524245267	1	America/Sao_Paulo		0	lampiao@lampiao.com	a:1:{s:7:"overlay";i:1;}
2	Eder	$S$Dv5orvhi7okjmViImnVPmVgfwJ2U..PNK4E9IT/k7Lqz9GZRb7tY	eder@lampiao.com			filtered_html	1524241965	1524244079	1524244079	1	America/Sao_Paulo		0	eder@lampiao.com	b:0;
3	bob	$S$Db0ashu2O3cGNibdZeBHDFZc2wOJCEXF0dYCT31Qkbbs5yM5NDiv	bob@test.com			filtered_html	168925955600	0	America/Sao_Paulo		0	bob@test.com	NULL
www-data@lampiao:/var/www/html$
```


```sh
$S$Dv5orvhi7okjmViImnVPmVgfwJ2U..PNK4E9IT/k7Lqz9GZRb7tY
$S$DNZ5o1k/NY7SUgtJvjPqNl40kHKwn4yXy2eroEnOAlpmT0TJ9Sx8
```