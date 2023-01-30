from pprint import pprint

import pandas as pd

from web.model.Input.API import plug_in as IAPI
from common.Transform.Dataframe import alarmCase as ACDF
from common.Transform.Dataframe import usage as USDF
from common.Transform.Dataframe import worldMap as WDDF
from common.Transform.Dataframe import worldMapNC as WDDFNC
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
import math

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

                BCQ = PDPI('statistics', 'today', 'bar')
                BChartDataList = CTDF(BCQ, 'bar')

                PCQ = PDPI('statistics', 'today', 'pie')
                PChartDataList = CTDF(PCQ, 'pie')

                LG = PDPI('statistics', "assetItem", "Group")
                # print(LG)
                LINEGROUP = CTDF(LG, 'group')

                LCQ = PDPI('statistics', 'fiveDay', 'asset')
                LNFD = [LCQ, LINEGROUP]
                # print(LCQ)

                ESAIDL = TDLC(LNFD)
                # print(ESAIDL)
                LChartDataList = TDCD(ESAIDL, "Line")
                # print(LChartDataList)

                DCQ = PDPI('statistics', 'today', 'donut')
                DChartDataList = CTDF(DCQ, 'donut')
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
                WMAC = WDDF(WMQ)

                #radar chart
                RCList = RDDF(ACDT)
                RACA = {'nodeDataList': RDL + RCList}

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
                service_donutChartData = []
                DiskChartDataList = []
                CpuChartDataList = []
                MemoryChartDataList = []
                os_donutChartData = []
                alarm_donutChartData = []
                vendorChartList = []

                # NC 대역벌 서버수량 chart
                SBCQ = PDPI('statistics', 'today', 'group_server_count')
                server_BChartDataList = CTDF(SBCQ, 'bar')
                if not SBCQ:
                    server_BChartDataList = [{"name": "-", "value": 0}]

                # 실행 중인 서비스 통계 차트
                Rchart = PDPI('statistics', 'today', 'running')
                for i in range(len(Rchart)):
                    service_donutChartData.append({"name": Rchart[i][0], "value": int(Rchart[i][1])})
                if not service_donutChartData:
                    service_donutChartData = [{"name": "-", "value": 0}]

                #디스크, cpu, ram 95%, 75%, 60% 사용량 차트
                Usagechart = PDPI('statistics', 'today', 'usage')
                alarmData = []
                for i in range(len(Usagechart)):
                    if Usagechart[i][0].startswith('ram_') :
                        MemoryChartDataList.append({"name": Usagechart[i][1], "value": int(Usagechart[i][2])})
                        if Usagechart[i][1] == '95Risk':
                            alarmData.append({"alarmCase": "메모리 사용량 95% 초과", "alarmCount": Usagechart[i][2]})

                    elif Usagechart[i][0].startswith('cpu_'):
                        CpuChartDataList.append({"name": Usagechart[i][1], "value": int(Usagechart[i][2])})
                        if Usagechart[i][1] == '95Risk':
                            alarmData.append({"alarmCase": "CPU 사용량 95% 초과", "alarmCount": Usagechart[i][2]})

                    elif Usagechart[i][0].startswith('drive_'):
                        DiskChartDataList.append({"name": Usagechart[i][1], "value": int(Usagechart[i][2])})

                        if Usagechart[i][1] == '99Risk':
                            alarmData.append({"alarmCase": "디스크 사용량 99% 초과", "alarmCount": Usagechart[i][2]})

                    elif Usagechart[i][0].startswith('last_online'):
                        if Usagechart[i][1] == 'Yes':
                            alarmData.append({"alarmCase": "최근 30분 이내 오프라인 여부", "alarmCount": Usagechart[i][2]})

                #데이터 검증 - 값이 0일 때 0 출력
                def alarmCaseData(chart, case):
                    if case == '디스크' and next((index for (index, data) in enumerate(chart) if data['name'] == '99Risk'), None) == None:
                        alarmData.append({"alarmCase": case + " 사용량 99% 초과", "alarmCount": 0})
                    if next((index for (index, data) in enumerate(chart) if data['name'] == '60Risk'), None) == None:
                        chart.append({"name": "60Risk", "value": 0})
                    if next((index for (index, data) in enumerate(chart) if data['name'] == '75Risk'), None) == None:
                        chart.append({"name": "75Risk", "value": 0})
                    if case == '디스크' and next((index for (index, data) in enumerate(chart) if data['name'] == '95Risk'), None) == None:
                        chart.append({"name": "95Risk", "value": 0})
                    if case != '디스크' and next((index for (index, data) in enumerate(chart) if data['name'] == '95Risk'), None) == None:
                        alarmData.append({"alarmCase": case + " 사용량 95% 초과", "alarmCount": 0})
                        chart.append({"name": "95Risk", "value": 0})

                alarmCaseData(MemoryChartDataList, "메모리")
                alarmCaseData(CpuChartDataList, 'CPU')
                alarmCaseData(DiskChartDataList, '디스크')
                if next((index for (index, data) in enumerate(alarmData) if data['alarmCase'] == '최근 30분 이내 오프라인 여부'), None) == None:
                    alarmData.append({"alarmCase": "최근 30분 이내 오프라인 여부", "alarmCount": 0})
                # alarmData.reverse()

                if not Usagechart:
                    alarmData = [{"alarmCase": "메모리 사용량 95% 초과", "alarmCount": '-'},
                                 {"alarmCase": "CPU 사용량 95% 초과", "alarmCount": '-'},
                                 {"alarmCase": "디스크 사용량 95% 초과", "alarmCount": '-'},
                                 {"alarmCase": "최근 30분 이내 오프라인 여부", "alarmCount": '-'}]
                    UsageChartExcept = [{"name": '-', "value": '-'}]
                    MemoryChartDataList = UsageChartExcept * 3
                    CpuChartDataList = UsageChartExcept * 3
                    DiskChartDataList = UsageChartExcept * 3

                alarmDataList = {"nodeDataList": alarmData}

                # NC 서버 총 수량 추이 그래프
                SCLCQ = PDPI('statistics', 'monthly', 'asset')
                server_LChartDataList = TDCD(SCLCQ, 'Monthly_Line')

                # OS 버전별 서버 수 차트
                Ochart = PDPI('statistics', 'today', 'os_version')
                for i in range(len(Ochart)):
                    os_donutChartData.append({"name": Ochart[i][0], "value": int(Ochart[i][1])})

                OSNum = 4
                result = [os_donutChartData[i * OSNum:(i + 1) * OSNum] for i in range((len(os_donutChartData) + OSNum - 1) // OSNum)]
                try:
                    os_chartPartOne = result[0]
                    os_chartPartTwo = result[1]
                except:
                    os_chartPartOne = [{"name": "-", "value": 0}]
                    os_chartPartTwo = [{"name": "-", "value": 0}]


                #물리서버 벤더별 수량 차트
                venChart = PDPI('statistics', 'today', 'vendor')
                for i in range(len(venChart)):
                    vendorChartList.append({"name": venChart[i][0], "value": venChart[i][1]})
                if not venChart :
                    vendorChartList = [{'name': '-', 'value': '-'}]


                # IP 대역별 총 알람 수 차트
                Achart = PDPI('statistics', 'today', 'group_alarm')
                for i in range(len(Achart)):
                    alarm_donutChartData.append({Achart[i][0]: int(Achart[i][1])})
                alarmCounter = Counter()
                for i in alarm_donutChartData:
                    alarmCounter.update(i)
                alarm_donutChartDataList = [{key: value} for key, value in alarmCounter.most_common()]

                # 배너 슬라이드
                BNY = PDPI('statistics', 'yesterday', 'bannerNC')   #daily statistics에서 날짜가 어제인 data호출(running service, session ip, group 제외)
                TSDLY = TDBA(BNY, 'yetodayNC')
                BNT = PDPI('statistics', 'today', 'bannerNC')
                TSDLT = TDBA(BNT, 'yetodayNC')
                SBNDL = ASDC(TSDLY, TSDLT)          #value_x=어제자 데이터, value_y=오늘자 데이터
                BNChartDataList = TDCD(SBNDL, 'bannerNC')
                if not BNT :
                    BNChartDataExcept = [{'name': '-', 'value': '-'}]
                    BNChartDataList = BNChartDataExcept * 8

                # worldmap data
                WMAC = WDDFNC(Achart)
                WMCDL = [WMAC]


                #GPU 서버 수량
                GpuServerData = PDPI('statistics', 'today', 'gpu')
                tValue = int(GpuServerData[0][1])
                yValue = int(GpuServerData[1][1])
                roc = tValue - yValue
                GpuServerDataList = {"value" : tValue, 'roc': roc}

                #서버 최다 연결 IP
                connectIpDataList = []
                connectIpData = PDPI('statistics', 'today', 'ip')
                for i in range(len(connectIpData)):
                    if connectIpData[i][0].startswith('::'):
                        break
                    else:
                        split = connectIpData[i][0].split(':')
                        ip = split[0]
                        host = split[1]
                        connectIpDataList.append({'ip': ip, 'host': host, 'count': connectIpData[i][1]})
                if not connectIpData:
                    connectIpDataExcept = [{'ip': '-', 'host': '-', 'count': '-' }]
                    connectIpDataList = connectIpDataExcept * 3

                #세션 최다 연결 서버
                connectServerDataList = []
                connectServerData = PDPI('statistics_list', 'today', 'server')
                for i in range(len(connectServerData)):
                    connectServerDataList.append({'ip': connectServerData[i][0], 'name': connectServerData[i][1], 'count': connectServerData[i][2]})
                if not connectServerData:
                    connectServerDataExcept = [{'ip': '-', 'name': '-', 'count': '-' }]
                    connectServerDataList = connectServerDataExcept * 3
                #게이지 차트 사용량 더보기
                #메모리 부분
                memoryMoreDataList = []
                memoryMore = PDPI('statistics_list', 'today', 'memoryMore')
                for i in range(len(memoryMore)):
                    if memoryMore[i][0] != 'unconfirmed' and not memoryMore[i][2].startswith('[current') and not memoryMore[i][3].startswith('[current') and memoryMore[i][4] != 'unconfirmed':
                        count = math.trunc(float(memoryMore[i][4]))
                        memoryMoreDataList.append({"ip": memoryMore[i][0], "name": memoryMore[i][1], "use": memoryMore[i][2], "total": memoryMore[i][3], "usage": count})


                USCDL = {"DiskChartDataList": DiskChartDataList, "CpuChartDataList": CpuChartDataList, "MemoryChartDataList": MemoryChartDataList}
                ODDLC = os_donutChartData
                OCPO = os_chartPartOne
                OCPT = os_chartPartTwo
                SBDL = server_BChartDataList
                SLCD = server_LChartDataList
                DDLC = service_donutChartData
                UCDL = USCDL
                ACDL = alarmDataList
                VCDL = vendorChartList
                ADDLC = alarm_donutChartDataList
                BNDL = BNChartDataList
                GSDL = GpuServerDataList
                CIDL = connectIpDataList
                CSDL = connectServerDataList
                MMDL = []

            elif core == 'Zabbix':
                print()
        elif ProjectType == 'Service':
            print()
    if Customer == 'NC':
        RD = {
            "service_donutChartData": DDLC,
            "usageChartDataList": UCDL,
            "server_BChartDataList": SBDL,
            "server_LChartDataList": SLCD,
            "alamCaseDataList": ACDL,
            "os_donutChartData": ODDLC,
            "os_chartPartOne": OCPO,
            "os_chartPartTwo": OCPT,
            "vendorChartList": VCDL,
            "alarm_donutChartData": ADDLC,
            "bannerDataList":BNDL,
            "WorldMapDataList": WMCDL,
            "GpuServerDataList": GSDL,
            "connectIpDataList": CIDL,
            "connectServerDataList": CSDL,
            "memoryMoreDataList": MMDL
        }
    else:
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
    if Param == 'SWL' :
        SDL = HYDPI('SWL', data)
        RD = {
            'item' : SDL
        }
    if Param == 'SWV' :
        SDL = HYDPI('swv_detail', data)
        CNT = HYDPI('count', data)
        RD = {
            'item' : SDL,
            'count' : CNT
        }
    return RD
    # sensorData_hyd = IAPI(SK['dataList'], 'Sensor_hyd')



