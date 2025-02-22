#!/usr/bin/env python3


"""
Data Provider interface to inject dependecy
to the RequestHandler class
"""


class DataProvider:
    def __init__(self, secret):
        self.secret = secret

    def get_secret(self):
        return self.secret

    def get_pings(self):
        pongs = ""
        with open("/var/log/pingpong.log") as pong:
            data = pong.readline()
            pongs = data
        return pongs
