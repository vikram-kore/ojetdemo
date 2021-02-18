define(['knockout', 'appController', 'ojs/ojmodule-element-utils'],
  function(ko, app, moduleUtils) {
    function MydayViewModel() {
      var self = this;

      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()})
      })

      self.connected = function() {
        document.title = "My Day";
      };

      self.disconnected = function() {
      };

      self.transitionCompleted = function() {
      };
    }
    return MydayViewModel;
  }
);
