#!/usr/bin/env python3


"""
Minimal API for testing purposes
"""


from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse
import json


class API:

    def __init__(self, data_source):
        self.data_source = data_source

    def create_handler(self):

        data_provider = self.data_source

        class RequestHandler(BaseHTTPRequestHandler):

            def send_json_response(self, data, status=200):
                self.send_response(status)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(data).encode('utf-8'))

            def do_GET(self):
                parsed_path = urlparse(self.path)
                if parsed_path.path == "/status":
                    secret = data_provider.get_secret()
                    self.send_json_response({"secret": secret, "status": "OK"})

        return RequestHandler


def run_server(handler_class, port=3000):
    server_address = ("", port)
    httpd = HTTPServer(server_address, handler_class)
    print(f"Server Listening on port {port}")
    httpd.serve_forever()
