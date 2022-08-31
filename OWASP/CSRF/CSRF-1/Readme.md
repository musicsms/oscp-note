# Challenge
To complete this challenge, you must get your CSRF counter above 0. Once The request to increment your counter is as follows;

```http
GET /user/csrfchallengeone/plusplus?userid=exampleId 
```

Where exampleId is the ID of the user who's CSRF counter is being incremented. Your ID is: `
```txt
47887913a0f9573d479fbd600fa02ac6ef0575bd
```
Any user than you may increment your counter for this challenge, except you. Exploit the CSRF vulnerability in the request described above against **other users** to complete this challenge. Once you have successfully CSRF'd **another Users**, the solution key will appear just below this message.
![csrf-1](csrf1-1.png)

---
# Resolve
The ideal to solve this challenge is you create a link with your ID, and another user is access this link via `GET`.
Prepare the link: 
```http
https://10.63.253.66/user/csrfchallengeone/plusplus?userid=47887913a0f9573d479fbd600fa02ac6ef0575bd
```
Put this in in post mesage.

Go to another account, and click on the image:
![csrf-2](csrf1-2.png)

So the action increment is sucessful.
![csrf1-3](csrf1-3.png)
Back to our current session and we will see that the challenge has been completed.


