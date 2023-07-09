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
      const tokenKey = Math.random();
      try {
        dao.findAuthRecordByEmail("users", email); // if not found it will error
      } catch (e) {
        try {
          const record = new Record(coll_users, {
            email,
            username,
            name: username,
            // TODO: setting password does NOT work
            password: email,
            passwordConfirm: email,
            tokenKey,
          });
          // would this work?
          // record.passwordHash = record.passwordHash("foo");
          dao.saveRecord(record);
        } catch (saveErr) {
          console.error("Failed to save user:", username, saveErr);
        }
      }
    }
    // create projects
    const config = {
      statuses: ["created", "ready", "on-hold", "in-progress", "completed"],
      types: ["question", "task", "bug", "feature"],
    };
    for (const i in projects) {
      const { title, users } = projects[i];
      const uids = users
        .map((u) => dao.findAuthRecordByUsername("users", u))
        .map((u) => u.id);
      const description = `${title} description\n`.repeat(10);
      dao.saveRecord(
        new Record(coll_projects, {
          title,
          description,
          users: uids,
          config,
        })
      );
      // create tickets
      const project = dao.findFirstRecordByData("projects", "title", title);
      for (let i = 0; i < 50; i++) {
        const type = ticket_types[i % ticket_types.length];
        dao.saveRecord(
          new Record(coll_tickets, {
            title: `ticket ${i + 1} for ${title}`,
            type,
            project: project.id,
          })
        );
      }
    }
  },
  (db) => {
    const dao = new Dao(db);
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
