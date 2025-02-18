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
