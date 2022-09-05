import pandas as pd
from datetime import datetime
today = datetime.today().strftime("%Y-%m-%d")
def plug_in(data, day, type):
    DFL = []
    for d in data :
        if day == 'today' :
            CI = d[0][0]['text']
            IP = d[9][0]['text']
            if type == 'assetItem':
                if d[8][0]['text'] != None:
                    item = d[8][0]['text']
                    itemPer = item.lower()
                if itemPer.startswith('macbook'):
                    item = 'Notebook'
                if itemPer.startswith('imac'):
                    item = 'Desktop'
                if itemPer == '[current result unavailable]' :
                    item = 'Other'
                itemIndex = 'assetItem'
            if type == 'osItem':
                item = d[5][0]['text']
                itemPer = item.lower()
                if itemPer == '[current result unavailable]':
                    item = 'Other'
                itemIndex = 'os'
            if type == 'DUS': 
                item = d[4][0]['text']
                sum = 0
                list = []
                if(len(d[4]) > 1) :
                    for x in d[4] :
                        value = x['text'].split(' ')
                        list.append(value)
                elif(len(d[4]) == 1) :
                    value= d[4][0]['text'].split(' ')
                    if ("[current" in value[0]) :
                        continue
                    list.append(value)
                for x in list :
                    if(len(x) == 3) :
                        if(x[2] == 'KB') :
                            result = int(x[1])
                        elif(x[2] == 'MB') :
                            result = int(x[1])*1024
                        elif(x[2] == 'GB') : # 기준
                            result = int(x[1])*1024*1024
                        elif(x[2] == 'TB') :
                            result = int(x[1])*1024*1024*1024
                        elif(x[2] == 'PB') :
                            result = int(x[1])*1024*1024*1024*1024
                    elif(len(x) == 2) :
                        if("K" in x[1].upper()) :
                            result = float(x[1].upper().strip("K"))
                        elif("M" in x[1].upper()) :
                            result = float(x[1].strip("M")) * 1024
                        elif("G" in x[1].upper()) :
                            result = float(x[1].strip("G")) * 1024 * 1024
                        else :
                            print("예외")
                            return int(value[1])
                    sum += result
                    result = round(int(sum)/1024/1024, -1)
                item = str(result) + "GB"
                itemIndex = 'driveSize'
            if type == 'LH': #값 안찍힘
                if d[2][0]['text'] != '[current result unavailable]':
                    # print(datetime.strptime(d[2][0]['text'].split(' -')[0], "%a, %d %b %Y %H:%M:%S"))
                    if ('-' in d[2][0]['text']):
                        date = datetime.strptime(d[2][0]['text'].split(' -')[0], "%a, %d %b %Y %H:%M:%S")
                    else:
                        date = datetime.strptime(d[2][0]['text'].split(' +')[0], "%a, %d %b %Y %H:%M:%S")
                    # date = datetime.strptime(d[2][0]['text'].split(' +')[0], "%a, %d %b %Y %H:%M:%S")
                    item = str(date).split(' ')[0]
                else:
                    item = 'None'
                itemIndex = 'lastLogin'
            if type == 'RUET':#값 안찍힘
                item = d[13][0]['text'].split(' ')[0]
                if item.isdigit():
                    item = int(item)
                else:
                    item = 0
                itemIndex = 'ramSize'
            if type == 'RUEU': #값 안찍힘
                item = d[12][0]['text'].split(' ')[0]
                if item.isdigit():
                    item = int(item)
                else:
                    item = 0
                itemIndex = 'ramSize'
            if type == 'LPC':
                item = d[10][0]['text']
                itemIndex = 'listenPortCount'
            if type == 'EPC':
                item = d[11][0]['text']
                itemIndex = 'establishedPortCount'
            if type == 'CCDL' :
                value = d[20][0]['text'].split(' ')
                if ("current" in d[20][0]['text']):
                    item = '[current result unavailable]'
                else :
                    item = round(float(value[0].strip()))
                itemIndex = 'cpuconsumption'
        elif day == 'yesterday' :
            CI = d[0]
            IP = ''
            if type == 'DUS' :
                list = []
                sum = 0
                item = d[1]
                list.append(d[1].split(' '))
                for x in list :
                    if(len(x) == 3) :
                        if(x[2] == 'KB') :
                            result = int(x[1])
                        elif(x[2] == 'MB') :
                            result = int(x[1])*1024
                        elif(x[2] == 'GB') : # 기준
                            result = int(x[1])*1024*1024
                        elif(x[2] == 'TB') :
                            result = int(x[1])*1024*1024*1024
                        elif(x[2] == 'PB') :
                            result = int(x[1])*1024*1024*1024*1024
                    elif(len(x) == 2) :
                        if("K" in x[1].upper()) :
                            result = float(x[1].upper().strip("K"))
                        elif("M" in x[1].upper()) :
                            result = float(x[1].strip("M")) * 1024
                        elif("G" in x[1].upper()) :
                            result = float(x[1].strip("G")) * 1024 * 1024
                        else :
                            print("예외")
                            return int(value[1])
                sum += result
                result = round(int(sum)/1024/1024, -1)
                item = str(result) + "GB"
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
            #elif type == 'CCDL' :

        DFL.append([CI, item, IP])
    DFC = ['id', itemIndex, 'ip']
    DF = pd.DataFrame(DFL, columns=DFC).sort_values(by="id", ascending=False).reset_index(drop=True)
    return DF