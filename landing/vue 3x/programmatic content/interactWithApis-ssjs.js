// interactWithApis@0.1.0 created and adapted for graphic solutions +573125802861
// test https://cloud.comunicaciones.epssura.com/ssjs-tiwa-01

window.suraResult = {
  ae: true,
  rowsAdd: 0,
  error: false,
  msError: '',
  response: '',
};

'<ctrl:eval>
  Platform.Load("Core", "1.1.5");
  
  var error, msError, response;
  error = 'false';
  msError = "";
  response = "";
  
  var api = Request.GetQueryStringParameter("api");
  if (api == "ip") {

    response = HTTP.Get('https://api.ipify.org');
    
  } else {
    error = 'true';
    msError = "no api";
    Platform.Response.Redirect("https://google.com");
  }
  "✔";
</ctrl:eval>'
  
window.suraResult.error = <ctrl:var name="error" />;
window.suraResult.msError = '<ctrl:var name="msError" />';
window.suraResult.response = '<ctrl:var name="response" />';

