import logging
from common.Transform.Dataframe import alarmCase as ACDF
from common.Transform.Dataframe import usage as USDF
from common.Transform.Dataframe import worldMap as WDDF
from common.Transform.Dataframe import worldMapNC as WDDFNC
from common.Transform.Dataframe import radar as RDDF
from common.Transform.Dataframe import chart as CTDF
from common.Input.DB.Tanium.Postgresql.Dashboard import plug_in as PDPI
from web.model.Input.API import hyd_plug_in as HYAPI
from web.model.Input.DB import hyd_plug_in as HYDPI
from web.model.Transform.Dashboard import banner as TDBA, line_chart as TDLC, chart_data as TDCD
from web.model.Analysis.Statistics.Dashboard import calculation as ASDC
from collections import Counter
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
    logger = logging.getLogger(__name__)
    if Customer == 'NC' or Customer == 'Xfactor' :
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
                try:
                    SBCQ = PDPI('statistics', 'today', 'group_server_count')
                    #print(SBCQ)
                    server_BChartDataList = CTDF(SBCQ, 'bar')
                    if not SBCQ:
                        server_BChartDataList = [{"name": "-", "value": 0}]
                    logger.info('dashboard_function.py - server_BChartDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - server_BChartDataList')

                # 실행 중인 서비스 통계 차트
                Rchart = PDPI('statistics', 'today', 'running')
                try:
                    for i in range(len(Rchart)):
                        service_donutChartData.append({"name": Rchart[i][0], "value": int(Rchart[i][1])})
                    if not service_donutChartData:
                        service_donutChartData = [{"name": "-", "value": 0}]
                    logger.info('dashboard_function.py - service_donutChartData - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - service_donutChartData')

                #디스크, cpu, ram 95%, 75%, 60% 사용량 차트
                try:
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
                        if case == '디스크' and next((index for (index, data) in enumerate(chart) if data['name'] == '99Risk'), None) == None:
                            chart.append({"name": "99Risk", "value": 0})
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
                    logger.info('dashboard_function.py - alarmData - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - alarmData')

                # NC 서버 총 수량 추이 그래프
                try:
                    SCLCQ = PDPI('statistics', 'monthly', 'asset')
                    server_LChartDataList = TDCD(SCLCQ, 'Monthly_Line')
                    logger.info('dashboard_function.py - server_LChartDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - server_LChartDataList')

                # OS 버전별 서버 수 차트
                try:
                    Ochart = PDPI('statistics', 'today', 'os_version')
                    try:
                        for i in range(len(Ochart)):
                            os_donutChartData.append({"name": Ochart[i][0], "value": int(Ochart[i][1])})
                        OSNum = 4
                        result = [os_donutChartData[i * OSNum:(i + 1) * OSNum] for i in range((len(os_donutChartData) + OSNum - 1) // OSNum)]
                        if len(Ochart) <= 4:
                            os_chartPartOne = result[0]
                            os_chartPartTwo = []
                        else:
                            os_chartPartOne = result[0]
                            os_chartPartTwo = result[1]
                    except:
                        os_chartPartOne = [{"name": "-", "value": 0}]
                        os_chartPartTwo = [{"name": "-", "value": 0}]
                    logger.info('dashboard_function.py - os_donutChartData - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - os_donutChartData')

                #물리서버 벤더별 수량 차트
                try:
                    venChart = PDPI('statistics', 'today', 'vendor')
                    for i in range(len(venChart)):
                        vendorChartList.append({"name": venChart[i][0], "value": venChart[i][1]})
                    if not venChart :
                        vendorChartList = [{'name': '-', 'value': '-'}]
                    logger.info('dashboard_function.py - vendorChartList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - vendorChartList')


                # IP 대역별 총 알람 수 차트
                try:
                    Achart = PDPI('statistics', 'today', 'group_alarm')
                    for i in range(len(Achart)):
                        alarm_donutChartData.append({Achart[i][0]: int(Achart[i][1])})
                    alarmCounter = Counter()
                    for i in alarm_donutChartData:
                        alarmCounter.update(i)
                    #alarm_donutChartDataList = [{key:value} for key, value in alarmCounter.most_common()]
                    alarm_donutChartDataList = [{'key':key,'value':value} for key, value in alarmCounter.most_common()]
                    logger.info('dashboard_function.py - alarm_donutChartData - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - alarm_donutChartData')
                
                # alarm_donutChartDataList = [{'key': '192.168.0.0/21', 'value': 4}, {'key': '192.168.0.0/22', 'value': 4}, {'key': '192.168.0.0/23', 'value': 4},{'key': '192.168.0.0/24', 'value': 4},{'key': '192.168.0.0/25', 'value': 4}]*2

                # 배너 슬라이드
                try:
                    BNY = PDPI('statistics', 'yesterday', 'bannerNC')   #daily statistics에서 날짜가 어제인 data호출(running service, session ip, group 제외)
                    TSDLY = TDBA(BNY, 'yetodayNC')
                    BNT = PDPI('statistics', 'today', 'bannerNC')
                    TSDLT = TDBA(BNT, 'yetodayNC')
                    SBNDL = ASDC(TSDLY, TSDLT)          #value_x=어제자 데이터, value_y=오늘자 데이터
                    BNChartDataList = TDCD(SBNDL, 'bannerNC')
                    if not BNT :
                        BNChartDataExcept = [{'name': '-', 'value': '-'}]
                        BNChartDataList = BNChartDataExcept * 8
                    logger.info('dashboard_function.py - BNChartDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - BNChartDataList')

                # worldmap data
                try:
                    WMAC = WDDFNC(Achart)
                    WMCDL = [WMAC]
                    logger.info('dashboard_function.py - WMCDL(World Map Chart Data List) - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - WMCDL(World Map Chart Data List)')

                #GPU 서버 수량
                try:
                    GpuServerData = PDPI('statistics', 'today', 'gpu')
                    try:
                        tValue = int(GpuServerData[0][1])
                        yValue = int(GpuServerData[1][1])
                        roc = tValue - yValue
                        GpuServerDataList = {"value" : tValue, 'roc': roc}
                    except :
                        if not tValue :
                            GpuServerDataList = {"value": '-', 'roc': '-'}
                        else :
                            GpuServerDataList = {"value": tValue, 'roc': tValue}

                    logger.info('dashboard_function.py - GpuServerDataList - Success')

                except:
                    GpuServerDataList = []
                    if len(GpuServerDataList) == 0:
                        GpuServerDataList = {"value": '-', 'roc': '-'}
                    else:
                        logger.warning('dashboard_function.py - Error Occurred')
                        logger.warning('Error - GpuServerDataList')

                #서버 최다 연결 IP
                try:
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
                    logger.info('dashboard_function.py - connectIpDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - connectIpDataList')

                #세션 최다 연결 서버
                try:
                    connectServerDataList = []
                    connectServerData = PDPI('statistics_list', 'today', 'server')
                    for i in range(len(connectServerData)):
                        connectServerDataList.append({'ip': connectServerData[i][0], 'name': connectServerData[i][1], 'count': connectServerData[i][2]})
                    if not connectServerData:
                        connectServerDataExcept = [{'ip': '-', 'name': '-', 'count': '-' }]
                        connectServerDataList = connectServerDataExcept * 3
                    logger.info('dashboard_function.py - connectServerDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - connectServerDataList')

                #게이지 차트 사용량 더보기
                #메모리 부분
                try:
                    memoryMoreDataList = []
                    memoryMore = PDPI('statistics_list', 'today', 'memoryMore')
                    for i in range(len(memoryMore)):
                        if memoryMore[i][0] != 'unconfirmed' and not memoryMore[i][2].startswith('[current') and not memoryMore[i][3].startswith('[current') and memoryMore[i][4] != 'unconfirmed':
                            count = math.trunc(float(memoryMore[i][4]))
                            memoryMoreDataList.append({"ip": memoryMore[i][0], "name": memoryMore[i][1], "use": memoryMore[i][2], "total": memoryMore[i][3], "usage": count})
                    logger.info('dashboard_function.py - memoryMoreDataList - Success')
                except:
                    logger.warning('dashboard_function.py - Error Occurred')
                    logger.warning('Error - memoryMoreDataList')

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
            "bannerDataList": BNDL,
            "WorldMapDataList": WMCDL,
            "GpuServerDataList": GSDL,
            "connectIpDataList": CIDL,
            "connectServerDataList": CSDL,
            "memoryMoreDataList": MMDL
        }
    else :
        if ProjectType == 'System':
            if core == 'Tanium':

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



