#!/usr/bin/env python

from logging import (Formatter, StreamHandler, getLogger, INFO)
from sys import stdout
from time import sleep
from uuid import uuid4


secret = str(uuid4())
logger = getLogger(__name__)
logger.setLevel(INFO)


handler = StreamHandler(stdout)
handler.setFormatter(Formatter('%(asctime)s:   %(message)s'))

logger.addHandler(handler)


if __name__ == "__main__":
    while True:
        logger.info(secret)
        sleep(5)
