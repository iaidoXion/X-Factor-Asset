import pandas as pd

from web.model.Input.API import plug_in as IAPI
from common.Transform.Dataframe import alarmCase as ACDF
from common.Transform.Dataframe import usage as USDF
from common.Transform.Dataframe import worldMap as WDDF
from common.Transform.Dataframe import radar as RDDF
from common.Transform.Dataframe import chart as CTDF
from common.Input.DB.Tanium.Postgresql.Dashboard import plug_in as PDPI
# from web.model.Transform.DataFrame import Rplug_in as TDFRPI
from web.model.Input.API import hyd_plug_in as HYAPI
from web.model.Input.DB import plug_in as IDPI
from web.model.Input.DB import hyd_plug_in as HYDPI
from web.model.Transform.DataFrame import plug_in as TDFPI
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

                # SK = IAPI('', 'Auth')
                # EAYL = IDPI('asset', 'yesterday', '')
                # sensorData = IAPI(SK['dataList'], 'Sensor')
                # sensorAPI = sensorData['dataList']
                #
                # # Asset Item Statistics
                # TAIDL = TDFPI(sensorAPI, "today", "assetItem")
                # SAIDL = ASDCD(TAIDL, "assetItem", "group")
                #
                # # Line Chart
                # TAIDL2 = TDFPI(sensorAPI, "today", "line")
                # LINEGROUP = ASDCD(TAIDL2, "assetItem", "group")
                #
                # # OS Item Statistics
                # TOIDL = TDFPI(sensorAPI, "today", "osItem")
                # SOIDL = ASDCD(TOIDL, "osItem", "group")
                #
                # # Drive Use Size Statistics
                # ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                # TDUSDLT = TDFPI(sensorAPI, "today", "DUS")
                # TDUSDLY = TDFPI(EAYL, "yesterday", "DUS")
                # DUSCTDL = [TDUSDLT, TDUSDLY]
                # SDUSDLT = ASDCD(DUSCTDL, "DUS", "count")
                #
                # # CPU Consumption
                # TCCDLT = TDFPI(sensorAPI, "today", "CCDL")
                # CCSDLT = ASDCD(TCCDLT, "CCDL", "count")
                #
                # # Running Process
                # TRPDL = TDFPI(sensorAPI, "today", "RP")
                # RPDLA = ASDCD(TRPDL, "RP", "count")
                #
                # # No Login History Statistics
                # ## Today compare Count (now Asset API Data & yesterday Asset Table Data)
                # TNLHDLT = TDFPI(sensorAPI, "today", "LH")
                # TNLHDLY = TDFPI(EAYL, "yesterday", "LH")
                # NLHCTDL = [TNLHDLT, TNLHDLY]
                # SNLHDLT = ASDCD(NLHCTDL, "LH", "count")
                #
                # # RAM USE Size Statistics
                # ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                # TRUSDLT = TDFPI(sensorAPI, "today", "RUET")
                # TRUSDLU = TDFPI(sensorAPI, "today", "RUEU")
                # RUSCTDL = [TRUSDLT, TRUSDLU]
                # SRUSDLT = ASDCD(RUSCTDL, "RUE", "count")
                #
                # # Listen Port Count Statistics
                # ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                # TLPCDLT = TDFPI(sensorAPI, "today", "LPC")
                # TLPCDLY = TDFPI(EAYL, "yesterday", "LPC")
                # LPCCTDL = [TLPCDLT, TLPCDLY]
                # LPCDLT = ASDCD(LPCCTDL, "LPC", "count")
                #
                # # Established Port Count Statistics
                # ## Today compare Count (now sensor API Data & yesterday Asset Table Data)
                # TEPCDLT = TDFPI(sensorAPI, "today", "EPC")
                # TEPCDLY = TDFPI(EAYL, "yesterday", "EPC")
                # EPCCTDL = [TEPCDLT, TEPCDLY]
                # EPCDLT = ASDCD(EPCCTDL, "EPC", "count")
                #
                # # Banner ROC Calculation (yesterday Statistics Table Data & API Data Statistics)
                # ## Yesterday Statistics Table Data Input & Transform
                # ESDLY = IDPI('statistics', 'yesterday', '')
                # TSDLY = TDBA(ESDLY, 'past')
                # ## Today Statistics Data Transform
                # ## Today Asset Total Count Calculation
                # ATCDL = {'name': ['Asset Online'], 'value': [sum(SAIDL['value'])]}
                # TSDL = ATCDL, SAIDL, SOIDL, SDUSDLT, SNLHDLT, LPCDLT, EPCDLT
                # TSDLT = TDBA(TSDL, 'today')
                # ## Banner ROC Calculation
                # SBNDL = ASDC(TSDLY, TSDLT)
                # # 5Days Asset Item Statistics Data Combination
                # ## Past Data Input(Statistics Table Data 5Days ago)
                # ESDLF = IDPI('statistics', 'fiveDay', 'asset')
                # ## Past & Today Data Combination Transform
                # # AIFD = [ESDLF, SAIDL]
                #
                # ## LineChart
                # LNFD = [ESDLF, LINEGROUP]
                # ESAIDL = TDLC(LNFD)  # Line Chart
                #
                # # Alarm
                # ## Alarm Statistics(Alarm case detection)
                # SDUSADL = ASDACD(DUSCTDL, 'DUS')
                # SLHADL = ASDACD(NLHCTDL, 'LH')
                # SRUSADL = ASDACD(RUSCTDL, 'RUE')
                # SLPCADL = ASDACD(LPCCTDL, 'LPC')
                # SEPCADL = ASDACD(EPCCTDL, 'EPC')
                # SCCSADL = ASDACD(TCCDLT, 'CCDL')
                # SRPSADL = ASDACD(TRPDL, 'RP')
                #
                # ## List
                # ### Transform by case
                # TDUSALDL = TDAL(SDUSADL, 'list', 'DUS')
                # TLHALDL = TDAL(SLHADL, 'list', 'LH')
                # TRUSALDL = TDAL(SRUSADL, 'list', 'RUE')
                # TLPCALDL = TDAL(SLPCADL, 'list', 'LPC')
                # TEPCALDL = TDAL(SEPCADL, 'list', 'EPC')
                # TCCSADL = TDAL(SCCSADL, 'list', 'CCDL')
                # TRPSADL = TDAL(SRPSADL, 'list', 'RP')
                #
                # ALD = [TDUSALDL, TLHALDL, TRUSALDL, TLPCALDL, TEPCALDL, TCCSADL, TRPSADL]
                #
                # ## Network
                # ### Data Grouping(Statistics) by case
                # SDUSND = ASDN(SDUSADL, 'group', 'DUS')
                # SLHND = ASDN(SLHADL, 'group', 'LH')
                # SRUSND = ASDN(SRUSADL, 'group', 'RUE')
                # SLPCND = ASDN(SLPCADL, 'group', 'LPC')
                # SEPCND = ASDN(SEPCADL, 'group', 'EPC')
                # SCCSAD = ASDN(SCCSADL, 'group', 'CCDL')
                # SRPSAD = ASDN(SRPSADL, 'group', 'RP')
                #
                # ## Donut Chart
                # SDCCC = ASDN(SCCSADL, 'MD', 'CCDL')
                # SDDRU = ASDN(SRUSADL, 'MD', 'RUE')
                #
                # TDUSND = TDAL(SDUSND, 'network', 'DUS')
                # TLHND = TDAL(SLHND, 'network', 'LH')
                # TRUSND = TDAL(SRUSND, 'network', 'RUE')
                # TLPCND = TDAL(SLPCND, 'network', 'LPC')
                # TEPCND = TDAL(SEPCND, 'network', 'EPC')
                # TSCCSA = TDAL(SCCSAD, 'network', 'CCDL')
                # TSRPSA = TDAL(SRPSAD, 'network', 'RP')
                #
                # ## DONU chart
                # TMDCD = TDAL(SDCCC, 'network', 'CCDL')
                # TMRUE = TDAL(SDDRU, 'network', 'RUE')
                # MDC = [TMDCD[1][0:5], TMRUE[1][0:5]]
                #
                # NDL = [TDUSND[0], TDUSND[1] + TLHND[1] + TRUSND[1] + TLPCND[1] + TEPCND[1] + TSCCSA[1] + TSRPSA[1]]
                #
                # NCDL = ASDN(NDL, 'all', 'all')
                # # print(NDL)
                # # RADCDL = ASDN(NDL, 'max', 'all')
                # print('-----------------------------------------------------------')
                # # print(NCDL)
                # # BAR Chart
                # BDL = TDCD(SAIDL, "Bar")
                # # Line Chart
                # LDL = TDCD(ESAIDL, "Line")
                # # LDL = {}
                # # Pie Chart
                # PDL = TDCD(SOIDL, "Pie")
                # # Banner
                # # BNDL = TDCD(SBNDL, "Banner")
                # BNDL = []
                #
                # # Alarm List
                # ALDL = TDCD(ALD, "alarmList")
                # # Mini Donut Chart(RAM)
                # MDRU = TDCD(MDC, "MDC")
                # # print(MDRU)
                #
                # # ram, cpu 사용량 초과 mini donut
                # MDRC = PDPI('statistics', '', 'ram')
                # MDCC = PDPI('statistics', '', 'cpu')
                # # print(MDRU1)
                # Ramdonut = []
                # Cpudonut = []
                # for i in range(len(MDRC)):
                #     Ramdonut.append({'name': 'RAM Usage Exceeded', 'ip': MDRC[i][1], 'value': MDRC[i][2]})
                # # print(aa)
                # for i in range(len(MDCC)):
                #     Cpudonut.append({'name': 'CPU Consumption is Excess', 'ip': MDCC[i][1], 'value': MDCC[i][2]})
                # # print(bb)
                # MDRCC = Ramdonut + Cpudonut
                # # print(MDRCC)
                #
                # # Donut Chart
                # DDL = TDFPI(sensorAPI, "today", "IANL")
                # DDLA = np.array(DDL["installApplicationsName"])  # np.ndarray()
                # DDLAR = DDLA.tolist()  # list
                # DDLF = list(itertools.chain(*DDLAR))
                # counter = dict(Counter(DDLF))
                # sorted_dict = dict(sorted(counter.items(), key=lambda item: item[1], reverse=True))
                # a = (list(sorted_dict.keys()))
                # b = (list(sorted_dict.values()))
                # c = []
                # for i in range(5):
                #     c.append({"name": a[i], "value": b[i]})
                # DDLC = c
                # # print(NCDL)
                # # Total alarm Case
                # TACC = ASDN(NDL, 'max', 'all')
                # # Total alarm TOP 5
                # TACT = ASDN(NDL, 'top', 'all')
                #
                # # WorldMapChartData
                # WMDUS = TDAL(SDUSADL, 'world', 'DUS')
                # WMLH = TDAL(SLHADL, 'world', 'LH')
                # WMRUE = TDAL(SRUSADL, 'world', 'RUE')
                # WMLPC = TDAL(SLPCADL, 'world', 'LPC')
                # WMEPC = TDAL(SEPCADL, 'world', 'EPC')
                # WMCCDL = TDAL(SCCSADL, 'world', 'CCDL')
                # WNRP = TDAL(SRPSADL, 'world', 'RP')
                # WMCDL = [WMDUS + WMLH + WMRUE + WMLPC + WMEPC + WMCCDL + WNRP]
                # print(NCDL)

                if ProjectType == 'System':
                    if core == 'Tanium':

                        BCQ = PDPI('statistics', 'today', 'bar')
                        BChartDataList = CTDF(BCQ, 'bar')

                        PCQ = PDPI('statistics', 'today', 'pie')
                        PChartDataList = CTDF(PCQ, 'pie')

                        LG = PDPI('statistics', "assetItem", "Group")
                        LINEGROUP = CTDF(LG, 'group')

                        LCQ = PDPI('statistics', 'fiveDay', 'asset')
                        LNFD = [LCQ, LINEGROUP]

                        ESAIDL = TDLC(LNFD)
                        # print(ESAIDL)
                        LChartDataList = TDCD(ESAIDL, "Line")

                        DCQ = PDPI('statistics', 'today', 'donut')
                        DChartDataList = CTDF(DCQ, 'donut')
                        # print(DChartDataList)
                        # EAYL = IDPI('asset', 'yesterday', '')
                        # print(EAML)

                        # banner chart
                        BNY = PDPI('statistics', 'yesterday', '')
                        # print(BNY)
                        TSDLY = TDBA(BNY, 'yetoday')
                        # print(TSDLY)
                        BNT = PDPI('statistics', 'today', '')
                        # print(BNT)
                        TSDLT = TDBA(BNT, 'yetoday')
                        # print(TSDLT)
                        SBNDL = ASDC(TSDLY, TSDLT)
                        # print(SBNDL)
                        BNChartDataList = TDCD(SBNDL, 'Banner')
                        # print(BNChartDataList)

                        ACDT = PDPI('statistics_list', 'today', 'statistics')
                        # print(ACDT)

                        #alarmcase chart
                        RD = ACDF(ACDT, 'alarmTotal')
                        RDCase = {'nodeDataList': RD}

                        RDL = ACDF(ACDT, 'alarmTop')
                        # print(RDL)
                        RDLCase = {'nodeDataList': RDL}
                        # print(RDLCase)
                        # TATA = nodeDataListx + nodeDataList
                        # print(RDCase)

                        # ram, cpu 사용량 초과 mini donut
                        MDRC = PDPI('statistics', '', 'ram')
                        MDCC = PDPI('statistics', '', 'cpu')

                        Ramdonut = USDF(MDRC, 'ram')
                        Cpudonut = USDF(MDCC, 'cpu')

                        MDRCC = Ramdonut + Cpudonut

                        #worldMap alarmCase
                        WMQ = PDPI('statistics', '', 'world')
                        print(WMQ)
                        WMAC = WDDF(WMQ)

                        #radar chart
                        RCList = RDDF(ACDT)
                        # print(RCList)
                        RACA = {'nodeDataList': RDL + RCList}
                        print(RACA)

                        BDL = BChartDataList
                        LDL = LChartDataList
                        PDL = PChartDataList
                        BNDL = BNChartDataList
                        ALDL = [[]]
                        NCDL = RACA
                        TACC = RDCase
                        TACT = RDLCase
                        WMCDL = [WMAC]
                        MDRU = []
                        DDLC = DChartDataList

            elif core == 'Zabbix':
                print()
        elif ProjectType == 'Service':
            print()

    if Customer == 'NC':
        if ProjectType == 'System':
            if core == 'Tanium':

                BDL= []
                LDL = []
                PDL = []
                BNDL = []
                ALDL = [[]]
                NCDL = []
                TACC = []
                TACT = []
                WMCDL = []
                MDRCC = []
                DDLC = []
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
        "MiniDonutChart": MDRCC,
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



