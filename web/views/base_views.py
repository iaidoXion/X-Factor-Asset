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

DCDL = DashboardData()

def index(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/index.html', returnData)


def dashboard(request):
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
            GpuServerDataList = DCDL["GpuServerDataList"]
            connectIpDataList = DCDL["connectIpDataList"]
            connectServerDataList = DCDL["connectServerDataList"]
            chartData = {'DiskChartDataList': DiskChartDataList, 'donutChartDataList': service_donutChartData, 'MemoryChartDataList': MemoryChartDataList, 'CpuChartDataList': CpuChartDataList,
                        'os_donutChartData': os_donutChartData, 'server_barChartDataList': server_barChartData, "server_LChartDataList": server_LChartDataList, "alamCaseDataList": alamCaseDataList,
                        "os_chartPartOne": os_chartPartOne, "os_chartPartTwo": os_chartPartTwo, "vendorChartList": vendorChartList, "alarm_donutChartData": alarm_donutChartData,
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
    os_donutChartData = DCDL["os_donutChartData"]
    returnData = {'menuList': menuListDB, 'data': os_donutChartData}
    return render(request, 'popup/osVersion_moreInfo.html', returnData)


def serverBandBy_moreInfo(request):
    server_barChartData = DCDL["server_BChartDataList"]
    returnData = {'menuList': menuListDB, 'data': server_barChartData}
    return render(request, 'popup/serverBandBy_moreInfo.html', returnData)


def runningService_moreInfo(request):
    service_donutChartData = DCDL["service_donutChartData"]
    returnData = {'menuList': menuListDB, 'data': service_donutChartData}
    return render(request, 'popup/runningService_moreInfo.html', returnData)


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
    SMDL = []
    SMD = PDPI('statistics', 'memoryMore', data)
    print(SMD)
    SMC = PDPI('statistics', 'count', data)
    # for i in range(len(SMD)):
    #     if SMD[i][0] != 'unconfirmed' and not SMD[i][2].startswith('[current') and not SMD[i][3].startswith('[current') and SMD[i][4] != 'unconfirmed':
    #         usage = math.trunc(float(SMD[i][4]))
    #         SMDL.append({"index": i, "ip": SMD[i][0], "name": SMD[i][1], "use": SMD[i][2], "total": SMD[i][3], "usage": usage})
    RD = {"item": SMD, "count": len(SMDL)}
    returnData = {'data': RD,
                  'draw': draw,
                  'recordsTotal': SMC,
                  'recordsFiltered': SMC,
                  }
    return JsonResponse(returnData)

def cpu_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/cpu_moreInfo.html', returnData)


def disk_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/disk_moreInfo.html', returnData)


def physicalServer_moreInfo(request):
    vendorChartList = DCDL["vendorChartList"]
    returnData = {'menuList': menuListDB, 'data': vendorChartList}
    return render(request, 'popup/physicalServer_moreInfo.html', returnData)


def gpuServer_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/gpuServer_moreInfo.html', returnData)

def alarmCase_moreInfo(request):
    alamCaseMoreDataList = DCDL['alamCaseMoreDataList']
    returnData = {'menuList': menuListDB, 'data' : alamCaseMoreDataList}
    return render(request, 'popup/alarmCase_moreInfo.html', returnData)


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

def weakness_public_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/weakness_public_ug.html', returnData)

def weakness_windows_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/weakness_windows_ug.html', returnData)

def dashboard_linux_ug(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'documentation/dashboard_linux_ug.html', returnData)

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

