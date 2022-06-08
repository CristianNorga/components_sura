(function (/* root, doc */) {
//?pl=eyJjdXJzbyI6InRlc3QiLCJub21icmUiOiJjcmlzdGlhbiIsImlkIjoiNyIsImNvcnJlbyI6ImNyaXN0aWFuLnJyYWdhOTVAZ21haWwuY29tIn0=&de=dataextensiontest&ae=c7ac27c7-0279-258d-15cb-4587c11e2d56&ck=id

//let url = new URL(document.location.href)
//let scriptTraking = document.getElementById('sendingInfo');
//if(!scriptTraking){document.location.reload()};

//scriptTraking = new URL(scriptTraking.attributes.src.value);

if(!scriptTraking.pathname == (url.pathname+'-send')){document.location.reload()};

window.suraResult = {};

'<ctrl:eval>
  Platform.Load("Core", "1");
  
  var decoded, payload, rowsAdd, successfulApi, error;
  payload = Request.GetQueryStringParameter('pl');
  if (payload) {
    decoded = Platform.Function.ParseJSON(Base64Decode(payload));

    var extension = Request.GetQueryStringParameter("de");
    if (extension) {
      var db = DataExtension.Init(extension);
      db.Rows.Add(decoded);
      rowsAdd = 1;
    } else {
      rowsAdd = 0;
    }

    var apiEvent = Request.GetQueryStringParameter("ae");
    if (apiEvent) {
      try {

          var contactKey = Request.GetQueryStringParameter("ck");
          var keyValue = decoded[contactKey]

          var authEndpoint = 'https://xxx.auth.marketingcloudapis.com'
          var credentials = {
              client_id: "xxx",     
              client_secret: "xxx",
              grant_type: "client_credentials"
          };
          var url = authEndpoint + '/v2/token'
          var contentType = 'application/json'

          var accessTokenRequest = HTTP.Post(url, contentType, Stringify(credentials));
          if (accessTokenRequest.StatusCode == 200) {
              var tokenResponse = Platform.Function.ParseJSON(accessTokenRequest.Response[0]);
              var accessToken = tokenResponse.access_token
              var rest_instance_url = tokenResponse.rest_instance_url
          };

          if (email != null && accessToken != null) {
              var headerNames = ["Authorization"];
              var headerValues = ["Bearer " + accessToken];
              var jsonBody = {
                  "ContactKey": keyValue,
                  "EventDefinitionKey": apiEvent,
                  "Data": decoded
              };

              var requestUrl = rest_instance_url + "/interaction/v1/events";
              var fireEntryEvent = HTTP.Post(requestUrl, contentType, Stringify(jsonBody), headerNames, headerValues);
              successfulApi = true;
          } else {
            successfulApi = false;
          };
      } catch (error) {
          successfulApi = false;
      }
    } else {
      successfulApi = false;
    }
  } else {
    error = 'no payload'
  }
  '✔';
</ctrl:eval>'

window.suraResult.de = <ctrl:var name="rowsAdd" />;
window.suraResult.ae = <ctrl:var name="successfulApi" />;
window.suraResult.error = '<ctrl:var name="error" />';
   
}(window, document));