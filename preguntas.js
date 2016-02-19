// JavaScript Document
// Nombre del archivo: preguntas.js

//Variable para puntuacion

function cargarXMLDoc(archivoXML) 
{
 var xmlDoc;

 if (window.XMLHttpRequest)
   {
    xmlDoc = new window.XMLHttpRequest();
    xmlDoc.open("GET", archivoXML, false);
    xmlDoc.send("");
    return xmlDoc.responseXML;
   }
 // para IE 5 y IE 6
 else if (ActiveXObject("Microsoft.XMLDOM"))
   {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.load(archivoXML);
    return xmlDoc;
   }
 alert("Error cargando el documento.");
 return null;
}

function loadXMLDoc() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLDOM");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp);
    }
  };
  xmlhttp.open("GET", "preguntas.xml", true);
  xmlhttp.send();
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
	if (xmlDoc != null)
{
	// En la variable div_preguntas obtenemos el contenedor div con el id 'preguntas'
	var div_preguntas = document.getElementById('preguntas');

 // Obtenemos la lista de preguntas
	var preguntas_tag = xmlDoc.getElementsByTagName("preguntas")[0].getElementsByTagName("pregunta");
	
	//Mezclamos un array auxiliar que nos servirá para obtener las preguntas de forma aleatoria
	var arrayaux=arrayAlea(preguntas_tag);
	for (var i = 0; i < 4; i++)
 {
  // Obtenemos el título de la pregunta
  var titulo = preguntas_tag[arrayaux[i]].getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
  //Obtenemos el tipo de la pregunta
  var tipo=preguntas_tag[arrayaux[i]].attributes[0].nodeValue;

  // Obtenemos las opciones de la pregunta
  var opciones_tag = preguntas_tag[arrayaux[i]].getElementsByTagName("opcion");
  
  var opciones="";

	if(tipo=="unica")
		opciones+=unica(opciones_tag,i);
		else
			if(tipo=="multiple")
			opciones+=multiple(opciones_tag,i);
				else
					opciones+=numerica(opciones_tag,i);

  // Modificamos el contenido html del contenedor div
   div_preguntas.innerHTML += "<p>" + titulo + "</p>"+opciones;
	
 }

}
}

//Funcion para obtener un array aleatorio dependiendo de la longitud del array de entrada
function arrayAlea(array){
	var unArray=[];
	for(var z=0;z<array.length;z++){
		unArray[z]=z;
	}
	fisher_yates(unArray);
	return unArray;
}

/*
 * Aleatoriza un array según el algoritmo de Fisher-Yates
 */
function fisher_yates(array){
    var i=array.length;
    while(i--){
        var j=Math.floor( Math.random() * (i+1) );
        var tmp=array[i];
        array[i]=array[j];
        array[j]=tmp;
    }
}
//Funcion crear pregunta respuesta unica
function unica(opciones_tag,ent){
	var iden=opciones_tag[0].getAttribute("name");
	var vector=arrayAlea(opciones_tag);
	var opciones="<form name=\"formulario\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"radio\""+atributos(opciones_tag[vector[j]])+"/>"+opciones_tag[vector[j]].childNodes[0].nodeValue+"</br>";
	}
		opciones += "<input name=\"valida"+ent+"\" type=\"button\" value=\"Validar\" onclick=\"puntuar("+iden+","+ent+")\"/><input type=\"reset\" value=\"Borrar\" /><form>";
	return opciones;
	
}


//Funcion crear pregunta respuesta multiple
function multiple(opciones_tag,ent){
	var iden=opciones_tag[0].getAttribute("name");
	var vector=arrayAlea(opciones_tag);
	var opciones="<form name=\"formulario\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"checkbox\""+atributos(opciones_tag[vector[j]])+"/>"+opciones_tag[vector[j]].childNodes[0].nodeValue+"</br>";
	}
		opciones += "<input name=\"valida"+ent+"\" type=\"button\" value=\"Validar\" onclick=\"puntuar("+iden+","+ent+")\"/><input type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
}

//Funcion crear pregunta numerica
function numerica(opciones_tag,ent){
	var iden=opciones_tag[0].getAttribute("name");
	var inferior=parseFloat(opciones_tag[0].getAttribute("value"));
	var superior=parseFloat(opciones_tag[1].getAttribute("value"));
	var opciones="<form name=\"formulario\" onsubmit=\"return puntuar("+iden+","+ent+","+inferior+","+superior+")\">";
	opciones += "Escribe el valor: <input type=\"text\" name=\""+opciones_tag[0].getAttribute("name")+"\" size=\"3\" maxlength=\"3\"/></br></br>";
		opciones += "<input name=\"valida"+ent+"\" type=\"submit\" value=\"Validar\"/><input type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
}

//Funcion para obtener los atributos de una opcion
function atributos(opcion){
	var att="";
	for (var j = 0; j < opcion.attributes.length; j++){
	att += opcion.attributes[j].nodeName+"=\""+opcion.attributes[j].nodeValue+"\"";
	}
	return att;
}

//Funcion para obtener las opciones de una pregunta
function array_opciones(opciones_tag){
	var array=[];
	for (var j = 0; j < opciones_tag.length; j++){
	array[j]= opciones_tag[j].childNodes[0].nodeValue;
	}
	return array;
}

//Funcion para validar el formulario auxiliar
function validacion2(iden){
 var i;
 var ok=0;
//var opt=document.getElementsByName(iden[0].name);
var opt=document.getElementsByName(iden);
 for(i=0; i<opt.length;i++){
	if(opt[i].checked)
  {
   ok=1
  // alert(opt[i].attributes[2].value);
  //alert(opt[i].getAttribute("correcta"));
  }    
 }

 if(ok==1)
  return true
	else{
		//alert("Debes seleccionar una opcion");
	return false	}
}


//Funcion para validar el formulario
function validacion(iden){
 var i;
 var ok=0;
var opt=document.getElementsByName(iden[0].name);
//var opt=document.getElementsByName(iden);
 for(i=0; i<opt.length;i++){
	if(opt[i].checked)
  {
   ok=1
  // alert(opt[i].attributes[2].value);
  //alert(opt[i].getAttribute("correcta"));
  }    
 }

 if(ok==1)
  return true
	else{
		//alert("Debes seleccionar una opcion");
	return false	}
}

//Funcion para validar un campo de texto
function validaTexto(iden){
var opt=iden.value;
if( opt == null || opt.length == 0)
	return false;
else 
	return true;
}

//Funcion para puntuar una pregunta unica o multiple
function puntuar(iden, ent){
	var puntuacion=0;
	var validado=validacion(iden);
		if (validado==false){
			alert("Debes seleccionar una opción");
			return false;
		}
		else {
			var opt=document.getElementsByName(iden[0].name);
			var ok=0;
			for(var i=0; i<opt.length;i++){
				if(opt[i].checked && opt[i].getAttribute("puntos")!="0"){
					puntuacion+=parseFloat(opt[i].getAttribute("puntos"));
					document.getElementsByName("valida"+ent).disabled = true; 
				}
		}
		document.getElementsByName("valida"+ent)[0].disabled = true;
		alert("Tu puntuación es de: "+puntuacion);
		return true;
	}
}

//Funcion para puntuar una pregunta numerica
/*
function puntuar(iden,ent,inf,sup){
	var puntuacion=0;
	var validado=validaTexto(iden);
	if (validado==false){
			alert("Debes incluir un valor");
			return false;
		}
			else {
			var valor=parseFloat(iden.value);
			if(valor<=sup && valor>=inf)
				puntuacion+=5;
		document.getElementsByName("valida"+ent)[0].disabled = true;
		alert("Tu puntuación es de: "+puntuacion);
		return true;
	}
}
*/
//Funcion para corregir todas las preguntas a la vez
function corrige(){
	var puntuacion=0;
	// Obtenemos las opciones de la pregunta
  var opciones_tag = document.getElementsByTagName("input");

	for(var i=0; i<opciones_tag.length-1;i=i+6){	
	//if(opciones_tag[i].type=="radio" || opciones_tag[i].type=="checkbox" || opciones_tag[i].type=="text"){
  	var nombre=opciones_tag[i].getAttribute("name");

	var seleccionado=validacion2(nombre);
	
		if(seleccionado==false){
			alert("Hay alguna pregunta sin responder");
			return false;
		}
		else {
			var opt=document.getElementsByName(nombre);
			var ok=0;
			for(var j=0; j<opt.length;j++){
				if(opt[j].checked && opt[j].getAttribute("puntos")!="0"){
					puntuacion+=parseFloat(opt[j].getAttribute("puntos"));
				}
		}		
	}
	//}
	}
	alert("Tu puntuación es de: "+puntuacion);
	document.getElementsByName("test")[0].disabled = true;
	return true;
		
}