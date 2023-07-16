const ticket_types = ["question", "task", "bug", "feature"];
const users = Array(50)
  .fill()
  .map((x, i) => `user${i + 1}`);
const projects = [
  {
    title: "project 1",
    users,
  },
  {
    title: "project 2",
    users: ["user2", "user4", "user6", "user8", "user10"],
  },
  {
    title: "project 3",
    users: ["user1", "user3", "user5", "user7", "user9"],
  },
];

migrate(
  (db) => {
    const dao = new Dao(db);
    const coll_users = dao.findCollectionByNameOrId("users");
    const coll_projects = dao.findCollectionByNameOrId("projects");
    const coll_tickets = dao.findCollectionByNameOrId("tickets");
    // create users
    for (const username of users) {
      const email = username + "@example.com";
      const record = new Record(coll_users, {
        id: username,
        email,
        username,
        name: username,
      });
      // instead of setting "password", "passwordConfirm", or "tokenKey" fields we must call
      // record.setPassword before saving, in order for all those fields to get correctly set
      record.setPassword(username);
      dao.saveRecord(record);
    }
    // create projects
    const config = {
      statuses: ["created", "ready", "on-hold", "in-progress", "completed"],
      types: ["question", "task", "bug", "feature"],
      priorities: ["TBD", "1 - high", "2 - medium", "3 - low"],
    };
    for (const i in projects) {
      const { title, users } = projects[i];
      const description = `${title} description\n`.repeat(10);
      dao.saveRecord(
        new Record(coll_projects, {
          title,
          description,
          users,
          config,
        })
      );
      // create tickets
      const project = dao.findFirstRecordByData("projects", "title", title);
      for (let i = 0; i < 50; i++) {
        const type = ticket_types[i % ticket_types.length];
        const creator = users[i % users.length];
        dao.saveRecord(
          new Record(coll_tickets, {
            title: `ticket ${i + 1} for ${title}`,
            type,
            priority: "TBD",
            project: project.id,
            creator,
          })
        );
      }
    }
  },
  (db) => {
    const dao = new Dao(db);
    // delete attachments
    for (const record of dao.findRecordsByExpr("attachments")) {
      dao.deleteRecord(record);
    }
    // delete tickets
    for (const record of dao.findRecordsByExpr("tickets")) {
      dao.deleteRecord(record);
    }
    // delete projects
    for (const { title } of projects) {
      try {
        const record = dao.findFirstRecordByData("projects", "title", title);
        if (record) dao.deleteRecord(record);
      } catch (e) {
        console.error("Failed to delete project: ", title, e);
      }
    }
    // delete users
    for (const username of users) {
      try {
        const user = dao.findFirstRecordByData("users", "username", username);
        if (user) dao.deleteRecord(user);
      } catch (e) {
        console.error("Failed to delete user: ", username, e);
      }
    }
  }
);
