function myFunction(){
	var x=document.getElementById("myTopnav");
	if (x.className === "topnav"){
		x.className += " responsive";
	}else {
		x.className = "topnav";
	}
}

function dyntable(response){
	var col=[];
	var table = document.createElement("table");
	table.className = "table table-condensed";
	var tr = table.insertRow(-1); 
	for (var i = 0; i < response.result.length; i++) {
		var counter = response.result[i];    						
		if(i==0){
			for (let hdr of Object.keys(counter)) {			
				col.push(hdr.toUpperCase())
			}
			for (var k = 0; k < col.length; k++) {
				var th = document.createElement("th");      // TABLE HEADER.
				th.innerHTML = col[k];
				tr.appendChild(th);
			}
		}
		console.log("columns--->"+col);		
		tr = table.insertRow(-1);
        for (let value of Object.values(counter)) {
			var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = value;
            }       				
	}
	var divContainer = document.getElementById("result-p-confirmed");	
    divContainer.innerHTML = " ";
    divContainer.appendChild(table);

}

function loadDoc() {
		var xhttp = new XMLHttpRequest();  
		var state = document.getElementById("state");
		var statesel = state.options[state.selectedIndex].value;
		var district = document.getElementById("district");
		var districtsel = district.options[district.selectedIndex].value;	
		var response = JSON.parse('{"result":[]}');		
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
				if (xhttp.status == 200) {
					//response = JSON.parse(xhttp.response);
					response = JSON.parse('{"result":[{"State":"Tamil Nadu","active":"992","confirmed":"1372","deaths":"15","recovered":"365"}]}'); 
					dyntable(response);						
				}
				else if (xhttp.status == 400) {
					alert('There was an error 400');
				}
				else {
               //alert('something else other than 200 was returned');
				}
			}
		};
		//xhttp.open("GET", "http://127.0.0.1:9090/data?state="+statesel+"&district="+districtsel, true);
		xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts/42", true);
		xhttp.send();    
	};



function pageLoad() {   
let dropdown = document.getElementById('state');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose State        ';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;
this.items = [];
const url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          
		  if(this.items.indexOf(data[i].State) === -1) {
				this.items.push(data[i].State);
		
			}			
    	}
		items.sort();
		for (let j = 0; j < items.length; j++) {
		option = document.createElement('option');		  
      	  option.text = items[j];		  
      	  option.value = items[j];
      	  dropdown.add(option);		
		  }
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });
 }

window.onload = pageLoad;
 
function changeDistrict(){ 
var stateval = document.getElementById('state').value;
let dropdown = document.getElementById('district');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose District';
defaultOption.value = '';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;
this.items = [];
const url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;    
    	for (let i = 0; i < data.length; i++) {		
			if(data[i].State == stateval) {
				if(this.items.indexOf(data[i].District) === -1) {
					this.items.push(data[i].District);
		
				}			
			}  
    	}
		items.sort();
		for (let j = 0; j < items.length; j++) {
			option = document.createElement('option');		  
			option.text = items[j];		  
			option.value = items[j];
			dropdown.add(option);		
		}
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });
}