define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojcontext', 'ojs/ojbootstrap', 'ojs/ojanimation', 'ojs/ojmodel', 'ojs/ojcollectiondataprovider', 'ojs/ojinputtext', 'ojs/ojpopup', 'ojs/ojbutton', 'ojs/ojlistview', "ojs/ojinputsearch", "ojs/ojcheckboxset"],
 function(oj, ko, $, app, moduleUtils, Context, ojbootstrap_1, AnimationUtils, Model, CollectionDataProvider) {
    function DashboardViewModel() {
      var self = this;

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

      
      this.handleValueChanged = (event) => {
        if (event.detail.value === null || event.detail.value === undefined || event.detail.value === "") {
          this.datasource(new CollectionDataProvider(this.listaccountscollection));
        };
        if (this.filteredCollection === undefined) {
          this.filteredCollection = this.listaccountscollection.clone();
          this.filteredDataProvider = new CollectionDataProvider(this.filteredCollection);
        }
        var ret = this.listaccountscollection.where({
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
                  return OrganizationName.toLowerCase().includes(value.toLowerCase());
              }
            },
          },
        });
        this.filteredCollection.reset(ret);
        this.datasource(this.filteredDataProvider);
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
          document.getElementById('search1').focus();
          document.getElementById('search1').value= "a";
          document.getElementById('search1').value= "";
          let popup = document.getElementById("popup1");
          popup.close();
      };

      self.gotoaddaccountlink = function() {
          var url = window.location.href;
          url = url.split('?')[0];
          window.location.href = url+"?ojr=addaccount";
      };

    }
    return DashboardViewModel;
  }
);