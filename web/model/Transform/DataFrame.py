import pandas as pd
from datetime import datetime
today = datetime.today().strftime("%Y-%m-%d")
def plug_in(data, day, type):
    DFL = []
    for d in data :
        if day == 'today' :
            CI = d[0]
            IP = d[9]
            if type == 'assetItem':
                if d[8] != None:
                    item = d[8]
                    itemPer = item.lower()
                if itemPer.startswith('macbook'):
                    item = 'Notebook'
                if itemPer.startswith('imac'):
                    item = 'Desktop'
                if itemPer == '[current result unavailable]' :
                    item = 'Other'
                itemIndex = 'assetItem'
            if type == 'osItem':
                item = d[5]
                itemPer = item.lower()
                if itemPer == '[current result unavailable]':
                    item = 'Other'
                itemIndex = 'os'
            if type == 'DUS':
                item = d[4]
                itemIndex = 'driveSize'
            if type == 'LH':
                if d[2] != '[current result unavailable]':
                    date = datetime.strptime(d[2].split(' +')[0], "%a, %d %b %Y %H:%M:%S")
                    item = str(date).split(' ')[0]
                itemIndex = 'lastLogin'
            if type == 'RUET':
                item = d[13].split(' ')[0]
                if item.isdigit():
                    item = int(item)
                else:
                    item = 0
                itemIndex = 'ramSize'
            if type == 'RUEU':
                item = d[12].split(' ')[0]
                if item.isdigit():
                    item = int(item)
                else:
                    item = 0
                itemIndex = 'ramSize'
            if type == 'LPC':
                item = d[10]
                itemIndex = 'listenPortCount'
            if type == 'EPC':
                item = d[11]
                itemIndex = 'establishedPortCount'
        elif day == 'yesterday' :
            CI = d[0]
            IP = ''
            if type == 'DUS' :
                item = d[1]
                itemIndex = 'driveSize'
            elif type == 'LH':
                item = str(d[5]).split(' ')[0]
                itemIndex = 'lastLogin'
            elif type == 'LPC':
                item = str(d[2])
                itemIndex = 'listenPortCount'
            elif type == 'EPC':
                item = str(d[3])
                itemIndex = 'establishedPortCount'

        DFL.append([CI, item, IP])
    DFC = ['id', itemIndex, 'ip']
    DF = pd.DataFrame(DFL, columns=DFC).sort_values(by="id", ascending=False).reset_index(drop=True)
    #print(DF)
    return DF