// manageDataSalesForce@2.6.3 created and adapted for graphic solutions +573125802861
// Seguros Retail - https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce@2-retail
// https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2 personas
// https://seguros.comunicaciones.sura.com/ssjs-mdsf-2 externas
// test "#19"
window.suraResult = {
  ae: true,
  rowsAdd: 0,
  error: false,
  msError: '',
  response: '',
  data: [],
};

'<ctrl:eval>
  Platform.Load("Core", "1.1.5");
  
  var rowsAdd, successfulApi, error, parsed, decoded, msError, response, groupData, fireEntryEvent;
  rowsAdd = 0;
  successfulApi = 'false';
  error = 'false';
  msError = "";
  response = "";
  groupData = [];
  
  var payload = Request.GetQueryStringParameter("pl");
  
  if (payload) {
    decoded = Base64Decode(payload);

    parsed = Platform.Function.ParseJSON(decoded);
    
    var extension = Request.GetQueryStringParameter("de");
    if (extension) {
      var typeAction = Request.GetQueryStringParameter("tp");
      var db = DataExtension.Init(extension);

      if (typeAction == "add") {
        rowsAdd = db.Rows.Add(parsed.data);

      } else if (typeAction == "read") {

        response = db.Rows.Lookup(parsed.filter, parsed.value);
        rowsAdd = response.length;

        if (rowsAdd > 1) {
          groupData = Platform.Function.Stringify(response);
        } else {
          response = Platform.Function.Stringify(response);
        }

      } else if (typeAction == "delete") {
        rowsAdd = db.Rows.Remove(parsed.filter, parsed.value);
        
      } else if (typeAction == "update") {
        rowsAdd = db.Rows.Update(parsed.data, parsed.filter, parsed.value);

      } else {
        error = 'true';
        msError = "no specified action";
        rowsAdd = 0;
      }
      
    } else {
      rowsAdd = 0;
      msError = "no specified data extension";
    }
    
    var apiEvent = Request.GetQueryStringParameter("ae");
    if (apiEvent) {
      try {
        var rest_instance_url, accessToken;

        parsed = Platform.Function.ParseJSON(decoded);
        var contactKey = Request.GetQueryStringParameter("ck");
        var keyValue = parsed.data[contactKey];

        var authEndpoint = "https://xxx.auth.marketingcloudapis.com"
        var credentials = {
            client_id: "xxx",     
            client_secret: "xxx",
            grant_type: "client_credentials"
        };
        var url = authEndpoint + "/v2/token";
        var contentType = "application/json";

        var accessTokenRequest = HTTP.Post(url, contentType, Stringify(credentials));
        if (accessTokenRequest.StatusCode == 200) {
            var tokenResponse = Platform.Function.ParseJSON(accessTokenRequest.Response[0]);
            accessToken = tokenResponse.access_token;
            rest_instance_url = tokenResponse.rest_instance_url;
        };

        if (keyValue != null && accessToken != null) {
            var headerNames = ["Authorization"];
            var headerValues = ["Bearer " + accessToken];
            var jsonBody = {
                ContactKey: keyValue,
                EventDefinitionKey: apiEvent,
                Data: parsed.data
            };
            response = headerNames;
            var requestUrl = rest_instance_url + "/interaction/v1/events";
            fireEntryEvent = HTTP.Post(requestUrl, contentType, Stringify(jsonBody), headerNames, headerValues);
            successfulApi = 'true';
        } else {
          successfulApi = 'false';
        };
      } catch (error) {
          successfulApi = 'false';
          msError = error;
          error = 'true';
      }
    } else {
      successfulApi = 'false';
    }
  } else {
    error = 'true';
    msError = "no payload";
    Platform.Response.Redirect("https://google.com");
  }
  "✔";
  </ctrl:eval>'
  
window.suraResult.ae = <ctrl:var name="successfulApi" />;
window.suraResult.rowsAdd = <ctrl:var name="rowsAdd" />;
window.suraResult.error = <ctrl:var name="error" />;
window.suraResult.msError = '<ctrl:var name="msError" />';
window.suraResult.response = '<ctrl:var name="response" />';
// window.suraResult.data = <ctrl:var name="groupData" />;
window.suraResult.data = <ctrl:var name="fireEntryEvent" />;

