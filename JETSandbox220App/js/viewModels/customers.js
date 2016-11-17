/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'customerController', 'jquery', 'ojs/ojmodel', 'ojs/ojcollectiontabledatasource', 
    'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojpagingcontrol'],
 function(oj, ko, customerController) {
  
    function CustomerViewModel() {
      var self = this;
      self.list = customerController.createCustomerCollection();
      self.customers = ko.observable();
      
      self.customers(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.list)));
      
      self.initialize = function(params) {
          var customerId = oj.Router.rootInstance.retrieve();
          if(customerId !== undefined && customerId !== null) {
              self.customerToSynchPromise = self.list.get(customerId);
              self.customerToSynchPromise.then(function (customerToSynch) {
                  customerToSynch.fetch();
              });
          }
      };
      
      self.addCustomer = function() {
          oj.Router.rootInstance.go("addCustomer");
      };
      
      self.editCustomer = function(customerId) {
          oj.Router.rootInstance.store(customerId);
          oj.Router.rootInstance.go("editCustomer");
      };
      
      self.deleteCustomer = function(parent, customerId) {
          self.customerToSynchPromise = parent.list.get(customerId);
          self.customerToSynchPromise.then(function (customerToSynch) {
              customerToSynch.destroy({wait: true});
          });
      };
      
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
