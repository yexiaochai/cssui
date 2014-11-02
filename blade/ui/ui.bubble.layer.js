
define(['UILayer', getAppUITemplatePath('ui.bubble.layer'), 'UIScroll'], function (UILayer, template, UIScroll) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = false;

      this.datamodel = {
        data: [],
        wrapperClass: 'cui-bubble-layer',
        upClass: 'cui-pop-triangle-up',
        downClass: 'cui-pop-triangle-down',
        curClass: 'active',
        itemStyleClass: '',
        needBorder: true,
        index: -1,
        dir: 'up'  //箭头方向默认值
      };

      this.events = {
        'click .cui-pop-list>li': 'clickAction'
      };

      this.onClick = function (data, index, el, e) {
        console.log(arguments);
        this.hide();
        //        this.setIndex(index);
      };

      this.width = null;

      //三角图标偏移量
      this.triangleLeft = null;
      this.triangleRight = null;

      this.triggerEl = null;

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      this.onClick.call(this, data, i, el, e);
    },

    initElement: function () {
      this.el = this.$el;
      this.triangleEl = this.$('.cui-pop-triangle');
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
      this.listWrapper = this.$('.cui-pop-body');
      this.listEl = this.$('.cui-pop-list');
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.cui-pop-list li').removeClass(curClass);
      this.$('li[data-index="' + i + '"]').addClass(curClass);
    },

    //位置定位
    reposition: function () {
      if (!this.triggerEl) return;
      var offset = this.triggerEl.offset();
      var step = 6, w = offset.width - step;
      var top = 0, left = 0, right;
      if (this.datamodel.dir == 'up') {
        top = (offset.top + offset.height + 8) + 'px';
      } else {
        top = (offset.top - this.el.offset().height - 8) + 'px';
      }

      left = (offset.left + 2) + 'px';

      if (offset.left + (parseInt(this.width) || w) > this.windowWidth) {
        this.el.css({
          width: this.width || w,
          top: top,
          right: '2px'
        });
      } else {
        this.el.css({
          width: this.width || w,
          top: top,
          left: left
        });
      }

      if (this.triangleLeft) {
        this.triangleEl.css({ 'left': this.triangleLeft, 'right': 'auto' });
      }
      if (this.triangleRight) {
        this.triangleEl.css({ 'right': this.triangleRight, 'left': 'auto' });
      }
    },

    isSizeOverflow: function () {
      if (!this.el) return false;
      if (this.el.height() > this.windowHeight * 0.8) return true;
      return false;
    },

    handleSizeOverflow: function () {
      if (!this.isSizeOverflow()) return;

      this.listWrapper.css({
        height: (parseInt(this.windowHeight * 0.8) + 'px'),
        overflow: 'hidden',
        position: 'relative'
      });

      this.listEl.css({ position: 'absolute', width: '100%' });

      //调用前需要重置位置
      this.reposition();

      this.scroll = new UIScroll({
        wrapper: this.listWrapper,
        scroller: this.listEl
      });
    },

    checkSizeOverflow: function () {
      this.handleSizeOverflow();
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.$el.css({ position: 'absolute' });
      });
      this.on('onShow', function () {

        //检查可视区域是否超出;
        this.checkSizeOverflow();
        this.setzIndexTop(this.el);
      });
      this.on('onHide', function () {
        if (this.scroll) this.scroll.destroy();
      });
    }

  });

});
