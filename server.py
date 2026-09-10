import http.server
import socketserver

# Run server on port 8000 serving files from the 'src' folder
PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="src", **kwargs)

socketserver.TCPServer.allow_reuse_address = True

print("=" * 50)
print(f"Server running at http://localhost:{PORT}")
print("Open your browser and visit: http://localhost:8000")
print("Press Ctrl+C to stop.")
print("=" * 50)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
