from audioop import reverse
from itertools import count
from operator import itemgetter
import pandas as pd
from datetime import datetime
from collections import Counter
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
                if itemPer.startswith('rack'):
                    item = 'Server'
                if itemPer == '[current result unavailable]':
                    item = '[current result unavailable]'
                itemIndex = 'assetItem'
            if type == 'line':
                if d[8][0]['text'] != None:
                    item = d[8][0]['text']
                    itemPer = item.lower()
                if itemPer.startswith('macbook'):
                    item = 'Notebook'
                if itemPer.startswith('imac'):
                    item = 'Desktop'
                if itemPer.startswith('rack'):
                    item = 'Server'
                if itemPer == '[current result unavailable]':
                    item = '[current result unavailable]'
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
                    sum += result
                    result = round(int(sum)/1024/1024, -1)
                item = str(result) + "GB"
                itemIndex = 'driveSize'
            if type == 'LH': #값 안찍힘
                if d[2][0]['text'] != '[current result unavailable]':
                    if ('-' in d[2][0]['text']) :
                        date = datetime.strptime(d[2][0]['text'].split(' -')[0], "%a, %d %b %Y %H:%M:%S")
                    else :
                        date = datetime.strptime(d[2][0]['text'].split(' +')[0], "%a, %d %b %Y %H:%M:%S")
                    item = str(date).split(' ')[0]
                else :
                    item = "None"

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
                if "current" in d[20][0]['text'] :
                    item = '[current result unavailable]'
                elif "TSE-Error" in d[20][0]['text'] :
                    item = '[TSE-Error]'
                else :
                    item = round(float(value[0].strip()), 1)
                itemIndex = 'cpuconsumption'
            if type == 'RP' :
                items = []
                for x in d[18] :
                    if '[current result unavailable]' in x['text'] :
                        continue
                    items.append(x['text'])
                item = items
                itemIndex = 'runningprocess'
            if type == 'IANL' :
                item=[]
                if(len(d[14]) >= 1) :
                    for x in d[14] :
                        value = x['text']
                        item.append(value)
                itemIndex = 'installApplicationsName'
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

        DFL.append([CI, item, IP])
    if type == 'line' :
        DFC = ['id', itemIndex, 'ip']
        list = []
        result = []
        length = 4
        TOP5 = []
        DF = pd.DataFrame(DFL, columns=DFC).sort_values(by="id", ascending=False).reset_index(drop=True)
        for i in DF['assetItem'].drop_duplicates() :
            list.append(i)
            
        for group_list in list :
            dict = {}
            i = 0;
            for asset_list in DF['assetItem'] :
                if group_list == asset_list :
                    i = i + 1 
                    
            dict['name'] = group_list
            dict['count'] = i
            result.append(dict)
        
        data = sorted(result, key=itemgetter('count'), reverse=True)
        if len(data)   < length :
            length = len(data)
            
        for i in range(length) :
            TOP5.append(data[i]['name'])
        for i in TOP5 :
            if i in list:
                list.remove(i)
        for i in range(len(list)) :
            if len(list) == 0 :
                DF
            else :
                idx = DF[DF['assetItem'] == list[i]].index
                DF = DF.drop(idx)
        DF = DF.reset_index(drop=True)
        return DF
    else:
        DFL.append([CI, item, IP])
        DFC = ['id', itemIndex, 'ip']
        DF = pd.DataFrame(DFL, columns=DFC).sort_values(by="id", ascending=False).reset_index(drop=True)
        return DF