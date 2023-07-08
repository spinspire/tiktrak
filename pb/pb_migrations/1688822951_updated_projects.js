migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ne4tcl0f1zrr2v3")

  collection.listRule = "@request.auth.id != \"\" && users.id ?= @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && users.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ne4tcl0f1zrr2v3")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
