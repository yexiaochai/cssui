define(['View', getViewTemplatePath('bubble.layer'), 'UIBubbleLayer'], function (View, viewhtml, UIBubbleLayer) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    _initHead: function () {
      this.$('header').append($('<i class="i_bef icond-list">....</i>'));
    },
    events: {
      'click .demo1': function (e) {
        if (!this.demo1) {
          var data = [{ name: '<span class="center">普通会员</span>' },
          { name: '<span class="center">vip</span>' },
          { name: '<span class="center">高级vip</span>' },
          { name: '<span class="center">钻石vip</span>'}];
          this.demo1 = new UIBubbleLayer({
            datamodel: {
              data: data
            },
            triggerEl: $(e.currentTarget),
            width: '150px',
            triangleLeft: '20px'
          });
        }
        this.demo1.show();
      },
      'click .demo2': function (e) {
        if (!this.demo2) {
          var data = [{ name: '<span class="center">普通会员</span>' },
          { name: '<span class="center">vip</span>' },
          { name: '<span class="center">高级vip</span>' },
          { name: '<span class="center">钻石vip</span>'}];
          this.demo2 = new UIBubbleLayer({
            datamodel: {
              data: data,
              dir: 'down'
            },
            needMask: true,
            triggerEl: $(e.currentTarget),
            width: '150px',
            triangleRight: '20px'
          });
        }
        this.demo2.show();
      },
      'click .demo3': function (e) {
        if (!this.demo3) {
          var data = [{ name: '<span class="center">普通会员</span>' },
          { name: '<span class="center">vip</span>' },
          { name: '<span class="center">高级vip</span>' },
          { name: '<span class="center">钻石vip</span>'}];

          for (var i = 0; i < 40; i++) {
            data.push({ name: '<span class="center">钻石vip-' + i + '</span>' });
          }

          this.demo3 = new UIBubbleLayer({
            datamodel: {
              data: data,
              dir: 'down',
              itemStyleClass: 'needBorder'
            },
            needMask: true,
            triggerEl: $(e.currentTarget)
          });
        }
        this.demo3.show();
      },
      'click .icond-list': function (e) {
        if (!this.list) {
          var data = [{ name: '<span class="center">普通会员</span>' },
          { name: '<span class="center">vip</span>' },
          { name: '<span class="center">高级vip</span>' },
          { name: '<span class="center">钻石vip</span>'}];


          this.list = new UIBubbleLayer({
            datamodel: {
              data: data,
              dir: 'up',
              wrapperClass: 'cm-pop--user-nav',
              itemStyleClass: 'cm-pop-list'
            },
            width: '128px',
            triangleRight: '20px',
            needMask: true,
            triggerEl: $(e.currentTarget)
          });
        }
        this.list.show();
      }

    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {
    }

  });
});
