How to crack parallel on MacOS
create file bash and paste this
```bash
#!/bin/bash

# obtain the password from a dialog box
authPass="YourSudoPassword"
# function that replaces sudo command
sudo () {
    /bin/echo $authPass | /usr/bin/sudo -S "$@"
}

###==========================
### Shell script follows here
###==========================

sudo systemsetup -setusingnetworktime off
sudo date 1120000020
open "/Applications/Parallels Desktop.app"
sleep 60
sudo systemsetup -setusingnetworktime on
```
Run this and you have 60 second to start machine, install, whatever.
If you want more time, change `sleep 60` to whatever you want.
Work on verion 16 backthen.
> New version there sometime application can not call from CLI, so if the application not show up, you can go open it by GUI.
