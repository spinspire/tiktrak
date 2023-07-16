migrate((db) => {
  const collection = new Collection({
    "id": "t8y250u7ao8ejgc",
    "created": "2023-07-08 12:35:11.443Z",
    "updated": "2023-07-08 12:35:11.443Z",
    "name": "tickets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k5tq9gxe",
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
        "id": "rgo4w3fz",
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
        "id": "lldxpcyh",
        "name": "type",
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
        "id": "yygmi9sd",
        "name": "priority",
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
        "id": "x4jus3sd",
        "name": "status",
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
        "id": "bvtzh6cv",
        "name": "substatus",
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
        "id": "cadzhdpw",
        "name": "project",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "ne4tcl0f1zrr2v3",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "5ubevx6b",
        "name": "creator",
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
        "id": "ijcxaqz7",
        "name": "assignee",
        "type": "relation",
        "required": false,
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
        "id": "8e2xeczn",
        "name": "estimate",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "r0oo8tse",
        "name": "budget",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_JypegPn` ON `tickets` (`type`)",
      "CREATE INDEX `idx_pzKZVfD` ON `tickets` (`status`)"
    ],
    "listRule": "@request.auth.id != \"\" && project.users.id ?= @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && project.users.id ?= @request.auth.id",
    "createRule": "@request.auth.id != \"\" && project.users.id ?= @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && project.users.id ?= @request.auth.id",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("t8y250u7ao8ejgc");

  return dao.deleteCollection(collection);
})
