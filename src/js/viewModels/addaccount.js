define(['ojs/ojcore', 'knockout', 'ojs/ojcorerouter', 'appController', "ojs/ojbootstrap", "ojs/ojarraydataprovider", 'ojs/ojmodule-element-utils', "ojs/ojasyncvalidator-regexp", 'ojs/ojanimation', 'ojs/ojknockout-keyset', "ojs/ojprogress-bar", "ojs/ojbutton", "ojs/ojtrain", 'ojs/ojswitcher',
  'ojs/ojradioset', 'ojs/ojrouter', "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojselectsingle", "ojs/ojmessages", 'ojs/ojrouter', "ojs/ojformlayout", "ojs/ojinputnumber", 'ojs/ojlistview', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox', 'ojs/ojlabel'],
  function(oj, ko, CoreRouter, app, Bootstrap, ArrayDataProvider, moduleUtils, AsyncRegExpValidator, AnimationUtils, keySet) {
    function AddaccountViewModel(params) {
      var self = this;
      self.step = ko.observable(0);
      self.steptxt = ko.observable("Step 1 / Step 4");
      self.progressValue = ko.pureComputed(() => {
          return Math.min(self.step(), 100);
      });
      self.step(25);
      self.selectedStepValue = ko.observable("25");
      self.selectedStepLabel = ko.observable("Step One");
      self.stepArray = ko.observableArray([
          { label: "Step One", id: "25", disabled: false },
          { label: "Step Two", id: "50", disabled: false },
          { label: "Step Three", id: "75", disabled: false },
          { label: "Step Four", id: "100", disabled: false }
      ]);
      self.update = (event) => {
          var train = document.getElementById("addaccounttrain");
          let selectedStep = train.getStep(event.detail.value);
          self.step(event.detail.value);
          if (selectedStep != null) {
              self.selectedStepLabel(selectedStep.label);
          }
      };

      self.connected = function() {
        document.title = "Add Account";
      };

      self.disconnected = function() {
      };

      self.transitionCompleted = function() {
      };

      this.gotonextstep = (event, context) => {
          var train = document.getElementById("addaccounttrain");
          if(context.selectedStepValue()==25){
            document.getElementById("accname").validate().then((result1) => {
              if(result1 === "valid"){
                document.getElementById("channel").validate().then((result2) => {
                  if(result2 === "valid"){
                    document.getElementById("type").validate().then((result3) => {
                      if(result3 === "valid"){
                        document.getElementById("accclass").validate().then((result4) => {
                          if(result4 === "valid"){
                            self.steptxt("Step 2 / Step 4");
                            let selectedStep = train.getStep(50);
                            self.step(50);
                            self.selectedStepValue('50');
                            if (selectedStep != null) {
                                self.selectedStepLabel(selectedStep.label);
                            }
                          }
                        });
                      }
                    });
                  }
                });
              }         
            });
          }else if(context.selectedStepValue()==50){
            document.getElementById("address1").validate().then((result5) => {
              if(result5 === "valid"){
                document.getElementById("address2").validate().then((result6) => {
                  if(result6 === "valid"){
                    document.getElementById("country").validate().then((result7) => {
                      if(result7 === "valid"){
                        document.getElementById("city").validate().then((result8) => {
                          if(result8 === "valid"){
                            document.getElementById("pincode").validate().then((result9) => {
                              if(result9 === "valid"){
                                document.getElementById("state").validate().then((result10) => {
                                  if(result10 === "valid"){
                                    document.getElementById("latitude").validate().then((result11) => {
                                      if(result11 === "valid"){
                                        document.getElementById("longitude").validate().then((result12) => {
                                          if(result12 === "valid"){
                                            document.getElementById("addresstype").validate().then((result13) => {
                                              if(result13 === "valid"){
                                                self.steptxt("Step 3 / Step 4");
                                                let selectedStep = train.getStep(75);
                                                self.step(75);
                                                self.selectedStepValue('75');
                                                if (selectedStep != null) {
                                                  self.selectedStepLabel(selectedStep.label);
                                                }
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }else if(context.selectedStepValue()==75){
            document.getElementById("ctype").validate().then((result14) => {
              if(result14 === "valid"){
                document.getElementById("cprefix").validate().then((result15) => {
                  if(result15 === "valid"){
                    document.getElementById("fname").validate().then((result16) => {
                      if(result16 === "valid"){
                        document.getElementById("lname").validate().then((result17) => {
                          if(result17 === "valid"){
                            document.getElementById("crole").validate().then((result18) => {
                              if(result18 === "valid"){
                                document.getElementById("crole").validate().then((result19) => {
                                  if(result19 === "valid"){
                                    document.getElementById("cccode").validate().then((result20) => {
                                      if(result20 === "valid"){
                                        document.getElementById("ctelephone").validate().then((result21) => {
                                          if(result21 === "valid"){
                                            document.getElementById("cemailid").validate().then((result22) => {
                                              if(result22 === "valid"){
                                                document.getElementById("cprefferedtype").validate().then((result23) => {
                                                  if(result23 === "valid"){
                                                    self.steptxt("Step 4 / Step 4");
                                                    let selectedStep = train.getStep(100);
                                                    self.step(100);
                                                    self.selectedStepValue('100');
                                                    if (selectedStep != null) {
                                                        self.selectedStepLabel(selectedStep.label);
                                                    }
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }          
      };

      self.gotolaststep = (event, context) => {
          var train = document.getElementById("addaccounttrain");
          if(context.selectedStepValue()==50){
            self.steptxt("Step 1 / Step 4");
            let selectedStep = train.getStep(25);
            self.step(25);
            self.selectedStepValue('25');
            if (selectedStep != null) {
                self.selectedStepLabel(selectedStep.label);
            }
          }else if(context.selectedStepValue()==75){
            self.steptxt("Step 2 / Step 4");
            let selectedStep = train.getStep(50);
            self.step(50);
            self.selectedStepValue('50');
            if (selectedStep != null) {
                self.selectedStepLabel(selectedStep.label);
            }
          }else if(context.selectedStepValue()==100){
            self.steptxt("Step 3 / Step 4");
            let selectedStep = train.getStep(75);
            self.step(75);
            self.selectedStepValue('75');
            if (selectedStep != null) {
                self.selectedStepLabel(selectedStep.label);
            }
          }
      };

      let channels = [
          { value: "A", label: "Channel 1" },
          { value: "B", label: "Channel 2" },
          { value: "C", label: "Channel 3" },
          { value: "D", label: "Channel 4" },
          { value: "E", label: "Channel 5" },
      ];
      self.channelsdp = new ArrayDataProvider(channels, {
          keyAttributes: "value",
      });

      let types = [
          { value: "A", label: "types 1" },
          { value: "B", label: "types 2" },
          { value: "C", label: "types 3" },
          { value: "D", label: "types 4" },
          { value: "E", label: "types 5" },
      ];
      self.typesdp = new ArrayDataProvider(types, {
          keyAttributes: "value",
      });

      let countries = [
          { value: "A", label: "country 1" },
          { value: "B", label: "country 2" },
          { value: "C", label: "country 3" },
          { value: "D", label: "country 4" },
          { value: "E", label: "country 5" },
      ];
      self.countriesdp = new ArrayDataProvider(countries, {
          keyAttributes: "value",
      });

      let cities = [
          { value: "A", label: "city 1" },
          { value: "B", label: "city 2" },
          { value: "C", label: "city 3" },
          { value: "D", label: "city 4" },
          { value: "E", label: "city 5" },
      ];
      self.citiesdp = new ArrayDataProvider(cities, {
          keyAttributes: "value",
      });

      let states = [
          { value: "A", label: "state 1" },
          { value: "B", label: "state 2" },
          { value: "C", label: "state 3" },
          { value: "D", label: "state 4" },
          { value: "E", label: "state 5" },
      ];
      self.statesdp = new ArrayDataProvider(states, {
          keyAttributes: "value",
      });

      let ctypes = [
          { value: "A", label: "Contact types 1" },
          { value: "B", label: "Contact types 2" },
          { value: "C", label: "Contact types 3" },
          { value: "D", label: "Contact types 4" },
          { value: "E", label: "Contact types 5" },
      ];
      self.ctypesdp = new ArrayDataProvider(ctypes, {
          keyAttributes: "value",
      });

      let cprefixes = [
          { value: "A", label: "Mr." },
          { value: "B", label: "Miss" },
          { value: "C", label: "Mrs" },
      ];
      self.cprefixdp = new ArrayDataProvider(cprefixes, {
          keyAttributes: "value",
      });

      let croles = [
          { value: "A", label: "Role 1" },
          { value: "B", label: "Role 2" },
          { value: "C", label: "Role 3" },
      ];
      self.crolesdp = new ArrayDataProvider(croles, {
          keyAttributes: "value",
      });

      let cccodes = [
          { value: "A", label: "+91 - India" }
      ];
      self.cccodedp = new ArrayDataProvider(cccodes, {
          keyAttributes: "value",
      });

      let additionalinfo = [
          { value: "A", label: "additional info 1" },
          { value: "B", label: "additional info 2" },
          { value: "C", label: "additional info 3" },
      ];
      self.additionalinfodp = new ArrayDataProvider(additionalinfo, {
          keyAttributes: "value",
      });

      let primaryconsumers = [
          { value: "A", label: "primary info 1" },
          { value: "B", label: "primary info 2" },
          { value: "C", label: "primary info 3" },
      ];
      self.primaryconsumerinfodp = new ArrayDataProvider(primaryconsumers, {
          keyAttributes: "value",
      });

      let secondaryconsumers = [
          { value: "A", label: "secondary info 1" },
          { value: "B", label: "secondary info 2" },
          { value: "C", label: "secondary info 3" },
      ];
      self.secondaryconsumerinfodp = new ArrayDataProvider(secondaryconsumers, {
          keyAttributes: "value",
      });

      self.accountforminfo ={
          accname : ko.observable(""),
          channel : ko.observable(),
          type : ko.observable(),
          accclass : ko.observable("W"),
          address1 : ko.observable(),
          address2 : ko.observable(),
          country : ko.observable(),
          city : ko.observable(),
          pincode : ko.observable(),
          state : ko.observable(),
          latitude :ko.observable(),
          longitude :ko.observable(),
          addresstype :ko.observable("A"),
          ctype :ko.observable(),
          cprefix :ko.observable(),
          fname :ko.observable(),
          lname :ko.observable(),
          crole :ko.observable(),
          cccode :ko.observable(),
          ctelephone :ko.observable(),
          cemailid :ko.observable(),
          cprefferedtype :ko.observable("Email"),
          aadditionalinfo :ko.observable(),
          aadditionalinfo1 :ko.observable(),
          primaryconsumerinfo :ko.observable(),
          secondaryconsumerinfo : ko.observable()
      };

      self.getLocation = function () {
        var permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, function( status ) {
          if ( status.hasPermission ) {

            navigator.geolocation.getCurrentPosition(self.onLocationSuccess, onLocationError, { enableHighAccuracy: true });

          } else {

            permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, success, error);

            function error() {
              alert('Location permission is not turned on');
            }

            function success( status ) {
              if(!status.hasPermission) {
                error();
              } else {
                navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { enableHighAccuracy: true });
              }
            }
          }
        });
      };

      self.onLocationSuccess = function (position) {
        self.accountforminfo.latitude(position.coords.latitude);
        self.accountforminfo.longitude(position.coords.longitude);
      };

      function onLocationError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      }

      self.goBack = function() {
        window.history.back();
      };

      self.emailPatternValidator = ko.observableArray([
          new AsyncRegExpValidator({
              pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
              hint: "enter a valid email format",
              messageDetail: "Not a valid email format",
          }),
      ]);

      self.mobilePatternValidator = ko.observableArray([
          new AsyncRegExpValidator({
              pattern: "[0-9]{10,}",
              hint: "Enter a valid Mobile format",
              messageDetail: "Not a valid Mobile format",
          }),
      ]);

      self.pincodePatternValidator = ko.observableArray([
          new AsyncRegExpValidator({
              pattern: "[0-9]{6,}",
              hint: "Enter a valid Pincode format",
              messageDetail: "Not a valid Pincode format",
          }),
      ]);

      self.submitaccountinfo = function() {
          document.getElementById("aadditionalinfo").validate().then((result24) => {
            if(result24 === "valid"){
              document.getElementById("aadditionalinfo1").validate().then((result25) => {
                if(result25 === "valid"){
                  document.getElementById("primaryconsumerinfo").validate().then((result26) => {
                    if(result26 === "valid"){
                      document.getElementById("secondaryconsumerinfo").validate().then((result27) => {
                        if(result27 === "valid"){
                          localStorage.setItem("Account", JSON.stringify({   
                            accname : self.accountforminfo.accname(),
                            channel : self.accountforminfo.channel(),
                            type : self.accountforminfo.type(),
                            accclass : self.accountforminfo.accclass(),
                            address1 : self.accountforminfo.address1(),
                            address2 : self.accountforminfo.address2(),
                            country : self.accountforminfo.country(),
                            city : self.accountforminfo.city(),
                            pincode : self.accountforminfo.pincode(),
                            state : self.accountforminfo.state(),
                            latitude : self.accountforminfo.latitude(),
                            longitude : self.accountforminfo.longitude(),
                            addresstype : self.accountforminfo.addresstype(),
                            ctype : self.accountforminfo.ctype(),
                            cprefix : self.accountforminfo.cprefix(),
                            fname : self.accountforminfo.fname(),
                            lname : self.accountforminfo.lname(),
                            crole : self.accountforminfo.crole(),
                            cccode : self.accountforminfo.cccode(),
                            ctelephone : self.accountforminfo.ctelephone(),
                            cemailid : self.accountforminfo.cemailid(),
                            cprefferedtype : self.accountforminfo.cprefferedtype(),
                            aadditionalinfo : self.accountforminfo.aadditionalinfo(),
                            aadditionalinfo1 : self.accountforminfo.aadditionalinfo1(),
                            primaryconsumerinfo : self.accountforminfo.primaryconsumerinfo(),
                            secondaryconsumerinfo : self.accountforminfo.secondaryconsumerinfo()
                          }));

                          var url = window.location.href;
                          url = url.split('?')[0];
                          window.location.href = url+"?ojr=dashboard";
                        }
                      });
                    }
                  });
                }
              });
            }
          });
      };

      self.startAnimationListener = (event) => {
          let ui = event.detail;
          if (event.target.id !== "pickcontactpopup") {
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

        var permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.READ_CONTACTS, function( status ) {
          if ( status.hasPermission ) {
                var options = new ContactFindOptions();
                options.filter = "";
                options.multiple = true;
                var filter = ["displayName", "addresses"];
                navigator.contacts.find(filter, onSuccess, onError, options);
          } else {

            permissions.requestPermission(permissions.READ_CONTACTS, success, error);

            function error() {
              alert('Location permission is not turned on');
            }

            function success( status ) {
              if(!status.hasPermission) {
                error();
              } else {

                var options = new ContactFindOptions();
                options.filter = "";
                options.multiple = true;
                var filter = ["displayName", "addresses"];
                navigator.contacts.find(filter, onSuccess, onError, options);
              }
            }
          }
        });
          
      };

      self.cancelListener = function() {
          let popup = document.getElementById("pickcontactpopup");
          popup.close();
          console.log();
      };

      self.contactdataProvider = ko.observable();

      self.contactselectedItems = new keySet.ObservableKeySet();
        
      this.contactselectedSelectionMode = ko.observable('single');

      this.contactcurrentItem = ko.observable();

      function onSuccess(contacts) {
          var contactsdata = [{"id":"1","name":"test"},{"id":"2","name":"Vikram Kore"},{"id":"3","name":"vk"},{"id":"4","name":"mack"},{"id":"5","name":"hitlr"}];
          for (var i = 0; i < contacts.length; i++) {
            contactsdata.push({ id:contacts[i].id, name: contacts[i].displayName})
          }
          console.log(JSON.stringify(contactsdata));
          this.allItems = ko.observableArray(contactsdata)
          
   
          self.contactdataProvider(new ArrayDataProvider(this.allItems, {idAttribute: "id"}));

          this.getDisplayValue = function(set) {
              var text;
              var arr = [];
              if (set.isAddAll()) 
              {
                  text = "Everything selected";
                  set.deletedValues().forEach(function(key)
                  {
                      arr.push(key);
                  });
                  if (arr.length > 0) 
                  {
                      text = text + " except: " + JSON.stringify(arr);
                  }
              } 
              else 
              {
                  set.values().forEach(function(key)
                  {
                      arr.push(key);
                  });    
                  text = JSON.stringify(arr);                        
              }
              return text;
          };
  
          this.handleCheckbox = function(id) {
              return this.contactselectedItems().has(id) ? ["checked"] : [];
          }.bind(this);
  
          this.checkboxListener = function (event) {
              if (event.detail != null)
              {
                  var value = event.detail.value;
                  var newSelectedItems;
                  var id = event.target.dataset.rowId;
                  if (value.length > 0)
                  {
                      if (this.contactselectedSelectionMode() === "single")
                      {
                          this.contactselectedItems.clear();
                      }
                      this.contactselectedItems.add([id]);
                      this.contactcurrentItem(id);
                  }
                  else
                  {
                      this.contactselectedItems.delete([id]);
                      this.contactcurrentItem('');
                  }
              }
          }.bind(this);




          let popup = document.getElementById("pickcontactpopup");
          popup.open("#btnGo");
      };



      //var contactsdata = [{"id":"1","name":"test"},{"id":"2","name":"Vikram Kore"},{"id":"3","name":"vk"},{"id":"4","name":"mack"},{"id":"5","name":"hitlr"}];
          
          

      function onError(contactError) {
          alert('onError!');
      };
    }
    return AddaccountViewModel;
  }
);