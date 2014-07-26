var USER;

$(document).ready(function() {
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
			window.location = "index.html"; //Go to homepage
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
			__accountarea();
			__projects();
		}
	});
}

//Wipe main canvas, page title, document title
function setup(page_title, document_title) {
	$("#page-title").text(page_title); //Page Title
	document.title = document_title + " | " + SITE_NAME; //Document Title
	
	//Clear Main Area
	$(".kdview .workspace").empty();
}

//Login Canvas
function __login() {
	setup("Customer Login", "Log In");
	
	//Clear Navigation Area
	$("#main-nav").empty();
	
	//Clear Account Area
	$(".account-area").empty();
	
	//Load Login Screen
	$(".kdview .workspace").load("login-p.html",
		//Bind Form Button
		$(document).on("submit", "#login-form", function(event) {
			event.preventDefault();
			
			//Send Login request + Serialize the form
			$.post(HOSTNAME + "login", $(this).serialize(), function(data) {
				USER = jQuery.parseJSON(data);
				
				if (USER.userID == -1) {
					popup("Access Denied!");
				} else if (USER.userID == 0) {
					__accountarea();
					__projects();
				}
			});
		})
	);
}

//Account Area
function __accountarea() {
	//Load Account Area
	$(".account-area").load("account-area-p.html", function () {
		//Display Name
		$("#el-15").text(USER.displayName);
		
		//Username
		$("#el-12").text(USER.username);
		
		//Avatar
		$("#my-avatar").attr("src", USER.avatar);
		
		//Toggle User drop down menu
		$(document).on("click", ".groups", function() {
		     $(".kdview.group-switcher").toggleClass("active");
		});
		
		//Close the drop down menu
		$(document).on("click", function(e) {
			//All except ".groups"
			if (!$(e.target).is(".groups")) {
				$(".kdview.group-switcher").removeClass("active");
		    }
		});
		
		//Top Right Search Open
		$(document).on("click", "#fatih-launcher", function() {
			$(".account-area").toggleClass("search-open");
		});
	});
}

//Projects Canvas
function __projects() {
	setup("My Projects", "My Projects");
	
	//Load Projects Holder
	$("<div>", {class: "tw-playgrounds"}).appendTo(".kdview .workspace");
	
	//Create Objects
	$.getJSON(HOSTNAME + "project", function(data) {
		$.each(data, function(index, value) {
			//Create Div Block
			var div = $("<div>", {id:"p" + value.projectID, class:"tw-playground-item"});
			$("<img>", {src:"https://teamworkcontent.s3.amazonaws.com/covers/togetherjs.png", alt:"MyImage"}).appendTo(div);
			$("<p>", {text:value.title}).appendTo(div);
			
			//Add a click for each div
			$(div).one("click", function() {
				//removes all click handlers
				$(".kdview .workspace").off("click", "**");
								
				//Setup page for board
				setup($(this).find("p").text(), $(this).find("p").text());
				
				//Go to Kanban Board
				__board($(this).attr("id").substring(1));
			});
			
			//Attach Div to outer
			div.appendTo(".kdview .workspace .tw-playgrounds");
		});
	});
}

//Kanban Board Canvas
function __board(project_id) {
	//Load Table
	$(".kdview .workspace").load("board-p.html", function () {
		//Populate the Table
		$.getJSON(HOSTNAME + "board", "pId=" + project_id, function(data) {
			$.each(data, function(key, value) {
//				alert(key +  " " + value);
				$.each(value, function(index, element) {
//					alert(key +  " " + index + " " + element);
					
					//Create Div Block
					var div = $("<div>", {id:"t" + element.taskID, class:"terminal-bottom-message"});
					$("<h1>", {text:element.title}).appendTo(div);
					
					//Add a click for each div
					$(div).one("click", function() {
						//removes all click handlers
						$(".kdview .workspace").off("click", "**");
						
						//Setup page for task
						setup($("#page-title").text(), $(this).find("h1").text() + " on " + $("#page-title").text());
						
						//Go to the Task Canvas
						__task($(this).attr("id").substring(1));
					});
					
					//Add to correct column
					div.appendTo("#" + key);
				});
			});
		});
	});
}

//Task Canvas
function __task(task_id) {
//	alert(task_id);
	
	//Load Task Page
	$(".kdview .workspace").load("task-p.html", function () {
		//Populate
		$.getJSON(HOSTNAME + "task", "tId=" + task_id, function(task) {
			//Title
			$("#tTitle").text(task.title);
			
			//Description
			var description_html = $.parseHTML(task.description);
			$("#tDescription").append(description_html);
			
			//Notes
			var task_html = $.parseHTML(task.notes);
			$("#tNotes").append(task_html);
			
//			var position = $("#testID").offset();
//			$.each(position, function(index, value) {
//				alert(index + ": " + value);
//			});
			
			var x = $("#testID").offset().left;
			var y = $("#testID").offset().top;
			alert("x: " + x + " y:" + y);
			
//			$(".kdview .kdtooltip .just-text .placement-top .direction-center").css({top: y, left: x-3});
			
			var width = $("#member-tooltip").width();
			
			$("#member-tooltip").css('top', y-30);
			$("#member-tooltip").css('left', x-(width/2)+15);
			alert();
			
			//Project Members
			$.getJSON(HOSTNAME + "task_users", "tId=" + task_id, function(users) {
				
			});
		});
	});
}

