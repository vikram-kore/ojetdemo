define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'account-details/loader'],
  function(ko, app, moduleUtils) {
    function Accountdetails(params) {
      var self = this;
      self.routedparams = params.params;

      self.connected = function() {
        document.title = "Account Details";
      };

      self.disconnected = function() {
      };

      self.transitionCompleted = function() {
      };

      self.goBack = function() {
        window.history.back();
      };
    }
    return Accountdetails;
  }
);