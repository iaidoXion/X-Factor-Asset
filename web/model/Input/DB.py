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
            if day == 'yesterday' :
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
        
        if table == 'list' :
            query = """
                SELECT 
                    vl.vulnerability_num, 
                    vl.vulnerability_classification, 
                    vl.vulnerability_code, 
                    vl.vulnerability_item, 
                    vl.vulnerability_explanation,
                    vl.vulnerability_standard_good,
                    vl.vulnerability_standard_weak,
                    count(case when vj.vulnerability_judge_result = 'Weak' then 1 end) as count,
                    to_char(vl.vulnerability_create_date, 'YYYY-MM-DD')
                FROM
                    vulnerability_list vl
                JOIN
                    vulnerability_judge vj 
                    ON 
                        vl.vulnerability_code = vj.vulnerability_code
                GROUP BY vl.vulnerability_num
                ORDER BY vl.vulnerability_num
                """
        if table == 'SWL' :
            query = """ 
                SELECT
                    VL.vulnerability_num, 
                    VL.vulnerability_classification, 
                    VL.vulnerability_code, 
                    VL.vulnerability_item, 
                    VL.vulnerability_explanation,
                    VL.vulnerability_standard_good,
                    VL.vulnerability_standard_weak
                FROM 
                    vulnerability_list vl 
                WHERE 
                    vl.vulnerability_code = '""" + data + """';
            """
        if table == 'swv_detail' :
            query = """
                SELECT
                    VL.vulnerability_num, 
                    VL.vulnerability_classification, 
                    VL.vulnerability_code, 
                    VL.vulnerability_item, 
                    VL.vulnerability_explanation,
                    VL.vulnerability_standard_good,
                    VL.vulnerability_standard_weak,
                    VJ.computer_id,
                    VJ.vulnerability_judge_result,
                    VJ.vulnerability_judge_reason,
                    VJ.computer_name,
                    VJ.chassis_type,
                    VJ.tanium_client_nat_ip_address,
                    VJ.last_reboot,
                    VJ.operating_system,
                    to_char(VJ.vulnerability_judge_update_time, 'YYYY-MM-DD HH:MM:SS')
                FROM
                    vulnerability_list VL
                JOIN 
                    vulnerability_judge VJ
                ON 
                    vl.vulnerability_code = vj.vulnerability_code
                WHERE 
                    vj.vulnerability_judge_result = 'Weak' 
                    AND 
                    vj.vulnerability_code = '""" + data[0] + """'
                    AND
                    (VJ.computer_id ||
                    VJ.computer_name ||
                    VJ.chassis_type ||
                    VJ.tanium_client_nat_ip_address ||
                    VJ.operating_system) like '%""" + data[3] + """%'
                LIMIT """ + data[1] + """
	            OFFSET (""" + data[2] + """-1) * """ + data[1] + """;
                """
        if table == 'count' :
            query = """
            SELECT
                count(*)
            FROM
                vulnerability_list VL
            JOIN 
                vulnerability_judge VJ
            ON 
                vl.vulnerability_code = vj.vulnerability_code
            WHERE 
                vj.vulnerability_judge_result = 'Weak' 
                AND 
                vj.vulnerability_code = '""" + data[0] + """'
                AND
                (VJ.computer_id ||
                VJ.computer_name ||
                VJ.chassis_type ||
                VJ.tanium_client_nat_ip_address ||
                VJ.operating_system) like '%""" + data[3] + """%';"""
        Cur.execute(query)
        RS = Cur.fetchall()
        for i, R in enumerate(RS, start=1):
            if table == 'list' :
                SDL.append(dict(
                                    (
                                        ('index', R[0]), 
                                        ('SWV', R[2]), 
                                        ('Title', R[3]), 
                                        ('Text', R[4]),
                                        ('Judge', [R[5], R[6]]),
                                        ('Count', R[7])
                                    )
                                )
                        )
            if table == 'SWL' :
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
            if table == 'swv_detail' :
                index = (int(data[2]) - 1 )*10 + i
                SDL.append(dict(
                                    (
                                        ('index', index), 
                                        ('SWV', R[2]), 
                                        ('Title', R[3]), 
                                        ('Text', R[4]),
                                        ('Judge', [R[5], R[6]]),
                                        ('cid', R[7]),
                                        ('result', R[8]),
                                        ('reason', R[9]),
                                        ('cpnm', R[10]),
                                        ('type', R[11]),
                                        ('ip', R[12]),
                                        ('last_login', R[13]),
                                        ('os', R[14]),
                                        ('update_time', R[15])
                                    )
                                )
                        )
            if table == 'count' :
                SDL = RS[0][0]
            if table == 'swv_data':
                SDL.append(dict(
                                    (
                                        ('cid', R[0]), 
                                        ('host', R[1]), 
                                        ('os', R[2]), 
                                        ('ip', R[3]),
                                        ('asset', R[4]),
                                        ('lastlogin', R[5]),
                                        ('update_date', R[6])
                                    )
                                )
                        )
        return SDL
    except:
        print(table+' Daily Table connection(Select) Failure')


