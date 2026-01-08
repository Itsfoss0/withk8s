#!/usr/bin/env python3


"""
Reads a file and outputs it's contents to stdout
every 5 seconds
"""

from logging import (Formatter, StreamHandler, getLogger, INFO)
from sys import stdout
from time import sleep


logger = getLogger(__name__)
logger.setLevel(INFO)

handler = StreamHandler(stdout)
handler.setFormatter(Formatter('%(asctime)s: %(message)s'))
logger.addHandler(handler)


def read_file_and_log_content(file_name: str) -> None:
    with open(file_name, "r") as file_to_read:
        content = file_to_read.readline()
        logger.info(content)


if __name__ == "__main__":
    while True:
        read_file_and_log_content("/var/log/dwk.log")
        sleep(5)
