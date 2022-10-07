import signupView from "./views/signupView.js";
import loginView from "./views/loginView.js";
import chatView from "./views/chatView.js";
import * as model from "./model.js";

const showForm = function () {
  signupView._render();
};
const showLoginForm = function () {
  loginView._renderLoginMakup();
};

const handlerSend = function (acc, curUser, text) {
  const curaccMsg = curUser.account.messages.sentMsg;
  const accMsg = acc.at(1).account.messages.receivedMsg;
  delete curaccMsg.chats;
  delete accMsg.chats;
  const timeStamp = new Date().getTime();
  curaccMsg[timeStamp] = {
    [acc.at(0)]: {
      [curUser.account.userId]: text,
    },
  };

  (accMsg[timeStamp] = {
    [curUser.account.userId]: {
      [curUser.account.userId]: text,
    },
  }),
    model.writeUserData1(acc.at(0), acc);
  model.writeUserData2(curUser.account.userId, curUser);
  model.getData(acc.at(0));
  model.getData(curUser.account.userId);
  chatView._renderChatArea(document.querySelector(".width"), acc, curUser);
};

const _reRender = function (curUser) {
  chatView._reRenderUsersSection(curUser);
};
const writeInbox = function (id, curUser) {
  model.writeUserData2(id, curUser);
};

const renderAllUsers = function (users, curUser) {
  const markUp = chatView._renderChatMarkup;
  chatView._renderUsersSection(users, markUp, curUser, writeInbox);
};

const displayChat = async function (acc, curUser) {
  chatView._renderChatArea(document.querySelector(".width"), acc, curUser);

  chatView._addHandlerSend(acc, curUser, handlerSend, displayChat, _reRender);
};

const loginform = async function () {
  try {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    const curUser = await model.loginAccountEmail(email.value, password.value);
    const dataUser = Object.entries(model.state.user);
    const account = dataUser.findIndex(
      (acc) => acc[0] === curUser.account.userId
    );
    dataUser.splice(account, 1);
    loginView._body.innerHTML = "";
    chatView.render(curUser);
    renderAllUsers(dataUser, curUser);
    chatView._addHandlerId(displayChat, curUser);
  } catch (error) {
    console.log(error);
    const errorCode = error.code.split("/")[1].toUpperCase();
    loginView._errorMessage(errorCode);
  }
};

const submitForm = async function () {
  try {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const number = document.getElementById("number");
    const option = document.getElementById("option").value;

    await model.createAccountEmail(
      email.value,
      password.value,
      username.value,
      number.value,
      option
    );
  } catch (error) {
    const errorCode = error.code.split("/")[1].toUpperCase();
    signupView._errorMessage(errorCode);
  }
};
const spinner = function () {
  signupView._renderSpinner();
};

const init = function () {
  signupView._addHandlerEmail(showForm);
  signupView._addHandlerSignUp(submitForm, spinner);
  loginView._addHandlerShowLoginForm(showLoginForm);
  loginView._addHandlerlogin(loginform, spinner);
};
init();

export const success = function () {
  signupView._successMessage();
};
export const successLogIn = function () {
  loginView._successMessage();
};
