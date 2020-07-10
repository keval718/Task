import React, { useEffect, useState, useRef, useCallback } from "react";
import autosize from "autosize";

import "./App.css";
import useComments from "../../hooks/useComments";
import useReply from "../../hooks/useReplys";
import useUsers from "../../hooks/useUsers";

function App() {
  const { comments, createComment } = useComments();
  const { replies, createReply } = useReply();
  const { users } = useUsers();
  const textareaRef = useRef();
  const [userId, setUserId] = useState(null);
  const [commentId,setCommentId]=useState(null);
  const [content, setContent] = useState("");
  
  const [replyContent, setReplyContent] = useState("");


  useEffect(() => {
    autosize(textareaRef.current);
  }, []);

  useEffect(() => {
    if (users.length) {
      setUserId(users[0].id);
    }
  }, [users]);

  const handleContentChange = (e) => {setContent(e.target.value)
    console.log(e.target.value)
  };
  const handleCommentID = (commentID) => {setCommentId(commentID)
    console.log(commentID+"comment id is here")
  };


  const handleUserChange = (e) => setUserId(parseInt(e.target.value));

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userId) {
        alert("No user selected");
        return;
      }

      createComment(userId, content);
      setContent("");
    },
    [userId, content, createComment]
  );

  const handleReply = useCallback(
    (e) => {
      e.preventDefault();

      console.log()
      if (!userId) {
        alert("No user selected");
        return;
      }

      createReply(userId, 1, content);
     // setContent("");
     alert("Reply added");
    },
    [userId,1, content, createReply]
  );

  return (
    <div className="comments-container">
      <header className="comments-header">
        <h1>Comments</h1>
      </header>
      <section className="compose">
        <h2 className="compose__heading">You say...</h2>
        <form className="compose__body" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            rows={4}
            placeholder="Enter some text"
            required
            autoFocus
            value={content}
            onChange={handleContentChange}
            className="compose__textarea"
          />
          <div className="compose__dropdown">
            <label htmlFor="user-select">Comment as</label>
            <select
              id="user-select"
              onChange={handleUserChange}
              className="dropdown"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="compose__button">
            <button className="button button--primary">Submit</button>
          </div>
        </form>
      </section>
      <section>
         {/* {[...replies]
        .map((reply) => (
          <div key={reply.id} className="comment">
            <header className="comment__header">
              <h2 className="comment__heading">
                {reply.user.name} says...
              </h2>
              <span className="comment_timestamp">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(reply.created_at))}
                 
              </span>
            </header>
       
            <p className="comment__body">{reply.content}</p>
           
        
          </div>
        )) } */}
         
        {/* }
        {/* <form onSubmit={handleReply}>
            <button className="button button--primary" onClick="">Reply</button>
            <input type="text" value={content}   onChange={handleContentChange}></input>
            </form> */}
      </section>
      <section className="comments">
        {[...comments]
        
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => (
            <div key={comment.id} className="comment">
              <header className="comment__header">
                <h2 className="comment__heading">
                  {comment.user.name} says...
                </h2>
                <span className="comment_timestamp">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(comment.created_at))}
                   
                </span>
              </header>
         
              <p className="comment__body">{comment.content}</p>
              <form onSubmit={handleReply}>
              <button className="button button--primary" onClick="">Reply</button>
              <input type="text" value={content} onChange={handleContentChange}></input>
              <input type="hidden" value={comment.id} onChange={()=>{handleCommentID(comment.id)}} name="cId"/>
              </form>
              
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
