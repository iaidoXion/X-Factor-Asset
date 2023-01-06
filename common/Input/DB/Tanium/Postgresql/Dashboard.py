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
        monthDay = (datetime.today() - timedelta(30)).strftime("%Y-%m-%d")
        month_str = (datetime.today() - relativedelta(months=1)).strftime("%Y-%m-%d")
        SDL = []
        Conn = psycopg2.connect(
            'host={0} port={1} dbname={2} user={3} password={4}'.format(DBHost, DBPort, DBName, DBUser, DBPwd))
        Cur = Conn.cursor()
        if table == 'asset':
            if day == 'yesterday':
                query = """
                    select 
                        computer_id, disk_used_space, listen_port_count, established_port_count, asset_collection_date
                    from
                        """ + AssetTNM + """
                    where 
                        to_char(asset_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """'
                    order by computer_id desc
                """
            # if day == 'monthly':
            #     query = """
            #         select
            #             to_char(asset_collection_date , 'YYYY-MM-DD'),
            #             sum(case when is_virtual='Yes' then 1 else 0 end) as is_virtual,
            #             sum(case when is_virtual='No' then 1 else 0 end) as not_virtual
            #         from
            #              """ + AssetTNM + """
            #         where
            #             (chassis_type = 'Rack Mount Chassis' or chassis_type = 'Virtual' )
            #         and
            #             to_char(asset_collection_date , 'YYYY-MM-DD') > '""" + month_str + """'
            #         group by
            #             to_char(asset_collection_date , 'YYYY-MM-DD')
            #         order by
            #             to_char(asset_collection_date , 'YYYY-MM-DD')
            #         asc;
            #     """
            # if day == 'all':
            #     query ="""
            #         select
            #             *
            #         from
            #             """ + AssetTNM + """
            #     """
        if table == 'statistics':
            if day == 'yesterday':
                if type == '':
                    query = """ 
                        select 
                            classification, item, item_count, statistics_collection_date
                        from 
                            daily_statistics
                        where 
                            to_char(statistics_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """'
                        and 
                            NOT classification IN ('installed_applications')
                        and
                            NOT classification IN ('running_service')
                        and 
                            classification NOT like '%group_%'
                        and
                            NOT item IN ('unconfirmed')
                        and 
                            item NOT like '%[current%'
                        and 
                            item NOT like '%TSE-Error%'
                    """
            if day == 'today':
                if type == '':
                    query = """ 
                        select 
                            classification, item, item_count, statistics_collection_date
                        from 
                            minutely_statistics
                        where 
                            NOT classification IN ('installed_applications')
                        and
                            NOT classification IN ('running_processes')
                        and 
                            classification NOT like '%group_%'
                        and
                            NOT item IN ('unconfirmed')
                        and 
                            item NOT like '%[current%'
                        and 
                            item NOT like '%TSE-Error%'
                    """

                elif type == 'bar':
                    query = """
                        select 
                            item, item_count 
                        from 
                            minutely_statistics  
                        where 
                            classification ='asset' order by item_count desc limit 3    
                    """
                elif type == 'pie':
                    query = """
                        select item, item_count from 
                        minutely_statistics where classification = 'os' 
                        order by item_count::INTEGER desc limit 3
                    """
                elif type == 'donut':
                    query = """
                        select 
                            item, item_count 
                        from 
                            minutely_statistics
                        where
                            classification = 'installed_applications'
                        order by
                            item_count::INTEGER 
                        desc limit 5
                    """

                elif type == 'case':
                    query = """
                        select
                            computer_id, ipv_address, driveusage
                        from
                            minutely_statistics_list
                    """

                # NC 대역별 barchart
                elif type == 'group_server_count':
                    query = """
                            select 
                                item, item_count 
                            from 
                                minutely_statistics  
                            where 
                                classification ='group_server_count' AND item != 'unconfirmed'

                            order by
                                item_count::INTEGER 
                            desc limit 5
                        """
                #NC running service chart
                elif type == 'running':
                    query = """
                        select
                            item, item_count
                        from
                            minutely_statistics
                        where 
                            classification = 'running_service'
                        order by
                            item_count::INTEGER desc limit 5
                    """
                elif type == 'usage':
                    query = """
                        select
                            classification, item, item_count
                        from
                            minutely_statistics
                        where 
                            item in ('60Risk', '75Risk', '95Risk')
                        
                    """


            # NC 서버 총 수량 추이 그래프(30일)
            if day == 'monthly':
                if type == 'asset':
                    query = """ 
                                select 
                                    item, 
                                    item_count, 
                                    statistics_collection_date
                                from 
                                    daily_statistics 
                                where 
                                    to_char(statistics_collection_date, 'YYYY-MM-DD') > '""" + monthDay + """' 
                                and
                                    classification = 'virtual'
                                and
                                    item != 'unconfirmed'
                                order by
                                    statistics_collection_date;
                            """


            if day == 'fiveDay':
                if type == 'asset':
                    query = """ 
                        select 
                            classification,
                            item, 
                            item_count, 
                            statistics_collection_date
                        from 
                            daily_statistics 
                        where 
                            to_char(statistics_collection_date, 'YYYY-MM-DD') > '""" + fiveDay + """' 
                        and
                            classification = '""" + type + """'
                        order by
                            item_count desc;
                    """
            if day == 'assetItem':
                if type == 'Group':
                    query = """
                        select 
                            item, 
                            item_count  
                        from 
                            minutely_statistics 
                        where 
                            classification ='asset' 
                    """
            if type == 'ram':
                query = """
                    select
                        classification, item, item_count
                    from
                        minutely_statistics
                    where 
                        classification in ('group_ram_usage_exceeded')
                    order by
                        item_count::INTEGER desc limit 5
                """
            if type == 'cpu':
                query = """
                    select
                        classification, item, item_count
                    from
                        minutely_statistics
                    where 
                        classification in ('group_cpu_usage_exceeded')
                    order by
                        item_count::INTEGER desc limit 5
                """
            if type == 'world':
                query = """
                    select
                        classification, item
                    from
                        minutely_statistics
                    where 
                        classification in ('group_cpu_usage_exceeded', 'group_ram_usage_exceeded', 'group_running_service_count_exceeded', 
                        'group_last_reboot', 'drive_usage_size_exceeded')
                """
        if table == 'statistics_list':
            if day == 'today':
                if type == 'DUS':
                    query = """
                            select
                                computer_id, driveusage, ipv_address
                            from
                                minutely_statistics_list
                        """
                elif type == 'statistics':
                    query = """
                        select
                            classification, item, item_count
                        from
                            minutely_statistics
                        where 
                            classification IN ('established_port_count_change', 
                                'group_running_service_count_exceeded',
                                'group_cpu_usage_exceeded',
                                'group_ram_usage_exceeded',
                                'listen_port_count_change',
                                'group_last_reboot',
                                'drive_usage_size_exceeded')
                            and 
                                NOT item IN ('unconfirmed')

                    """
                elif type == 'LH':
                    query = """
                        select
                            computer_id, last_reboot, ipv_address
                        from
                            minutely_statistics_list
                    """
                elif type == 'RUS':
                    query = """
                        select
                            computer_id, ramusage, ipv_address
                        from
                            minutely_statistics_list
                    """
            if day == 'yesterday':
                if type == 'DUS':
                    query = """
                        select
                            computer_id, driveusage, ipv_address
                        from
                            daily_statistics_list
                        where 
                            to_char(asset_list_statistics_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """' 
                    """
                elif type == 'LH':
                    query = """
                        select
                            computer_id, last_reboot, ipv_address
                        from
                            daily_statistics_list
                        where 
                            to_char(asset_list_statistics_collection_date, 'YYYY-MM-DD') = '""" + yesterday + """' 
                    """
        Cur.execute(query)
        RS = Cur.fetchall()
        for R in RS:
            SDL.append(R)
        return SDL
    except:
        print(table + type + day + ' Daily Table connection(Select) Failure')
    return