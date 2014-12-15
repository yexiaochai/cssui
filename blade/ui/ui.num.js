define(['UIView', getAppUITemplatePath('ui.num'), getAppUICssPath('ui.num')], function (UIView, template, style) {
  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      this.datamodel = {
        min: 1,
        max: 9,
        curNum: 1,
        unit: '',
        needText: false
      };

      this.template = template;
      this.uiStyle = style;

      this.events = {
        'click .js_num_minus': 'minusAction',
        'click .js_num_plus': 'addAction',
        'focus .js_cur_num': 'txtFocus',
        'blur .js_cur_num': 'txtBlur'
      };

      this.needRootWrapper = false;

    },

    initElement: function () {
      this.curNum = this.$('.js_cur_num');
    },

    txtFocus: function () {
      this.curNum.html('');
    },

    txtBlur: function () {
      this.setVal(this.curNum.html());
    },

    addAction: function () {
      this.setVal(this.datamodel.curNum + 1);
    },

    minusAction: function () {
      this.setVal(this.datamodel.curNum - 1);
    },

    //用于重写
    changed: function (num) {
      console.log('num changed ' + num);
    },

    getVal: function () {
      return this.datamodel.curNum;
    },

    setVal: function (v) {
      var isChange = true;
      var tmp = this.datamodel.curNum;
      if (v === '') v = tmp;
      if (v == parseInt(v)) {
        //设置值不等的时候才触发reset
        v = parseInt(v);
        this.datamodel.curNum = v;
        if (v < this.datamodel.min) {
          this.datamodel.curNum = this.datamodel.min;
        }
        if (v > this.datamodel.max) {
          this.datamodel.curNum = this.datamodel.max;
        }
        this.curNum.val(this.datamodel.curNum);
        isChange = (this.datamodel.curNum != tmp);
      }

      this.resetNum(isChange);

    },

    //重置当前值，由于数值不满足条件
    resetNum: function (isChange) {
      this.refresh();
      if (isChange) this.changed.call(this, this.datamodel.curNum);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //这里需要做数据验证
    resetPropery: function () {
      if (this.datamodel.curNum > this.datamodel.max) {
        this.datamodel.curNum = this.datamodel.max;
      } else if (this.datamodel.curNum < this.datamodel.min) {
        this.datamodel.curNum = this.datamodel.min;
      }
    },

    addEvent: function ($super) {
      $super();
    }

  });


});
