#!/usr/bin/env python3


"""
Data Provider interface to inject dependecy
to the RequestHandler class
"""

import os
import urllib.request
import json

PINGS_URL = os.getenv("PINGS_URL")


class DataProvider:
    def __init__(self, secret):
        self.secret = secret

    def get_secret(self):
        return self.secret

    def get_pings(self):
        pongs = ""
        with urllib.request.urlopen(PINGS_URL) as pong:
            data = pong.read().decode("utf-8")
            cleaned_data = json.loads(data)
            pongs = cleaned_data.get("message", "")
        return pongs
