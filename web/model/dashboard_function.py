from pprint import pprint

import pandas as pd

from common.Input.DB.Tanium.Postgresql.Dashboard import plug_in as PDPI
from web.model.Input.API import plug_in as IAPI
from web.model.Input.API import hyd_plug_in as HYAPI
from web.model.Input.DB import plug_in as IDPI
from web.model.Input.DB import hyd_plug_in as HYDPI
from web.model.Transform.DataFrame import plug_in as TDFPI
from web.model.Transform.DataFrame import Rplug_in as TDFRPI
from web.model.Transform.DataFrame import hyd_plug_in as HTDFPI
from web.model.Transform.Dashboard import banner as TDBA, alarm as TDAL, line_chart as TDLC, chart_data as TDCD
from web.model.Analysis.Statistics.Dashboard import calculation as ASDC, alarm_case_detection as ASDACD, \
    network as ASDN, chart_data as ASDCD
from collections import Counter
import numpy as np
import urllib3
import json
import itertools

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
core = SETTING['PROJECT']['CORE']
ProjectType = SETTING['PROJECT']['TYPE']
Customer = SETTING['PROJECT']['CUSTOMER']

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def DashboardData():
    if Customer == 'Xfactor':
        if ProjectType == 'System':
            if core == 'Tanium':
                SK = IAPI('', 'Auth')
                EAYL = IDPI('asset', 'yesterday', '')
                sensorData = IAPI(SK['dataList'], 'Sensor')
                sensorAPI = sensorData['dataList']

                # Asset Item Statistics
                TAIDL = TDFPI(sensorAPI, "today", "assetItem")
                SAIDL = ASDCD(TAIDL, "assetItem", "group")

                # Line Chart
                TAIDL2 = TDFPI(sensorAPI, "today", "line")
                LINEGROUP = ASDCD(TAIDL2, "assetItem", "group")
                # OS Item Statistics
                TOIDL = TDFPI(sensorAPI, "today", "osItem")
                SOIDL = ASDCD(TOIDL, "osItem", "group")

                # Drive Use Size Statistics
                ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                TDUSDLT = TDFPI(sensorAPI, "today", "DUS")
                TDUSDLT2 = PDPI('statistics_list', 'today', 'DUS')
                TDUSDLT3 = PDPI('statistics_list', 'yesterday', 'DUS')
                # print(TDUSDLT2)
                # print(TDUSDLT3)
                DS = ['id', 'driveSize', 'ip']
                RD1 = pd.DataFrame(TDUSDLT2, columns=DS)
                RD2 = pd.DataFrame(TDUSDLT3, columns=DS)
                # print(RD1)
                # print(RD2)
                # print(TDUSDLT)
                TDUSDLY = TDFPI(EAYL, "yesterday", "DUS")
                DUSCTDL = [RD1, RD2]
                # print(DUSCTDL)
                SDUSDLT = ASDCD(DUSCTDL, "DUS", "count")
                # print(SDUSDLT)
                adad = PDPI('statistics_list', 'today', 'statistics')
                # print(adad)
                dff = ['alarmCount', 'alarmCase']
                # alarmCount = 0
                # alarmCase = ''
                # alarmpertage = 0
                qw = []
                qq = []
                count = 0
                for i in range(len(adad)):
                    alarmCount = []
                    alarmCase = []
                    alarmpertage = 0
                    if adad[i][0] == 'listen_port_count_change' and adad[i][1] == 'No':
                        alarmCount = adad[i][2]
                        count += int(adad[i][2])
                        alarmCase = 'Listen Port No Change'
                    elif adad[i][0] == 'established_port_count_change' and adad[i][1] == 'no':
                        alarmCount = adad[i][2]
                        count += int(adad[i][2])
                        alarmCase = 'Established Port No Change'
                    elif adad[i][0] == 'group_running_processes_count_exceeded':
                        alarmCount = adad[i][2]
                        count += int(adad[i][2])
                        alarmCase = 'Running Process is Exceeded'
                    elif adad[i][0] == 'group_ram_usage_exceeded':
                        alarmCount = adad[i][2]
                        count += int(adad[i][2])
                        alarmCase = 'RAM Usage Exceeded'
                    elif adad[i][0] == 'group_cpu_usage_exceeded':
                        alarmCount = adad[i][2]
                        count += int(adad[i][2])
                        alarmCase = 'CPU Consumption is Excess'
                    else:
                        continue
                    qw.append({'alarmCount': alarmCount, 'alarmCase': alarmCase})
                print(count)
                print({'nodeDataList': qw})

                # CPU Consumption
                TCCDLT = TDFPI(sensorAPI, "today", "CCDL")
                # for d in sensorAPI:
                #     print(d[20][0]['text'])
                # print(TCCDLT)

                CCSDLT = ASDCD(TCCDLT, "CCDL", "count")

                # Running Process
                TRPDL = TDFPI(sensorAPI, "today", "RP")
                RPDLA = ASDCD(TRPDL, "RP", "count")

                # No Login History Statistics
                ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                TNLHDLT = TDFPI(sensorAPI, "today", "LH")
                # print(TNLHDLT)
                TNLHDLY = TDFPI(EAYL, "yesterday", "LH")

                TNLHDLT2 = PDPI('statistics_list', 'today', 'LH')
                TNLHDLT3 = PDPI('statistics_list', 'yesterday', 'LH')
                LL = ['id', 'lastLogin', 'ip']
                LD1 = pd.DataFrame(TNLHDLT2, columns=LL)
                LD2 = pd.DataFrame(TNLHDLT3, columns=LL)
                NLHCTDL = [TNLHDLT, TNLHDLY]
                SNLHDLT = ASDCD(NLHCTDL, "LH", "count")
                # print(SNLHDLT)

                # RAM USE Size Statistics
                ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                TRUSDLT = TDFPI(sensorAPI, "today", "RUET")
                TRUSDLU = TDFPI(sensorAPI, "today", "RUEU")
                # TRUSDLT1 = PDPI('statistics', 'today', 'RUS')

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
                # print(ESDLY)
                TSDLY = TDBA(ESDLY, 'past')
                # pprint(TSDLY)
                ## Today Statistics Data Transform
                ## Today Asset Total Count Calculation
                ATCDL = {'name': ['Asset Online'], 'value': [sum(SAIDL['value'])]}
                TSDL = ATCDL, SAIDL, SOIDL, SDUSDLT, SNLHDLT, LPCDLT, EPCDLT
                # print(TSDL)
                TSDLT = TDBA(TSDL, 'today')
                ## Banner ROC Calculation
                SBNDL = ASDC(TSDLY, TSDLT)
                # 5Days Asset Item Statistics Data Combination
                ## Past Data Input(Statistics Table Data 5Days ago)
                ESDLF = IDPI('statistics', 'fiveDay', 'asset')
                ## Past & Today Data Combination Transform
                # AIFD = [ESDLF, SAIDL]

                ## LineChart
                LNFD = [ESDLF, LINEGROUP]
                ESAIDL = TDLC(LNFD)

                # Alarm
                ## Alarm Statistics(Alarm case detection)
                SDUSADL = ASDACD(DUSCTDL, 'DUS')
                # print(SDUSADL)
                SLHADL = ASDACD(NLHCTDL, 'LH')
                SRUSADL = ASDACD(RUSCTDL, 'RUE')
                SLPCADL = ASDACD(LPCCTDL, 'LPC')
                SEPCADL = ASDACD(EPCCTDL, 'EPC')
                SCCSADL = ASDACD(TCCDLT, 'CCDL')
                # print(SCCSADL)
                SRPSADL = ASDACD(TRPDL, 'RP')

                ## List
                ### Transform by case
                TDUSALDL = TDAL(SDUSADL, 'list', 'DUS')
                TLHALDL = TDAL(SLHADL, 'list', 'LH')
                TRUSALDL = TDAL(SRUSADL, 'list', 'RUE')
                TLPCALDL = TDAL(SLPCADL, 'list', 'LPC')
                TEPCALDL = TDAL(SEPCADL, 'list', 'EPC')
                TCCSADL = TDAL(SCCSADL, 'list', 'CCDL')
                TRPSADL = TDAL(SRPSADL, 'list', 'RP')

                ALD = [TDUSALDL, TLHALDL, TRUSALDL, TLPCALDL, TEPCALDL, TCCSADL, TRPSADL]

                ## Network
                ### Data Grouping(Statistics) by case
                SDUSND = ASDN(SDUSADL, 'group', 'DUS')
                # print(SDUSADL)
                SLHND = ASDN(SLHADL, 'group', 'LH')
                SRUSND = ASDN(SRUSADL, 'group', 'RUE')
                SLPCND = ASDN(SLPCADL, 'group', 'LPC')
                SEPCND = ASDN(SEPCADL, 'group', 'EPC')
                SCCSAD = ASDN(SCCSADL, 'group', 'CCDL')
                SRPSAD = ASDN(SRPSADL, 'group', 'RP')

                ## Donut Chart
                SDCCC = ASDN(SCCSADL, 'MD', 'CCDL')
                # print(SDCCC)
                SDDRU = ASDN(SRUSADL, 'MD', 'RUE')

                TDUSND = TDAL(SDUSND, 'network', 'DUS')
                # print(SDUSND)
                TLHND = TDAL(SLHND, 'network', 'LH')
                TRUSND = TDAL(SRUSND, 'network', 'RUE')
                # print(TLHND)
                TLPCND = TDAL(SLPCND, 'network', 'LPC')
                TEPCND = TDAL(SEPCND, 'network', 'EPC')
                TSCCSA = TDAL(SCCSAD, 'network', 'CCDL')
                TSRPSA = TDAL(SRPSAD, 'network', 'RP')

                ## DONU chart
                TMDCD = TDAL(SDCCC, 'network', 'CCDL')
                # print(TMDCD)
                TMRUE = TDAL(SDDRU, 'network', 'RUE')
                # print(TMRUE)
                MDC = [TMDCD[1][0:5], TMRUE[1][0:5]]
                # print(MDC)
                NDL = [TDUSND[0], TDUSND[1] + TLHND[1] + TRUSND[1] + TLPCND[1] + TEPCND[1] + TSCCSA[1] + TSRPSA[1]]
                # print(NDL)
                NCDL = ASDN(NDL, 'all', 'all')
                # RADCDL = ASDN(NDL, 'max', 'all')

                # BAR Chart
                BDL = TDCD(SAIDL, "Bar")
                # Line Chart
                LDL = TDCD(ESAIDL, "Line")
                # LDL = {}
                # Pie Chart
                PDL = TDCD(SOIDL, "Pie")
                # Banner
                BNDL = TDCD(SBNDL, "Banner")

                # Alarm List
                ALDL = TDCD(ALD, "alarmList")
                # Mini Donut Chart(RAM)
                MDRU = TDCD(MDC, "MDC")
                # print(MDC)
                # print(MDRU)

                # Donut Chart
                DDL = TDFPI(sensorAPI, "today", "IANL")
                DDLA = np.array(DDL["installApplicationsName"])  # np.ndarray()
                DDLAR = DDLA.tolist()  # list
                DDLF = list(itertools.chain(*DDLAR))
                counter = dict(Counter(DDLF))
                sorted_dict = dict(sorted(counter.items(), key=lambda item: item[1], reverse=True))
                a = (list(sorted_dict.keys()))
                b = (list(sorted_dict.values()))
                c = []
                for i in range(5):
                    c.append({"name": a[i], "value": b[i]})
                DDLC = c

                # RDQ = PDPI('statistics', 'today', 'Rdonut')
                # print(RDQ)

                # Total alarm Case
                TACC = ASDN(NDL, 'max', 'all')
                # print(NDL)
                print(TACC)
                ACCQ = PDPI('statistics', 'today', 'case')
                df = []
                # for i in range(len(ACCQ)):
                #     df.append([ACCQ])

                # print(ACCQ)
                nodeDataList = []
                DFL = [['group', 'alarmCount', 'id', 'name', 'alarmCase']]
                alarmCount = []
                alarmCase = []
                # for i in range(len(ACCQ)):
                #     alarmCount = ACCQ[i][2]
                #     if ACCQ[i][0].startswith("listen") and ACCQ[i][1] == 'No':
                #         alarmCase = 'Drive Size No Change'
                #         alarmCount = ACCQ[i][2]
                #         # print(alarmCount)
                #     elif ACCQ[i][0].startswith("group_running") and ACCQ[i][1] != 'unconfirmed':
                #         alarmCase = 'Running Process is Exceeded'
                #     elif ACCQ[i][0].startswith("group_ram"):
                #         alarmCase = 'RAM Usage Exceeded'
                #         alarmCount = ACCQ[i][2]
                #     else:
                #         continue
                #     # alarmpertage =
                #     DFL.append([alarmCount, alarmCase])
                # print(DFL)
                # Total alarm TOP 5
                TACT = ASDN(NDL, 'top', 'all')

                # WorldMapChartData
                WMDUS = TDAL(SDUSADL, 'world', 'DUS')
                WMLH = TDAL(SLHADL, 'world', 'LH')
                WMRUE = TDAL(SRUSADL, 'world', 'RUE')
                WMLPC = TDAL(SLPCADL, 'world', 'LPC')
                WMEPC = TDAL(SEPCADL, 'world', 'EPC')
                WMCCDL = TDAL(SCCSADL, 'world', 'CCDL')
                WNRP = TDAL(SRPSADL, 'world', 'RP')
                WMCDL = [WMDUS + WMLH + WMRUE + WMLPC + WMEPC + WMCCDL + WNRP]
            elif core == 'Zabbix':
                print()
        elif ProjectType == 'Service':
            print()

    if Customer == 'NC':
        BChartDataList = []
        PChartDataList = []
        LChartDataList = []
        DChartDataList = []
        BNChartDataList = []
        LINEGROUP = []
        if ProjectType == 'System':
            if core == 'Tanium':
                BCQ = PDPI('statistics', 'today', 'bar')
                for i in range(len(BCQ)):
                    BChartDataList.append({"name": BCQ[i][0], "value": int(BCQ[i][1])})

                PCQ = PDPI('statistics', 'today', 'pie')
                for i in range(len(PCQ)):
                    PChartDataList.append({"name": PCQ[i][0], "value": int(PCQ[i][1])})

                LG = PDPI('statistics', "assetItem", "Group")
                # print(LG)
                LINEGROUP = {"name": [LG[0][0], LG[1][0], LG[2][0], LG[3][0]],  "value": [LG[0][1], LG[1][1], LG[2][1], LG[3][1]]}
                LCQ = PDPI('statistics', 'fiveDay', 'asset')
                LNFD = [LCQ, LINEGROUP]
                ESAIDL = TDLC(LNFD)
                # print(ESAIDL)
                LChartDataList = TDCD(ESAIDL, "Line")


                DCQ = PDPI('statistics', 'today', 'donut')
                for i in range(len(DCQ)):
                    DChartDataList.append({"name": DCQ[i][0], "value": int(DCQ[i][1])})
                #EAYL = IDPI('asset', 'yesterday', '')
                #print(EAML)

                #banner chart
                BNY = PDPI('statistics', 'yesterday', '')
                print(BNY)
                TSDLY = TDBA(BNY, 'past')
                print(TSDLY)
                BNT = PDPI('statistics', 'today', '')
                # print(BNT)
                TSDLT = TDBA(BNT, 'past')
                # print(TSDLT)
                SBNDL = ASDC(TSDLY, TSDLT)
                # print(SBNDL)
                BNChartDataList = TDCD(SBNDL, 'Banner')
                # print(BNChartDataList)

                #ram 사용량 차트
                RDQ = PDPI('statistics', 'today', 'Rdonut')
                # print(RDQ)
                RDQF = TDFRPI(RDQ, 'rdonut')
                # print(RDQF)

                #AlarmCase Total
                DTACQ = PDPI('statistics_list', 'today', 'DUS')
                YTACQ = PDPI('statistics_list', 'yesterday', 'DUS')
                # print(TDUSDLT2)
                DF = ['id', 'driveSize', 'ip']
                DTACQDF = pd.DataFrame(DTACQ, columns=DF)
                YTACQDF = pd.DataFrame(YTACQ, columns=DF)


                BDL= BChartDataList
                LDL = LChartDataList
                PDL = PChartDataList
                BNDL =BNChartDataList
                ALDL = [[]]
                NCDL = []
                TACC = []
                TACT = []
                WMCDL = []
                MDRU = []
                DDLC = DChartDataList
            elif core == 'Zabbix':
                print()
        elif ProjectType == 'Service':
            print()

    RD = {
        "barChartData": BDL,
        "lineChartData": LDL,
        "pieChartData": PDL,
        "bannerData": BNDL,
        "alarmListData": ALDL[0],
        "AssociationDataList": NCDL,
        "TotalDataList": TACC,
        "TotalTopDataList": TACT,
        "WorldMapDataList": WMCDL,
        "MiniDonutChart": MDRU,
        "donutChartDataList": DDLC
    }
    return RD


def AssetData(Param, data) :
    SK = HYAPI('', 'Auth', '')
    if Param == "Count" :
        DB = HYDPI('list', '')
        RD = {
            'session' : SK,
            'item' : DB
        }
    if Param == 'SWV' :
        SDL = HYDPI('swv_detail', data)
        RD = {
            'item' : SDL
        }
    return RD
    # sensorData_hyd = IAPI(SK['dataList'], 'Sensor_hyd')



