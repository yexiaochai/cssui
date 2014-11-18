define(['View', getViewTemplatePath('b'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

    return _.inherit(View, {
        onCreate: function () {
            this.$el.html(viewhtml);
        },

        events: {
            'click .returnico': function(e) {
                this.back('a');
            },
            'click .cui-citys-bd': function() {
                this.back('a');
            }
        },

        onPreShow: function () {
            this.turning();
        },

        onShow: function () {
        },

        onHide: function () {
        }

    });
});
