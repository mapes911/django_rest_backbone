(function(exports, undefined) {

    /* a list view for experiences */
    var ExperienceListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'experience-list',

        initialize: function() {
            var self = this;
            this.model.bind('reset', this.render, this);
            // bind to the add event so we can update the list as new experiences are added.
            this.model.bind('add', function (experience) {
                $(self.el).append(new ExperienceListItemView({model:experience}).render().el);
            });
        },

        render: function (eventName) {
            // the 'model' associated with this view is actually a collection
            // so we can iterate through the models within the collection to render the
            // entire list
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

        initialize:function () {
            // bind to the change event to re-render the list item if anything changes.
            this.model.bind("change", this.render, this);
            // bind to the destroy event to unbind and remove from the dom if deleted.
            this.model.bind("destroy", this.close, this);
        },

        render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        close: function () {
            $(this.el).unbind();
            $(this.el).remove();
        }
    });

    /* a detail view for an experience */
    var ExperienceView = Backbone.View.extend({
        template: _.template($('#tpl-experience-details').html()),

        initialize:function () {
            // re-render the detail view on change.
            this.model.bind("change", this.render, this);
        },

        render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        events:{
            "click .save":"saveExperience",
            "click .delete":"deleteExperience"
        },
     
        saveExperience:function () {
            this.model.set({
                title: $('#exp_title').val(),
                moral: $('#exp_moral').val()
            });
            if (this.model.isNew()) {
                suite101.app.experienceList.create(this.model);
            } else {
                this.model.save();
            }
            return false;
        },
     
        deleteExperience:function () {
            this.model.destroy({
                success:function () {
                    alert('Experience deleted successfully');
                    window.history.back();
                }
            });
            return false;
        },
     
        close:function () {
            $(this.el).unbind();
            $(this.el).empty();
        }

    });

    exports.ExperienceListView = ExperienceListView;
    exports.ExperienceListItemView = ExperienceListItemView;
    exports.ExperienceView = ExperienceView;
})(suite101);