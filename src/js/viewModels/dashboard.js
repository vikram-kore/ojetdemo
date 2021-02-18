define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojcontext', 'ojs/ojbootstrap', 'ojs/ojanimation', 'ojs/ojinputtext', 'ojs/ojpopup', 'ojs/ojbutton', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', "ojs/ojinputsearch", "ojs/ojcheckboxset"],
 function(oj, ko, $, app, moduleUtils, Context, ojbootstrap_1, AnimationUtils, ArrayDataProvider, ListDataProviderView) {
    function DashboardViewModel() {
      var self = this;

      // header 
      var resolve = Context.getPageContext().getBusyContext().addBusyState({description: "wait for header"});

      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()})
        resolve();
      })

      self.connected = function() {
        document.title = "Dashboard";
      };

      self.disconnected = function() {

      };

      self.transitionCompleted = function() {

      };


      //filter popup
      self.startAnimationListener = (event) => {
          let ui = event.detail;
          if (event.target.id !== "popup1") {
              return;
          }
          if (ui.action === "open") {
              event.preventDefault();
              let options = { direction: "top" };
              AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
          }
          else if (ui.action === "close") {
              event.preventDefault();
              ui.endCallback();
          }
      };

      self.openListener = function() {
          let popup = document.getElementById("popup1");
          popup.open("#btnGo");
      };

      self.cancelListener = function() {
          let popup = document.getElementById("popup1");
          popup.close();
          console.log();
      };

      self.gotoaddaccountlink = function() {
          var url = window.location.href;
          url = url.split('?')[0];
          window.location.href = url+"?ojr=addaccount";
      };
      
      this.filter = ko.observable("");
      this.filterChanged = (event) => {
          const filter = event.detail.rawValue;
          const filteredCollection = this.DeptCol();
          if (this.originalDeptCol == undefined && filter !== undefined) {
              this.originalDeptCol = filteredCollection.clone();
          }

         /* while (!filteredCollection.isEmpty()) {
              filteredCollection.pop();
          }*/


        $.getJSON("http://demo6785834.mockable.io/accounts",
          function (data) {
            for(let i=0;i<data.length;i++){
              console.log(i);
              console.log(self.SalesProfileStatuscheckboxfilter().includes(data[i].SalesProfileStatus));
              if(self.SalesProfileStatuscheckboxfilter().includes(data[i].SalesProfileStatus)==true){

                data.splice(i);
              }
            }
            self.datasource(new oj.CollectionTableDataSource(self.DeptCol()));
            
        });
          
      };
      this.nameFilter = (model, attr, value) => {
          const deptName = model.get("OrganizationName");
          return deptName.toLowerCase().indexOf(value.toLowerCase()) > -1;
      };
















      this.colorOptions = [
          { id: "ACTIVE", value: "ACTIVE" },
          { id: "INACTIVE", value: "INACTIVE" },
          { id: "CANDIDATE", value: "CANDIDATE" }
      ];

      this.SalesProfileStatuscheckboxfilter = ko.observableArray([]);










      self.serviceURL = 'http://demo6785834.mockable.io/accounts';      
      self.recordcount = ko.observable(0);
      self.DeptCol = ko.observable();
      self.datasource = ko.observable();

      self.parseSaveDept = function (response) {
        return {
            SyncLocalId: response['SyncLocalId'],
            PartyNumber: response['PartyNumber'],
            OrganizationName:response['OrganizationName'],
            SalesProfileStatus:response['SalesProfileStatus'],
            OrganizationDEO_Status_c:response['OrganizationDEO_Status_c'],
            NextVisit:response['NextVisit'],
            LastVisit:response['LastVisit']

          };
      };

      self.parseDept = function(response) {
        self.recordcount(self.recordcount() + 1);
        return {SyncLocalId: response['SyncLocalId'],
            PartyNumber: response['PartyNumber'],
            OrganizationName:response['OrganizationName'],
            SalesProfileStatus:response['SalesProfileStatus'],
            OrganizationDEO_Status_c:response['OrganizationDEO_Status_c'],
            NextVisit:response['NextVisit'],
            LastVisit:response['LastVisit']};

      };
      self.Department = oj.Model.extend({
        urlRoot: self.serviceURL,
        parse: self.parseDept,
        parseSave: self.parseSaveDept,
        idAttribute: 'SyncLocalId'
      });

      self.myDept = new self.Department();
      self.DeptCollection = oj.Collection.extend({
        url: self.serviceURL,
        model: self.myDept,
        comparator: "SyncLocalId"
      });

      self.DeptCol(new self.DeptCollection());
      
      $.getJSON("http://demo6785834.mockable.io/accounts",
        function (data) {
          self.datasource(new oj.CollectionTableDataSource(self.DeptCol()));
          
      });
    }
    return DashboardViewModel;
  }
);