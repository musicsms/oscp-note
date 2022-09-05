const { customAlphabet } = require('nanoid');
const number = "0123456789";
const symbol = "~!@#$%^&*(){}[],.<>?/`_-=+;:";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
var exclude = "~!@#$%^&*(){}[],.<>?/`_-=+;:";
var pool = number + symbol + upperCase + lowerCase;
var passLength = 20;

//
// if (document.getElementById('passwordDisplay')!= null) {
//
//     if ((document.getElementById('symbol')== null)||(document.getElementById('symbol').checked)){
//
//     }
//
//     if ((document.getElementById('number')== null)||(document.getElementById('number').checked)){
//
//     }
//
//     if ((document.getElementById('lowerCase')== null)||(document.getElementById('lowerCase').checked)){
//
//     }
//
//     if ((document.getElementById('upperCase')== null)||(document.getElementById('upperCase').checked)){
//
//     }
//
//     var passLen= 15;
//     if (document.getElementById('length')!= null) {
//         if (document.getElementById('length').value>0) {
//             passLen = document.getElementById('length').value;
//         }
//     }
//
//     if (numofoptions>0) {
//
//     } else {
//         outputString="You haven't selected any character types to build into the password, so I can't create one"
//     }
//
//     document.getElementById('passwordDisplay').value= outputString;
//
//     if (trackTrigger>0) {
//         trackThis("Generate","Input","Function",trackTrigger);
//     }
// }

// const { passwordGenerator } = require('nanoid');
// Source variables for generate password
const { customAlphabet } = require('nanoid');
const number = "0123456789";
const symbol = "~!@#$%^&*(){}[],.<>?/`_-=+;:";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
var exclude = "~!@#$%^&*(){}[],.<>?/`_-=+;:";
var pool = number + symbol + upperCase + lowerCase;
var passLength = 20;

// excludes characters from the pool
var i = exclude.length;
while (i--) {
    pool = pool.replace(exclude[i], '');
}



// const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*(){}[],.<>?/`_-=+';
const nanoid = customAlphabet(pool, passLength);
console.log(nanoid())