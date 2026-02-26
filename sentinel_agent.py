
import requests, hmac, hashlib, json
from flask import request

SENTINEL_SECRET = "2d9783580480ca61c28c5a4c47988afa"
SENTINEL_URL = "https://redressible-heide-eligibly.ngrok-free.dev/upload-scan"

def sentinel_monitor(app):
    @app.before_request
    def inspect():
        payload = {
            "repo_name": "RBS3/loginsignup",
            "origin": "runtime_agent",
            "path": request.path,
            "method": request.method,
            "ip": request.remote_addr
        }
        data = json.dumps(payload).encode()
        sig = hmac.new(SENTINEL_SECRET.encode(), data, hashlib.sha256).hexdigest()
        try:
            requests.post(SENTINEL_URL, data=data, 
                          headers={"X-Sentinel-Signature": sig, "Content-Type": "application/json"}, 
                          timeout=0.5)
        except: pass
