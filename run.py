#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import json
import os
import sys
import logging
from datetime import datetime
from common.logger import date_handler

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.addHandler(date_handler())
    logger.info('Run Started')
    main()
    logger.info('Run Finished')



