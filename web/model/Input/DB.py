import psycopg2
import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

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

day = datetime.today().strftime("%Y-%m-%d")

def plug_in(table, day, type):
    try:
        yesterday = (datetime.today() - timedelta(1)).strftime("%Y-%m-%d")
        fiveDay = (datetime.today() - timedelta(5)).strftime("%Y-%m-%d")
        month_str = (datetime.today() - relativedelta(months=1)).strftime("%Y-%m-%d")
        SDL = []
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        if table == 'asset' :
            if day == 'yesterday ' :
                query = """
                    select 
                        computer_id, disk_used_space, listen_port_count, established_port_count, asset_collection_date
                    from
                        """ + AssetTNM + """
                    where 
                        to_char(asset_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """'
                    order by computer_id desc
                """
            if day == 'monthly':
                query = """ 
                    select 
                        to_char(asset_collection_date , 'YYYY-MM-DD'),
                        sum(case when is_virtual='Yes' then 1 else 0 end) as is_virtual,
                        sum(case when is_virtual='No' then 1 else 0 end) as not_virtual
                    from
                         """ + AssetTNM + """
                    where 
                        (chassis_type = 'Rack Mount Chassis' or chassis_type = 'Virtual' )
                    and 
                        to_char(asset_collection_date , 'YYYY-MM-DD') > '""" + month_str + """'
                    group by 
                        to_char(asset_collection_date , 'YYYY-MM-DD')
                    order by 
                        to_char(asset_collection_date , 'YYYY-MM-DD')
                    asc;
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
                    and 
                        NOT classification IN ('installed_applications_name')
                    and 
                        item NOT like '%[current%'
                    and 
                        item NOT like '%TSE-Error%'
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
                    order by
                        item_count desc;
                """

        Cur.execute(query)
        RS = Cur.fetchall()
        for R in RS:
            SDL.append(R)
        return SDL
    except:
        print(table+' Daily Table connection(Select) Failure')
        
def hyd_plug_in(table, data):
    try:
        SDL = []
        Conn = psycopg2.connect('host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        if table == 'sw1' :
            query = """
                select 
                    vulnerability_num, 
                    vulnerability_classification, 
                    vulnerability_code, 
                    vulnerability_item, 
                    vulnerability_explanation,
                    vulnerability_standard_good,
                    vulnerability_standard_weak,
                    to_char(vulnerability_create_date, 'YYYY-MM-DD')
                from
                    vulnerability_list
                where 
                	vulnerability_code like 'SW1%'
                order by vulnerability_num
            """

        if table == 'SWV' :
            query = """
                select 
                    vulnerability_num, 
                    vulnerability_classification, 
                    vulnerability_code, 
                    vulnerability_item, 
                    vulnerability_explanation,
                    vulnerability_standard_good,
                    vulnerability_standard_weak,
                    to_char(vulnerability_create_date, 'YYYY-MM-DD')
                from
                    vulnerability_list
                where 
                	vulnerability_code = '""" + data + """'
            """
        Cur.execute(query)
        RS = Cur.fetchall()
        for R in RS:
            SDL.append(dict(
                        (
                            ('index', R[0]), 
                            ('SWV', R[2]), 
                            ('Title', R[3]), 
                            ('Text', R[4]),
                            ('Judge', [R[5], R[6]])
                            )
                            )
                    )
        return SDL
    except:
        print(table+' Daily Table connection(Select) Failure')

