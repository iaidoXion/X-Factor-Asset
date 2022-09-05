from re import S
import pandas as pd
import json
from datetime import datetime


with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())

alarmCaseFirst = SETTING['PROJECT']['Alarm']['Case']['First']
alarmCaseSecond = SETTING['PROJECT']['Alarm']['Case']['Second']
alarmCaseThird = SETTING['PROJECT']['Alarm']['Case']['Third']
alarmCaseFourth = SETTING['PROJECT']['Alarm']['Case']['Fourth']
alarmCaseFifth = SETTING['PROJECT']['Alarm']['Case']['Fifth']
alarmCaseSix = SETTING['PROJECT']['Alarm']['Case']['Six']
alarmCaseSeven = SETTING['PROJECT']['Alarm']['Case']['Seven']


def banner(data, type) :
    DFDL = []
    DFCNM=['name', 'value']
    for i in range(len(data)):
        if type == 'past' :
            if data[i][0] == 'asset' or data[i][0] == 'os' :
                if data[i][1] == 'all' :
                    name = 'Asset Total'
                else :
                    name = data[i][1]
            elif data[i][0] == 'drive_size' :
                name = 'Drive Size No Change'
            elif data[i][0] == 'login_history' :
                name = 'No Login History'
            elif data[i][0] == 'listen_port_count' :
                name = 'Listen Port No Change'
            elif data[i][0] == 'established_port_count' :
                name = 'Established Port No Change'
            DFDL.append([name, data[i][2]])
        elif type == 'today' :
            for j in range(len(data[i]['name'])) :
                name = data[i]['name'][j]
                if i == 1 :
                    if name == 'Other' :
                        name = 'Other Asset'
                if i == 2:
                    if name == 'Other' :
                        name = 'Other OS'
                value = data[i]['value'][j]
                DFDL.append([name, value])

    RD = pd.DataFrame(DFDL, columns=DFCNM)
    return RD

def line_chart(data) :
    DL = []

    today = datetime.today().strftime("%Y-%m-%d")
    for i in range(len(data[1]['name'])) :
        DL.append([data[1]['name'][i],data[1]['value'][i],today])
    for j in range(len(data[0])) :
        if data[0][j][1] != 'all':
            DL.append([data[0][j][1], data[0][j][2], data[0][j][3].strftime("%Y-%m-%d")])
    df = pd.DataFrame(DL,columns=['name','value','date']).sort_values(by="date", ascending=True).reset_index(drop=True)
    RD = df
    return RD

def alarm(data, type, case) :
    if case == 'DUS':
        AT = alarmCaseFirst
    elif case == 'LH':
        AT = alarmCaseSecond
    elif case == 'RUE':
        AT = alarmCaseThird
    elif case == 'LPC':
        AT = alarmCaseFourth
    elif case == 'EPC':
        AT = alarmCaseFifth
    elif case == 'CCDL':
        AT = alarmCaseSix
    elif case == 'RP':
        AT = alarmCaseSeven
    if type == 'list' :
        ALDL = []
        if data.empty:
            FDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
            ALDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
        else :
            if data['name'][0] :
                FDL = [{'id' :data['name'][0], 'ip':data['value'][0], 'alarmText':data['alarmText'][0]}]
                for i in range(len(data['name'])) :
                    ALDL.append({'id' : data['name'][i], 'ip': data['value'][i], 'alarmText':data['alarmText'][i]})
            else :
                FDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
                ALDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
            # else :
            #     FDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
            #     ALDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
        RD = {'firstData': FDL, 'dataList' : ALDL}
    elif type == 'network' :
        DL = []
        DC = ['group','alarmCount','id','name','alarmCase']
        for i in range(len(data.group)) :
            groupNameCountSplit = data.group[i].split('.')
            groupNameCount = groupNameCountSplit[0]+groupNameCountSplit[1]+groupNameCountSplit[2]
            DL.append([data.group[i], data.counts[i], 'group'+str(groupNameCount)+case, case, AT])
        RD=[DC,DL]
        #print(RD[1])
    return RD

def chart_data(data, type) :
    ChartDataList = []
    if type == 'alarmList' :
        DUSDL = data[0]
        LHDL = data[1]
        RUEDL = data[2]
        LPCDL = data[3]
        EPCDL = data[4]
        TCCDLT = data[5]
        TRPDL = data[6]
        ChartDataList.append({'DUSDL': DUSDL, 'LHDL': LHDL, 'RUEDL': RUEDL, 'LPCDL': LPCDL, 'EPCDL': EPCDL, 'TCCDLT' : TCCDLT, 'TRPDL':TRPDL})
    elif type == "MDC" :
        for i in range(len(data)) :
            for j in range(len(data[i])) :
                ChartDataList.append({"name": data[i][j][4] ,"ip": data[i][j][0], "value": data[i][j][1]})
    else :
        for i in range(len(data['name'])):
            if type == 'Bar' or type == 'Pie':
                ChartDataList.append({"name": data['name'][i], "value": data['value'][i]})
            elif type == 'Banner' :
                ChartDataList.append({"name": data['name'][i], "value": data['value_y'][i], "roc" : data['ROC'][i]})
            elif type == 'Line' :
                ChartDataList.append({"name": data['name'][i], "value": data['value'][i], "date" : data['date'][i]})
    
    RD = ChartDataList
    return RD
