/*


*/

define(['UIView', getAppUITemplatePath('ui.header')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      var cfg = {
        'icon': {
          tag: 'span',
          classname: 'cm-header-icon',
          childTag: 'i',
          preFlag: 'icond'
        },
        'btn': {
          tag: 'span',
          classname: 'cm-header-btn'
        },
        'title': {
          tag: 'h1',
          classname: 'cm-page-title'
        }
      };

      var model = {
        left: [
          {
            tagname: 'back',
            //icon或者btn
            type: 'icon',
            //不设置默认为mappingCfg.icon.preFlag + tagname 这里是：icond-back
            iconClass: ''
          },
          {
            tagname: 'cancel',
            type: 'btn',
            title: '取消'
          }
        ],
        center: [
          {
            tagname: 'title',
            type: 'title',
            title: '我是标题'
          }
        ],
        right: [
          {
            tagname: 'list',
            type: 'icon'
          },
          {
            tagname: 'phone',
            type: 'icon'
          },
          {
            tagname: 'confirm',
            type: 'btn',
            title: '确认'
          }
        ]
      };

      this.datamodel = {
        cfg: cfg,
        model: model
      };


      //初始化events参数
      var events = {
        //与tagname一一对应，这是个映射规则，只要有tagname便可为其设置回调
        //el为对应根元素
        backHandler: function (el) { },
        confirmHandler: function (el) { },
        listHandler: function (el) { },
        phoneHandler: function (el) { }
      };


      //html模板
      this.template = template;
      this.needMask = false;


      this.events = {
        'click .cui-pop-list>li': 'clickAction'
      };


    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    initElement: function () {

    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-layer');
      });
      this.on('onShow', function () {

      });
      this.on('onHide', function () {
      });
    }

  });

});
