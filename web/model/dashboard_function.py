from web.model.Input.API import plug_in as IAPI
from web.model.Input.DB import plug_in as IDPI
from web.model.Transform.DataFrame import plug_in as TDFPI
from web.model.Transform.Dashboard import banner as TDBA, alarm as TDAL, line_chart as TDLC, chart_data as TDCD
from web.model.Analysis.Statistics.Dashboard import calculation as ASDC, alarm_case_detection as ASDACD, network as ASDN, chart_data as ASDCD

import urllib3
import pandas as pd
import json

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
core = SETTING['PROJECT']['CORE']
ProjectType = SETTING['PROJECT']['TYPE']
Customer = SETTING['PROJECT']['CUSTOMER']

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def DashboardData() :
    if Customer == 'NC' or 'Xfactor':
        if core == 'Tanium' :
            SK = IAPI('', 'Auth')
            EAYL = IDPI('asset', 'yesterday', '')
            sensorData = IAPI(SK['dataList'], 'Sensor')
            sensorAPI = sensorData['dataList']
            if ProjectType == 'System' :
                # Asset Item Statistics
                TAIDL = TDFPI(sensorAPI, "today", "assetItem")
                SAIDL = ASDCD(TAIDL, "assetItem", "group")

                # OS Item Statistics
                TOIDL = TDFPI(sensorAPI, "today", "osItem")
                SOIDL = ASDCD(TOIDL, "osItem", "group")

                # Drive Use Size Statistics
                ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                TDUSDLT = TDFPI(sensorAPI, "today", "DUS")
                TDUSDLY = TDFPI(EAYL, "yesterday", "DUS")
                DUSCTDL = [TDUSDLT, TDUSDLY]
                SDUSDLT = ASDCD(DUSCTDL, "DUS", "count")

                # No Login History Statistics
                ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                TNLHDLT = TDFPI(sensorAPI, "today", "LH")
                TNLHDLY = TDFPI(EAYL, "yesterday", "LH")
                NLHCTDL = [TNLHDLT, TNLHDLY]
                SNLHDLT = ASDCD(NLHCTDL, "LH", "count")

                # RAM USE Size Statistics
                ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                TRUSDLT = TDFPI(sensorAPI, "today", "RUET")
                TRUSDLU = TDFPI(sensorAPI, "today", "RUEU")
                RUSCTDL = [TRUSDLT, TRUSDLU]
                SRUSDLT = ASDCD(RUSCTDL, "RUE", "count")

                # Listen Port Count Statistics
                ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                TLPCDLT = TDFPI(sensorAPI, "today", "LPC")
                TLPCDLY = TDFPI(EAYL, "yesterday", "LPC")
                LPCCTDL = [TLPCDLT, TLPCDLY]
                LPCDLT = ASDCD(LPCCTDL, "LPC", "count")

                # Established Port Count Statistics
                ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                TEPCDLT = TDFPI(sensorAPI, "today", "EPC")
                TEPCDLY = TDFPI(EAYL, "yesterday", "EPC")
                EPCCTDL = [TEPCDLT, TEPCDLY]
                EPCDLT = ASDCD(EPCCTDL, "EPC", "count")

                # Banner ROC Calculation (yesterday Statistics Table Data & API Data Statistics)
                ## Yesterday Statistics Table Data Input & Transform
                ESDLY = IDPI('statistics', 'yesterday', '')
                TSDLY = TDBA(ESDLY, 'past')
                ## Today Statistics Data Transform
                ## Today Asset Total Count Calculation
                ATCDL = {'name': ['Asset Total'], 'value': [sum(SAIDL['value'])]}
                TSDL = ATCDL, SAIDL, SOIDL, SDUSDLT, SNLHDLT, SRUSDLT, LPCDLT, EPCDLT
                TSDLT = TDBA(TSDL, 'today')
                ## Banner ROC Calculation
                SBNDL = ASDC(TSDLY, TSDLT)

                # 5Days Asset Item Statistics Data Combination
                ## Past Data Input(Statistics Table Data 5Days ago)
                ESDLF = IDPI('statistics','fiveDay','asset')
                ## Past & Today Data Combination Transform
                AIFD = [ESDLF, SAIDL]
                ESAIDL = TDLC(AIFD)


                # Alarm
                ## Alarm Statistics(Alarm case detection)
                SDUSADL = ASDACD(DUSCTDL, 'DUS')
                SLHADL = ASDACD(NLHCTDL,  'LH')
                SRUSADL = ASDACD(RUSCTDL, 'RUE')
                SLPCADL = ASDACD(LPCCTDL, 'LPC')
                SEPCADL = ASDACD(EPCCTDL, 'EPC')

                ## List
                ### Transform by case
                TDUSALDL = TDAL(SDUSADL, 'list', 'DUS')
                TLHALDL = TDAL(SLHADL, 'list', 'LH')
                TRUSALDL = TDAL(SRUSADL, 'list', 'RUE')
                TLPCALDL = TDAL(SLPCADL, 'list', 'LPC')
                TEPCALDL = TDAL(SEPCADL, 'list', 'EPC')
                ALD = [TDUSALDL, TLHALDL, TRUSALDL, TLPCALDL, TEPCALDL]

                ## Network
                ### Data Grouping(Statistics) by case
                SDUSND = ASDN(SDUSADL, 'group', 'DUS')
                SLHND = ASDN(SLHADL, 'group', 'LH')
                SRUSND = ASDN(SRUSADL, 'group', 'RUE')
                SLPCND = ASDN(SLPCADL, 'group', 'LPC')
                SEPCND = ASDN(SEPCADL, 'group', 'EPC')

                TDUSND = TDAL(SDUSND, 'network', 'DUS')
                TLHND = TDAL(SLHND, 'network', 'LH')
                TRUSND = TDAL(SRUSND, 'network', 'RUE')
                TLPCND = TDAL(SLPCND, 'network', 'LPC')
                TEPCND = TDAL(SEPCND, 'network', 'EPC')
                NDL = [TDUSND[0], TDUSND[1]+TLHND[1]+TRUSND[1]+TLPCND[1]+TEPCND[1]]
                NCDL = ASDN(NDL, 'max', 'all')

                # BAR Chart
                BDL = TDCD(SAIDL, "Bar")
                # Line Chart
                LDL = TDCD(ESAIDL, "Line")
                #LDL = {}
                # Pie Chart
                PDL = TDCD(SOIDL, "Pie")
                # Banner
                BNDL = TDCD(SBNDL, "Banner")
                # Alarm List
                ALDL = TDCD(ALD, "alarmList")

            elif ProjectType == 'Service':
                print()
    elif core == 'Zabbix':
        print()

    RD = {
        "barChartData": BDL,
        "lineChartData" : LDL,
        "pieChartData" : PDL,
        "bannerData" : BNDL,
        "alarmListData" : ALDL[0],
        "AssociationDataList" : NCDL
    }

    return RD





