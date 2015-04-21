$(document).ready(function() {
	polls = $('#active-polls');
	updateFromStorage();

});

function updateFromStorage() {
	for(var i in localStorage) {
    	retrieved = JSON.parse(localStorage[i]);
    	if (i == "poll"){
    		deletePoll(i);
    		addPoll(retrieved['name'], retrieved['question'], retrieved['objs']);
    	}
    	else {
    		deleteTownHall(i);
    		addTownHall(retrieved['name'], retrieved['question'], retrieved['objs']);
    	}
  }
};

function addPoll(name, ques, objs){
	polls.append('<div class="poll"><h5>'+ques+'</h5></div>');
};

function addTownHall(name){
	$('#active-halls').append('<div class="townhall-name">'+name+'</div>');
};
function deletePoll(question){
  localStorage.removeItem(question);
};
function deleteTownHall(question){
  localStorage.removeItem(question);
};