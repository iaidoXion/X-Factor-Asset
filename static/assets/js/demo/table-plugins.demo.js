/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*/

var handleRenderWeakTableData = function() {
	var weakTable = $('#weakTable-windows, #weakTable-unix').DataTable({
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
		autoWidth: false,
		ordering: false,
	    columnDefs: [

	        {width: "22%", target: [2] },
	        {width: "65%", target: [3] },

	    ],
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

};

var handleRenderWeakDetailTableData = function() {
	var weakDetailtable = $('#weakTableDetail').DataTable({
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
		autoWidth: false,
		ordering: false,
	    columnDefs: [
	        {width: "5%", target: [0] },
	        {width: "15%", target: [1] },
	        {width: "16%", target: [2] },
	        {width: "20%", target: [3] },
	        {width: "14%", target: [4] },
	        {width: "10%", target: [5] },
	        {width: "15%", target: [6] },
	        {width: "5%", target: [7] }
	    ],
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

};

var handleRenderWeakDetailModalTableData = function() {
	var weakDetailModaltable = $('#weakTableDetail_modal').DataTable({
		dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
		lengthMenu: [ 10, 20, 30, 40, 50 ],
		responsive: true,
		searching: true,
		autoWidth: false,
		ordering: false,
	    columnDefs: [
	        {width: "5%", target: [0] },
	        {width: "85%", target: [1] },
	        {width: "5%", target: [2] },
	        {width: "5%", target: [3] },
	    ],
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

		$("#weakTableDetail_modal_filter.dataTables_filter").append($("#weak-box"));

	var categoryIndex = 0;
	$("#weakTableDetail_modal th").each(function (i) {
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
		weakDetailModaltable.draw();
      });

    $("#weak-box").find('option:first').attr('selected', 'selected');
};


/* Controller weakBox
------------------------------------------------ */
$(document).ready(function() {
	handleRenderWeakTableData();
    handleRenderWeakDetailTableData();
    handleRenderWeakDetailModalTableData();
});
