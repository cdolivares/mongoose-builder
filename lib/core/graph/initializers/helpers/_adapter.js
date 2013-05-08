// Generated by CoffeeScript 1.4.0

/*
  A small mongoose adapter that transforms schemas from class-like coffeescript classes
  into the more idosyncratic mongoose plugin interface
*/


(function() {

  exports.adapt = function(schema, options, plugin) {
    var _plugin;
    _plugin = function(skema, options) {
      var pluginMethodDefinition, pluginMethodName, _ref;
      _ref = plugin.prototype;
      for (pluginMethodName in _ref) {
        pluginMethodDefinition = _ref[pluginMethodName];
        if (pluginMethodName === 'constructor') {
          continue;
        }
        skema.methods[pluginMethodName] = pluginMethodDefinition;
      }
      return skema.methods.type = function() {
        return options.thisCollectionName;
      };
    };
    return schema.plugin(_plugin, options);
  };

}).call(this);