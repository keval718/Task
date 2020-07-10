import Axios from "axios";
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