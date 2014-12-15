define(['View', getViewTemplatePath('num'), 'UINum'], function (View, viewhtml, UINum) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      //简单num,防止重复实例化
      if (!this.num) {
        this.num = new UINum({
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num')
        });
        this.num.show();
      }

      //分别设置min、max、单位、是否可以input输入值
      if (!this.num1) {
        this.num1 = new UINum({
          datamodel: {
            min: 2,
            max: 6,
            curNum: 1,  //默认值，小于min会自动设置为min值
            unit: '只',
            needText: false
          },
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num1')
        });
        this.num1.show();
      }
      var s = '';
    },

    onHide: function () {

    }

  });
});
