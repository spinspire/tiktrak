migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t8y250u7ao8ejgc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yygmi9sd",
    "name": "priority",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t8y250u7ao8ejgc")

  // remove
  collection.schema.removeField("yygmi9sd")

  return dao.saveCollection(collection)
})
