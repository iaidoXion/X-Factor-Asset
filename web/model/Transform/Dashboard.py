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


def banner(data, type):
    DFDL = []
    DFCNM = ['name', 'value']
    for i in range(len(data)):
        if type == 'past':
            if data[i][0] == 'asset' or data[i][0] == 'os':
                if data[i][1] == 'all':
                    name = 'Asset Online'
                else:
                    if data[i][1] == "Rack Mount Chassis":
                        name = "Server"
                    else:
                        name = data[i][1]
            elif data[i][0] == 'drive_size':
                name = 'Drive Size No Change'
            elif data[i][0] == 'login_history':
                name = 'No Login History'
            elif data[i][0] == 'listen_port_count':
                name = 'Listen Port No Change'
            elif data[i][0] == 'established_port_count':
                name = 'Established Port No Change'
            elif data[i][0] == 'ram_use_size':
                name = 'RAM Usage Exceeded'

            DFDL.append([name, data[i][2]])

        elif type == 'today':
            for j in range(len(data[i]['name'])):
                name = data[i]['name'][j]
                if i == 1:
                    if name == 'Other':
                        name = 'Other Asset'
                if i == 2:
                    if name == 'Other':
                        name = 'Other OS'
                value = data[i]['value'][j]
                DFDL.append([name, value])

    for i in range(len(data)):
        if type == 'yetoday':
            if data[i][0] == 'asset':
                if data[i][1] == "Rack Mount Chassis":
                    name = "Server"
                else:
                    name = data[i][1]
            elif data[i][0] == 'virtual' and data[i][0] == 'No':
                name = 'Virtual'
            # elif data[i][0] == 'drive_size':
            #     name = 'Drive Size No Change'
            # elif data[i][0] == 'login_history':
            #     name = 'No Login History'
            elif data[i][0] == 'listen_port_count_change' and data[i][1] == 'No':
                name = 'Listen Port No Change'
            elif data[i][0] == 'established_port_count_change' and data[i][1] == 'no':
                name = 'Established Port No Change'
            else:
                continue
            # else:inue
            # elif data[i][0] == 'ram_use_size':
            #     name = 'RAM Usage Exceeded'
            DFDL.append([name, data[i][2]])
        elif type =='yetodayNC':
            if data[i][0] == 'online_asset':
                if data[i][1] == 'online_asset':
                    name = "Online Asset"
                else :
                    name = "onlineAsset_unconfirmed"
            elif data[i][0] == 'virtual':
                if data[i][1] == 'Yes':
                    name = "Virtual"
                elif data[i][1] == 'No':
                    name = "Physical"
                else:
                    name = "isVirtual_unconfirmed"
            elif data[i][0] == 'os':
                if data[i][1] == 'unconfirmed':
                    name = "os_unconfirmed"
                else :
                    name = data[i][1]
            elif data[i][0] == 'group_server_count':
                if data[i][1] == 'unconfirmed':
                    name = "ipScope_unconfirmed"
                else :
                    name = data[i][1]
            else:
                continue
            DFDL.append([name, data[i][2]])


    RD = pd.DataFrame(DFDL, columns=DFCNM)
    return RD


def line_chart(data):
    DL = []
    time_array = []
    timelist = []
    ext_time = []
    pd_list = []
    today = datetime.today().strftime("%Y-%m-%d")
    for time in range(5):
        a = datetime.today() - timedelta(days=time)
        b = a.strftime("%Y-%m-%d")
        timelist.append(b)

    for i in range(len(data[1]['name'])):
        DL.append([data[1]['name'][i], data[1]['value'][i], today])
    for j in range(len(data[0])):
        if data[0][j][1] != 'all':
            DL.append([data[0][j][1], data[0][j][2], data[0][j][3].strftime("%Y-%m-%d")])
    df = pd.DataFrame(DL, columns=['name', 'value', 'date']).sort_values(by="date", ascending=True).reset_index(drop=True)

    for i in df['date'].drop_duplicates():
        time_array.append(i)
    ext_time = list(set(time_array).intersection(timelist))
    # asset = df.replace('Rack Mount Chassis', 'Server')
    timelist = []

    for i in ext_time:
        d = datetime.strptime(i, '%Y-%m-%d')
        timelist.append(d)

    timelist.sort(reverse=True)
    ext_time = []

    for i in timelist:
        d = datetime.strftime(i, "%Y-%m-%d")
        ext_time.append(d)

    for i in range(len(ext_time)):
        pd_list.append(df[df['date'] == ext_time[i]].sort_values(by="name", ascending=True).reset_index(drop=True))

    if len(ext_time) == 1:
        last = pd_list[0]
    elif len(ext_time) == 2:
        last = pd.merge(pd_list[0], pd_list[1], on='name', how='left', suffixes=["_1", '_2'])
    elif len(ext_time) == 3:
        last = pd.merge(pd.merge(pd_list[0], pd_list[1], on='name', how='left', suffixes=["_1", '_2']), pd_list[2], on='name', how='left', suffixes=['_2', '_3'])
    elif len(ext_time) == 4:
        last = pd.merge(pd.merge(pd.merge(pd_list[0], pd_list[1], on='name', how='left', suffixes=["_1", '_2']), pd_list[2], on='name', how='left', suffixes=['_2', '_3']), pd_list[3], on='name', how='left', suffixes=['_3', '_4'])
    elif len(ext_time) == 5:
        last = pd.merge(pd.merge(pd.merge(pd.merge(pd_list[0], pd_list[1], on='name', how='left', suffixes=["_1", '_2']), pd_list[2], on='name', how='left', suffixes=['_2', '_3']), pd_list[3], on='name', how='left', suffixes=['_3', '_4']), pd_list[4], on='name', how='left', suffixes=['_4', '_5'])
    for i in last.columns:
        if 'value' in i:
            for j in last[i]:
                if str(j) == 'nan':
                    last[i] = last[i].fillna(0)

    RD = last.fillna(method='ffill')
    return RD


def alarm(data, type, case):
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
    if type == 'list':
        ALDL = []
        if data.empty:
            FDL = [{'id': '-', 'ip': '-', 'alarmText': AT}]
            ALDL = [{'id': '-', 'ip': '-', 'alarmText': AT}]
        else:
            if data['name'][0]:
                FDL = [{'id': data['name'][0], 'ip': data['value'][0], 'alarmText': data['alarmText'][0]}]
                for i in range(len(data['name'])):
                    ALDL.append({'id': data['name'][i], 'ip': data['value'][i], 'alarmText': data['alarmText'][i]})
            else:
                FDL = [{'id': '-', 'ip': '-', 'alarmText': AT}]
                ALDL = [{'id': '-', 'ip': '-', 'alarmText': AT}]
            # else :
            #     FDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
            #     ALDL =[{'id' :'-', 'ip':'-', 'alarmText':AT}]
        RD = {'firstData': FDL, 'dataList': ALDL}
    elif type == 'network':
        DL = []
        DC = ['group', 'alarmCount', 'id', 'name', 'alarmCase']
        for i in range(len(data.group)):
            groupNameCountSplit = data.group[i].split('.')
            groupNameCount = groupNameCountSplit[0] + groupNameCountSplit[1] + groupNameCountSplit[2]
            DL.append([data.group[i], data.counts[i], 'group' + str(groupNameCount) + case, case, AT])
        RD = [DC, DL]
        # print(RD[1])
    elif type == 'world':
        ALDL = []
        if data.empty:
            ALDL = [{'ip': '-', 'alarmText': AT, 'group': '-', 'gps': '-'}]
        else:
            if data['name'][0]:
                for i in range(len(data['value'])):
                    if "current result" in data['value'][i]:
                        continue
                    IPS = data['value'][i].split('.')
                    if len(IPS) == 4:
                        GROUP = IPS[0] + '.' + IPS[1] + '.' + IPS[2]
                        GPS = [37.396010776217, 127.10864340523]
                    # if int(IPS[3]) % 2 == 1 :
                    #     GPS = [37.39962807731903,127.10910445171359]
                    # else :
                    #     GPS = [37.39545927731903,127.10945123911237]
                    ALDL.append({'ip': data['value'][i], 'alarmText': data['alarmText'][i], 'group': GROUP, 'gps': GPS})
            else:
                ALDL = [{'ip': '-', 'alarmText': AT, 'group': '-', 'gps': '-'}]
        RD = ALDL
        # print(RD)
    return RD


def chart_data(data, type):
    ChartDataList = []
    if type == 'alarmList':
        DUSDL = data[0]
        LHDL = data[1]
        RUEDL = data[2]
        LPCDL = data[3]
        EPCDL = data[4]
        TCCDLT = data[5]
        TRPDL = data[6]
        ChartDataList.append({'DUSDL': DUSDL, 'LHDL': LHDL, 'RUEDL': RUEDL, 'LPCDL': LPCDL, 'EPCDL': EPCDL, 'TCCDLT': TCCDLT, 'TRPDL': TRPDL})
    elif type == "MDC":
        check = []
        if data is None:
            ChartDataList.append({"name": "CPU Consumption is Excess", "ip": "-", "value": 0})
            ChartDataList.append({"name": "RAM Usage Exceeded", "ip": "-", "value": 0})
        else:
            for i in range(len(data)):
                for j in range(len(data[i])):
                    ChartDataList.append({"name": data[i][j][4], "ip": data[i][j][0], "value": data[i][j][1]})
            for i in ChartDataList:
                check.append(i['name'])
            if "CPU Consumption is Excess" not in check:
                ChartDataList.append({"name": "CPU Consumption is Excess", "ip": "-", "value": int(0)})
            elif "RAM Usage Exceeded" not in check:
                ChartDataList.append({"name": "RAM Usage Exceeded", "ip": "-", "value": int(0)})
    else:
        if type == 'Line':
            asset_list = []
            result = []
            for i in range(len(data)):
                asset_list.append(data['name'][i])
            for i in range(len(data)):
                chart_dict = {}
                if data['name'][i] == asset_list[i]:
                    if len(data.columns) == 3:
                        data_list = [data['value'][i]]
                        date_list = [data['date'][i]]
                        chart_dict['name'] = asset_list[i]
                        chart_dict['data'] = data_list
                    elif len(data.columns) == 5:
                        data_list = [data['value_2'][i], data['value_1'][i]]
                        date_list = [data['date_2'][i], data['date_1'][i]]
                        chart_dict['name'] = asset_list[i]
                        chart_dict['data'] = data_list
                    elif len(data.columns) == 7:
                        data_list = [data['value'][i], data['value_2'][i], data['value_1'][i]]
                        date_list = [data['date'][i], data['date_2'][i], data['date_1'][i]]
                        chart_dict['name'] = asset_list[i]
                        chart_dict['data'] = data_list
                    elif len(data.columns) == 9:
                        data_list = [data['value_4'][i], data['value_3'][i], data['value_2'][i], data['value_1'][i]]
                        date_list = [data['date_4'][i], data['date_3'][i], data['date_2'][i], data['date_1'][i]]
                        chart_dict['name'] = asset_list[i]
                        chart_dict['data'] = data_list
                    else:
                        data_list = [data['value'][i], data['value_4'][i], data['value_3'][i], data['value_2'][i], data['value_1'][i]]
                        date_list = [data['date'][i], data['date_4'][i], data['date_3'][i], data['date_2'][i], data['date_1'][i]]
                        chart_dict['name'] = asset_list[i]
                        chart_dict['data'] = data_list
                    result.append(chart_dict)
            ChartDataList.append({"data": result, "date": date_list})
            for i in range(len(data['name'])):
                if type == 'Bar' or type == 'Pie':
                    ChartDataList.append({"name": data['name'][i], "value": data['value'][i]})
                elif type == 'Banner':
                    ChartDataList.append({"name": data['name'][i], "value": int(data['value_y'][i]), "roc": data['ROC'][i]})

    # NC 서버 총수량 추이그래프 (30일)
    if type == 'Monthly_Line':
        V_date_list = []
        V_count = []
        date_list = []
        count = []
        for i in range(len(data)):
            if data[i][0] == 'Yes':
                V_count.append(data[i][1])
                V_date_list.append(str(data[i][2]))
            else:
                count.append(data[i][1])
                if str(data[i][2]).split("-")[2][0:2].startswith('0'):
                    date_list.append(str(data[i][2]).split("-")[2][0:2].replace('0', ""))
                else:
                    date_list.append(str(data[i][2]).split("-")[2][0:2])

        ChartDataList = [{"data": [{"name": "virtual", "data": V_count}, {"name": "physical", "data": count}], "date": date_list}]

    if type == 'Bar':
        x = sorted(ChartDataList, key=lambda x: x['value'], reverse=True)[0:3]
        ChartDataList = x
    elif type == 'Pie':
        x = sorted(ChartDataList, key=lambda x: x['value'], reverse=True)[0:3]
        ChartDataList = x
    # NC 배너 슬라이드
    elif type == 'bannerNC':
        for i in range(len(data['name'])):
            ChartDataList.append({"name": data['name'][i], "value": int(data['value_y'][i]), "roc": data['ROC'][i]})
    RD = ChartDataList
    return RD
