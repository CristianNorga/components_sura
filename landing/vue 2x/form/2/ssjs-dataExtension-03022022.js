Platform.Load("core","1");
var sending, decoded, payload, db, extension;
sending = Request.GetQueryStringParameter("isSending");
if (sending) {
  payload = Request.GetQueryStringParameter('d');
  extension = Request.GetQueryStringParameter('e');
  decoded = Platform.Function.ParseJSON(Base64Decode(payload));
  db = DataExtension.Init(extension);
  db.Rows.Add(decoded);
}

console.log('<ctrl:var name="decoded" />');

// const atributetest = document.getElementById("datasend");

// <ctrl:eval test="ok">
// Platform.Load("Core","1");
// var test1, response; 
// test1 = Request.GetFormField("test");
// if (test1 == "ok") {
//   response = "true";
//   var datatest = DataExtension.Init("dataextensiontest");
//   datatest.Rows.Add({curso:"test",nombre:"pruba de obtener atributos",id:"2",correo:"correo@correo.com"});
// } 
// else {
//   response = "false";
// }
// </ctrl:eval>;

// console.log(<ctrl:var name="response" />)

// Variable.SetValue("url", url);

// var response;
// var urltwo = "http://cloud.comunicaciones.epssura.com";
// if (url == "https://seguros.comunicaciones.sura.com" || url == "http://cloud.comunicaciones.epssura.com") {
//   response = "ok"
// } 
// else {
//   response = "NotOk"
// }

// console.log('<ctrl:var name="test1" />');

// if ((<ctrl:var name="error" /> == true)) {
//   alert('No se puede eliminar la(s) fila(s) de dataextension');
// }
// var DBdatatest = DataExtension.Init("dataextensiontest");
// var result = DBdatatest.Rows.Add({curso:"test",nombre:"INSSJS 1 script directo",correo:"correo@correo.com",id:"1"});

function createTag (tag, id, attributes) {
  let el;
  let prop;
  let document = window.document;
  let head = document.getElementsByTagName('head')[0];
  let tagEl = document.getElementById(id);

  if (!tagEl) {
    el = document.createElement(tag);
    el.id = id;

    for (prop in attributes) {
      if (attributes.hasOwnProperty(prop)) {
        el[prop] = attributes[prop];
      }
    }

    el.innerHTML = `Platform.Load("Core","1");var datatest = DataExtension.Init("dataextensiontest");datatest.Rows.Add({curso:"test",nombre:"pruba de obtener atributos",id:"1",correo:"correo@correo.com"});`;

    head.appendChild(el);
  } else if (attributes && attributes.onload) {
    if (tagEl.addEventListener) {
      // For all major browsers, except IE 8 and earlier
      tagEl.addEventListener('load', attributes.onload);
    } else if (tagEl.attachEvent) {
      // For IE 8 and earlier versions
      tagEl.attachEvent('onload', attributes.onload);
    }
  }
}

function createScript (id, src, onload, async) {
  createTag('script', id, {
    src: src,
    onload: onload,
    async: !!async,
  });
}
