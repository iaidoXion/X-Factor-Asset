from django.core.paginator import Paginator
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from web.model.dashboardFun import DashboardDataList
from web.models import Question


def index(request):
    chartData = DashboardDataList()
    #MapUse = {"WorldUse" : WorldUse, "KoreaUse" : KoreaUse, "AreaUse" : AreaUse, "ZoneUse" : ZoneUse}
    #returnData = { 'menuList': menuSettingList, 'chartData' : chartData, 'MapUse' : MapUse, 'Customer' : Customer}
    returnData = {'chartData' : chartData}
    #print(chartData)
    return render(request, 'web/index.html')


def list(request):
    page = request.GET.get('page', '1')  # 페이지
    kw = request.GET.get('kw', '')  # 검색어
    question_list = Question.objects.order_by('-create_date')
    if kw:
        question_list = question_list.filter(
            Q(subject__icontains=kw) |  # 제목
            Q(content__icontains=kw) |  # 내용
            Q(answer__content__icontains=kw) |  # 답변 내용
            Q(author__username__icontains=kw) |  # 질문 글쓴이
            Q(answer__author__username__icontains=kw)  # 답변 글쓴이
        ).distinct()
    paginator = Paginator(question_list, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)
    context = {'question_list': page_obj, 'page': page, 'kw': kw}
    return render(request, 'web/question_list.html', context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {'question': question}
    return render(request, 'web/question_detail.html', context)
