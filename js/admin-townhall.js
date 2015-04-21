$(document).ready(function() {

	 $(".submit").click(function(){
	 	makeHall();
	 });
});

function getName(){
	var name = document.getElementById("name").value;
	return name;
};

function getVid(){
	var vid = document.getElementById("vid").value;
	return vid;
};

function getDescription(){
	var desc = document.getElementById("desc").value;
	return desc;
};

function makeHall(){
	var name = getName();
	var vid = getVid();
	var desc = getDescription();
		
	obj = {'name': name, 'vid': vid, 'desc': desc};
  	localStorage.setItem("townhall", JSON.stringify(obj));
  	window.location.replace("admin_landing.html");
};
