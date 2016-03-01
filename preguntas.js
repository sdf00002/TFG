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
		opciones += "<input name=\"valida"+ent+"\" type=\"button\" value=\"Validar\" onclick=\"puntuar("+iden+","+ent+")\"/><input name=\"borra"+ent+"\" type=\"reset\" value=\"Borrar\" /><form>";
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
		opciones += "<input name=\"valida"+ent+"\" type=\"button\" value=\"Validar\" onclick=\"puntuar("+iden+","+ent+")\"/><input name=\"borra"+ent+"\" type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
}

//Funcion crear pregunta numerica
function numerica(opciones_tag,ent){
	var iden=opciones_tag[0].getAttribute("name");
	//Comprobamos cual es el limite inferior y superior de la opcion
		var inferior=parseFloat(opciones_tag[0].getAttribute("inferior"));
		var superior=parseFloat(opciones_tag[0].getAttribute("superior"));
	
	var opciones="<form name=\"formulario\">";
	opciones += "Escribe el valor: <input type=\"text\""+atributos(opciones_tag[0])+" size=\"3\" maxlength=\"3\"/></br></br>";
		opciones += "<input name=\"valida"+ent+"\" type=\"button\" value=\"Validar\" onclick=\"puntuarNum("+iden+","+ent+","+inferior+","+superior+")\"/><input name=\"borra"+ent+"\" type=\"reset\" value=\"Borrar\" /></form>";
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
	var opt=document.getElementsByName(iden[0].name);
		if (validado!=false){		
			for(var i=0; i<opt.length;i++){
				if(opt[i].checked && opt[i].getAttribute("puntos")!="0"){
					puntuacion+=parseFloat(opt[i].getAttribute("puntos")); 					
				}
				opt[i].disabled = true;
			}
		}
		else{
			for(var i=0; i<opt.length;i++){
					opt[i].disabled = true;
			}
		}
		document.getElementsByName("valida"+ent)[0].disabled = true;
		document.getElementsByName("borra"+ent)[0].disabled = true;
		alert("Tu puntuación es de: "+puntuacion);
		return true;
	
}

//Funcion para puntuar una pregunta numérica

function puntuarNum(iden, ent, inf, sup){
	var puntuacion=0;
		var valor=parseFloat(iden.value);
		var puntos=document.getElementsByName(iden.name)[0].getAttribute("puntos");

		if(valor<=sup && valor>=inf)
			puntuacion+=parseFloat(puntos);
		//Deshabilitamos los botones
		document.getElementsByName("valida"+ent)[0].disabled = true;
		document.getElementsByName("borra"+ent)[0].disabled = true;
		document.getElementsByName(iden.name)[0].disabled = true;
		alert("Tu puntuación es de: "+puntuacion);
		return true;

}

//Funcion para corregir todas las preguntas a la vez
function corrige(){
		var puntuacion=0;
	// Obtenemos las opciones de la pregunta
  var opciones_tag = document.getElementsByTagName("input");
  var i=0;
  do{
	  var nombre = opciones_tag[i].getAttribute("name");
	  var nopciones = document.getElementsByName(nombre);
	  var seleccionado=validacion2(nombre);
	  //Si no hay ninguna opción señalada y la pregunta no es de tipo numérica
	  if(seleccionado==false && opciones_tag[i].getAttribute("type")!="text"){

			for(var z=0; z<nopciones.length;z++){
					nopciones[z].disabled = true;
			}
			puntuacion+=0;
		}
		else{ 
			//Si están respondidas y no son de tipo numéricas
				if(document.getElementsByName(opciones_tag[i+nopciones.length].getAttribute("name"))[0].disabled == false && opciones_tag[i].getAttribute("type")!="text"){
				for(var j=0; j<nopciones.length;j++){
					if(nopciones[j].checked && nopciones[j].getAttribute("puntos")!="0"){
						puntuacion+=parseFloat(nopciones[j].getAttribute("puntos"));
					}
					nopciones[j].disabled = true;
			}

				}
				//Si la pregunta es de tipo numérica
				if(opciones_tag[i].getAttribute("type")=="text"){
						if(document.getElementsByName(opciones_tag[i+nopciones.length].getAttribute("name"))[0].disabled == false){
					var inf=parseFloat(opciones_tag[i].getAttribute("inferior"));
					var sup=parseFloat(opciones_tag[i].getAttribute("superior"));
					var valor=parseFloat(opciones_tag[i].value);
						if(valor<=sup && valor>=inf)
							puntuacion+=parseFloat(opciones_tag[i].getAttribute("puntos"));
						}
						opciones_tag[i].disabled = true;
				}
		}
		document.getElementsByName(opciones_tag[i+nopciones.length].getAttribute("name"))[0].disabled = true;
		document.getElementsByName(opciones_tag[i+nopciones.length+1].getAttribute("name"))[0].disabled = true;
	 i=i+nopciones.length+2;
  }while(i<opciones_tag.length-1);
  
	alert("Tu puntuación es de: "+puntuacion);
	document.getElementsByName("test")[0].disabled = true;
	return true;
	
}