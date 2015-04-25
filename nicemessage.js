$(function() {

/*==========  Constants  ==========*/

var ENTER_KEY = 13;

/*==========  Nice Message Model  ==========*/

var NiceMessage = Backbone.Model.extend({
  url: 'http://127.0.0.1:8000/nice-messages/',

  defaults: {
    message: ''
  }
});

/*==========  Collection of Nice Messages  ==========*/

var NiceMessageList = Backbone.Collection.extend({
  url: 'http://127.0.0.1:8000/nice-messages/',

  model: NiceMessage

  // temporary storage
  // localStorage: new Backbone.LocalStorage("nice-messages-backbone"),

});

var niceMessageList = new NiceMessageList;

/*==========  View of a single nice message  ==========*/

var NiceMessageView = Backbone.View.extend({

  tagName: "div",

  template: _.template($('#msg-template').html()),

  // events: {
  //   "hover .nice-msg": "emphasize"
  // },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  // emphasize: function() {

  // }

});

/*==========  Whole app view  ==========*/

var AppView = Backbone.View.extend({
  el: $('#nice-msg-app'),

  events: {
    "keypress #new-msg": "createOnEnter"
  },

  initialize: function() {
    this.textarea = this.$("#new-msg");
    this.left_div = $("#left");
    this.right_div = $('#right');
    this.listenTo(niceMessageList, 'add', this.addMessage);

    niceMessageList.fetch();
  },

  createOnEnter: function(e) {
    if (e.keyCode != ENTER_KEY) return;
    if (!this.textarea.val()) return;

    e.preventDefault();
    niceMessageList.create({message: this.textarea.val()});
    this.textarea.val('');
  },

  addMessage: function(message) {
    var view = new NiceMessageView({model: message});
    if (this.left_div.height() <= this.right_div.height()) {
      $(this.left_div).prepend(view.render().el);
    } else {
      $(this.right_div).prepend(view.render().el);
    }
  }

});

var App = new AppView;

});


function c(val) {
  console.log(val);
}
