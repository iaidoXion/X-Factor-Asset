from django.shortcuts import render
from web.model.dashboard_function import DashboardData
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
        return render(request, 'web/dashboard.html', returnData)



def assetweb(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/asset.html', returnData)

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
