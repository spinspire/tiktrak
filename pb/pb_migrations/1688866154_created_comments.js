migrate((db) => {
  const collection = new Collection({
    "id": "ae2ut6ilpghcyni",
    "created": "2023-07-09 01:29:14.689Z",
    "updated": "2023-07-09 01:29:14.689Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nuuqizxs",
        "name": "ticket",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "t8y250u7ao8ejgc",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "naso18zh",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "zgpdx0n4",
        "name": "body",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && ticket.project.users.id ?= @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && ticket.project.users.id ?= @request.auth.id",
    "createRule": "@request.auth.id != \"\" && ticket.project.users.id ?= @request.auth.id",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ae2ut6ilpghcyni");

  return dao.deleteCollection(collection);
})
