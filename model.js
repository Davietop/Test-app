import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { success } from "./controller";
import { successLogIn } from "./controller";
import { FIREBASECONFIG } from "./config";
import imgProMan from "../img/profileman.png";
import imgProWoman from "../img/profilewoman.png";

export const state = {
  user: {},
};

const app = initializeApp(FIREBASECONFIG);
const auth = getAuth(app);
const database = getDatabase(app);

export let createAccountEmail = async function (
  email,
  password,
  username,
  number,
  sex
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      username
    );
    // console.log(sex);
    const user = userCredential.user;
    const userData = {
      userId: user.uid,
      userName: username,
      userEmail: user.email,
      userPhoneNumber: +number,
      sex: sex,
      userProfilePic: `${sex === "Male" ? imgProMan : imgProWoman}`,
      messages: {
        sentMsg: { chats: [""] },
        receivedMsg: { chats: [""] },
      },
      inboxes: [""],
    };

    function writeUserData(userId) {
      const db = getDatabase();
      set(ref(db, "users/" + userId), {
        account: userData,
      });
    }
    if (user) {
      success();
      writeUserData(user.uid);
    }
  } catch (error) {
    throw error;
  }
};

export const getAccount = async function () {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users`));
  if (!snapshot.exists()) return;
  return (state.user = snapshot.val());
};
getAccount();
export const loginAccountEmail = async function (email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${user.uid}`));
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    if (user) successLogIn();
    return data;
  } catch (error) {
    throw error;
  }
};

export const writeUserData1 = function (userId, acc) {
  const db = getDatabase();
  update(ref(db, "users/" + userId + "/account"), {
    messages: acc.at(1).account.messages,
  });
};

export const writeUserData2 = function (userId, curUser) {
  const db = getDatabase();
  update(ref(db, "users/" + userId + "/account"), {
    messages: curUser.account.messages,
    inboxes: curUser.account.inboxes,
  });
};

export const getData = async function (userId) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (!snapshot.exists()) return;
    else return snapshot.val();
  } catch (error) {
    throw error;
  }
};
