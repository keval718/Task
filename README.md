<b><h1>What I Did In This Project</h1></b>
  

In Backend Folder in Setup.js file

First of all I have created a reply table  in which I took comment_id and User_id as foreign key

CREATE TABLE IF NOT EXISTS reply (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT DEFAULT '' NOT NULL,
    user_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comment (id) ON DELETE CASCADE
);

Then in server.js file 

<b>I have created api for inserting reply and getting reply</b>

The query I have fired for inserting reply is :-
 const INSERT_REPLY_QUERY = `
INSERT INTO reply
  (content, user_id,comment_id)
VALUES
  (?, ?,?);
`; 

The query I have fired for getting reply for paricular comment_id is:-

const ALL_REPLY_QUERY = `
SELECT r.* ,c.id as 'comment_id'
FROM reply r JOIN comment c ON r.comment_id = c.id
`;

<b>Api for inserting reply to Database</b>
  
app.post("/reply", (req, res, next) => {
  const { user_id,comment_id, content } = req.body;
  db.run(INSERT_REPLY_QUERY, [content, user_id,comment_id], (err) => {
    if (err){
      next(err); 
    }
    res.sendStatus(204);
  });
});

<b>Api for getting reply from Database</b>
  
  app.get("/reply", async (req, res, next) => {
  db.all(ALL_REPLY_QUERY, (err, rows) => {
    if (err) {
      next(err);
    }
    const comments = rows.map(unflatten);
    res.json(comments);
  });
});


<h2> Frontend Part </h2>

<b>First of all in service folder I have created service using Axios for fetching the data from database</b>

export async function createReply(userId, commentID,content) {
  const res = await Axios.post("http://localhost:3001/reply", {
    user_id: userId,
    comment_id:commentID,
    content: content,
  });
  const comment = res.data;
  return comment;
}

export async function getReply() {
  const res = await Axios.get("http://localhost:3001/reply");
  console.log(res.data + "vn");
  const comments = res.data;
  return comments;
}

Then In redux Folder I have created reply.js file In which I  have created  Following things<br>

1)Create Action Types<br>
2)Create functions fetchReply,fetchReplySuccess,fetchReplyFailure<br>
3)Created createReply function<br>
4)create Initial state in which assigned reply array where all replies are coming form services created<br>
5)create a reducer<br>
6)create function like fetchReplySagaWorker(),createReplySagaWorker(action),ReplySagaWatcher(),ReplySelector(state) <br>

Then in the index.js file of reducer I have added reply.js to reducer and sagas <br>

export const reducer = combineReducers({
  comments: CommentsStore.reducer,
  users: UsersStore.reducer,
  reply:ReplyStore.reducer
});<br>
export const sagas = [
  CommentsStore.commentsSagaWatcher,
  UsersStore.usersSagaWatcher,
  ReplyStore.ReplySagaWatcher
];<br>


<b> Then in the Hooks folder I have created useReply.js file </b> 
<br>
<br>
<b> Then In the Main index.js file of component folder</b> </br>
First of all created button,textbox for reply <br>
Created handelReply function in which added logic to send reply to database and notify user 

I also hosted what I did 
backend:- https://treasure1.herokuapp.com  <br>
frontend:- https://frontendtreasure.herokuapp.com/
