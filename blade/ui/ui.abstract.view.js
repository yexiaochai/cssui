define([], function () {

  var getBiggerzIndex = (function () {
    var index = 3000;
    return function (level) {
      return level + (++index);
    };
  })();

  return _.inherit({
    propertys: function () {
      //模板状态
      this.wrapper = $('body');
      this.id = _.uniqueId('ui-view-');

      this.template = '';

      //与模板对应的css文件，默认不存在，需要各个组件复写
      this.uiStyle = null;

      //保存样式格式化结束的字符串
      //      this.formateStyle = null;

      //保存shadow dom的引用，用于事件代理
      this.shadowDom = null;
      this.shadowStyle = null;
      this.shadowRoot = null;

      //框架统一开关，是否开启shadow dom
      this.openShadowDom = true;

//      this.openShadowDom = false;

      //不支持创建接口便关闭，也许有其它因素导致，这个后期已接口放出
      if (!this.wrapper[0].createShadowRoot) {
        this.openShadowDom = false;
      }

      this.datamodel = {};
      this.events = {};

      //自定义事件
      //此处需要注意mask 绑定事件前后问题，考虑scroll.radio插件类型的mask应用，考虑组件通信
      this.eventArr = {};

      //初始状态为实例化
      this.status = 'init';

      this.animateShowAction = null;
      this.animateHideAction = null;

      //      this.availableFn = function () { }

    },

    on: function (type, fn, insert) {
      if (!this.eventArr[type]) this.eventArr[type] = [];

      //头部插入
      if (insert) {
        this.eventArr[type].splice(0, 0, fn);
      } else {
        this.eventArr[type].push(fn);
      }
    },

    off: function (type, fn) {
      if (!this.eventArr[type]) return;
      if (fn) {
        this.eventArr[type] = _.without(this.eventArr[type], fn);
      } else {
        this.eventArr[type] = [];
      }
    },

    trigger: function (type) {
      var _slice = Array.prototype.slice;
      var args = _slice.call(arguments, 1);
      var events = this.eventArr;
      var results = [], i, l;

      if (events[type]) {
        for (i = 0, l = events[type].length; i < l; i++) {
          results[results.length] = events[type][i].apply(this, args);
        }
      }
      return results;
    },

    bindEvents: function () {
      var events = this.events;
      var el = this.$el;
      if (this.openShadowDom) el = this.shadowRoot;

      if (!(events || (events = _.result(this, 'events')))) return this;
      this.unBindEvents();

      // 解析event参数的正则
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var key, method, match, eventName, selector;

      // 做简单的字符串数据解析
      for (key in events) {
        method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        match = key.match(delegateEventSplitter);
        eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateUIEvents' + this.id;

        if (selector === '') {
          el.on(eventName, method);
        } else {
          el.on(eventName, selector, method);
        }
      }

      return this;
    },

    unBindEvents: function () {
      var el = this.$el;
      if (this.openShadowDom) el = this.shadowRoot;

      el.off('.delegateUIEvents' + this.id);
      return this;
    },

    createRoot: function (html) {

      this.$el = $('<div class="view" style="display: none; " id="' + this.id + '"></div>');
      var style = this.getInlineStyle();

      //如果存在shadow dom接口，并且框架开启了shadow dom
      if (this.openShadowDom) {
        //在框架创建的子元素层面创建沙箱
        this.shadowRoot = $(this.$el[0].createShadowRoot());

        this.shadowDom = $('<div class="js_shadow_root">' + html + '</div>');
        this.shadowStyle = $(style);

        //开启shadow dom情况下，组件需要被包裹起来
        this.shadowRoot.append(this.shadowStyle);
        this.shadowRoot.append(this.shadowDom);

      } else {

        this.$el.html(style + html);
      }
    },

    getInlineStyle: function () {
      //如果不存在便不予理睬
      if (!_.isString(this.uiStyle)) return null;
      var style = this.uiStyle, uid = this.id;

      //在此处理shadow dom的样式，直接返回处理结束后的html字符串
      if (!this.openShadowDom) {
        //创建定制化的style字符串，会模拟一个沙箱，该组件样式不会对外影响，实现原理便是加上#id 前缀
        style = style.replace(/(\s*)([^\{\}]+)\{/g, function (a, b, c) {
          return b + c.replace(/([^,]+)/g, '#' + uid + ' $1') + '{';
        });
      }

      style = '<style >' + style + '</style>';
      this.formateStyle = style;
      return style;
    },

    render: function (callback) {
      var data = this.getViewModel() || {};

      var html = this.template;
      if (!this.template) return '';
      if (data) {
        html = _.template(this.template)(data);
      }

      typeof callback == 'function' && callback.call(this);
      return html;
    },

    //刷新根据传入参数判断是否走onCreate事件
    //这里原来的dom会被移除，事件会全部丢失 需要修复*****************************
    refresh: function (needEvent) {
      var html = '';
      this.resetPropery();
      //如果开启了沙箱便只能重新渲染了
      if (needEvent) {
        this.create();
      } else {
        html = this.render();
        if (this.openShadowDom) {
          //将解析后的style与html字符串装载进沙箱
          //*************
          this.shadowDom.html(html);
        } else {
          this.$el.html(this.formateStyle + html);
        }
      }
      this.initElement();
      if (this.status != 'hide') this.show();
      this.trigger('onRefresh');
    },

    _isAddEvent: function (key) {
      if (key == 'onCreate' || key == 'onPreShow' || key == 'onShow' || key == 'onRefresh' || key == 'onHide')
        return true;
      return false;
    },

    setOption: function (options) {
      //这里可以写成switch，开始没有想到有这么多分支
      for (var k in options) {
        if (k == 'datamodel' || k == 'events') {
          _.extend(this[k], options[k]);
          continue;
        } else if (this._isAddEvent(k)) {
          this.on(k, options[k])
          continue;
        }
        this[k] = options[k];
      }
      //      _.extend(this, options);
    },

    initialize: function (opts) {
      this.propertys();
      this.setOption(opts);
      this.resetPropery();
      //添加系统级别事件
      this.addEvent();
      //开始创建dom
      this.create();
      this.addSysEvents();

      this.initElement();

    },

    //内部重置event，加入全局控制类事件
    addSysEvents: function () {
      if (typeof this.availableFn != 'function') return;
      this.removeSysEvents();
      this.$el.on('click.system' + this.id, $.proxy(function (e) {
        if (!this.availableFn()) {
          e.preventDefault();
          e.stopImmediatePropagation && e.stopImmediatePropagation();
        }
      }, this));
    },

    removeSysEvents: function () {
      this.$el.off('.system' + this.id);
    },

    $: function (selector) {
      return this.openShadowDom ? this.shadowDom.find(selector) : this.$el.find(selector);
    },

    //提供属性重置功能，对属性做检查
    resetPropery: function () {
    },

    //各事件注册点，用于被继承
    addEvent: function () {
    },

    create: function () {
      this.trigger('onPreCreate');
      this.createRoot(this.render());

      this.status = 'create';
      this.trigger('onCreate');
    },

    //实例化需要用到到dom元素
    initElement: function () { },

    show: function () {
      if (!this.wrapper[0] || !this.$el[0]) return;
      //如果包含就不要乱搞了
      if (!$.contains(this.wrapper[0], this.$el[0])) {
        this.wrapper.append(this.$el);
      }

      this.trigger('onPreShow');

      if (typeof this.animateShowAction == 'function')
        this.animateShowAction.call(this, this.$el);
      else
        this.$el.show();

      this.status = 'show';
      this.bindEvents();
      this.trigger('onShow');
    },

    hide: function () {
      if (!this.$el || this.status !== 'show') return;

      this.trigger('onPreHide');

      if (typeof this.animateHideAction == 'function')
        this.animateHideAction.call(this, this.$el);
      else
        this.$el.hide();

      this.status = 'hide';
      this.unBindEvents();
      this.removeSysEvents();
      this.trigger('onHide');
    },

    destroy: function () {
      this.status = 'destroy';
      this.unBindEvents();
      this.removeSysEvents();
      this.$el.remove();
      this.trigger('onDestroy');
      delete this;
    },

    getViewModel: function () {
      return this.datamodel;
    },

    setzIndexTop: function (el, level) {
      if (!el) el = this.$el;
      if (!level || level > 10) level = 0;
      level = level * 1000;
      el.css('z-index', getBiggerzIndex(level));
    }

  });

});
