from django.shortcuts import render, redirect
import hashlib
import psycopg2
import json

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
DataLoadingType = SETTING['MODULE']['DataLoadingType']
DBHost = SETTING['DB']['DBHost']
DBName = SETTING['DB']['DBName']
DBUser = SETTING['DB']['DBUser']
DBPwd = SETTING['DB']['DBPwd']
UserTNM = SETTING['DB']['UserTNM']



def signup(request):
    if request.method == "GET":
        return render(request, 'common/signup.html')

    elif request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        re_password = request.POST.get('re_password')
        email = request.POST.get('email')
        customCheck1 = request.POST.get('customCheck1')
        res_data = {}
        if not (username and password and re_password and email):
            res_data['username'] = username
            res_data['email'] = email
            res_data['error'] = "모든 값을 입력해야 합니다."
            return render(request, 'common/signup.html', res_data)
        if password != re_password:
            res_data['username'] = username
            res_data['email'] = email
            res_data['error'] = '비밀번호가 다릅니다.'
            return render(request, 'common/signup.html', res_data)
        if customCheck1  != '1' :
            res_data['username'] = username
            res_data['email'] = email
            res_data['error'] = '동의를 눌러주세요.'
            return render(request, 'common/signup.html', res_data)
        else:
            RS = createUsers(username,password,email)
            if RS == "1" :
                res_data['error'] = "회원가입에 성공하였습니다."
                return render(request, 'common/login.html', res_data)
            else :
                res_data['error'] = "아이디가 존재합니다."
                res_data['email'] = email
                return render(request, 'common/signup.html', res_data)

def login(request):
    if request.method == 'GET':
        return render(request, 'common/login.html')

    # POST 방식 요청 -> 사용자가 보내는 데이터와 데이터베이스의 정보 일치여부 확인
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)

        # 응답 데이터
        res_data = {}

        # 모든 필드를 채우지 않았을 경우
        if not (username and password):
            res_data['error'] = '아이디 또는 비밀번호를 입력해 주세요.'
            return render(request, 'common/login.html', res_data)
        # 모든 필드를 채웠을 경우
        else:
            RS = selectUsers(username, password)
            if RS == None:
                res_data['error'] = '아이디 또는 비밀번호가 일치하지 않습니다'
                return render(request, 'common/login.html', res_data)

            else:
                request.session['sessionid']=RS[4]
                request.session['sessionemail']=RS[7]
                return redirect('../dashboard')

def logout(request):
    if request.session['sessionid'] :
        del(request.session['sessionid'])
        del(request.session['sessionemail'])

    return render(request, 'common/login.html')


def selectUsers(username, password):
    try:
        hashpassword = hashlib.sha256(password.encode()).hexdigest()
        #print(hashpassword)

        Conn = psycopg2.connect('host={0} dbname={1} user={2} password={3}'.format(DBHost, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()

        query = """
            select 
                *
            from
                """ + UserTNM + """
            where
                username = '""" + username + """'
            and
                password = '""" + hashpassword + """'   

            """

        Cur.execute(query)
        RS = Cur.fetchone()
        #print(RS)
        return RS
    except:
        print(UserTNM + ' Table connection(Select) Failure')


def createUsers(username, password, email):
    try:
        hashpassword = hashlib.sha256(password.encode()).hexdigest()
        Conn = psycopg2.connect('host={0} dbname={1} user={2} password={3}'.format(DBHost, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        query =""" 
        INSERT INTO 
            auth_user 
            (id, username, password, email, date_joined) 
        VALUES  
            (nextval('auth_user_id_seq'),
                '""" + username + """',
                '""" + hashpassword + """' ,
                '""" + email + """' ,
                now());
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