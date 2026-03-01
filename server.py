import http.server
import os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Strip trailing slash (except root)
        path = self.path.split('?')[0].split('#')[0]
        if path != '/' and path.endswith('/'):
            path = path.rstrip('/')

        # If path has no extension and isn't a directory, try .html
        if '.' not in os.path.basename(path) and path != '/':
            html_path = path + '.html'
            if os.path.isfile(self.directory + html_path):
                self.path = html_path

        return super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = http.server.HTTPServer(('localhost', 3000), CleanURLHandler)
    print('Serving at http://localhost:3000')
    server.serve_forever()
