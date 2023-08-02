import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import authReducer from "./auth";
import profileReducer from "./profile";
import transferReducer from "./transfer";

const authConfig = {
  key: 'auth',
  storage
}
const profileConfig = {
  key: 'profile',
  storage
}
const transferConfig = {
  key: 'transfer',
  storage
}

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  profile: persistReducer(profileConfig, profileReducer),
  transfer: persistReducer(transferConfig, transferReducer),
})

export default reducer