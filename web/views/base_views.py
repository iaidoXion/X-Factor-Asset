from django.shortcuts import render
from django.http import JsonResponse
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
            #dashboardType = 'web/dashboard_NC.html'
            dashboardType = 'web/dashboard_NC_banner.html'
        return render(request, dashboardType, returnData)



def assetweb(request):
    res_data={}
    if not 'sessionid' in request.session :
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else :
        Data = AssetData('Count', '')
        returnData = { 'menuList': menuListDB, 'data' : Data}
        return render(request, 'web/asset.html', returnData)

def assetDetailweb(request):
    swv=request.GET.get('swv')
    Data = AssetData('SWV', swv)
    returnData = { 'menuList': menuListDB , 'data' : Data}
    return render(request, 'web/asset_detail.html', returnData)

def report(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/report.html', returnData)

def reportdaily(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/report_daily.html', returnData)

def reportmonthly(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/report_monthly.html', returnData)

def reportannual(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/report_annual.html', returnData)

def ncBanner(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/dashboard_NC_banner.html', returnData)