<script runat=server>
    Platform.Load("Core","1");
    //var TSD = Variable.GetValue("@TSD");
    //var results = TriggeredSend.Retrieve({Property:"CustomerKey",SimpleOperator:"equals",Value:TSD});
    //var count = results.length;
    //var ListID = results[0].List.ID;

    //Write the result
    //Write(Stringify(ListID));

    //Set the Variable to be accessible in AMPscript
    //Variable.SetValue("@ListID",Stringify(ListID));
    
    var DBdatatest = DataExtension.Init("dataextensiontest");
    // DBdatatest.Rows.Remove(["curso"], ["test"])
    // var test = DBdatatest.Rows.Remove(["curso"], ["test1"]);
  </script>
  <script>
    '<ctrl:eval>DBdatatest.Rows.Remove(["curso"], ["test2"])</ctrl:eval>'
  </script>