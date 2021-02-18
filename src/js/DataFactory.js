define(['ojs/ojcore'], function (oj) {
    var DataFactory = {
        resourceUrl: 'http://demo6785834.mockable.io/accounts',
        
        createDataModel: function () {
            var Data = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "_id"
            });
            return new Data();
        },
        // Create a movie collection:
        createDataCollection: function () {
            var Datas = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createDataModel()
            });
            return new Datas();
        }
    };
    return DataFactory;
});