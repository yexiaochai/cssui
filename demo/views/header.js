define(['View', getViewTemplatePath('header'), 'UIHeader'], function (View, viewhtml, UIHeader) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    _initHead: function () {
    },

    onPreShow: function () {
      this.turning();

      this.header = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                //icon或者btn
                type: 'icond'
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
                tagname: 'phone',
                type: 'icon'
              },
              {
                tagname: 'list',
                type: 'icond'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'phone': function () {
            console.log('phone');
          },
          'list': function () {
            console.log('list');
          },
          'title': function () {
            console.log('title');
          }
        }

      });

      this.header.show();

      this.header1 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                //icon或者btn
                type: 'btn',
                title: '取消'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'title',
                title: '我是标题2'
              }
            ],
          right: [

              {
                tagname: 'confirm',
                type: 'btn',
                title: '确认'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'confirm': function () {
            console.log('confirm');
          },
          'title': function () {
            console.log('title');
          }
        }
      });

      this.header1.show();
      this.header1.$el.css('top', '50px');


      this.header2 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'select',
                title: '下拉菜单'
              }
            ],
          right: [
              {
                tagname: 'home',
                type: 'icon'
              },
              {
                tagname: 'phone',
                type: 'icon'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'phone': function () {
            console.log('phone');
          },
          'title': function (e) {
            var el = $(e.currentTarget);
            if (el.hasClass('expanded')) {
              el.removeClass('expanded');
              console.log('关闭');
            } else {
              el.addClass('expanded');
              console.log('打开');
            }

          }
        }
      });

      this.header2.show();
      this.header2.$el.css('top', '100px');


      this.header3 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'title',
                title: ['大号标题', '小号标题']
              }
            ],
          right: [
              {
                tagname: 'home',
                type: 'icon'
              },
              {
                tagname: 'phone',
                type: 'icon'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'phone': function () {
            console.log('phone');
          }
        }
      });

      this.header3.show();
      this.header3.$el.css('top', '150px');



      this.header4 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'tabs',
                data: [{ id: '1', name: '类别1' }, { id: '2', name: '类别2'}],
                index: 1
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'phone': function () {
            console.log('phone');
          },
          'title': function (e) {
            var el = $(e.target);
            var wrapper = $(e.currentTarget);

            wrapper.find('span').removeClass('active');
            el.addClass('active');

            console.log(el.attr('data-key'));


          }
        }
      });

      this.header4.show();
      this.header4.$el.css('top', '200px');

    },

    onShow: function () {
    },

    onHide: function () {
    }

  });
});
