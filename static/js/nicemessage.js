$(function() {

/*==========  Constants  ==========*/

var ENTER_KEY = 13;

/*==========  Nice Message Model  ==========*/

var NiceMessage = Backbone.Model.extend({
  url: '/api/v1/messages/',

  defaults: {
    body: '',
    ip: userip
  }
});

/*==========  Collection of Nice Messages  ==========*/

var NiceMessageList = Backbone.Collection.extend({
  url: '/api/v1/messages/',
  model: NiceMessage,

  parse: function(response) {
    return response.reverse();
  }
});

var niceMessageList = new NiceMessageList();

/*==========  View of a single nice message  ==========*/

var NiceMessageView = Backbone.View.extend({
  tagName: "div",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.model.get('body'));
    return this;
  }

});

/*==========  Whole app view  ==========*/

var AppView = Backbone.View.extend({
  el: $('#nice-msg-app'),
  events: {
    "keypress #new-msg": "createOnEnter"
  },
  new_msg: false,

  initialize: function() {
    this.textarea = this.$("#new-msg");
    this.left_div = $("#left");
    this.right_div = $('#right');
    this.listenTo(niceMessageList, 'add', this.addMessage);

    niceMessageList.fetch();
  },

  createOnEnter: function(e) {
    if (e.keyCode != ENTER_KEY) return;
    e.preventDefault();
    if (!this.textarea.val()) return;

    niceMessageList.create({body: this.textarea.val()});
    this.textarea.val('');
  },

  addMessage: function(message) {
    var view = new NiceMessageView({model: message});
    if (this.left_div.height() <= this.right_div.height()) {
      $(this.left_div).prepend(view.render().el);
    } else {
      $(this.right_div).prepend(view.render().el);
    }
    this.new_msg = false
  }
});

var App = new AppView;

});


function c(val) {
  console.log(val);
}
