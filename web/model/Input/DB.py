import psycopg2
import json
from datetime import datetime, timedelta

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
DataLoadingType = SETTING['MODULE']['DataLoadingType']
DBHost = SETTING['DB']['DBHost']
DBPort = SETTING['DB']['DBPort']
DBName = SETTING['DB']['DBName']
DBUser = SETTING['DB']['DBUser']
DBPwd = SETTING['DB']['DBPwd']
AssetTNM = SETTING['DB']['AssetTNM']
StatisticsTNM = SETTING['DB']['StatisticsTNM']
BS = SETTING['FILE']
today = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
day = datetime.today().strftime("%Y-%m-%d")
yesterday = (datetime.today() - timedelta(1)).strftime("%Y-%m-%d")
twoago = (datetime.today() - timedelta(2)).strftime("%Y-%m-%d")

def plug_in(table, day, type):
    fiveDay = (datetime.today() - timedelta(5)).strftime("%Y-%m-%d")
    try:
        SDL = []
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        if table == 'asset' :
            query = """
                select 
                    computer_id, disk_used_space, listen_port_count, established_port_count, asset_collection_date
                from
                    """ + AssetTNM + """
                where 
                    to_char(asset_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """'
                    order by computer_id desc
                """
        if table == 'statistics' :
            if day == 'yesterday' :
                query = """ 
                    select 
                        classification, item, item_count, statistics_collection_date
                    from 
                        """ + StatisticsTNM + """ 
                    where 
                        to_char(statistics_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """' 
                    """
            if day == 'fiveDay' :
                query = """ 
                    select 
                        classification,
                        item, 
                        item_count, 
                        statistics_collection_date
                    from 
                        """ + StatisticsTNM + """ 
                    where 
                        to_char(statistics_collection_date, 'YYYY-MM-DD') > '""" + fiveDay + """' 
                    and
                        classification = '"""+type+"""'
                    """

        Cur.execute(query)
        RS = Cur.fetchall()
        for R in RS:
            SDL.append(R)
        return SDL
    except:
        print(table+' Daily Table connection(Select) Failure')

