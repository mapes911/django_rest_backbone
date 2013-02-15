(function(exports, undefined) {

    /* a list view for experiences */
    var ExperienceListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'experience-list',

        initialize: function() {
            this.model.bind('reset', this.render, this);
        },

        render: function (eventName) {
            _.each(this.model.models, function (experience) {
                $(this.el).append(new ExperienceListItemView({model:experience}).render().el);
            }, this);
            return this;
        }
    });

    /* a list item view for each experience */
    var ExperienceListItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'experience-list-item',
        template: _.template($('#tpl-experience-list-item').html()),

        render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    /* a detail view for an experience */
    var ExperienceView = Backbone.View.extend({
        template: _.template($('#tpl-experience-details').html()),

        render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    exports.ExperienceListView = ExperienceListView;
    exports.ExperienceListItemView = ExperienceListItemView;
    exports.ExperienceView = ExperienceView;
})(suite101);