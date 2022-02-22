document.getElementById("submit").onclick=myFunction;

function myFunction() {

  var Tipo_ID, Numero_ID, DNI, lastName, firtsName, email, phone, useData, city;
  
  firtsName = document.getElementById("firtsName").value;
  
  lastName = document.getElementById("lastName").value;
  
  email = document.getElementById("email").value;
  
  phone = document.getElementById("telefono").value;
  
  useData = document.getElementById("Uso_Datos").value;
  
  city = document.getElementById("Ciudad").value;
  
  // DNI FUNCTION

  Tipo_ID = document.getElementById("Tipo").value;

  Numero_ID = document.getElementById("Numero").value;

  DNI = document.getElementById("DNI");

 
  switch(Tipo_ID) {

  case "Cédula de ciudadanía":

    DNI.value  = "C"+Numero_ID;

    break;

  case "Cédula de extranjería":

    DNI.value  = "E"+Numero_ID;

    break;


  case "Pasaporte":

    DNI.value  = "P"+Numero_ID;

    break;


  case "Permiso especial de permanencia":

    DNI.value  = "TE"+Numero_ID;

    break;
      
      case "Diplomático":

    DNI.value  = "D"+Numero_ID;

    break;

  default:

    DNI.value  = "C"+Numero_ID;

   }
  
  //END OF FUNCTION DNI
  
  if(!firtsName){
    firtsName = null;
  }
  if(!lastName){
    lastName = null;
  }
  if(!Tipo_ID){
    Tipo_ID = null;
  }
  if(!Numero_ID){
    Numero_ID = null;
  }
  if(!email){
    email = null;
  }
  if(!phone){
    phone = null;
  }
  if(!useData){
    return;
  }
  if(!DNI){
    DNI = null;
  }
  if(!city){
    city = null;
  }
  
  window.location.href = `https://seguros.comunicaciones.sura.com/espera-nuestra-llamada?firtsName=${firtsName}&lastName=${lastName}&Tipo_ID=${Tipo_ID}&Numero_ID=${Numero_ID}&email=${email}&phone=${phone}&useData=${useData}&DNI=${DNI.value}&city=${city}`;

}

// alimentate ejercitate