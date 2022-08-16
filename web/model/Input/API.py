import requests
import json

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
apiUrl = SETTING['API']['apiUrl']
Authorization = SETTING['API']['Authorization']
ContentType = SETTING['API']['ContentType']
SesstionKeyPath = SETTING['API']['PATH']['SesstionKey']
SensorAPIPath = SETTING['API']['PATH']['Sensor']
SensorID = SETTING['API']['SensorID']
AssetAPIPath = SETTING['API']['PATH']['Asset']

def plug_in(SK, APITYPE):
    try:
        if SK == '' :
            headers = {'Authorization': Authorization}
        else :
            headers = {'session': SK, 'Authorization': Authorization, 'Content-Type': ContentType}

        if APITYPE == 'Auth' :
            path = SesstionKeyPath
        if APITYPE == 'Sensor' :
            path = SensorAPIPath + SensorID
        if APITYPE == 'Asset':
            path = AssetAPIPath

        urls = apiUrl + path
        response = requests.request("GET", urls, headers=headers, verify=False)
        resCode = response.status_code
        responseText = response.text

        if SK == '' :
            returnData = responseText
        else :
            responseTextJson = json.loads(responseText)
            returnData = []
            if APITYPE == 'Sensor' :
                responseDataJson = responseTextJson['data']['result_sets'][0]['rows']
            if APITYPE == 'Asset':
                responseDataJson = responseTextJson['data']

            for i in range(len(responseDataJson)):
                if APITYPE == 'Sensor' :
                    DL = []
                    for k in range(len(responseDataJson[i]['data'])):
                        DL.append(responseDataJson[i]['data'][k][0]['text'])
                    returnData.append(DL)
                if APITYPE == 'Asset':
                    data = responseDataJson[i]
                    if data['id'] and data['computer_name'] and data['computer_id'] and data['os_platform'] and data[
                        'operating_system'] and data['ci_logical_disk'] and data['last_seen_at'] and data[
                        'chassis_type'] and data['ip_address'] and data['ram'] != None:
                        id = data['id']
                        computer_name = data['computer_name']
                        computer_id = data['computer_id']
                        os_platform = data['os_platform']
                        operating_system = data['operating_system']
                        drive_use_size = str(data['ci_logical_disk'][0]['free_space'])
                        last_seen_at = data['last_seen_at']
                        chassis_type = data['chassis_type']
                        ip_address = data['ip_address']
                        ram = data['ram']
                        data = {
                            'id': id,
                            'computer_name': computer_name,
                            'computer_id': computer_id,
                            'os_platform': os_platform,
                            'operating_system': operating_system,
                            'drive_use_size': drive_use_size,
                            'last_seen_at': last_seen_at,
                            'asset_item': chassis_type,
                            'ip_address': ip_address,
                            'ram': ram
                        }
                        returnData.append(data)
        returnList = {'resCode': resCode, 'dataList': returnData}
        return returnList
    except ConnectionError as e:
        print(e)

