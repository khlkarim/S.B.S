var section = document.querySelector("#section");
var classe = document.querySelector("#Classe");
var numero = document.querySelector("#numero");
var selectbutton = document.querySelector(".disabledbut");
var image = document.querySelector(".image");
var options = document.querySelectorAll(".option");
if (classe) {
	var name = classe.parentElement.parentElement.id;
}
var c,s,n;
var navmob = document.querySelector(".navmob");
var mobli = document.querySelectorAll(".mobli");
var burger = document.querySelector(".burger");
var header = document.querySelector(".header");

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}

function resetimg(){
	if (name == "classes") {
		image.innerHTML ='<p style="color: #457b9d;">Your <b style="color: #457b9d;"> Classe </b> will appear here.</p>';
	}else{
		image.innerHTML ='<p style="color: #457b9d;">Your <b style="color: #457b9d;"> Emploit </b> will appear here.</p>';
	}
}
function classeselected(x) {
	section[0].selected = 'selected';
	numero[0].selected = 'selected';
	if (x == 0){
		section.disabled = true;
		numero.disabled = true;
		selectbutton.className = "disabledbut";
		resetimg();
		
	} else if (x != 'Premiére'){
		numero.disabled = true;
		selectbutton.className = "disabledbut";
		section.disabled = false;
		c = x;
		if (x == "Deusiéme") {
			section[3].className = "option";
		} else {
			section[3].className = "";
		}

	} else if (x == 'Premiére'){
		numero.disabled = false;
		section.disabled = true;
		selectbutton.className = "disabledbut";
		c = x;
		var w;
		for (let i = 1; i <= options.length; i++) {
    		checkImage(name+'/'+c+'/S'+i+'.jpg', function(){options[i-1].className="";}, function(){options[i-1].className="option"; } );
		}
	};
};

function sectionselected(x){
	numero[0].selected = 'selected';
	selectbutton.className = "disabledbut";
	if (x != 0){
		numero.disabled = false;
		s = x;
		for (let i = 0; i < options.length; i++) {
    		checkImage(name+'/'+c+'/S'+i+"_"+s+'.jpg', function(){options[i-1].className="";}, function(){options[i-1].className="option"; } );
		}
	}else {
		numero.disabled = true;
		resetimg();
	};
};

function numeroselected(x){
	if (x != 0){
		selectbutton.className = "selectbut";
		n = x;
	}else if (x == 0){
		selectbutton.className = "disabledbut";
		resetimg();
	}
};

function choose(){
	if (c == 'Premiére') {
		image.innerHTML = '<a href="'+name+'/'+c+'/'+n+'.jpg" target="_blank"><img id="myimage" class="innerimage" src="'+name+'/'+c+'/'+n+'.jpg"></a>';
	} else {
		image.innerHTML = '<a href="'+name+'/'+c+'/'+n+'_'+s+'.jpg" target="_blank"><img id="myimage" class="innerimage" src="'+name+'/'+c+'/'+n+'_'+s+'.jpg"></a>';
	}
};


/*mobile version*/

function showhide(){
	navmob.classList.toggle("navactive");
	for (var i = mobli.length - 1; i >= 0; i--) {
		mobli[i].classList.toggle("liactive");
	}
}

document.addEventListener('click', function(event) {
    var isClickInsideElement = header.contains(event.target);
    if (!isClickInsideElement) {
        navmob.classList = "navmob";
        for (var i = mobli.length - 1; i >= 0; i--) {
			mobli[i].className = "li mobli";
		}
    }
});