#

## Foothold
Bypass the filter with `PayLoadsAllTheThings`
[https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion#wrapper-phpfilter](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion#wrapper-phpfilter)
We get the `dog.php` and `cat.php`. Tried to get the `index.php`

```html
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        <?php
            function containsStr($str, $substr) {
                return strpos($str, $substr) !== false;
            }
            $ext = isset($_GET["ext"]) ? $_GET["ext"] : '.php';
            if(isset($_GET['view'])) {
                if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
                    echo 'Here you go!';
                    include $_GET['view'] . $ext;
                } else {
                    echo 'Sorry, only dogs or cats are allowed.';
                }
            }
        ?>
    </div>
</body>

</html>
```
We noticed that the `ext` variable is default `.php`. But we can set it.
Try to get `/etc/passwd`
![etc.passwd](img/etc.passwd.png)

## LFI

i am using `seclist` with `LFI` for `Linux`.
![intruder2](img/intruder2.png)
A lot of files, we filter the errors one.
![intruder3](img/intruder3.png)

Well. we can access the apache2 log.
![apache2 log](img/apache2.log.png)
