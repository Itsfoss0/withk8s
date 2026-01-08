#!/usr/bin/env python3

"""
Generates a secret  every 5 seconds and writes it to a file
"""

from uuid import uuid4
from time import sleep


def generate_secret() -> str:
    return str(uuid4())


def write_to_file(filename: str, content) -> None:
    with open(filename, "w", encoding="utf-8") as file_to_write:
        file_to_write.write(content)


if __name__ == "__main__":
    while True:
        write_to_file("/var/log/dwk.log", generate_secret())
        sleep(4)
