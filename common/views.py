import requests
from django.shortcuts import render, redirect
import hashlib
import psycopg2
import json

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
DataLoadingType = SETTING['MODULE']['DataLoadingType']
DBHost = SETTING['DB']['DBHost']
DBPort = SETTING['DB']['DBPort']
DBName = SETTING['DB']['DBName']
DBUser = SETTING['DB']['DBUser']
DBPwd = SETTING['DB']['DBPwd']
UserTNM = SETTING['DB']['UserTNM']
Login_Method = SETTING['PROJECT']['LOGIN']
apiUrl = SETTING['API']['apiUrl']
SesstionKeyPath = SETTING['API']['PATH']['SesstionKey']


# hi

def signup(request):
    if request.method == "GET":
        return render(request, 'common/signup.html')

    elif request.method == "POST":
        user_id = request.POST.get('user_id')
        user_pw = request.POST.get('user_pw')
        re_user_pw = request.POST.get('re_user_pw')
        user_name = request.POST.get('user_name')
        user_phone = request.POST.get('user_phone')
        user_email = request.POST.get('user_email')
        user_dep = request.POST.get('user_dep')
        user_team = request.POST.get('user_team')
        user_rank = request.POST.get('user_rank')
        customCheck1 = request.POST.get('customCheck1')
        res_data = {}

        RS = createUsers(user_id,user_pw,user_name,user_phone,user_email,user_dep,user_team,user_rank)
        if RS == "1" :
            res_data['error'] = "회원가입에 성공하였습니다."
            return render(request, 'common/login.html', res_data)
        else :
            res_data['error'] = "아이디가 존재합니다."
            res_data['user_name'] = user_name
            res_data['user_phone'] = user_phone
            res_data['user_email'] = user_email
            res_data['user_dep'] = user_dep
            res_data['user_team'] = user_team
            res_data['user_rank'] = user_rank
            return render(request, 'common/signup.html', res_data)

def login(request):
    if Login_Method == "WEB":
        if request.method == 'GET':
            return render(request, 'common/login.html')

        # POST 방식 요청 -> 사용자가 보내는 데이터와 데이터베이스의 정보 일치여부 확인
        elif request.method == 'POST':
            user_id = request.POST.get('user_id', None)
            user_pw = request.POST.get('user_pw', None)

            # 응답 데이터
            res_data = {}

            # 모든 필드를 채우지 않았을 경우
            if not (user_id and user_pw):
                res_data['error'] = '아이디 또는 비밀번호를 입력해 주세요.'
                return render(request, 'common/login.html', res_data)
            # 모든 필드를 채웠을 경우
            else:
                RS = selectUsers(user_id, user_pw)
                if RS == None:
                    res_data['error'] = '아이디 또는 비밀번호가 일치하지 않습니다'
                    return render(request, 'common/login.html', res_data)

                else:
                    request.session['sessionid']=RS[1]
                    request.session['sessionname'] = RS[3]
                    request.session['sessionemail']=RS[5]
                    return redirect('../dashboard')
    elif Login_Method == "Tanium":
        if request.method == 'GET':
            returnData = {'Login_Method': Login_Method}
            return render(request, 'common/login.html', returnData)

        elif request.method == 'POST':

            user_id = request.POST.get('user_id', None)
            user_pw = request.POST.get('user_pw', None)

            # 응답 데이터
            res_data = {}

            # 모든 필드를 채우지 않았을 경우
            if not (user_id and user_pw):
                res_data['error'] = '아이디 또는 비밀번호를 입력해 주세요.'
                return render(request, 'common/login.html', res_data)
            # 모든 필드를 채웠을 경우
            else:
                TRS = taniumUsers(user_id, user_pw)
                if TRS == None:
                    res_data['error'] = '아이디 또는 비밀번호가 일치하지 않습니다'
                    return render(request, 'common/login.html', res_data)
                else:
                    request.session['sessionid']=user_id
                    return redirect('../dashboard')



def updateform(request):
    try :
        if request.method == "GET":
            #print(request.session.sessionid)
            return render(request, 'common/updateform.html')

        elif request.method == "POST":
            user_id = request.POST.get('user_id')
            user_pw = request.POST.get('user_pw')
            hashpassword = hashlib.sha256(user_pw.encode()).hexdigest()
            Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
            Cur = Conn.cursor()

            query ="""
                        select
                            *
                        from
                            """ + UserTNM + """
                        where
                            user_id = '""" + user_id + """'
                        and
                            user_pw = '""" + hashpassword + """'
    
                    """
            Cur.execute(query)
            RS = Cur.fetchall()
            res_data = {}
            if RS[0] != None :
                res_data['user_id'] = RS[0][1]
                res_data['user_name'] = RS[0][3]
                res_data['user_phone'] = RS[0][4]
                res_data['user_email'] = RS[0][5]
                res_data['user_dep'] = RS[0][6]
                res_data['user_team'] = RS[0][7]
                res_data['user_rank'] = RS[0][8]
                res_data['user_auth'] = RS[0][9]
                #print(res_data)
                return render(request, 'common/update.html', res_data)
    except:
            res_data['error'] = '비밀번호를 다시한번 확인 해 주세요.'
            return render(request, 'common/updateform.html', res_data)

def update(request):
    if request.method == "GET":
        #404 에러페이지 넣을것
        return render(request, '')

    elif request.method == "POST":
        user_id = request.POST.get('user_id')
        user_pw = request.POST.get('user_pw')
        re_user_pw = request.POST.get('re_user_pw')
        user_name = request.POST.get('user_name')
        user_phone = request.POST.get('user_phone')
        user_email = request.POST.get('user_email')
        user_dep = request.POST.get('user_dep')
        user_team = request.POST.get('user_team')
        user_rank = request.POST.get('user_rank')
        res_data = {}
        if not (user_id and user_pw and user_name and re_user_pw and user_email and user_phone and user_dep  and user_rank):
            res_data['user_id'] = user_id
            res_data['user_name'] = user_name
            res_data['user_phone'] = user_phone
            res_data['user_email'] = user_email
            res_data['user_dep'] = user_dep
            res_data['user_team'] = user_team
            res_data['user_rank'] = user_rank
            res_data['error'] = "모든 값을 입력해야 합니다."
            return render(request, 'common/update.html', res_data)
        if user_pw != re_user_pw:
            res_data['user_id'] = user_id
            res_data['user_name'] = user_name
            res_data['user_phone'] = user_phone
            res_data['user_email'] = user_email
            res_data['user_dep'] = user_dep
            res_data['user_team'] = user_team
            res_data['user_rank'] = user_rank
            res_data['error'] = '비밀번호가 다릅니다.'
            return render(request, 'common/update.html', res_data)
        else:
            RS = updateUsers(user_id,user_pw,user_name,user_phone,user_email,user_dep,user_team,user_rank)
            if RS == "1" :
                request.session['sessionname'] = user_name
                request.session['sessionemail'] = user_email
                return redirect('../dashboard')
            else :
                res_data['error'] = '회원정보 변경이 실패했습니다.'
                return render(request, 'common/update.html', res_data)

def logout(request):
    if Login_Method == "WEB":
        if 'sessionid' in request.session :
            del (request.session['sessionid'])
            del (request.session['sessionname'])
            del(request.session['sessionemail'])
            return render(request, 'common/login.html')
        else :
            return render(request, 'common/login.html')
    elif Login_Method == "Tanium":
        if request.method == 'GET':
            returnData = {'Login_Method': Login_Method}
            return render(request, 'common/login.html', returnData)
        if 'sessionid' in request.session :
            del (request.session['sessionid'])
            return render(request, 'common/login.html')
        else :
            return render(request, 'common/login.html')

def selectUsers(user_id, user_pw):
    try:
        hashpassword = hashlib.sha256(user_pw.encode()).hexdigest()
        #print(hashpassword)

        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()

        query = """
            select 
                *
            from
                """ + UserTNM + """
            where
                user_id = '""" + user_id + """'
            and
                user_pw = '""" + hashpassword + """'   

            """

        Cur.execute(query)
        RS = Cur.fetchone()
        #print(RS)
        return RS
    except:
        print(UserTNM + ' Table connection(Select) Failure')


def createUsers(user_id,user_pw,user_name,user_phone,user_email,user_dep,user_team,user_rank):
    try:
        hashpassword = hashlib.sha256(user_pw.encode()).hexdigest()
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        query =""" 
        INSERT INTO 
            web_user 
            (user_num,user_id,user_pw,user_name,user_phone,user_email,user_dep,user_team,user_rank) 
        VALUES  
            (nextval('web_user_seq'),
                '""" + user_id + """',
                '""" + hashpassword + """' ,
                '""" + user_name + """',
                '""" + user_phone + """',
                '""" + user_email + """',
                '""" + user_dep + """',
                '""" + user_team + """',
                '""" + user_rank + """' 
                );
        """
        Cur.execute(query)
        Conn.commit()
        Conn.close()
        a = "1"
        return a
    except:
        print(UserTNM + ' Table connection(Select) Failure')
        a = "0"
        return a


def updateUsers(user_id,user_pw,user_name,user_phone,user_email,user_dep,user_team,user_rank):
    try:
        hashpassword = hashlib.sha256(user_pw.encode()).hexdigest()
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        query = """ 
        UPDATE
            web_user 
        SET
            user_pw= '""" + hashpassword + """',
            user_name= '""" + user_name + """',
            user_phone= '""" + user_phone + """',
            user_email= '""" + user_email + """',
            user_dep= '""" + user_dep + """',
            user_team= '""" + user_team + """',
            user_rank=  '""" + user_rank + """'
        WHERE
            user_id = '""" + user_id + """';
        """
        #print(query)
        Cur.execute(query)
        Conn.commit()
        Conn.close()
        a = "1"
        return a
    except:
        print(UserTNM + ' Table connection(Update) Failure')
        a = "0"
        return a


def taniumUsers(user_id, user_pw):
    try:
        path = SesstionKeyPath
        urls = apiUrl+path
        headers = '{"username" : "'+user_id+'","domain":"",  "password":"'+user_pw+'"}'
        response = requests.post(urls, data=headers, verify=False)
        code= response.status_code
        if code==200:
            a = response.json()
            sessionKey = a['data']['session']
            returnList = sessionKey
            return returnList
        elif code==403 :
            print()

    except ConnectionError as e:
        print(e)
