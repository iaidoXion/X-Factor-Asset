import psycopg2
import json
import pandas as pd
from datetime import datetime, timedelta

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
DataLoadingType = SETTING['MODULE']['DataLoadingType']
DBHost = SETTING['DB']['DBHost']
DBPort = SETTING['DB']['DBPort']
DBName = SETTING['DB']['DBName']
DBUser = SETTING['DB']['DBUser']
DBPwd = SETTING['DB']['DBPwd']
MenuTNM = SETTING['DB']['MenuTNM']


def MenuSetting():
    try:
        MSDL = []
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()

        query = """
            select 
                *
            from
                """ + MenuTNM + """

            """

        Cur.execute(query)
        RS = Cur.fetchall()
        # for R in RS:
        #     MSDL.append(R)
        # return MSDL

        #print(RS)
        DFL=[]
        for d in RS:
            ID = d[0]
            MenuID = d[1]
            MenuName = d[2]
            MenuUrl = d[3]
            MenuUse = d[4]
            MenuNote = d[5]
            MenuCD = d[6]
            MenuImg = d[7]
            MenuEng = d[8]

            DFL.append([ID, MenuID, MenuName, MenuUrl, MenuUse, MenuNote, MenuCD, MenuImg, MenuEng])
            DFC = ['id', 'menuID', 'menuName','menuUrl', 'menuUse', 'menuNote', 'menuCD', 'menuImg', 'menuEng']
        DF = pd.DataFrame(DFL, columns=DFC).sort_values(by="id", ascending=True).reset_index(drop=True)
        DC=DF.to_dict('records')
        return DC
    except:
        print(MenuTNM+' Menu Table connection(Select) Failure')

