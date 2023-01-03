from operator import itemgetter
import pandas as pd
from datetime import datetime
def plug_in(data, day, type):
    DFL = []
    for d in data :
        if day == 'today' :
            CI = d[0][0]['text']
            IP = d[9][0]['text']
            if type == 'assetItem':
                if d[8][0]['text'] != None and not d[8][0]['text'].startswith('TSE-Error') and not d[8][0]['text'].startswith('[current'):
                    item = d[8][0]['text']
                    itemPer = item.lower()
                    if itemPer.startswith('macbook'):
                        item = 'Notebook'
                    if itemPer.startswith('imac'):
                        item = 'Desktop'
                    if itemPer.startswith('rack'):
                        item = 'Server'
                itemIndex = 'assetItem'
            if type == 'line':
                if d[8][0]['text'] != None and not d[8][0]['text'].startswith('TSE-Error') and not d[8][0]['text'].startswith('[current'):
                    item = d[8][0]['text']
                    itemPer = item.lower()
                    if itemPer.startswith('macbook'):
                        item = 'Notebook'
                    if itemPer.startswith('imac'):
                        item = 'Desktop'
                    if itemPer.startswith('rack'):
                        item = 'Server'
                itemIndex = 'assetItem'

            if type == 'osItem':
                if d[5][0]['text'] != None and not d[5][0]['text'].startswith('TSE-Error') and not d[5][0]['text'].startswith('[current'):
                    item = d[5][0]['text']
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
                if d[2][0]['text'] != None and not d[2][0]['text'].startswith('TSE-Error') and not d[2][0]['text'].startswith('[current'):
                    if ('-' in d[2][0]['text']) :
                        date = datetime.strptime(d[2][0]['text'].split(' -')[0], "%a, %d %b %Y %H:%M:%S")
                    else :
                        date = datetime.strptime(d[2][0]['text'].split(' +')[0], "%a, %d %b %Y %H:%M:%S")
                    item = str(date).split(' ')[0]
                else :
                    item = "Other"
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
                #if d[10][0]['text'] != None and not d[10][0]['text'].startswith('TSE-Error') and not d[10][0]['text'].startswith('[current'):
                item = d[10][0]['text']
                itemIndex = 'listenPortCount'

            if type == 'EPC':
                #if d[11][0]['text'] != None and not d[11][0]['text'].startswith('TSE-Error') and not d[11][0]['text'].startswith('[current'):
                item = d[11][0]['text']
                itemIndex = 'establishedPortCount'

            if type == 'CCDL' :
                value = d[20][0]['text'].split(' ')
                if "current" in d[20][0]['text'] :
                    item = 'Other'
                elif "TSE-Error" in d[20][0]['text'] :
                    item = 'Other'
                else :
                    item = round(float(value[0].strip()), 1)
                itemIndex = 'cpuconsumption'
            if type == 'RP' :
                items = []
                for x in d[18] :
                    if '[current result unavailable]' in x['text'] :
                        items.append("Other")
                        # continue
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

            if type == 'virtual' :
                if not d[7][0]['text'].startswith('[current') and not d[7][0]['text'].startswith('Unknown') and not d[7][0]['text'].startswith('TSE-Error') :
                    item = d[7][0]['text']
                itemIndex = 'virtual'

        elif day == 'yesterday' :
            CI = d[0]
            IP = ''
            if type == 'DUS' :
                sum = 0
                dus = []
                item = d[1]
                list = str(d[1]).split(',')
                if len(list) == 1:
                    if 'current' in list[0] :
                        continue
                    a = list[0].split(' ')
                    dus.append(a)
                elif len(list) > 1 :
                    for i in list:
                        a = i.split(' ')
                        dus.append(a)
                for x in dus :
                    if len(x) == 3 :
                        if('KB' in x[2]) :
                            result = int(x[1])
                        elif('MB' in x[2]) :
                            result = int(x[1])*1024
                        elif('GB' in x[2]) : # 기준
                            result = int(x[1])*1024*1024
                        elif('TB'in x[2]) :
                            result = int(x[1])*1024*1024*1024
                        elif('PB'in x[2]) :
                            result = int(x[1])*1024*1024*1024*1024
                    elif len(x) == 2 :
                        if ("K" in x[1].upper()):
                            a = x[1].upper().find("K")
                            result = float(x[1][:a])
                        elif ("M" in x[1].upper()):
                            a = x[1].upper().find("M")
                            result = float(x[1][:a]) * 1024
                        elif ("G" in x[1].upper()):
                            a = x[1].upper().find("G")
                            result = float(x[1][:a]) * 1024 * 1024
                    sum += result
                result = round(int(sum)/1024/1024, -1)
                item = str(result) + "GB"
                itemIndex = 'driveSize'

            elif type == 'LH':
                item = str(d[4]).split(' ')[0]
                itemIndex = 'lastLogin'
            elif type == 'LPC':
                if d[2] != None and not d[2].startswith('TSE-Error') and not d[2].startswith('[current'):
                    item = str(d[2])
                itemIndex = 'listenPortCount'
            elif type == 'EPC':
                if d[3] != None and not d[3].startswith('TSE-Error') and not d[3].startswith('[current'):
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
    
def hyd_plug_in (data, type) :
    if type == 'Count' :
        data_A = pd.DataFrame(data[0])
        data_B = pd.DataFrame(data[1])
        DF = pd.merge(data_A, data_B, left_on='SWV', right_on='SWV', how='outer')
        
    return DF

