var section = document.querySelector("#section");
var classe = document.querySelector("#Classe");
var selectbutton = document.querySelector(".disabledbut");
var forms = document.querySelectorAll("form");
var c ,n;
var inputs = document.querySelectorAll("input");
var moyenne = document.querySelector(".moyenne");
var visforms;
var bottommoydiv = document.querySelector(".bottommoydiv");
var sepbut = document.querySelector(".sepbut");

for (var i = forms.length - 1; i >= 0; i--) {
	for (var j = 0; j < forms[i].children.length; j++) {
		if (forms[i].children[j].tagName == "LABEL") {
			forms[i].children[j].setAttribute("for", "");
		}
	}
}

function reset(){
	for (var i = forms.length - 1; i >= 0; i--) {
		forms[i].style.display ="none";
		forms[i].children[0].children[0].checked = true;
		sepbut.innerHTML = "Unselect All";
		for (var j = forms[i].children.length - 1; j >= 0; j--) {
			if(forms[i].children[j].tagName =='INPUT'){
				forms[i].children[j].value ='';
			}else if (forms[i].children[j].tagName == 'DIV') {
				forms[i].children[j].children[1].innerHTML= "...";
			}else if (forms[i].children[j].tagName == 'P') {
				forms[i].removeChild(forms[i].children[j]);
			}
		}
	}
	bottommoydiv.id = "disbottom";
}

function classemoyselected(x) {
	section[0].selected = 'selected';
	if (x == 0){
		section.disabled = true;
		selectbutton.className = "disabledbut";
		reset();
	} else if ((x != 0) && (x != 'Premiére')){
		section.disabled = false;
		selectbutton.className = "disabledbut";
		c = x;
		if (x == "Deusiéme") {
			section[3].className = "option";
		} else {
			section[3].className = "";
		}

	} else if (x == 'Premiére'){
		section.disabled = true;
		selectbutton.className = "selectbut";
		c = x;
		n = "";
	};
};

function sectionmoyselected(x){
	if (x != 0){
		selectbutton.className = "selectbut";
		n = x;
	}else if (x == 0){
		selectbutton.className = "disabledbut";
		reset();
	};
};

var cof4 = ["DeusiémeSCIENCEmathématiques","DeusiémeSCIENCEphysique","DeusiémeINFOInformatique",4]
var cof3 = ["Premiérearabia","Premiéremathématiques","DeusiémeINFOmathématiques","DeusiémeINFOphysique",3]
var cof2 = ["DeusiémeSCIENCEscience","DeusiémeSCIENCETechnique","DeusiémeSCIENCEfrancais","DeusiémeSCIENCEenglish","DeusiémeINFOTechnique","DeusiémeINFOarabia","DeusiémeINFOenglish","DeusiémeINFOfrancais",2]
var cof25 = ["Premiérephysique","Premiérefrancais",2.5]
var cof15 = ["Premiéreenglish","Premiérescience","PremiéreTerikh","PremiéreGeographie",1.5]
var cofs = [cof4,cof3,cof25,cof2,cof15]
var k,h,x,textnode,para;

function coeff(i){
	k = 0;
	h = 0;
	x = true;
	while((k<cofs.length) && x){
		h = 0;
		while((h<cofs[k].length-1) && x){
			if (cofs[k][h] == c+n+forms[i].id) {
				para = document.createElement("P");
				para.className = "textnode";
				textnode = document.createTextNode("x "+cofs[k][cofs[k].length-1].toString());  
				para.appendChild(textnode);
				forms[i].appendChild(para);
				x = false;
			}
			h++;
		}
		k++;
	}
	if (x) {
		para = document.createElement("P");
		para.className = "textnode";
		textnode = document.createTextNode("x 1");  
		para.appendChild(textnode);
		forms[i].appendChild(para);	
	}
}

function choose(){
	reset();
	visforms = [];
	for (var i = forms.length - 1; i >= 0; i--) {
		if (forms[i].classList == "All") {
			forms[i].style.display = "block";
			visforms.push(forms[i])
			coeff(i);
		} else {
			for (var j = forms[i].classList.length - 1; j >= 0; j--) {
				if ((c+n) == (forms[i].classList[j])) {
					forms[i].style.display = "block";
					visforms.push(forms[i])
					coeff(i);
				}
			}
		}
	}

	bottommoydiv.id = "";
};

function change(but){
	if (but.innerHTML == "Unselect All") {
		but.innerHTML = "Select All";
		for (var i = visforms.length - 1; i >= 0; i--) {
			visforms[i].children[0].children[0].checked = false;
		}
	} else {
		but.innerHTML = "Unselect All";
		for (var i = visforms.length - 1; i >= 0; i--) {
			visforms[i].children[0].children[0].checked = true;
		}
	}
}

function calcule(){
	var som = 0;
	var a = 0;

	for (var i = visforms.length - 1; i >= 0; i--) {
		for (var j = visforms[i].children.length - 1;j >= 0; j--) {
			if (visforms[i].children[j].tagName == "DIV"&&(visforms[i].children[0].children[0].checked)) {
				if ((visforms[i].children[j].children[1].innerHTML != "...")) {
					k = 0;
					h = 0;
					x = true;
					while((k<cofs.length) && x){
						h = 0;
						while((h<cofs[k].length-1) && x){
							if (cofs[k][h] == c+n+visforms[i].id) {
								som = som + parseFloat(visforms[i].children[j].children[1].innerHTML)*cofs[k][cofs[k].length-1];	
								x = false;
							}
							h++;
						}
						k++;
					}
					if (x) {
						som = som + parseFloat(visforms[i].children[j].children[1].innerHTML);	
					}
				}
				a = a + 1;
			}	
		}
	}
	if (som/a) {
		moyenne.innerHTML = (som /a).toFixed(2);
	}else{
		moyenne.innerHTML = "0.00";
	}
}

var ln,verif,o;
function inputgiven(a){
	if (a.value>20) {
		a.value = "20.00";
	}else if (a.value<0) {
		a.value = "0.00";
	}else{
		a.value = parseFloat(a.value).toFixed(2);
		if (a.value < 10) {
			a.value = "0"+a.value.toString();
		}
	}

	ln = a.parentElement.children
	verif = true
	o = 0;
	while(verif && (o <= ln.length-1)){
		console.log("l");
		if ((ln[o].tagName == "INPUT")&&(!(ln[o].value))) {
			console.log(ln[o].value);
			verif = false;
		}
		o++;
	}
	
	if (verif) {
		let s = 0;
		let c = 0;
		for (var i = ln.length - 1; i >= 0; i--) {
			if ((ln[i].tagName == "INPUT")) {
				if (ln[i].id == "sunt") {
					s = s + parseFloat(ln[i].value)*2;
				}else{
					s = s + parseFloat(ln[i].value);
				}
				c++;
			}
		}
		for (var i = ln.length - 1; i >= 0; i--) {
			if (ln[i].tagName == "DIV") {
				ln[i].children[1].innerHTML = parseFloat(s/(c+1)).toFixed(2);
			}
		}
	}
}