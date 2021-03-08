define(['knockout', 'ojs/ojcontext', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojthemeutils', 'ojs/ojmodule-element-utils', 'ojs/ojmoduleanimations', 'ojs/ojarraydataprovider', 'ojs/ojoffcanvas', 'ojs/ojknockouttemplateutils', 'ojs/ojknockout', 'ojs/ojmodule-element'],
  function(ko, Context, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ThemeUtils, moduleUtils, ModuleAnimations, ArrayDataProvider, OffcanvasUtils, KnockoutTemplateUtils) {

     function ControllerViewModel() {
      var self = this;
      self.KnockoutTemplateUtils = KnockoutTemplateUtils;
      self.manner = ko.observable('polite');
      self.message = ko.observable();
      self.waitForAnnouncement = false;
      self.navDrawerOn = false;

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      function announcementHandler(event) {
        self.waitForAnnouncement = true;
        setTimeout(function() {
          self.message(event.detail.message);
          self.manner(event.detail.manner);
          if (!self.navDrawerOn) {
            self.waitForAnnouncement = false;
          }
        }, 200);
      };

      var platform = ThemeUtils.getThemeTargetPlatform();

      var navData = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', detail: { label: 'Accounts List', iconClass: 'fa fa-house-user' } },
        { path: 'myday', detail: { label: 'My Day', iconClass: 'fa fa-route' } },
        { path: 'tasks', detail: { label: 'Tasks', iconClass: 'fa fa-mouse' } },
        { path: 'notifications', detail: { label: 'Notifications', iconClass: 'fa fa-bell' } },
        { path: 'addaccount', detail: { label: 'Add Account', iconClass: 'fa fa-plus' } },
        { path: 'accountdetails', detail: { label: 'View Account', iconClass: 'fa fa-plus' } }
      ];

      self.router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      self.router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(self.router, {
        animationCallback: platform === 'android' ?
          function(animationContext) { return 'fade' }
          : undefined
      });

      this.selection = new KnockoutRouterAdapter(self.router);
      
      var navDatatabs = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', detail: { label: 'Dashboard', iconClass: 'fa fa-house-user' } },
        { path: 'myday', detail: { label: 'My Day', iconClass: 'fa fa-route' } },
        { path: 'tasks', detail: { label: 'Tasks', iconClass: 'fa fa-mouse' } },
        { path: 'notifications', detail: { label: 'Notifications', iconClass: 'fa fa-bell' } }
      ];

      this.navDataProvidertab = new ArrayDataProvider(navDatatabs.slice(1), {keyAttributes: "path"});

      this.navDataProvider = new ArrayDataProvider(navData.slice(1).slice(0,5), {keyAttributes: "path"});

      self.toggleDrawer = function() {
        self.navDrawerOn = true;
        return OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
      }

      document.getElementById('navDrawer').addEventListener("ojclose", onNavDrawerClose);

      function onNavDrawerClose(event) {
        self.navDrawerOn = false;
        if(!self.waitForAnnouncement) {
          document.getElementById('drawerToggleButton').focus();
          return;
        }

        setTimeout(function() {
          document.getElementById('drawerToggleButton').focus();
          self.waitForAnnouncement = false;
        }, 2500);
      }

      self.getHeaderModel = function() {
        return {
          pageTitle: self.selection.state().detail.label,
          transitionCompleted: self.adjustContentPadding,
          toggleDrawer: self.toggleDrawer
        };
      };

      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
        contentElem.classList.add('oj-complete');
      }

    }
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    return new ControllerViewModel();
  }
);