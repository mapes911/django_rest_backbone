(function(exports, undefined) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'listExperiences',
            'e/new': 'newExperience',
            'e/:id': 'experienceDetail'
        },

        listExperiences: function() {
            this.experienceList = new suite101.ExperienceCollection();
            var self = this;
            this.experienceList.fetch({
                success: function() {
                    self.experienceListView = new suite101.ExperienceListView({model: self.experienceList});
                    $('#experience-list').html(self.experienceListView.render().el);
                    if (self.requestedID) self.experienceDetail(self.requestedID);
                }
            });
        },

        experienceDetail: function(id) {
            if (this.experienceList) {
                this.experience = this.experienceList.get(id);
                this.experienceView = new suite101.ExperienceView({model: this.experience});
                $('#content').html(this.experienceView.render().el);
            }
            else {
                this.requestedID = id;
                this.listExperiences();
            }
        },

        newExperience: function() {
            if (!this.experienceList) this.listExperiences();
            if (this.experienceView) this.experienceView.close();
            this.experienceView = new suite101.ExperienceView({model:new suite101.Experience()});
            $('#content').html(this.experienceView.render().el);
        }

    });

    exports.AppRouter = AppRouter;
})(suite101);