Tshark command
```tshark
tshark -r E:\OneDrive\Workspace\oscp-note\Hackthebox\CTF\forensics_trick_or_breach\capture.pcap -T fields -e dns.qry.name -Y "ip.src_host == 192.168.1.10" > out.txt
```

Using `HxD` or online Hex decode


File extension:

[https://en.wikipedia.org/wiki/List_of_file_signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)

Save file as zip and unzip file

Find flag in there.

```powershell
PS E:\OneDrive\Workspace\oscp-note\Hackthebox\CTF\forensics_trick_or_breach> findstr /s /i HTB *.*
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="28" uniqueCount="22"><si><t>Recipe Assignment</t></si><si><t>In this sheet there are assigned the ingredients of the punken pun secret project.</t></si><si><t>Subject</t></si><si><t>Assignment</t></si><si><t>Status</t></si><si><t>Time</t></si><si><t>Start date</t></si><si><t>Due on</t></si><si><t>Andrew</t></si><si><t>1 Fillet of a fenny snake</t></si><si><t>In progress</t></si><si><t>Nick</t></si><si><t>3 LizardΓÇÖs legs</t></si><si><t>Not started</t></si><si><t>3 Bat wings</t></si><si><t>Mike</t></si><si><t>3 Halloween chips</t></si><si><t>Done</t></si><si><t>HTB{M4g1c_c4nn0t_pr3v3nt_d4t4_br34ch}</t></si><si><t>Skipped</t></si><si><t>Team Members</t></si><si><t>Member of the Punkenpun project.</t></si></sst>
PS E:\OneDrive\Workspace\oscp-note\Hackthebox\CTF\forensics_trick_or_breach>
```