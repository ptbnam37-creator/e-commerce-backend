/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_749661959")

  collection.listRule   = "user = @request.auth.id"
  collection.viewRule   = "user = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "user = @request.auth.id"
  collection.deleteRule = "user = @request.auth.id"

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_749661959")

  collection.listRule   = null
  collection.viewRule   = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return app.save(collection)
})
