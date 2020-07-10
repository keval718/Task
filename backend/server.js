const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite = require("sqlite3");
const unflatten = require("flat").unflatten;

const dbFilePath = path.join(__dirname, "dev.db");
const db = new sqlite.Database(dbFilePath, sqlite.OPEN_READWRITE);

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const ALL_USERS_QUERY = `
SELECT * 
FROM user;
`;

app.get("/users", async (req, res, next) => {
  db.all(ALL_USERS_QUERY, (err, users) => {
    if (err) {
      next(err);
    }

    res.json(users);
  });
});

const ALL_COMMENTS_QUERY = `
SELECT c.*, u.id as 'user.id', u.name as 'user.name'
FROM comment c JOIN user u ON c.user_id = u.id
`;

const ALL_REPLY_QUERY = `
SELECT r.* ,c.id as 'comment_id'
FROM reply r JOIN comment c ON r.comment_id = c.id
`;

app.get("/comments", async (req, res, next) => {
  db.all(ALL_COMMENTS_QUERY, (err, rows) => {
    if (err) {
      next(err);
    }

    const comments = rows.map(unflatten);
    res.json(comments);
  });
});

const INSERT_COMMENT_QUERY = `
INSERT INTO comment
  (content, user_id)
VALUES
  (?, ?);
`;
const INSERT_REPLY_QUERY = `
INSERT INTO reply
  (content, user_id,comment_id)
VALUES
  (?, ?,?);
`;

app.post("/comments", (req, res, next) => {
  const { user_id, content } = req.body;
  db.run(INSERT_COMMENT_QUERY, [content, user_id], (err) => {
    if (err) {
      next(err);
    }

    res.sendStatus(204);
  });
});
app.post("/reply", (req, res, next) => {
  const { user_id,comment_id, content } = req.body;
  db.run(INSERT_REPLY_QUERY, [content, user_id,comment_id], (err) => {
    if (err) {
   
      next(err);
      
    }

    res.sendStatus(204);
  });
});
app.get("/reply", async (req, res, next) => {
  db.all(ALL_REPLY_QUERY, (err, rows) => {
    if (err) {
      next(err);
    }

    const comments = rows.map(unflatten);
    res.json(comments);
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.toString() });
});

app.listen(3001, () => {
  console.log(`Server ready at http://localhost:3001`);
});
