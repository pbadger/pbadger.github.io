$(document).ready(function() {

	 $(".submit").click(function(){
	 	makePoll();
	 });
});

function getName(){
	var name = document.getElementById("name").value;
	return name;
};

function getQuestion(){
	var question = document.getElementById("question").value;
	return question;
};

function getOptions(){
	var op1 = document.getElementById("op1").value;
	var op2 = document.getElementById("op2").value;
	var op3 = document.getElementById("op3").value;
	return [op1, op2, op3];
};

function makePoll(){
	var name = getName();
	var question = getQuestion();
	var ops = getOptions();
		
	obj = {'name': name, 'question': question, 'objs': ops};
  	localStorage.setItem("poll", JSON.stringify(obj));
  	window.location.replace("admin_landing.html");
};
