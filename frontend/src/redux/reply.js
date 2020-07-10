import { call, put, takeLatest } from "redux-saga/effects";

import * as ReplyService from "../services/comments";

export const actionTypes = {

  FETCH_REPLY: `reply/FETCH_REPLY`,
  FETCH_REPLY_SUCCESS: `reply/FETCH_REPLY_SUCCESS`,
  FETCH_REPLY_FAILURE: `reply/FETCH_REPLY_FAILURE`,
  CREATE_REPLY: `reply/CREATE_REPLY`

};
export function fetchReply() {
    return {
      type: actionTypes.FETCH_REPLY,
    };
  }
  
  export function fetchReplySuccess(comments) {
    return {
      type: actionTypes.FETCH_REPLY_SUCCESS,
      payload: comments,
    };
  }
  
  export function fetchReplyFailure(error) {
    return {
      type: actionTypes.FETCH_REPLY_FAILURE,
      payload: error,
      error: true,
    };
  }
  
  export function createReply(userId,commentId, content) {
    return {
      type: actionTypes.CREATE_REPLY,
      payload: {
        userId,
        commentId,
        content,
      },
    };
  }

  const initialState = {
    isFetching: false,
    reply: [],
   
  };
  export function reducer(state = initialState, action) {
    switch (action.type) {
      
        case actionTypes.FETCH_REPLY:
          return {
            ...state,
            isFetching: true,
          };
        case actionTypes.FETCH_REPLY_SUCCESS:
          return {
            ...state,
            isFetching: false,
            reply: action.payload,
          };
        case actionTypes.FETCH_REPLY_FAILURE:
          return {
            ...state,
            isFetching: false,
          };
      default:
        return state;
    }
  }
  function* fetchReplySagaWorker() {
    try {
      const comments = yield call(ReplyService.getReply);
      console.log(comments+"from query ")
      console.log("Here");
      yield put(fetchReplySuccess(comments));
    } catch (e) {
      yield put(fetchReplyFailure(e));
    }
  }

  function* createReplySagaWorker(action) {
    const { userId,commentId, content } = action.payload;
    yield call(ReplyService.createReply, userId,commentId, content);
    yield call(fetchReplySagaWorker);
  }

  export function* ReplySagaWatcher() {
    yield takeLatest(actionTypes.FETCH_REPLY, fetchReplySagaWorker);
    yield takeLatest(actionTypes.CREATE_REPLY, createReplySagaWorker);
  }
  export function ReplySelector(state) {
    console.log(JSON.stringify(state)+"reply state");
    return state;
  
  }