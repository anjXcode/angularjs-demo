"""
Minimal Python HTTP Server for AngularJS Demo
- Serves static assets from the 'src' directory
- Provides REST API endpoint /api/data backed by db.json
- Zero external dependencies (uses standard library http.server)
"""

import http.server
import socketserver
import os
import json

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "src")
DB_FILE = os.path.join(BASE_DIR, "db.json")


class AngularJSAppHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve static files from 'src'
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def do_GET(self):
        # API endpoint for data fetching
        if self.path == "/api/data" or self.path == "/api/data/":
            if os.path.exists(DB_FILE):
                try:
                    with open(DB_FILE, "r", encoding="utf-8") as f:
                        data = f.read()

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(data.encode("utf-8"))
                    return
                except Exception as e:
                    self.send_response(500)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
                    return
            else:
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "db.json not found"}).encode("utf-8"))
                return

        # Default static file handler (serves index.html, JS, CSS from src/)
        super().do_GET()

    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AngularJSAppHandler) as httpd:
        print("=" * 60)
        print(f" AngularJS Learning Portal is running at:")
        print(f" http://localhost:{PORT}")
        print(f" API Endpoint: http://localhost:{PORT}/api/data")
        print(" Press Ctrl+C to stop.")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")


if __name__ == "__main__":
    run_server()

