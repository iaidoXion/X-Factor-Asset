from pprint import pprint

import requests
from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from web.model.dashboard_function import DashboardData
from web.model.dashboard_function import AssetData
from common.menu import MenuSetting
import json
menuListDB = MenuSetting()

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
Customer = SETTING['PROJECT']['CUSTOMER']
WorldUse = SETTING['PROJECT']['MAP']['World']
KoreaUse = SETTING['PROJECT']['MAP']['Korea']
AreaUse = SETTING['PROJECT']['MAP']['Area']['use']
AreaType = SETTING['PROJECT']['MAP']['Area']['type']
def index(request) :
    returnData = {'menuList': menuListDB}
    return render(request, 'web/index.html', returnData)

def dashboard(request):
    res_data={}
    if not 'sessionid' in request.session :
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else :
        DCDL = DashboardData()
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
        chartData = {'barChartDataList': barChartData, 'minidonutData' : minidonutData ,'lineChartDataList' : lineChartData, 'pieChartDataList': pieChartData, 'bannerDataList': bannerData, 'alarmDataList': alarmData, 'AssociationDataList' : AssociationData, 'TotalTopDataList': TotalTopData, 'TotalDataList': TotalData, 'WorldMapDataList': WorldMapData, 'donutChartDataList' : donutChartData}
        returnData = {'menuList': menuListDB, 'chartData' : chartData, 'Customer' : Customer, 'MapUse' : MapUse}
        if Customer == 'NC':
            dashboardType = 'web/dashboard_NC_banner.html'
        return render(request, dashboardType, returnData)



def assetweb(request):
    res_data={}
    if not 'sessionid' in request.session :
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else :
        Data = AssetData('Count', '')
        list = Data['item']
        page = request.GET.get('page', '1')
        count_menu = request.GET.get('menu')
        count = 10
        if count_menu :
            if count_menu == '10' :
                count = 10
            elif count_menu == '20' :
                count = 20
            else :
                count = 30
        paginator = Paginator(list, count)
        page_obj = paginator.get_page(page)
        start = page_obj.start_index()
        end = page_obj.end_index()
        total = len(Data['item'])

        returnData = {'menuList': menuListDB, 'data': page_obj, 'start': start, 'end': end, 'total': total, 'count': count}
        return render(request, 'web/asset.html', returnData)

def assetDetailweb(request):
    swv=request.GET.get('swv')
    print(swv)
    Data = AssetData('SWV', swv)

    list = Data['item']
    count_menu = request.GET.get('menu')
    page = request.GET.get('page', '1')
    count = 10
    if count_menu:
        if count_menu == '10':
            count = 10
        elif count_menu == '20':
            count = 20
        else:
            count = 30
    paginator = Paginator(list, count)
    page_obj = paginator.get_page(page)
    start = page_obj.start_index()
    end = page_obj.end_index()
    total = len(list)
    returnData = { 'menuList': menuListDB, 'data' : page_obj, 'start': start, 'end': end, 'total': total, 'count': count, 'swv': swv}

    return render(request, 'web/asset_detail.html', returnData)

def report(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report.html', returnData)

def reportdaily(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_daily.html', returnData)

def reportmonthly(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_monthly.html', returnData)

def reportannual(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_annual.html', returnData)

def ncBanner(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/dashboard_NC_banner.html', returnData)

def customizing(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/customizing.html', returnData)

############################ 팝업 ############################################
def osVersion_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/osVersion_moreInfo.html', returnData)

def serverBandBy_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/serverBandBy_moreInfo.html', returnData)

def runningService_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/runningService_moreInfo.html', returnData)

def memoryCpuDisk_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/memoryCpuDisk_moreInfo.html', returnData)

def physicalServer_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/physicalServer_moreInfo.html', returnData)

def gpuServer_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/gpuServer_moreInfo.html', returnData)