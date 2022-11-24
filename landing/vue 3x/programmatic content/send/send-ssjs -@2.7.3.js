// manageDataSalesForce@2.8.0 created and adapted for graphic solutions +573125802861
// Seguros Retail - https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce@2-retail
// https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce-2 personas
// https://seguros.comunicaciones.sura.com/ssjs-mdsf-2 externas
// test "#17"
window.suraResult = {
  ts: true,
  ae: true,
  rowsAdd: 0,
  error: false,
  msError: '',
  response: '',
  data: [],
};

'<ctrl:eval>
  Platform.Load("Core", "1.1.5");
  
  var rowsAdd, successfulApi, error, parsed, decoded, msError, response, groupData, successTriggeredSend, db;
  rowsAdd = 0;
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
      db = DataExtension.Init(extension);

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
      } else if (typeAction == "readAll") {
        response = Platform.Function.LookupOrderedRows(extension,10000,parsed.filter + " ASC", parsed.filter, parsed.value);
        rowsAdd = response.length;
        groupData = Platform.Function.Stringify(response);
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
    }
    
    var apiEvent = Request.GetQueryStringParameter("ae");
    if (apiEvent) {
      var rest_instance_url, accessToken;

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
        var headerValues = 'Bearer ' + accessToken;
        var requestUrl = "https://mcvnfh66gf6yqz4x02rld2fvkv98.rest.marketingcloudapis.com" + "/interaction/v1/events";
        var jsonBody = {
          ContactKey: keyValue,
          EventDefinitionKey: apiEvent,
          Data: parsed.data
        };

        var fireEntryEvent = new Script.Util.HttpRequest(requestUrl);
        fireEntryEvent.emptyContentHandling = 0;
        fireEntryEvent.retries = 2;
        fireEntryEvent.continueOnError = true;
        fireEntryEvent.contentType = "application/json"
        fireEntryEvent.setHeader("Authorization", headerValues);
        fireEntryEvent.method = "POST";
        fireEntryEvent.postData = Stringify(jsonBody);


        try {
          var respEvent = fireEntryEvent.send();
          var resultStatusStr = String(respEvent.statusCode);
          
          if (resultStatusStr == 201) {
            var resultContentStr = String(respEvent.Content);
            var resultContentJSON = Platform.Function.ParseJSON(resultContentStr);
            response = resultContentJSON["Response"][0];
            if (response.eventInstanceId != null && response.eventInstanceId != "") {
              successfulApi = 'true'
            } else {
              successfulApi = 'false'
              error = 'true';
              msError = "eventInstanceId null or empty";
            }
          } else {
            successfulApi = 'false';
            error = 'true';
            msError = resultStatusStr;
          }
        } catch (error) {
          successfulApi = 'false';
          msError = error;
          error = 'true';
        } 

      } else {
        successfulApi = 'false';
      }
    } else {
      successfulApi = 'false';
    }

    var customerKey = Request.GetQueryStringParameter("tsd");
    if (customerKey) {
      var triggeredSend = TriggeredSend.Init(customerKey);
      var statusTriggeredSend = triggeredSend.Send(parsed.subscriberEmail, parsed.data);
      if(statusTriggeredSend != "OK") {
        msError = TriggeredSend.LastMessage;
        successTriggeredSend = 'false';
      } else {
        successTriggeredSend = 'true';
      }
    } else {
      successTriggeredSend = 'false';
    }
  } else {
    error = 'true';
    msError = "no payload";
    Platform.Response.Redirect("https://google.com");
  }
  "✔";
  </ctrl:eval>'
  
window.suraResult.ae = <ctrl:var name="successfulApi" />;
window.suraResult.ts = <ctrl:var name="successTriggeredSend" />;
window.suraResult.rowsAdd = <ctrl:var name="rowsAdd" />;
window.suraResult.error = <ctrl:var name="error" />;
window.suraResult.msError = '<ctrl:var name="msError" />';
window.suraResult.response = '<ctrl:var name="response" />';
window.suraResult.data = <ctrl:var name="groupData" />;