define(['View', getViewTemplatePath('a'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
      _initHead: function () {
      },
    events: {
        'click .cui-citys-bd': function() {
            this.forward('b');
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
