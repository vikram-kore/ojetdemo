define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojcontext', 'ojs/ojbootstrap', 'ojs/ojanimation', 'ojs/ojmodel', 'ojs/ojcollectiondataprovider', 'ojs/ojinputtext', 'ojs/ojpopup', 'ojs/ojbutton', 'ojs/ojlistview', "ojs/ojinputsearch", "ojs/ojcheckboxset"],
 function(oj, ko, $, app, moduleUtils, Context, ojbootstrap_1, AnimationUtils, Model, CollectionDataProvider) {
    function DashboardViewModel(params) {
      var self = this;
      self.router = params.parentRouter;
      self.recordcount = ko.observable(0);

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
    

      self.colorOptions = [
          { id: "ACTIVE", value: "ACTIVE" },
          { id: "INACTIVE", value: "INACTIVE" },
          { id: "CANDIDATE", value: "CANDIDATE" }
      ];

      self.SalesProfileStatuscheckboxfilter = ko.observableArray([]);

      self.serviceURL = 'http://demo6785834.mockable.io/accounts'; 
      

      function parseItem(response) {
        self.recordcount(self.recordcount()+1);
        return {
          SyncLocalId: response['SyncLocalId'],
            PartyNumber: response['PartyNumber'],
            OrganizationName:response['OrganizationName'],
            SalesProfileStatus:response['SalesProfileStatus'],
            OrganizationDEO_Status_c:response['OrganizationDEO_Status_c'],
            NextVisit:response['NextVisit'],
            LastVisit:response['LastVisit']
        }
      }

      var Accountmodal = Model.Model.extend({
        urlRoot: self.serviceURL,
        parse: parseItem,
        idAttribute: 'SyncLocalId'
      });

      var AccountsCollection = new Model.Collection.extend({
        url: self.serviceURL,
        model: Accountmodal,
        comparator: 'SyncLocalId'
      });

      self.listaccountscollection = new AccountsCollection();

      self.datasource = ko.observableArray();

      self.datasource(new CollectionDataProvider(self.listaccountscollection));

      self.filter = ko.observable();
      
      self.handleValueChanged = (event) => {
          if (event.detail.value === null || event.detail.value === undefined || event.detail.value === "") {
            self.datasource(new CollectionDataProvider(self.listaccountscollection));
          };
          if (self.filteredCollection === undefined) {
            self.filteredCollection = self.listaccountscollection.clone();
            self.filteredDataProvider = new CollectionDataProvider(self.filteredCollection);
          }
          var ret = self.listaccountscollection.where({
            OrganizationName: {
              value: event.detail.value,
              comparator: (model, attr, value) => {
                let OrganizationName = model.get("OrganizationName");
                if(self.SalesProfileStatuscheckboxfilter().length>0){
                    if(self.SalesProfileStatuscheckboxfilter().includes(model.get("SalesProfileStatus").trim())==true){
                      return OrganizationName.toLowerCase().includes(value.toLowerCase());
                    }else{
                      return false;
                    }
                }else{
                  if(value.length>0){
                    return OrganizationName.toLowerCase().includes(value.toLowerCase());
                  }else{
                    return true;
                  }
                }
              },
            },
          });
          self.filteredCollection.reset(ret);
          self.datasource(self.filteredDataProvider);
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
          if (self.filter() === null || self.filter() === undefined || self.filter() === "") {
            self.datasource(new CollectionDataProvider(self.listaccountscollection));
          }
          if (self.filteredCollection === undefined) {
            self.filteredCollection = self.listaccountscollection.clone();
            self.filteredDataProvider = new CollectionDataProvider(self.filteredCollection);
          }
          var ret = self.listaccountscollection.where({
            OrganizationName: {
              value: self.filter(),
              comparator: (model, attr, value) => {
                let OrganizationName = model.get("OrganizationName");
                if(self.SalesProfileStatuscheckboxfilter().length>0){
                    if(self.SalesProfileStatuscheckboxfilter().includes(model.get("SalesProfileStatus").trim())==true){
                      if (self.filter() === null || self.filter() === undefined || self.filter() === "") {
                        return true;
                      }else{
                        return OrganizationName.toLowerCase().includes(value.toLowerCase());
                      }
                    }else{
                      return false;
                    }
                }else{
                  if (self.filter() === null || self.filter() === undefined || self.filter() === "") {
                    return true;
                  }else{
                    return OrganizationName.toLowerCase().includes(value.toLowerCase());
                  }
                }
              },
            },
          });
          self.filteredCollection.reset(ret);
          self.datasource(self.filteredDataProvider);
          let popup = document.getElementById("popup1");
          popup.close();
      };

      self.gotoaddaccountlink = function() {
          self.router.go({path:'addaccount',params:{}});
      };

    }
    return DashboardViewModel;
  }
);