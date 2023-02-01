from datetime import timedelta, datetime
from pprint import pprint

import requests
from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from common.Input.DB.Tanium.Postgresql.Dashboard import plug_in as PDPI
from web.model.dashboard_function import DashboardData
from web.model.dashboard_function import AssetData
from django.views.decorators.csrf import csrf_exempt
from common.menu import MenuSetting
import json
import math

menuListDB = MenuSetting()

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
Customer = SETTING['PROJECT']['CUSTOMER']
WorldUse = SETTING['PROJECT']['MAP']['World']
KoreaUse = SETTING['PROJECT']['MAP']['Korea']
AreaUse = SETTING['PROJECT']['MAP']['Area']['use']
AreaType = SETTING['PROJECT']['MAP']['Area']['type']


def index(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/index.html', returnData)


def dashboard(request):
    DCDL = DashboardData()
    res_data = {}
    if not 'sessionid' in request.session:
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else:
        if Customer == 'NC':
            dashboardType = 'web/dashboard_NC_banner.html'
            MapUse = {"WorldUse": WorldUse, "KoreaUse": KoreaUse, "AreaUse": AreaUse, "AreaType": AreaType}

            # NC버전
            server_barChartData = DCDL["server_BChartDataList"]
            server_LChartDataList = DCDL["server_LChartDataList"]
            DiskChartDataList = DCDL["usageChartDataList"]["DiskChartDataList"]
            service_donutChartData = DCDL["service_donutChartData"]
            CpuChartDataList = DCDL["usageChartDataList"]["CpuChartDataList"]
            MemoryChartDataList = DCDL["usageChartDataList"]["MemoryChartDataList"]
            alamCaseDataList = DCDL["alamCaseDataList"]
            os_donutChartData = DCDL["os_donutChartData"]
            os_chartPartOne = DCDL["os_chartPartOne"]
            os_chartPartTwo = DCDL["os_chartPartTwo"]
            vendorChartList = DCDL["vendorChartList"]
            alarm_donutChartData = DCDL["alarm_donutChartData"]
            bannerData = DCDL["bannerDataList"]
            WorldMapData = DCDL["WorldMapDataList"]
            GpuServerDataList = DCDL["GpuServerDataList"]
            connectIpDataList = DCDL["connectIpDataList"]
            connectServerDataList = DCDL["connectServerDataList"]
            chartData = {'DiskChartDataList': DiskChartDataList, 'donutChartDataList': service_donutChartData, 'MemoryChartDataList': MemoryChartDataList, 'CpuChartDataList': CpuChartDataList,
                        'os_donutChartData': os_donutChartData, 'server_barChartDataList': server_barChartData, "server_LChartDataList": server_LChartDataList, "alamCaseDataList": alamCaseDataList,
                        "os_chartPartOne": os_chartPartOne, "os_chartPartTwo": os_chartPartTwo, "vendorChartList": vendorChartList, "alarm_donutChartData": alarm_donutChartData,
                        "bannerDataList": bannerData, "WorldMapDataList": WorldMapData,
                        "GpuServerDataList": GpuServerDataList, "connectIpDataList": connectIpDataList, "connectServerDataList": connectServerDataList}

            returnData = {'menuList': menuListDB, 'chartData': chartData, 'Customer': Customer, 'MapUse': MapUse}
        else:
            dashboardType = 'web/dashboard.html'
            barChartData = DCDL["barChartData"]
            lineChartData = DCDL["lineChartData"]
            pieChartData = DCDL["pieChartData"]
            bannerData = DCDL["bannerData"]
            minidonutData = DCDL['MiniDonutChart']
            alarmData = DCDL["alarmListData"]
            AssociationData = DCDL["AssociationDataList"]
            WorldMapData = DCDL["WorldMapDataList"]
            TotalTopData = DCDL['TotalTopDataList']
            TotalData = DCDL["TotalDataList"]
            donutChartData = DCDL["donutChartDataList"]
            MapUse = {"WorldUse": WorldUse, "KoreaUse": KoreaUse, "AreaUse": AreaUse, "AreaType": AreaType}
            chartData = {'barChartDataList': barChartData, 'minidonutData': minidonutData, 'lineChartDataList': lineChartData, 'pieChartDataList': pieChartData, 'bannerDataList': bannerData, 'alarmDataList': alarmData, 'AssociationDataList': AssociationData,
                         'TotalTopDataList': TotalTopData, 'TotalDataList': TotalData, 'WorldMapDataList': WorldMapData, 'donutChartDataList': donutChartData}
            returnData = {'menuList': menuListDB, 'chartData': chartData, 'Customer': Customer, 'MapUse': MapUse}
        return render(request, dashboardType, returnData)


def assetweb(request):
    res_data = {}
    if not 'sessionid' in request.session:
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else:
        Data = AssetData('Count', '')
        returnData = {'menuList': menuListDB, 'data': Data}
        return render(request, 'web/asset.html', returnData)


def assetDetailweb(request):
    swv = request.GET.get('swv')
    Data = AssetData('SWL', swv)
    returnData = {'menuList': menuListDB, 'data': Data}
    return render(request, 'web/asset_detail.html', returnData)


@csrf_exempt
def assetDetailweb_paging(request):
    swv = request.GET.get('swv')
    count = request.GET.get('count')
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [swv, str(length), str(page), str(search)]

    Data = AssetData('SWV', data)
    returnData = {'data': Data,
                  'draw': draw,
                  'recordsTotal': Data['count'],
                  'recordsFiltered': Data['count'],
                  }
    return JsonResponse(returnData)


def report(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/report.html', returnData)


def reportdaily(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/report_daily.html', returnData)


def reportmonthly(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/report_monthly.html', returnData)


def reportannual(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/report_annual.html', returnData)


def ncBanner(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/dashboard_NC_banner.html', returnData)


def customizing(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/customizing.html', returnData)


############################ 팝업 ############################################
def osVersion_moreInfo(request):
    return render(request, 'popup/osVersion_moreInfo.html')
@csrf_exempt
def osVersion_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'osMore', data)
    for i in range(len(SMD)):
        SMD[i]['count'] = str(SMD[i]['count']) + '개'
    SMC = PDPI('statistics', 'osCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def serverBandBy_moreInfo(request):
    return render(request, 'popup/serverBandBy_moreInfo.html')
@csrf_exempt
def serverBandBy_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'serverBandByMore', data)
    for i in range(len(SMD)):
        SMD[i]['count'] = str(SMD[i]['count']) + '개'
    SMC = PDPI('statistics', 'serverBandByCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def runningService_moreInfo(request):
    return render(request, 'popup/runningService_moreInfo.html')
@csrf_exempt
def runningService_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'runningServiceMore', data)
    for i in range(len(SMD)):
        SMD[i]['count'] = str(SMD[i]['count']) + '개'
    SMC = PDPI('statistics', 'runningServiceCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def memory_moreInfo(request):
    # memoryMoreDataList = DCDL["memoryMoreDataList"]
    # chartData = {"memoryMoreDataList": memoryMoreDataList}
    # returnData = {'menuList': menuListDB, "chartData": chartData}
    return render(request, 'popup/memory_moreInfo.html')

@csrf_exempt
def memory_moreInfo_paging(request):

    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'memoryMore', data)
    for i in range(len(SMD)):
        SMD[i]['usage'] = str(SMD[i]['usage']) + '%'
    SMC = PDPI('statistics', 'memoryCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def cpu_moreInfo(request):
    return render(request, 'popup/cpu_moreInfo.html')

@csrf_exempt
def cpu_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'cpuMore', data)
    for i in range(len(SMD)):
        SMD[i]['usage'] = str(SMD[i]['usage']) + '%'
    SMC = PDPI('statistics', 'cpuCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def disk_moreInfo(request):
    return render(request, 'popup/disk_moreInfo.html')
@csrf_exempt
def disk_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'diskMore', data)
    for i in range(len(SMD)):
        SMD[i]['usage'] = str(SMD[i]['usage']) + '%'
    SMC = PDPI('statistics', 'diskCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def physicalServer_moreInfo(request):
    return render(request, 'popup/physicalServer_moreInfo.html')
@csrf_exempt
def physicalServer_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'physicalServerMore', data)
    for i in range(len(SMD)):
        SMD[i]['count'] = str(SMD[i]['count']) + '개'
    SMC = PDPI('statistics', 'physicalServerCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def gpuServer_moreInfo(request):
    return render(request, 'popup/gpuServer_moreInfo.html')
@csrf_exempt
def gpuServer_moreInfo_paging(request):
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'gpuServerMore', data)
    for i in range(len(SMD)):
        model = eval(SMD[i]['model'])
        if type(list(model)[0]) == str:
            SMD[i]['model'] = list(model)[0]
            SMD[i]['count'] = str(list(model)[1]) + '개'
        else:
            SMD[i]['model'] = list(model)[1]
            SMD[i]['count'] = str(list(model)[0]) + '개'

        # model = SMD[i]['model'].replace(',', '').replace('"', '').replace('{', '').replace('}','')[1:]
        # count = SMD[i]['model'].replace(',', '').replace('"', '').replace('{', '').replace('}','')[0]
        # SMD[i] = {"count": count}
    SMC = PDPI('statistics', 'gpuServerCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def alarmCase_moreInfo(request):
    return render(request, 'popup/alarmCase_moreInfo.html')
@csrf_exempt
def alarmCase_moreInfo_paging(request):
    halfHour = (datetime.now() - timedelta(minutes=30)).strftime("%Y-%m-%d %H:%M:%S")
    halfHour = datetime.strptime(halfHour, "%Y-%m-%d %H:%M:%S")
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start / length) + 1
    data = [ str(length), str(page), str(search)]
    SMD = PDPI('statistics', 'alarmCaseMore', data)

    for i in range(len(SMD)):
        if SMD[i]['date'] < halfHour:
            SMD[i]['date'] = 'True'
            if SMD[i]['ramusage'] > 95:
                SMD[i]['ramusage'] = 'True (' + str(SMD[i]['ramusage']) + '%)'
            else:
                SMD[i]['ramusage'] = 'False'

            if SMD[i]['cpuusage'] > 95:
                SMD[i]['cpuusage'] = 'True (' + str(SMD[i]['cpuusage']) + '%)'
            else:
                SMD[i]['cpuusage'] = 'False'

            if SMD[i]['driveusage'] > 95:
                SMD[i]['driveusage'] = 'True (' + str(SMD[i]['driveusage']) + '%)'
            else:
                SMD[i]['driveusage'] = 'False'

        elif SMD[i]['ramusage'] > 95:
            SMD[i]['ramusage'] = 'True (' + str(SMD[i]['ramusage']) + '%)'
            if SMD[i]['cpuusage'] > 95:
                SMD[i]['cpuusage'] = 'True (' + str(SMD[i]['cpuusage']) + '%)'
            else:
                SMD[i]['cpuusage'] = 'False'

            if SMD[i]['driveusage'] > 95:
                SMD[i]['driveusage'] = 'True (' + str(SMD[i]['driveusage']) + '%)'
            else:
                SMD[i]['driveusage'] = 'False'

            SMD[i]['date'] = 'False'

        elif SMD[i]['cpuusage'] > 95:
            SMD[i]['cpuusage'] = 'True (' + str(SMD[i]['cpuusage']) + '%)'
            if SMD[i]['ramusage'] > 95:
                SMD[i]['ramusage'] = 'True (' + str(SMD[i]['ramusage']) + '%)'
            else:
                SMD[i]['ramusage'] = 'False'

            if SMD[i]['driveusage'] > 95:
                SMD[i]['driveusage'] = 'True (' + str(SMD[i]['driveusage']) + '%)'
            else:
                SMD[i]['driveusage'] = 'False'

            SMD[i]['date'] = 'False'

        elif SMD[i]['driveusage'] > 95:
            SMD[i]['driveusage'] = 'True (' + str(SMD[i]['driveusage']) + '%)'
            if SMD[i]['ramusage'] > 95:
                SMD[i]['ramusage'] = 'True (' + str(SMD[i]['ramusage']) + '%)'
            else:
                SMD[i]['ramusage'] = 'False'

            if SMD[i]['cpuusage'] > 95:
                SMD[i]['cpuusage'] = 'True (' + str(SMD[i]['driveusage']) + '%)'
            else:
                SMD[i]['cpuusage'] = 'False'

            SMD[i]['date'] = 'False'

    SMC = PDPI('statistics', 'alarmCaseCount', data)
    RD = {"item": SMD}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

############################ 유저가이드 ############################################
def userGuide_docs_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/documentation_ug.html', returnData)

def specification_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/specification_ug.html', returnData)

def start_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/start_ug.html', returnData)

def dashboard_public_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/dashboard_public_ug.html', returnData)

def dashboard_chart_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/dashboard_chart_ug.html', returnData)

def dashboard_etc_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/dashboard_etc_ug.html', returnData)

def weak_public_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/weak_public_ug.html', returnData)

def weak_windows_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/weak_windows_ug.html', returnData)

def weak_linux_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/weak_linux_ug.html', returnData)

def setting_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/setting_ug.html', returnData)

def report_public_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/report_public_ug.html', returnData)

def report_all_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/report_all_ug.html', returnData)

def technical_support_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/technical_support_ug.html', returnData)

def faq_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/faq_ug.html', returnData)

