$(document).ready(function() {
	polls = $('#active-polls');
	$(".submit").click(function(){
	 	makePoll();
	 	$('#CreatePoll').modal('hide');
	 });
});

function updateFromStorage() {
	for(var i in localStorage) {
    	retrieved = JSON.parse(localStorage[i]);
    	if (i == "polls"){
			deletePoll(i);
			addPoll(retrieved['question'], retrieved['objs']);
		};
	};
};

function addPoll(ques, objs){
	polls.append('<h4>'+ques+'</h4>');
};

function deletePoll(question){
  localStorage.removeItem(question);
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
	var question = getQuestion();
	var ops = getOptions();
		
	obj = {'question': question, 'objs': ops};
  	localStorage.setItem("poll", JSON.stringify(obj));
  	addPoll(question, ops);
};
