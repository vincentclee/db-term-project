$(document).ready(function() {
	/* Close the drop down menu */
	$("html").click(function() {
		/* Drop down menu close */
		if($("div.kdview.group-switcher").hasClass("active")) {
			$("div.kdview.group-switcher").removeClass("active");
		}
	});
	
	/* Toggle User drop down menu */
	$("a.groups").click(function(event){
	     event.stopPropagation();
	     $("div.kdview.group-switcher").toggleClass("active");
	});
	
	/* top-right search open */
	$("#fatih-launcher").click(function(){
		$("div.account-area").toggleClass("search-open");
	});
	
	/* set correct height on browser open */
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	/* Table Columns Overflow */
	$("div.table-column").css("max-height", $(window).height() - 156);
});

/* dynamically resize height */
$(window).resize(function() {
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	/* Table Columns Overflow */
	$("div.table-column").css("max-height", $(window).height() - 156);
});
