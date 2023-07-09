migrate((db) => {
  const collection = new Collection({
    "id": "sg8wvvlvv6xvhb0",
    "created": "2023-07-09 02:18:59.139Z",
    "updated": "2023-07-09 02:18:59.139Z",
    "name": "attachments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wn6w7zka",
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
        "id": "grzopgov",
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
        "id": "5wlayipm",
        "name": "file",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "uzpwastt",
        "name": "label",
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
    "deleteRule": "@request.auth.id != \"\" && ticket.project.users.id ?= @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sg8wvvlvv6xvhb0");

  return dao.deleteCollection(collection);
})
