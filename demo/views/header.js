define(['View', getViewTemplatePath('header'), 'UIHeader', 'UIBubbleLayer'], function (View, viewhtml, UIHeader, UIBubbleLayer) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    _initHead: function () {
    },

    onPreShow: function () {
      this.turning();
      var scope = this;

      var scope = this;

      this.header = new UIHeader();

      this.header.set({
        view: this,
        left: [
          {
            'tagname': 'back', value: '取消', callback: function () {
              console.log('返回');
            }
          }
        ],
        right: [
        {
          'tagname': 'home', callback: function () {
            console.log('返回');
          }
        },
        { 'tagname': 'search' },
        {
          'tagname': 'list', callback: function (e) {
            if (!scope.list) {
              var data = [{ name: '<span class="center">北京出发</span>' },
                { name: '<span class="center">杭州出发</span>' },
                { name: '<span class="center">成都出发</span>' },
                { name: '<span class="center">广州出发</span>'}];
              scope.list = new UIBubbleLayer({
                datamodel: {
                  data: data
                },
                triggerEl: $(e.currentTarget),
                width: '130px',
                triangleLeft: '25px',
                onClick: function (data, index) {
                  this.hide();
                }
              });
            }
            scope.list.show();
          }
        },
        { 'tagname': 'tel', 'number': '56973144' },
        {
          'tagname': 'commit', 'value': '登录', callback: function () {
            console.log('登录');
          }
        },
        {
          'tagname': 'custom', 'value': '定制化',
          itemFn: function () {
            return '<span class="cm-header-btn fr js_custom">定制化</span>';
          },
          callback: function () {
            console.log('定制化');
          }
        }
      ],

        center: {
          'tagname': 'tabs', 'data': { items: [{ id: '1', name: '类别1' }, { id: '2', name: '类别2'}], index: 0 }, callback: function () {
            console.log('标题点击回调');
          }
        }

      });
      this.header.show();


      this.header1 = new UIHeader();
      this.header1.set({
        title: '基本Header使用',
        subtitle: '中间副标题',
        back: true,
        backtext: '取消',
        tel: { number: 1111 },
        home: true,
        search: true,
        btn: { title: "登录", id: 'confirmBtn', classname: 'header_r' },
        events: {
          returnHandler: function () {
            console.log('back');
          },
          homeHandler: function (e) {
            console.log('home')

          }
        }
      });

      this.header1.show();
      this.header1.$el.css('top', '100px');
    },

    onShow: function () {
    },

    onHide: function () {
    }

  });
});
