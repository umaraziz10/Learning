#import related library
import http.server
import socketserver
import hashlib
import requests
import os

#create folder for caching
cache_folder = '../cache'
if not os.path.exists(cache_folder):
    os.makedirs(cache_folder)
    print('Creating folder for caching...')
else:
    print('Caching folder already exist, ready for use...')

PORT = 50002
#create class for handle any caching schema
class CachingProxy(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        #define target url
        if self.path.startswith("http://"):
            target = self.path
        else:
            target = f"http://{self.headers['Host']}{self.path}"
        
        #hash the URL for uniqueness
        hashed_url = hashlib.md5(target.encode()).hexdigest()
        cache_file = os.path.join(cache_folder, hashed_url)

        #check if the hash value of URL are exist in the folder
        if os.path.exists(cache_file):
            #if exists, don't forward the request to actual server
            with open(cache_file, "rb") as f:
                content = f.read()
            #return from the file instead
            print(f"[CACHED HIT] {target}")
        
        #else, make request to actual server
        else:
            print(f"[CACHE CREATE] {target}")
            res = requests.get(target)
            content = res.content

            #write the response from server to the file inside the cache folder
            with open(cache_file, "wb") as f:
                f.write(content)
    
        #return the status code
        self.send_response(200)
        #ack the end of the resp headers
        self.end_headers()
        #send the body to the client
        self.wfile.write(content)

#create TCP server that binding to the 0.0.0.0 address with defined class as Request Handler
with socketserver.TCPServer(("", PORT), CachingProxy) as httpd:
    print(f"Proxy Server run on port {PORT}")
    httpd.serve_forever()