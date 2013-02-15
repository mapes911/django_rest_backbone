(function(exports, undefined) {

    var suite101 = {

        initialize: function() {
            var app = new suite101.AppRouter();
            Backbone.history.start();
        }
    };

    exports.suite101 = suite101;
})(window);