



define(['UIView', getAppUITemplatePath('ui.header'), 'UIBubbleLayer'], function (UIView, template, UIBubbleLayer) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      //是否设置view所处作用域
      this.viewScope;

      this.datamodel = {
        left: [],
        right: [],
        center: {}
      };

      //html模板
      this.template = template;
      this.events = {};
    },

    //单纯的做老代码桥接......
    set: function (data) {
      if (typeof data != 'object') return;

      //做一个容错处理
      if (!data.events) data.events = {};

      if (data.view) this.viewScope = data.view;

      var _data = {
        left: [],
        right: [],
        center: {}
      };

      //左边模块
      var _left = {};

      //处理左边模块，默认只有一个
      if (!_.isUndefined(data.back)) {
        _left.tagname = 'back';
        if (_.isString(data.backtext)) _left.value = data.backtext;
        _left.callback = data.events.returnHandler
        _data.left.push(_left);
      }

      //处理右边按钮群

      //电话
      if (_.isObject(data.tel)) {
        _data.right.push({
          tagname: 'tel',
          number: data.tel.number,
          callback: data.events.telHandler
        });
      }

      if (data.home) {
        _data.right.push({
          tagname: 'home',
          callback: data.events.homeHandler
        });
      }

      if (_.isObject(data.btn)) {
        _data.right.push({
          tagname: 'commit',
          value: data.btn.title,
          data: data.btn.data,
          callback: data.events.commitHandler
        });
      }

      if (_.isArray(data.moreMenus)) {
        _data.right.push({
          tagname: 'list',
          data: data.moreMenus
        });
      }


      //处理标题逻辑，由于title的唯一性，这里中间便只存一个对象
      var _title = {}
      if (_.isString(data.title)) {
        _title.tagname = 'title';
        _title.value = data.title;
      }

      if (_.isString(data.subtitle)) {
        _title.tagname = 'subtitle';
        _title.value = [data.title, data.subtitle];
      }

      if (_.isString(data.citybtn)) {
        _title.tagname = 'select';
        _title.value = data.citybtn;
        _title.callback = data.events.citybtnHandler;
      }
      _data.center = _title;

      _.extend(_data.left, data.left);
      _.extend(_data.right, data.right);

      //如果外部设置了center直接替换
      if (_.isObject(data.center)) _data.center = data.center;

      //hybrid的请求结构正确了，下面需要解析H5需要的结构，主要区别在标题处
      this.handleSpecialParam(_data);

      this.datamodel = _data;

      //在此生成具体事件绑定逻辑
      this.setEventsParam();

      this.refresh(true);
    },

    setEventsParam: function () {
      var item, data = this.datamodel.left.concat(this.datamodel.right).concat(this.datamodel.center);

      for (var i = 0, len = data.length; i < len; i++) {
        item = data[i];
        if (_.isFunction(item.callback)) {
          this.events['click .js_' + item.tagname] = $.proxy(item.callback, this.viewScope);
        }
      }
    },

    handleSpecialParam: function (data) {
      var k, i, len, item;
      for (k in data) {
        if (_.isArray(data[k])) {
          for (i = 0, len = data[k].length; i < len; i++) {
            item = data[k][i];
            if (this['customtHandle_' + item.tagname]) {
              this['customtHandle_' + item.tagname](data[k][i], k);
            } //if
          } //for
        } //if
      } //for
    },

    _getDir: function (dir) {
      var kv = { left: 'fl', right: 'fr' };
      return kv[dir];
    },

    //处理back的按钮逻辑
    customtHandle_back: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        var str = '<a href="javascript:;" class="cm-header-btn ' + dir + ' js_' + item.tagname + ' " >';
        if (item.value) {
          str += item.value + '</a>';
        } else {
          str += '<i class="icon-' + item.tagname + '"></i></a>';
        }
        return str;
      };
    },

    //定制化信息
    customtHandle_tel: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        return '<a href="tel:' + item.number + '" class="cm-header-btn __hreftel__ ' + dir + ' js_' + item.tagname + ' " ><i class="icon-' + item.tagname + '"></i></a>';
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    }

  });

});
