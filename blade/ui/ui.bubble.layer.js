
define(['UILayer', getAppUITemplatePath('ui.bubble.layer')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = false;
      //      this.needReposition = false;

      this.datamodel = {
        data: [],
        upClass: 'cm-pop--triangle-up',
        downClass: 'cm-pop--triangle-down',
        curClass: 'active',
        itemStyleClass: '',
        needBorder: true,
        index: -1,
        dir: 'up'  //箭头方向默认值
      };

      this.events = {
        'click .cm-pop-list>li': 'clickAction'
      };

      this.onClick = function (data, index, el, e) {
        console.log(arguments);
        this.setIndex(index);
        var e = '';
      };

      this.width = null;

      //三角图标偏移量
      this.triangleLeft = null;
      this.triangleRight = null;

      this.triggerEl = null;

      //      this.animateShowAction = function (el) {
      //        el.css({
      //          opacity: 0,
      //          '-webkit-transform': 'translate(0, -100%)',
      //          transform: 'translate(0,  -100%)'
      //        });
      //        el.show().animate({
      //          opacity: 1,
      //          '-webkit-transform': 'translate(0, 0)',
      //          transform: 'translate(0, 0)'
      //        }, 300, 'ease-in-out', $.proxy(function () {
      //          this.$el.css({
      //            opacity: '',
      //            '-webkit-transform': '',
      //            transform: ''
      //          });
      //        }, this));
      //      };

      //      this.animateHideAction = function (el) {
      //        el.animate({
      //          opacity: 0,
      //          '-webkit-transform': 'translate(0, -100%)',
      //          transform: 'translate(0,  -100%)'
      //        }, 300, 'ease-in-out', $.proxy(function () {
      //          this.$el.css({
      //            opacity: '',
      //            '-webkit-transform': '',
      //            transform: ''
      //          });
      //          el.hide();
      //        }, this));
      //      };

      this.animateShowAction = function (el) {
        el.show();
        el.addClass('cm-up-in');

        setTimeout(function () {
          el.removeClass('cm-up-in');
        }, 300)

      };

      this.animateHideAction = function (el) {
        //        el.show();
        el.addClass('cm-up-out');

        setTimeout(function () {
          el.removeClass('cm-up-out');
          el.hide();
        }, 300)

      };

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
      this.triangleEl = this.$('.icond-pop-triangle');
      this.windowWidth = $(window).width();
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.cm-pop-list li').removeClass(curClass);
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

      if (offset.left + (this.width || w) > this.windowWidth) {
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

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.$el.css({ position: 'absolute' });
      });
      this.on('onShow', function () {
        this.setzIndexTop(this.el);

      });
    }

  });

});
