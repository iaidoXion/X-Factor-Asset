/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*//*




var handleRenderTableData = function() {
	var table = $('#datatableDefault, #datatableCDefault, #datatableDDefault, #datatableEDefault').DataTable({
	    destroy: true,
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
        language: {
		    "decimal":        "",
			"info":           "현재 _START_ - _END_건 / 전체 _TOTAL_건",
			"infoEmpty":      "데이터가 없습니다.",
			"emptyTable":     "데이터가 없습니다.",
			"thousands":      ",",
			"lengthMenu":     "페이지당 _MENU_ 개씩 보기",
			"loadingRecords": "로딩 중입니다.",
			"processing":     "",
			"zeroRecords":    "검색 결과 없음",
			"paginate": {
				"first":      "처음",
				"last":       "끝",
				"next":       "다음",
				"previous":   "이전"
			},
			"search":         "검색:",
			"infoFiltered":   "(전체 _MAX_ 건 중 검색결과)",
			"infoPostFix":    "",
        },
	});


	var tableBDefault = $('#datatableBDefault').DataTable({
	    destroy: true,
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
        language: {
			"info":           "현재 _START_ - _END_건 / 전체 _TOTAL_건",
			"infoEmpty":      "데이터가 없습니다.",
			"emptyTable":     "데이터가 없습니다.",
			"thousands":      ",",
			"lengthMenu":     "페이지당 _MENU_ 개씩 보기",
			"loadingRecords": "로딩 중입니다.",
			"processing":     "",
			"zeroRecords":    "검색 결과 없음",
			"paginate": {
				"first":      "처음",
				"last":       "끝",
				"next":       "다음",
				"previous":   "이전"
			},
			"search":         "검색:",
			"infoFiltered":   "(전체 _MAX_ 건 중 검색결과)",
			"infoPostFix":    "",
        },
	});

	$("#datatableBDefault_filter.dataTables_filter").append($("#weak-box"));

	var categoryIndex = 0;
	$("#datatableBDefault th").each(function (i) {
	  if ($($(this)).html() == "상태") {
		categoryIndex = i; return false;
	  }
	});
	$.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
          var selectedItem = $('#weak-box').val()
          var category = data[categoryIndex];
          if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
          }
		  return false;
        }
      );

	  $("#weak-box").change(function (e) {
		tableBDefault.draw();
      });
};


var handleRenderReportTableData = function () {
    var DailyReport = $('#datatableDailyDefault, #datatableMonthlyDefault, #datatableAnnualDefault').DataTable({
        destroy: true,
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
        language: {
		    "decimal":        "",
			"info":           "현재 _START_ - _END_건 / 전체 _TOTAL_건",
			"infoEmpty":      "데이터가 없습니다.",
			"emptyTable":     "데이터가 없습니다.",
			"thousands":      ",",
			"lengthMenu":     "페이지당 _MENU_ 개씩 보기",
			"loadingRecords": "로딩 중입니다.",
			"processing":     "",
			"zeroRecords":    "검색 결과 없음",
			"paginate": {
				"first":      "처음",
				"last":       "끝",
				"next":       "다음",
				"previous":   "이전"
			},
			"search":         "검색:",
			"infoFiltered":   "(전체 _MAX_ 건 중 검색결과)",
			"infoPostFix":    "",
        },
	});
	$('#daily-daterange, #monthly-daterange, #annual-daterange').daterangepicker({
		opens: 'right',
		format: 'YYYY/MM/DD',
		separator: ' ~ ',
		startDate: moment().subtract('days', 29),
		endDate: moment(),
		minDate: '01/01/2009',
		maxDate: '12/31/2025',
		yearSuffix: '년',
		locale: {
		    cancelLabel: "취소",
            applyLabel: "확인",
		    daysOfWeek: ['일','월','화','수','목','금','토'],
		    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],

		}

	}, function (start, end) {
		$('#daily-daterange input, #monthly-daterange input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));
	});
};

*/
/* Controller weakBox
------------------------------------------------ *//*
*/
/*
*//*

*/
/*

$(document).ready(function() {
	handleRenderTableData();
	handleRenderReportTableData();
});
*//*
*/
/*

*/
