import pandas as pd

def chart(data, case):
    BChartDataList = []
    PChartDataList = []
    LChartDataList = []
    DChartDataList = []
    BNChartDataList = []
    LINEGROUP = []
    if case =='bar':
        for i in range(len(data)):
            BChartDataList.append({"name": data[i][0], "value": int(data[i][1])})
        return BChartDataList
    elif case == 'pie':
        for i in range(len(data)):
            if data[i][0] != 'unconfirmed':
                PChartDataList.append({"name": data[i][0], "value": int(data[i][1])})
        return PChartDataList
    elif case == 'group':
        LINEGROUP = {"name": [data[0][0], data[1][0], data[2][0], data[3][0]],
                     "value": [data[0][1], data[1][1], data[2][1], data[3][1]]}
        return LINEGROUP
    elif case == 'donut':
        for i in range(len(data)):
            DChartDataList.append({"name": data[i][0], "value": int(data[i][1])})
        return DChartDataList

#alarmcase chart
DFrame = []
def alarmCase(data, case):
    if case == 'alarmTotal':
        AADF = ['alarmCount', 'alarmCase']
        nodeDataList = []
        ACList = []
        for i in range(len(data)):
            if data[i][0] == 'listen_port_count_change' and data[i][1] == 'No':
                alarmCount = data[i][2]
                alarmCase = 'Listen Port No Change'
            elif data[i][0] == 'established_port_count_change' and data[i][1] == 'No':
                alarmCount = data[i][2]
                alarmCase = 'Established Port No Change'
            elif data[i][0] == 'drive_usage_size_exceeded' and data[i][1] != 'Safety' and data[i][1] != 'unconfirmed':
                alarmCount = data[i][2]
                alarmCase = 'Drive Usage Exceeded'
            elif data[i][0] == 'group_running_service_count_exceeded':
                alarmCount = data[i][2]
                alarmCase = 'Running Service is Exceeded'
            elif data[i][0] == 'group_ram_usage_exceeded':
                alarmCount = data[i][2]
                alarmCase = 'RAM Usage Exceeded'
            elif data[i][0] == 'group_cpu_usage_exceeded':
                alarmCount = data[i][2]
                alarmCase = 'CPU Consumption is Excess'
            elif data[i][0] == 'group_last_reboot':
                alarmCount = data[i][2]
                alarmCase = 'No Login History'
            # else:
            #     continue
            ACList.append({'alarmCount': int(alarmCount), 'alarmCase': alarmCase})

        if 'group_ram_usage_exceeded' not in data:
            alarmCount = 0
            alarmCase = 'RAM Usage Exceeded'
        ACList.append({'alarmCount': int(alarmCount), 'alarmCase': alarmCase})
        if data.count('group_cpu_usage_exceeded') == 0:
            alarmCount = 0
            alarmCase = 'CPU Consumption is Excess'
        ACList.append({'alarmCount': int(alarmCount), 'alarmCase': alarmCase})
        # ACList.append({'alarmCount': int(SDUSDLT['value'][0]), 'alarmCase': SDUSDLT['name'][0]})
        ACDF = pd.DataFrame(ACList, columns=AADF)
        DFG = ACDF.groupby(['alarmCase']).sum(['alarmCount']).sort_values(by='alarmCount', ascending=False).reset_index()
        TOT = DFG['alarmCount'].sum()
        ACPER = round((DFG['alarmCount'] / TOT) * 100, 2)
        for j in range(len(DFG.alarmCase)):
            nodeDataList.append(
                {'alarmCount': str(DFG.alarmCount[j]), 'alarmCase': DFG.alarmCase[j], 'alarmpertage': ACPER[j]})
        DFrame = {'nodeDataList': nodeDataList}
        return nodeDataList

    elif case == 'alarmTop':
        # print(RDCase)
        GADF = ['group', 'alarmCount']
        TAC = []
        for i in range(len(data)):
            if data[i][1].startswith('192.') or data[i][1].startswith('172.'):
                group = data[i][1]
                alarmCount = data[i][2]
                TAC.append({'group': group, 'alarmCount': int(alarmCount)})
        TDF = pd.DataFrame(TAC, columns=GADF)
        DFGX = TDF.groupby(['group']).sum(['alarmCount']).sort_values(by='alarmCount', ascending=False).reset_index().head(5)
        TOTX = DFGX['alarmCount'].sum()
        TOTPER = round((DFGX['alarmCount'] / TOTX) * 100, 2)

        nodeDataListx = []
        for j in range(len(DFGX.group)):
            groupNameCountSplit = DFGX.group[j].split('.')
            groupNameCount = groupNameCountSplit[0] + groupNameCountSplit[1] + groupNameCountSplit[2]
            nodeDataListx.append({'group': DFGX.group[j], 'alarmCount': str(DFGX.alarmCount[j]),
                                  'id': 'groupCenter' + str(groupNameCount), 'name': DFGX.group[j],
                                  'alarmCase': DFGX.group[j], 'totalPertage': TOTPER[j]})
        DFrame = {'nodeDataList': nodeDataListx}
        return nodeDataListx

# ram, cpu 사용량 초과 mini donut
def usage(data, case):
    Ramdonut = []
    Cpudonut = []
    if case == 'ram':
        if len(data) == 0:
            Ramdonut.append({'name': 'RAM Usage Exceeded', 'ip': '-', 'value': 0})
        else:
            for i in range(len(data)):
                Ramdonut.append({'name': 'RAM Usage Exceeded', 'ip': data[i][1], 'value': data[i][2]})
        # print(aa)
        return Ramdonut
    elif case == 'cpu':
        if len(data) == 0:
            Cpudonut.append({'name': 'CPU Consumption is Excess', 'ip': '-', 'value': 0})
        else:
            for i in range(len(data)):
                Cpudonut.append({'name': 'CPU Consumption is Excess', 'ip': data[i][1], 'value': data[i][2]})
        return Cpudonut


# worldMap alarmCase
def worldMap(data):
    WMAC = []
    gps = [37.396010776217, 127.10864340523]
    for i in range(len(data)):
        if data[i][0].startswith('group_cpu_'):
            alarmText = 'CPU Consumption is Excess'
        elif data[i][0].startswith('group_ram_'):
            alarmText = 'RAM Usage Exceeded'
        elif data[i][0].startswith('group_last_'):
            alarmText = 'No Login History'
        elif data[i][0].startswith('drive_'):
            alarmText = 'Drive Usage Exceeded'
        elif data[i][0].startswith('group_running_'):
            alarmText = 'Running Process is Exceeded'
        WMAC.append({"ip": data[i][1], "alarmText": alarmText, "group": data[i][1], "gps": gps})
    return WMAC

def worldMapNC(data):
    WMAC = []
    gps = [37.3953444, 127.10922679999999]
    for i in range(len(data)):
        WMAC.append({"count": int(data[i][1]), "gps": gps})
    return WMAC


def radar(data):
    # print(data)
    RCList = []
    name = ''
    for i in range(len(data)):
        if data[i][0] == 'group_drive_usage_size_exceeded':
            group = data[i][1]
            alarmCount = data[i][2]
            name = 'DUS'
            alarmCase = 'Drive Usage Exceeded'
        elif data[i][0] == 'listen_port_count_change':
            group = '192.192.5'
            alarmCount = data[i][2]
            name = 'LPC'
            alarmCase = 'Listen Port No Change'
        elif data[i][0] == 'established_port_count_change':      ############### grouping된 데이터 없음
            group = '192.192.5'
            alarmCount = data[i][2]
            name = 'EPC'
            alarmCase = 'Established Port No Change'
        elif data[i][0] == 'group_running_service_count_exceeded':
            group = data[i][1]
            alarmCount = data[i][2]
            name = 'RP'
            alarmCase = 'Running Service is Exceeded'
        elif data[i][0] == 'group_ram_usage_exceeded':
            group = data[i][1]
            alarmCount = data[i][2]
            name = 'RUE'
            alarmCase = 'RAM Usage Exceeded'
        elif data[i][0] == 'group_cpu_usage_exceeded':
            group = data[i][1]
            alarmCount = data[i][2]
            name = 'CCDL'
            alarmCase = 'CPU Consumption is Excess'
        elif data[i][0] == 'group_last_reboot' and data[i][1] != 'unconfirmed':
            group = data[i][1]
            alarmCount = data[i][2]
            name = 'LH'
            alarmCase = 'No Login History'
        else:
            continue
        groupNameCountSplit = group.split('.')
        groupNameCount = groupNameCountSplit[0] + groupNameCountSplit[1] + groupNameCountSplit[2]
        id = 'group'+groupNameCount+name
        RCList.append({"group": group, "alarmCount": int(alarmCount), "id": id, "name": name, "alarmCase": alarmCase})
    return RCList