# Connect to Redis
```sh
redis-cli -h $ip -p $port
```

## Config

### Check info
```sh
redis-cli -h $ip -p $port INFO
```

Or after connect to redis:
```sh
redis-cli> INFO
```

### Check number clients connect
```sh
$ redis-cli INFO | grep connected
connected_clients:2
connected_slaves:0
$
```
OR (after version 2.4):
```sh
CLIENT LIST
```
And you can terminate connections with:
```sh
CLIENT KILL <IP>:<PORT>
```
### Show config:
```sh
CONFIG GET *
```

Note that keys and values are alternating and you can change each key by issuing a “CONFIG SET” command like:
```sh
CONFIG SET timeout 900
```
Such a change will be effective instantly. When changing values consider also updating the redis configuration file.
## Database
### Multiple Databases
Redis has a concept of separated namespaces called “databases”. You can select the database number you want to use with `SELECT`. By default the database with index `0` is used.

To switch to another database:
```sh
redis 127.0.0.1:6379> SELECT 1
OK
redis 127.0.0.1:6379[1]>
```

List how many database, keys:
```sh
redis-cli INFO | grep ^db

db0:keys=91,expires=88
db1:keys=1,expires=0
```

### Drop Database
- To drop current selected DB, run:
```sh
FLUSHDB
```
- To drop all databases at once run:
```sh
FLUSHALL
```
### Dump Database Backup
```sh
BGSAVE
```
### Key - Values

Get the Key list of current database:
```sh
KEYS *
```
Get the value of key:
```sh
GET <key>
```