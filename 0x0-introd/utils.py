"""
Utility module to get env variable 
and read a small file  to keep the code
clean and organized
"""

from os import getenv

MESSAGE = getenv("MESSAGE")


def read_file_content(filename: str) -> str:
    FILE_CONTENT = ""
    with open(filename, "r") as file:
        data = file.read()
        FILE_CONTENT = data
    return FILE_CONTENT
