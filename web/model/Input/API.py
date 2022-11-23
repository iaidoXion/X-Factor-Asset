import requests
import json
import time
from ast import literal_eval

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
apiUrl = SETTING['API']['apiUrl']
ContentType = SETTING['API']['ContentType']
SesstionKeyPath = SETTING['API']['PATH']['SesstionKey']
SensorAPIPath = SETTING['API']['PATH']['Sensor']
SensorID = SETTING['API']['SensorID']
Common_SensorID = SETTING['API']['SensorID']['common']
HYD_SensorID = SETTING['API']['SensorID']['weakness']
TNID = SETTING['API']['username']
TNPWD = SETTING['API']['password']

def plug_in(SK, APITYPE):
    try:
        if APITYPE == 'Auth' :
            path = SesstionKeyPath
            urls = apiUrl + path
            headers = '{"username" : "' + TNID + '","domain":"",  "password":"' + TNPWD + '"}'
            response = requests.post(urls, data=headers, verify=False)
            resCode = response.status_code
            returnData = response.json()['data']['session']

        if APITYPE == 'Sensor' :
            path = SensorAPIPath + Common_SensorID
            urls = apiUrl + path
            headers = {'session': SK, 'Content-Type': ContentType}
            response = requests.request("GET", urls, headers=headers, verify=False)
            resCode = response.status_code
            responseText = response.text

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
                        DL.append(responseDataJson[i]['data'][k])
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
        
def hyd_plug_in(SK, APITYPE, data) :
    if APITYPE == 'Auth' :
        path = SesstionKeyPath
        urls = apiUrl + path
        headers = '{"username" : "' + TNID + '","domain":"",  "password":"' + TNPWD + '"}'
        response = requests.post(urls, data=headers, verify=False)
        resCode = response.status_code
        returnData = response.json()['data']['session']
    if APITYPE == 'Count' :
        path = '/api/v2/result_data/saved_question/3450'
        urls = apiUrl + path
        headers = {'session': SK, 'Content-Type': ContentType}
        response = requests.request("GET", urls, headers=headers, verify=False)
        resCode = response.status_code
        list = []
        lst = [i for i in range(1,20+1)]
        dict = {}
        for i in response.json()['data']['result_sets'][0]['rows'] :
            if 'Good' in i['data'][0][0]['text'] :
                continue
            elif 'TSE-Error' in i['data'][0][0]['text'] :
                continue
            dict = literal_eval(i['data'][0][0]['text'])
            if int(dict['SWV'][4:]) in lst :
                lst.remove(int(dict['SWV'][4:]))
            dict['value'] = i['data'][1][0]['text']
            del dict['status']
            list.append(dict)
        for i in lst :
            if len(str(i)) == 1 :
                i = str(0) + str(i)
            dict = {}
            dict['SWV'] = 'SW1-' + str(i)
            dict['value'] = 0
            list.append(dict)
        
        list = sorted(list, key= lambda x: x['SWV'])
        returnData = list
    
    if APITYPE == 'SWV' :
        
        query_text = ""
        question_list = ['Tanium Client IP Address', 'Computer Name', 'OS Platform', 'Last Reboot', 'Chassis Type']
        for i in range(len(question_list)) :
            query_text = query_text + " and " + question_list[i]
        query_text = "Get WEAK_SW1_WINDOW matches \"{'SWV': '" + data + "', 'status': 'Weak'}\"" + query_text +" from all machines with OS Platform contains Window"
        
        path = '/api/v2/questions'
        urls = apiUrl + path
        headers = {'session': SK, 'Content-Type': ContentType, 'Accept': 'text/plain'}
        body = {"query_text" : query_text}
        response = requests.post(urls, headers=headers, json=body, verify=False)
        resCode = response.status_code
        question_ID = response.json()['data']['id']
        
        if resCode == 200 :
            time.sleep(5)
            path = '/api/v2/result_data/question/' + str(question_ID)
            urls = apiUrl + path
            headers = {'session': SK, 'Content-Type': ContentType}
            response = requests.request("GET", urls, headers=headers, verify=False)
            resCode = response.status_code
            list = []
            dict_list = []
            
            for j in response.json()['data']['result_sets'][0]['columns'] : 
                dict_list.append(j['name'].replace(" ", ""))
            for i in response.json()['data']['result_sets'][0]['rows'] :
                if i['data'][0][0]['text'] == '[no results]' or 'TSE' in i['data'][0][0]['text']:
                    continue
                dict = {}
                dict['cid'] = i['cid']
                count = 0
                for j in dict_list :
                    if len(i['data'][count]) > 1 :
                        count_list = []
                        for k in i['data'][count] :
                            count_list.append(k['text'])
                        dict[j] = count_list
                    else : 
                        dict[j] = i['data'][count][0]['text']
                    count = count + 1
                list.append(dict)
            if len(list) == 0 :
                returnData = ['취약점이 없습니다.']
            returnData = list
        else :
            returnData = "Fail"      
    
    if APITYPE == 'CPID_API' :
        ComputerID =data
        query_text = "Get WEAK_SW1_WINDOW and Computer ID from all machines with Computer ID contains \"" + ComputerID + "\""
        
        path = '/api/v2/questions'
        urls = apiUrl + path
        headers = {'session': SK, 'Content-Type': ContentType, 'Accept': 'text/plain'}
        body = {"query_text" : query_text}
        response = requests.post(urls, headers=headers, json=body, verify=False)
        resCode = response.status_code
        question_ID = response.json()['data']['id']
        
        if resCode == 200 :
            time.sleep(4)
            path = '/api/v2/result_data/question/' + str(question_ID)
            urls = apiUrl + path
            headers = {'session': SK, 'Content-Type': ContentType}
            response = requests.request("GET", urls, headers=headers, verify=False)
            resCode = response.status_code
            list = []
            dict_list = []
            if len(response.json()['data']['result_sets'][0]['rows']) == 0:
                returnData = "Fail"
            else :
                for i in response.json()['data']['result_sets'][0]['rows'][0]['data'][0] : 

                    dict = literal_eval(i['text'])
                    list.append(dict)
            returnData = list
        else :
            returnData = "Fail"  
    return returnData


