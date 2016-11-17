define(['ojs/ojcore'], function(oj) {

  var CustomerController = {
     serviceURL: 'http://127.0.0.1:7101/restapp/rest/1/Employees',
     
     createCustomerModel: function() {
         var Customer = oj.Model.extend({
                        urlRoot: this.serviceURL, 
                        idAttribute: "EmployeeId"
         });
       
         return new Customer();
     },
     
     createCustomerCollection: function() {
        var Customers = oj.Collection.extend({
                        url: this.serviceURL, 
                        fetchSize: 10,
                        model: this.createCustomerModel()
        });
        
        return new Customers();
     }
    
  }
  
  return CustomerController;
});