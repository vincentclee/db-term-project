var USER;

$(document).ready(function() {
	//TODO: ERROOR
	//this click to home, when clicking projects, registers two clicks
	//need to soft unbind previous projects when refresh
	
	//Top left green box
	$("#koding-logo").click(function() {
		if (USER.userID == 0) {
			__projects();
		} else {
			window.location = "index.html";
		}
	});
	
	//Logout
	$("#logout").click(function() {
		$.post(HOSTNAME + "logout", $(this).serialize(), function(data) {
			USER = null;
			window.location = "index.html";
		});
	});
	
	//Initialize
	init();
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
		$(document).delegate("#login-form", "submit", function(event) {
			event.preventDefault();
			
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
			var div = $("<div>", {id:"p" + value.projectID, class:"tw-playground-item"});
			$("<img>", {src:"https://teamworkcontent.s3.amazonaws.com/covers/togetherjs.png", alt:"MyImage"}).appendTo(div);
			$("<p>", {text:value.title}).appendTo(div);
			
			//Attach Div to outer
			div.appendTo(".kdview .workspace .tw-playgrounds");
			
			//Add a click for each div
			$(document).delegate("#p" + value.projectID, "click", function() {
				alert($(this).attr("id").substring(1));
				$.getJSON(HOSTNAME + "board", "pId=" + $(this).attr("id").substring(1), function(data) {
					
				});
			});
		});
	});
}

//Kanban Board
function __board() {
	setup("My Projects", "My Projects");
}

//Wipe main canvas, page title, document title
function setup(pageT, documentT) {
	$("#page-title").text(pageT); //Page Title
	document.title = documentT + " | " + SITE_NAME; //Document Title
	
	//Clear Main Area
	$(".kdview .workspace").empty();
}