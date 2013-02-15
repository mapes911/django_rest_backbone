(function(exports, undefined) {

    var Experience = Backbone.Model.extend({
        urlRoot: '/api/experiences/',
        defaults: {
            'id': null,
            'title': '',
            'moral': '',
            'chapters': []
        }
    });

    var ExperienceCollection = Backbone.Collection.extend({
        model: Experience,
        url: '/api/experiences/',
        parse: function(resp, xhr) {
            this.total_count = resp.count;
            this.next_page = resp.next;
            this.prev_page = resp.previous;
            return resp.results;
        }
    });

    exports.Experience = Experience;
    exports.ExperienceCollection = ExperienceCollection;
})(suite101);