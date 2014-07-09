$(document).ready(function() {
	//alert("DOM Loaded");
	$("#wantThisToDropDown").click(function(){
		alert("I have been clicked.");
	});
	/*
	$("html body.logged-in div#kdmaincontainer.kdview header#main-header.kdview div.inner-container div.account-area div.avatar-area section a.groups").click(function(){
		alert("Long one has been clicked.");
	});
	$("body.logged-in div#kdmaincontainer.kdview header#main-header.kdview div.inner-container div.account-area div.avatar-area section a.groups").click(function(){
		alert("1Long have been clicked.");
	});
	$("div#kdmaincontainer.kdview header#main-header.kdview div.inner-container div.account-area div.avatar-area section a.groups").click(function(){
		alert("2I have been clicked.");
	});
	$("div.inner-container div.account-area div.avatar-area section a.groups").click(function(){
		alert("3I have been clicked.");
	});
	$("div.account-area div.avatar-area section a.groups").click(function(){
		alert("4I have been clicked.");
	});
	$("div.avatar-area section a.groups").click(function(){
		alert("5I have been clicked.");
	});
	$("section a.groups").click(function(){
		alert("6I have been clicked.");
	});
	*/
	
	
	//Hide the menus if visible
//	$('html').click(function() {
//		if($("div.kdview.group-switcher").hasClass('active')) {
//			$("div.kdview.group-switcher").removeClass("active");
//		} else {
//			$("div.kdview.group-switcher").addClass("active");
//		}
//			
//	});
	
	//Close the drop down menu
	$('html').click(function() {
		//Drop down menu close
		if($("div.kdview.group-switcher").hasClass("active")) {
			$("div.kdview.group-switcher").removeClass("active");
		}
		
		//Search Close
//		if($("div.account-area").hasClass("search-open")) {
//			$("div.account-area").removeClass("search-open");
//		}
	});

	$("a.groups").click(function(event){
	     event.stopPropagation();
	     $("div.kdview.group-switcher").toggleClass("active");
	});
	
	//search open
	$("#fatih-launcher").click(function(){
//		event.stopPropagation();
//		alert("Clicked Search");
		$("div.account-area").toggleClass("search-open");
	});
	
	// a space in class="kdview group-switcher" can be selected using a dot example "kdview.group-switcher"
	$("a.groups").click(function(){
		//alert("7I have been clicked.");
		//$("div.kdview.group-switcher").addClass('active');
//		$("div.kdview.group-switcher").toggleClass('active');
//		$("div.kdview.group-switcher").toggleClass("active");
		
		//TODO: want to set up where menu is shown and a page click will turn "active" off
		//html body.logged-in div#kdmaincontainer.kdview div.kdview
	});
	
	
	
	
	//don't work
//	$("#a.groups").click(function(){
//		alert("8I have been clicked.");
//	});
//	$(".a.groups").click(function(){
//		alert("9I have been clicked.");
//	});
	
	//dynamically resize
	$( "div.kdview .panel-container" ).css( "height", $( window ).height()-113);
	
	
	//search open
//	account-area search-open
	
});



$( window ).resize(function() {
	//$( "#log" ).append( "<div>Handler for .resize() called.</div>" );
	
	console.log("RESIZED width:" + $( window ).width() + " height: " + $( window ).height());
//	$( "div.kdview .panel-container" ).append( "<p>Test</p>" );
	$( "div.kdview .panel-container" ).css( "height", $( window ).height()-113);
//	$( "div.kdview .panel-container" ).height(200);
});
