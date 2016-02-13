// JavaScript Document
// Nombre del archivo: preguntas.js


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
function unica(opciones_tag){
	var iden=opciones_tag[0].getAttribute("name");
	var opciones="<form name=\"formulario\" action=\"#\" onsubmit=\"return validacion("+iden+")\" method=\"post\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"radio\""+atributos(opciones_tag[j])+"/>"+opciones_tag[j].childNodes[0].nodeValue+"</br>";
	}
		opciones += "<input type=\"submit\" value=\"Validar\"/><input type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
	
}

//Funcion crear pregunta respuesta unica2
function unica2(opciones_tag){
	var opciones="<form name=\"formulario\" action=\"aplicacion/app\" onsubmit=\"return validacion(this)\" method=\"post\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"radio\" name=\"equipo\"/>"+opciones_tag[j]+"</br>";
	}
		opciones += "<input type=\"submit\" value=\"Enviar respuesta\"/><input type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
}

//Funcion crear pregunta respuesta multiple
function multiple(opciones_tag){
	var opciones="<form name=\"formulario\" action=\"#\" onsubmit=\"return validacion("+opciones_tag[0].getAttribute("name")+")\" method=\"post\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"checkbox\""+atributos(opciones_tag[j])+"/>"+opciones_tag[j].childNodes[0].nodeValue+"</br>";
	}
		opciones += "<input type=\"submit\" value=\"Validar\"/><input type=\"reset\" value=\"Borrar\" /></form>";
	return opciones;
}

//Funcion crear pregunta respuesta multiple2
function multiple2(opciones_tag){
	var opciones="<form name=\"formulario\" action=\"aplicacion/app\" onsubmit=\"return validacion(this)\" method=\"post\">";
	for (var j = 0; j < opciones_tag.length; j++){
	opciones += "<input type=\"checkbox\" name=\"equipo\"/>"+opciones_tag[j]+"</br>";
	}
		opciones += "<input type=\"submit\" value=\"Enviar respuesta\"/><input type=\"reset\" value=\"Borrar\" /></form>";
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
/*
//Funcion para validar el formulario
function validacion(F,nombre){
 var i;
 var ok=0;

 for(i=0; i<F.nombre.length;i++){
  if(F.nombre[i].checked)
  {
   ok=1
  }    
 }
 
 if(ok==1)
  return true
	else{
		alert("Debes seleccionar una opcion");
	return false	}
}
*/
//Funcion para validar el formulario
function validacion(iden){
 var i;
 var ok=0;
var opt=document.getElementsByName(iden[0].name);

 for(i=0; i<opt.length;i++){
 // if(opt[i].checked)
	if(opt[i].checked && opt[i].getAttribute("correcta")=="true")
  {
   ok=1
  // alert(opt[i].attributes[2].value);
  //alert(opt[i].getAttribute("correcta"));
  }    
 }

 if(ok==1)
  return true
	else{
		alert("Debes seleccionar una opcion");
	return false	}
}
