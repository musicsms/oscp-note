# JavaScript Deobfuscation

## Obfuscation

Obfuscation is a technique used to make a script more difficult to read by humans but allows it to function the same from a technical point of view, though performance may be slower. This is usually achieved automatically by using an obfuscation tool, which takes code as an input, and attempts to re-write the code in a way that is much more difficult to read, depending on its design.

For example, code obfuscators often turn the code into a dictionary of all of the words and symbols used within the code and then attempt to rebuild the original code during execution by referring to each word and symbol from the dictionary.
### Simple Obfuscation

#### Minifying JavaScript code

A common way of reducing the readability of a snippet of JavaScript code while keeping it fully functional is JavaScript minification. Code minification means having the entire code in a single (often very long) line. Code minification is more useful for longer code, as if our code only consisted of a single line, it would not look much different when minified.

Many tools can help us minify JavaScript code, like [javascript-minifier](https://www.toptal.com/developers/javascript-minifier).
Usually, minified JavaScript code is saved with the extension .min.js.

#### Packing JavaScript code
We will try [BeautifyTools](http://beautifytools.com/javascript-obfuscator.php) to obfuscate our code.
While a packer does a great job reducing the code's readability, we can still see its main strings written in cleartext, which may reveal some of its functionality. This is why we may want to look for better ways to obfuscate our code.

### Advanced Obfuscation
So far, we have been able to make our code obfuscated and more difficult to read. However, the code still contains strings in cleartext, which may reveal its original functionality. In this section, we will try a couple of tools that should completely obfuscate the code and hide any remanence of its original functionality.
- Obfuscator
[https://obfuscator.io/](https://obfuscator.io/)

- JSF
[http://www.jsfuck.com/](http://www.jsfuck.com/)

> We will notice that the code may take some time to run, which shows how code obfuscation could affect the performance, as previously mentioned.

- JJ Encode
[https://utf-8.jp/public/jjencode.html](https://utf-8.jp/public/jjencode.html)
- AA Encode
[https://utf-8.jp/public/aaencode.html](https://utf-8.jp/public/aaencode.html)

> Code execution/compilation very slow, so it is not recommended to be used unless for an obvious reason, like bypassing web filters or restrictions.

---
## Deobfuscation
### Beautify
We see that the current code we have is all written in a single line. This is known as `Minified JavaScript` code. In order to properly format the code, we need to `Beautify` our code. The most basic method for doing so is through our `Browser Dev Tools`.


For example, if we were using Firefox, we can open the browser debugger with [ `CTRL+SHIFT+Z` ], and then click on our script `secret.js`. This will show the script in its original formatting, but we can click on the '`{ }`' button at the bottom, which will `Pretty Print` the script into its proper JavaScript formatting:

Furthermore, we can utilize many online tools or code editor plugins, like [Prettier](https://prettier.io/playground/) or [Beautifier](https://beautifier.io/).
### Deobfuscate
We can find many good online tools to deobfuscate JavaScript code and turn it into something we can understand. One good tool is [JSNice](http://www.jsnice.org/).
As previously mentioned, the above-used method of obfuscation is `packing`. Another way of `unpacking` such code is to find the `return` value at the end and use `console.log` to print it instead of executing it.

### Reverse Engineering

Though these tools are doing a good job so far in clearing up the code into something we can understand, once the code becomes more obfuscated and encoded, it would become much more difficult for automated tools to clean it up. This is especially true if the code was obfuscated using a custom obfuscation tool.

We would need to manually reverse engineer the code to understand how it was obfuscated and its functionality for such cases. If you are interested in knowing more about advanced JavaScript Deobfuscation and Reverse Engineering, you can check out the [Secure Coding 101](https://academy.hackthebox.com/module/details/38) module, which should thoroughly cover this topic.


---

## Link

- Running JavaScript code
[https://jsconsole.com/](https://jsconsole.com/)
- Obfuscate tools:
	- javascript-minifier
	[https://www.toptal.com/developers/javascript-minifier](https://www.toptal.com/developers/javascript-minifier)
	- BeautifyTools
	[http://beautifytools.com/javascript-obfuscator.php](http://beautifytools.com/javascript-obfuscator.php)
	- Obfuscator
	[https://obfuscator.io/](https://obfuscator.io/)

	- Only used to bypassing web filters:
		- [JSF](http://www.jsfuck.com/)
		- [JJ Encode](https://utf-8.jp/public/jjencode.html)
		- [AA Encode](https://utf-8.jp/public/aaencode.html)
- Deobfuscate tools:
	- [Prettier](https://prettier.io/playground/)
	- [Beautifier](https://beautifier.io/)