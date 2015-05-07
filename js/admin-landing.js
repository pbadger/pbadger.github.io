$(document).ready(function() {
  townhalls = $('#active-halls');
	updateFromStorage();

  $(".submit").click(function(){
    makeHall();
    $('#CreateHall').modal('hide');
   });

});

function updateFromStorage() {
	for(var i in localStorage) {
    	retrieved = JSON.parse(localStorage[i]);
    	if (i == "townhall"){
    		deleteTownHall(i);
    		addTownHall(retrieved['name'], retrieved['desc'], retrieved['img']);
    	};
  };
};

function addTownHall(name, desc){
  var html = '<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="" id="pic" height="150" width="150"><div class="caption"><h3>'+name+'</h3><p>'+desc+'</p><p><a href="admin-townhall-stats.html" class="btn btn-primary" role="button">View</a> </p></div></div></div></div>';
  townhalls.append(html);
  getImage();
};

function deleteTownHall(question){
  localStorage.removeItem(question);
};

function getName(){
  var name = document.getElementById("name").value;
  return name;
};

function getImage(){
   var preview = document.getElementById('pic'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL

       } else {
           preview.src = "";
       }
};


function getDescription(){
  var desc = document.getElementById("desc").value;
  return desc;
};

function makeHall(){
  var name = getName();
  var desc = getDescription();    
  addTownHall(name, desc);

  obj = {'name': name,'desc': desc};
  localStorage.setItem("townhall", JSON.stringify(obj));
};
