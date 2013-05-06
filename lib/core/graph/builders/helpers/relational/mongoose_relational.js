// Generated by CoffeeScript 1.4.0

/*
  Responsible for defining all the relational operations between
  schemas as defined by a valid relation.json config file
*/


(function() {
  var MongoRelational, MongooseChild,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MongooseChild = require("" + __dirname + "/child_plugin");

  MongoRelational = (function() {
    /*
        Method: constructor
        
        Delegates build operations to build
        specific _relation object.
    
        Schemas collection used to inject specific
        instance methods into each model.
    
        Also pass in a reference to the models object which
        at this point is uninitialized. will soon be populated
        with model objects that communicate directly to the mongo
        database.
    
        child_plugin requires a reference to models in order to carry
        out Relational Proxy operations.
    */

    function MongoRelational(schemas, models) {
      this.addRelationship = __bind(this.addRelationship, this);
      this._schemas = schemas;
      this._models = models;
    }

    /*
        Method: addRelationship  (Synchronous)
    
        Creates a relationship between node1 and node2 of type, type. Valid
        types are
          "parent_child"
          "orphan"
    
        Orphan types will add the model to the orphaned collections.
    */


    MongoRelational.prototype.addRelationship = function(type, sNames) {
      var child, childName, options, orphan, parent, parentName;
      if (type === "parent_child") {
        parentName = sNames.parent;
        childName = sNames.child;
        parent = this._schemas[parentName];
        child = this._schemas[childName];
        options = {
          mongoose: {
            models: this._models
          },
          child: {
            name: childName,
            schema: child,
            collection: utils.pluralize(childName)
          },
          parent: {
            name: parentName,
            collection: utils.pluralize(parentName)
          },
          permission: {
            schema: this._schemas['Permission']
          }
        };
        return parent.plugin(MongooseChild.plugin, options);
      } else if (type === "orphan") {
        return orphan = sNames.orphan;
      } else {
        return console.log("Invalid type " + type);
      }
    };

    return MongoRelational;

  })();

  module.exports = MongoRelational;

}).call(this);