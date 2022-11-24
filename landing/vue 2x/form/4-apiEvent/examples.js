<script runat="server">
Platform.Load("Core", "1");
try {

    //get email address posted through the form - do this for all the required fields
    var email = Request.GetQueryStringParameter("email");  

    //authenticate to get access token
    var authEndpoint = 'https://xxx.auth.marketingcloudapis.com/'  //provide authentication endpoint
    var payload = {
        client_id: "xxx",     //pass client Id
        client_secret: "xxx", //pass client secret
        grant_type: "client_credentials"
    };
    var url = authEndpoint + '/v2/token'
    var contentType = 'application/json'

    var accessTokenRequest = HTTP.Post(url, contentType, Stringify(payload));
    if (accessTokenRequest.StatusCode == 200) {
        var tokenResponse = Platform.Function.ParseJSON(accessTokenRequest.Response[0]);
        var accessToken = tokenResponse.access_token
        var rest_instance_url = tokenResponse.rest_instance_url
    };

    //make api call to fire entry event 
    if (email != null && accessToken != null) {
        var headerNames = ["Authorization"];
        var headerValues = ["Bearer " + accessToken];
        var jsonBody = {
            "ContactKey": email,   //pass contact key value
            "EventDefinitionKey": "xxx",   //provide event api definition key
            "Data": {
                "email": email    //pass all required data for the related data extension
            }
        };

        var requestUrl = rest_instance_url + "/interaction/v1/events";
        var fireEntryEvent = HTTP.Post(requestUrl, contentType, Stringify(jsonBody), headerNames, headerValues);
    };
} catch (error) {
    Write("<br>error: " + Stringify(error));
}
</script>


//

// I have used the below code:
Host: https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com
POST /interaction/v1/events
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
{
    "ContactKey": "ID601",
    "EventDefinitionKey":"APIEvent Key",
    "Data": {
        "SubscriberKey":"ID601",
        "EmailAddress":"xyz@gmail.com",
        "FirstName":"Test",
        "LastName":"Test1"}
}

//########################################//

// Journey Processing page : START 
%%[
    SET @subkey = QueryParameter('subkey')
    SET @FirstName = QueryParameter('FirstName')
    SET @email = QueryParameter('email')
    SET @Subscription_Status = QueryParameter('Subscription_Status') 
   /*Generating the AccessToken using client id and secret key*/
   VAR @callstatus, @response
   SET @payload = '{"client_id": "xxxxxxxxx", "client_secret": "xxxxxxxxxx", "grant_type": "client_credentials"}'
   SET @accessToken = HTTPPost2("https://xxxxxxxx.auth.marketingcloudapis.com/v2/token", "application/json", @payload, True, @callstatus, @response)
   ]%% 
   <script runat="server">
   /*Framing the API content and extracting only access token from the above response*/
   Platform.Load("core", "1");
   var subkey = Variable.GetValue("@subkey");
   var FirstName = Variable.GetValue("@FirstName");
   var email = Variable.GetValue("@email");
   var Subscription_Status = Variable.GetValue("@Subscription_Status");
   var accessTok = Variable.GetValue("@callstatus");
   var response_ = Platform.Function.ParseJSON(accessTok);
   var accessToken_ = response_.access_token;
   var content = { "ContactKey": subkey, 
       "EventDefinitionKey":"xxxxxx", 
       "EstablishContactKey": true, 
       "Data": { 
          "email address": email,
          "FirstName":FirstName,
          "Subscription_Status":Subscription_Status,
          "Contact Key":subkey }}
   var strContent = Platform.Function.Stringify(content);
   Variable.SetValue("@token_",'Bearer '+accessToken_); 
   Variable.SetValue("@content",strContent);
   </script>   %%[
   /*Invoking the journey API*/
   var @statusCode
   var @response
   SET @post = HTTPPost2("https://xxxxxxxx.rest.marketingcloudapis.com/interaction/v1/events","application/json",@content,false,@statusCode, @response, "Authorization", @token_)


 /* WORK Around: Contact already exists in Journey, hence update SUBSCRIPTION STATUS of ALL records of respective contact : START*/
 SET @lookUp = LookupRows('<Your Journey DE Name>','Contact Key', @subkey)
 SET @rowCount = Rowcount(@lookUp)
 IF @rowCount > 0 THEN 
   SET @updatestatusField = UpdateData('<Your Journey DE Name>',1,'Contact Key',@subkey,'Subscription_Status',@Subscription_Status)
 ENDIF
  /* WORK Around: Contact already exists in Journey, hence update SUBSCRIPTION STATUS of ALL records of respective contact : END*/
 ]%%

 %%=v(@token_)=%% <br/>
 %%=v(@statusCode)=%% <br/>
 %%=v(@content)=%%<br/>
<!-- LIVE:: Processing page : END -->


// https://onlinehelp.coveo.com/en/ces/7.0/administrator/getting_salesforce_client_id_and_client_secret_values.htm
// https://trailhead.salesforce.com/es-MX/content/learn/modules/marketing-cloud-developer-basics/set-up-your-developer-environment
// https://salesforce.stackexchange.com/questions/297291/journey-builder-api-event
// https://sfmarketing.cloud/2021/04/29/using-the-wait-until-api-event-activity/
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_platformContentSyndicationHTTPPost.html
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/createEventDefinition.html
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/postEvent.html
//https://developer.mozilla.org/es/docs/Glossary/Base64
// https://salesforce.stackexchange.com/questions/310533/marketing-cloud-api-post-interaction-v1-events-multiple-entries
// https://salesforce.stackexchange.com/questions/303787/ssjs-http-post-throws-error-instead-of-returning-status-code
// https://stackoverflow.com/questions/71105937/post-request-from-salesforce-marketing-cloud-cloudpage-to-twilio-using-ssjs
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_platformContentSyndicationScriptUtilHttpRequest.html?q=HttpRequest
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_httpPost.html


//client_id: xxxxxxxx
//client_secret: xxxxxxxx
//grant_type: client_credentials
