var HOSTNAME = "http://localhost:8080/db-term-project/";
var SITE_NAME = "Project Management";

var USER;

$(document).ready(function() {
	//Top left green box
	$("#koding-logo").click(function() {
		if (USER.userID == -1) {
			window.location = "index.html";
		} else {
			__projects();
		}
	});
	
	//Popup Close
	$(".kdnotification").click(function() {
		$(this).css("display", "none");
	});
	
	//Logout
	$("#logout").click(function() {
		$.post(HOSTNAME + "logout", $(this).serialize(), function(data) {
			USER = null;
			window.location = "index.html";
		});
	});
	
	//set correct height on browser open
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	//Table Columns Overflow
	$("div.table-column").css("max-height", $(window).height() - 156);
	
	//Initialize
	init();
});

//dynamically resize height
$(window).resize(function() {
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	//Table Columns Overflow
	$("div.table-column").css("max-height", $(window).height() - 156);
});


//Initialize
function init() {
	//Send Cookie
	$.post(HOSTNAME + "login", function(data) {
		USER = jQuery.parseJSON(data);
		
		//Change Canvas
		if (USER.userID == -1) {
			__login();
		} else if (USER.userID == 0) {
			__projects();
		}
	});
}

//Login Canvas
function __login() {
	setup("Customer Login", "Log In");
	
	//Clear Navigation Area
	$("#main-nav").empty();
	
	//Clear Account Area
	$(".account-area").empty();
	
	//Load Login Screen
	$(".kdview .workspace").load("login.html",
		//Bind Form Button
		$(document).delegate("#login-form", "submit", function(e) {
			e.preventDefault();
			
			//Send Login request + Serialize the form
			$.post(HOSTNAME + "login", $(this).serialize(), function(data) {
				USER = jQuery.parseJSON(data);
				
				if (USER.userID == -1) {
					popup("Access Denied!");
				} else if (USER.userID == 0) {
					__projects();
				}
			});
		})
	);
}

//Projects Canvas
function __projects() {
	setup("My Projects", "My Projects");
	
	//Load Account Area
	$(".account-area").load("account-area.html", function () {
		//Display Name
		$("#el-15").text(USER.displayName);
		
		//Username
		$("#el-12").text(USER.username);
		
		//Toggle User drop down menu
		$(document).delegate("a.groups", "click", function() {
		     $("div.kdview.group-switcher").toggleClass("active");
		});
		
		//Close the drop down menu
		$(document).delegate(".kdview .application-page", "click", function() {
		     $("div.kdview.group-switcher").removeClass("active");
		});
		
		//Top Right Search Open
		$(document).delegate("#fatih-launcher", "click", function() {
			$("div.account-area").toggleClass("search-open");
		});
	});
	
	//Load Projects Holder
	$("<div>", {class: "tw-playgrounds"}).appendTo(".kdview .workspace");
	
	//Create Objects
	$.getJSON(HOSTNAME + "project", function(data) {
		$.each(data, function(index, value) {
			//Create Div Block
			var div = $("<div>", {id:value.projectID, class:"tw-playground-item"});
			$("<img>", {src:"https://teamworkcontent.s3.amazonaws.com/covers/togetherjs.png", alt:"MyImage"}).appendTo(div);
			$("<p>", {text:value.title}).appendTo(div);
			
			//Attach Div to outer
			div.appendTo(".kdview .workspace .tw-playgrounds");
		});
	});
	
	
	
	
	
	
	
	
//	$.getJSON(HOSTNAME + "project", function(data) {
//		$.each(data, function(index, value) {
//			alert(index + " " + value);
//			$.each(value, function(index1, value1) {
//				alert(index1 + " " + value1);
//			});
//		});
//	});
}

//Wipe main canvas, page title, document title
function setup(pageT, documentT) {
	$("#page-title").text(pageT); //Page Title
	document.title = documentT + " | " + SITE_NAME; //Document Title
	
	//Clear Main Area
	$(".kdview .workspace").empty();
}

//Popup with message
function popup(message) {
	$(".kdnotification-title").text(message);
	$(".kdnotification").show();
	$(".kdnotification").delay(1000).fadeOut(); //1 sec
}