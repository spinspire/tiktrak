migrate((db) => {
  const collection = new Collection({
    "id": "ne4tcl0f1zrr2v3",
    "created": "2023-07-08 12:25:03.455Z",
    "updated": "2023-07-08 12:25:03.455Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bmopbhmh",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tfbrgeja",
        "name": "logo",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [
            "100x100"
          ],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "kvpghlms",
        "name": "config",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "kxvmhzvl",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cluwbr7b",
        "name": "users",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ne4tcl0f1zrr2v3");

  return dao.deleteCollection(collection);
})
