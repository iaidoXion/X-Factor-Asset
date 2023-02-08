
import logging
import json
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler

with open("setting.json", encoding="UTF-8") as f:
        SETTING = json.loads(f.read())
LOGFD = SETTING['PROJECT']['LOG']['directory']
LOGFNM = SETTING['PROJECT']['LOG']['fileName']
LOGFF = SETTING['PROJECT']['LOG']['fileFormat']

today = datetime.today().strftime("%Y%m%d")
logFile = LOGFD + LOGFNM + today + LOGFF
logFormat = '%(levelname)s, %(asctime)s, %(message)s'
logDateFormat = '%Y%m%d%H%M%S'
    

formatter = logging.Formatter('%(levelname)s, %(asctime)s, %(message)s')
    
def logger():
    # Create a console handler
    console_handler = logging.StreamHandler()
    
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    # logger.addHandler(file_handler)
    logger.addHandler(date_handler)
    logger.addHandler(console_handler)
    
    return logger

def date_handler() :
    date_handler = TimedRotatingFileHandler(filename='log/log.log', when='midnight', interval=1, backupCount=10, encoding='utf-8')
    date_handler.suffix = '%Y%m%d.log'
    
    date_handler.setFormatter(formatter)
    
    return date_handler