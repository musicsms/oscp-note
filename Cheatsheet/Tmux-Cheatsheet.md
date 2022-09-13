# Tmux Cheatsheet

> assume we are using the default hotkey is `ctrl + b`

## Sessions
- List the current active sessions

```tmux
tmux ls
```
- Attach to session

```tmux
tmux a -t <number>
```
- Start new sessions

```tmux
tmux
tmux new
tmux new-session
```
or `ctrl + b` `:new`

- Kill all sessions but current
```Tmux
tmux kill-session -a
```

- Kill/delete session *mysession*
```Tmux
tmux kill-session -t mysession
```

- List sessions and Windows

`ctrl + b` `w`

---

## Windows


- Create another window

  `ctrl + b` `c`

- Rename the window

  `ctrl + b` `,`

- Moving between window

  `ctrl + b` `<number of window>`

- Close current window

  `ctrl + b` `&`

- Next window

  `ctrl + b` `n`

- Last active window

  `ctrl + b` `l`

---

  Ref:
  [https://tmuxcheatsheet.com/](https://tmuxcheatsheet.com/)
