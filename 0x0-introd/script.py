#!/usr/bin/env python

from logging import (Formatter, StreamHandler, getLogger, INFO)
from sys import stdout
from time import sleep
from uuid import uuid4
import threading

from api import run_server, API
from interface import DataProvider
from utils import MESSAGE, read_file_content

secret = str(uuid4())
logger = getLogger(__name__)
logger.setLevel(INFO)

handler = StreamHandler(stdout)
handler.setFormatter(Formatter('%(asctime)s:   %(message)s'))
logger.addHandler(handler)

data_provider = DataProvider(secret)
api_handler = API(data_source=data_provider)

content = read_file_content("/etc/config/information.txt")


def log_secret():
    while True:
        logger.info(secret)
        sleep(5)


def main():
    # Start logging on a seperate thread
    log_thread = threading.Thread(target=log_secret, daemon=True)
    log_thread.start()

    # and run the server on the main thread
    run_server(api_handler.create_handler())


if __name__ == "__main__":
    print(f"File content is:  {content}")
    print(f"Env variable MESSAGE={MESSAGE}")
    main()
