import Axios from "axios";

export async function getComments() {
  const res = await Axios.get("https://treasure1.herokuapp.com/comments");
  
  const comments = res.data;
  return comments;
}

export async function createComment(userId, content) {
  const res = await Axios.post("https://treasure1.herokuapp.com/comments", {
    user_id: userId,
    content: content,
  });
  const comment = res.data;
  return comment;
}


export async function getReply() {
  const res = await Axios.get("https://treasure1.herokuapp.com/reply");
  console.log(res.data + "vn");
  const comments = res.data;
  return comments;
}

export async function createReply(userId, commentID,content) {
  const res = await Axios.post("https://treasure1.herokuapp.com/reply", {
    user_id: userId,
    comment_id:commentID,
    content: content,
  });
  const comment = res.data;
  return comment;
}
