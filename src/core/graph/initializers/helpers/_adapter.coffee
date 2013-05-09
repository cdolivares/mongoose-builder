###
  A small mongoose adapter that transforms schemas from class-like coffeescript classes
  into the more idosyncratic mongoose plugin interface
###


exports.adapt = (schema, options, plugin) ->

  #expands a plugins methods and adds to mongoose
  #schema object
  _plugin = (skema, options) ->
    # console.log "A Plugin", plugin::
    for pluginMethodName, pluginMethodDefinition of plugin::
      if pluginMethodName is 'constructor'
        continue
      #ADD ALL THE METHODS
      skema.methods[pluginMethodName] = pluginMethodDefinition



    ###
      Every model gets a _type_ and _models_ virtual.
      These methods use _ to prevent naming collisions.

      _type_ is the collection name in mongo

      _models_ is a reference to other initialized models
      in the application
    ###
    skema.virtual('_type_').get () ->
      return options.thisCollectionName

    skema.virtual('_models_').get () ->
      return options.models

  schema.plugin _plugin, options
