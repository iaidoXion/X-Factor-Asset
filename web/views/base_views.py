from django.shortcuts import render
from web.model.dashboard_function import DashboardData
from common.menu import MenuSetting
import json
menuListDB = MenuSetting()

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
Customer = SETTING['PROJECT']['CUSTOMER']

def index(request) :
    returnData = {'menuList': menuListDB}
    return render(request, 'web/index.html', returnData)

def dashboard(request):
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
    chartData = {'barChartDataList': barChartData, 'minidonutData' : minidonutData ,'lineChartDataList' : lineChartData, 'pieChartDataList': pieChartData, 'bannerDataList': bannerData, 'alarmDataList': alarmData, 'AssociationDataList' : AssociationData, 'TotalTopDataList': TotalTopData, 'TotalDataList': TotalData, 'WorldMapDataList': WorldMapData, 'donutChartDataList' : donutChartData}
    returnData = {'menuList': menuListDB, 'chartData' : chartData, 'Customer' : Customer}
    return render(request, 'web/dashboard.html', returnData)


def assetweb(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/asset.html', returnData)


