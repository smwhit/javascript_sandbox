var template = function(id) {
  return _.template($('#' + id).html() );
};

var Person = Backbone.Model.extend({
 defaults: {
   name: 'John Doe',
   age: 30,
   occupation: 'worker'
 }
});

var PeopleCollection = Backbone.Collection.extend({
    model: Person
});

var PersonView = Backbone.View.extend({
    tagName: 'li',
    template: template('personTemplate'),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
});

var PeopleView = Backbone.View.extend({
    tagName: 'ul',

    render: function() {
        this.collection.each(function(person){
        var personView = new PersonView({ model: person});
        this.$el.append(personView.render().el);
      }, this);
        return this;
    }
});



var peopleCollection = new PeopleCollection([
   {
     name: 'Simon',
     age: 21
   },
   {
     name: 'Jack',
     age: 29,
     occupation: 'train driver'
   },
   {
     name: 'Joanna',
     age: 27,
     occupation: 'astronaut'
   }
  ]);

var peopleView = new PeopleView({ collection: peopleCollection});
$(document.body).append(peopleView.render().el);