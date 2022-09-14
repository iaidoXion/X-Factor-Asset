from re import S
import pandas as pd
import json
from datetime import datetime, timedelta


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
            elif data[i][0] == 'ram_use_size' :
                name = 'RAM Usage Exceeded'
                
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
    timelist = []
    pd_list = []
    today = datetime.today().strftime("%Y-%m-%d")
    for time in range(5) :
        a = datetime.today()-timedelta(days=time)
        b = a.strftime("%Y-%m-%d")
        timelist.append(b)
        
    for i in range(len(data[1]['name'])) :
        DL.append([data[1]['name'][i],data[1]['value'][i],today])
    for j in range(len(data[0])) :
        if data[0][j][1] != 'all':
            DL.append([data[0][j][1], data[0][j][2], data[0][j][3].strftime("%Y-%m-%d")])
    df = pd.DataFrame(DL,columns=['name','value','date']).sort_values(by="date", ascending=True).reset_index(drop=True)
    asset = df.replace('Rack Mount Chassis', 'Server')
    
    for i in timelist :
        df = asset[asset['date'] == i].sort_values(by="name", ascending=True).reset_index(drop=True)
        pd_list.append(df)
        
    
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
    elif type == 'world' :
        ALDL = []
        if data.empty:
            ALDL = [{'ip': '-', 'alarmText': AT,'group': '-', 'gps': '-' }]
        else:
            if data['name'][0]:
                for i in range(len(data['value'])):
                    if "current result" in data['value'][i] :
                        continue
                    IPS = data['value'][i].split('.')
                    if len(IPS) == 4 :
                        GROUP = IPS[0] + '.' + IPS[1] + '.' + IPS[2]
                        GPS = [37.48662777731903,127.03398991528599]
                    # if int(IPS[3]) % 2 == 1 :
                    #     GPS = [37.39962807731903,127.10910445171359]
                    # else :
                    #     GPS = [37.39545927731903,127.10945123911237]
                    ALDL.append({'ip': data['value'][i], 'alarmText': data['alarmText'][i], 'group': GROUP, 'gps': GPS})
            else:
                ALDL = [{'ip': '-', 'alarmText': AT,'group': '-', 'gps': '-' }]
        RD = ALDL
        #print(RD)
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
        check = []
        if data is None:
            ChartDataList.append({"name": "CPU Consumption is Excess" ,"ip": "-", "value": 1})
            ChartDataList.append({"name": "RAM Usage Exceeded" ,"ip": "-", "value": 1})
        else:
            for i in range(len(data)) :
                for j in range(len(data[i])) :
                    ChartDataList.append({"name": data[i][j][4] ,"ip": data[i][j][0], "value": data[i][j][1]})
            for i in ChartDataList :
                check.append(i['name'])
            if  "CPU Consumption is Excess" not in check :
                ChartDataList.append({"name": "CPU Consumption is Excess" ,"ip": "-", "value": int(1)})
            elif "RAM Usage Exceeded" not in check :
                ChartDataList.append({"name": "RAM Usage Exceeded" ,"ip": "-", "value": int(1)})
    else :
        if type == 'Line' :
            asset_list = []
            dup_date_list = []
            # duplicate = data.drop_duplicates(['name'])
            # for i in duplicate['name'] :
            #     dup_list.append(i)
            today = datetime.today().strftime("%Y-%m-%d")
            
            duplicate_date = data.drop_duplicates(['date'])
            for i in duplicate_date['date'] :
                dup_date_list.append(i)  
                
            for i in dup_date_list:
                if today == i :
                    for j in data[data['date'] == i]['name'] :
                        x = data[data['name'] == j].reset_index(drop=True)
                        asset_list.append(x)
            
                # for j in dup_date_list :
                #     if i["date"]
            # for i in asset_list :
            #     data_list = []
            #     data_dict = {}
            #     x = data[data['name'] == i].reset_index(drop=True)
            #     for j in range(len(x['name'])) :
            #         print(x['date'][j])
            #         data_list.append(x['value'][j])
            #     print("==============")
            #     print("list = {}".format(data_list))
            # print(x)
            ChartDataList.append({"date": dup_date_list})
        for i in range(len(data['name'])):
            if type == 'Bar' or type == 'Pie':
                ChartDataList.append({"name": data['name'][i], "value": data['value'][i]})
            elif type == 'Banner' :
                ChartDataList.append({"name": data['name'][i], "value": int(data['value_y'][i]), "roc" : data['ROC'][i]})
    
    RD = ChartDataList
    return RD
