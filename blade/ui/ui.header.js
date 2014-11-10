/*


*/

define(['UIView', getAppUITemplatePath('ui.header')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      var backmodel = {
        tagname: 'back',

      };

       this.datamodel = {
        left: [
        ],
        center: [
        ],
        right: [
        ]
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

    },

    resetPropery: function () {
      
      //设置回调
      for(var k in this.eventHandlers) {
        this.events['click .js_' + k] = this.eventHandlers[k];
      }

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
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
