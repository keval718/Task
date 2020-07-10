import { combineReducers } from "redux";

import * as UsersStore from "./users";
import * as CommentsStore from "./comments";
import * as ReplyStore from "./reply";

export const reducer = combineReducers({
  comments: CommentsStore.reducer,
  users: UsersStore.reducer,
  reply:ReplyStore.reducer
});

export const sagas = [
  CommentsStore.commentsSagaWatcher,
  UsersStore.usersSagaWatcher,
  ReplyStore.ReplySagaWatcher
];
