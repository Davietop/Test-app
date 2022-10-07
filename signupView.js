import errorIcon from "../../img/error.png";
import checkIcon from "../../img/check.png";
import logo from "../../img/arroba.png";

class SignUpView {
  _btnParentContainer = document.querySelector(".btn-group");
  mainContent = document.querySelector(".main-content");
  _spinnerParent = document.querySelector(".spinner");

  constructor() {
    this._btnTryAgain();
  }

  _render() {
    const markUp = this.signInPageMarkUp();
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
    this.mainContent.addEventListener("click", function (e) {
      const btn = e.target.closest("i");
      if (!btn) return;
      console.log(btn);

      btn.classList.toggle("fa-eye-slash");
      btn.classList.toggle("fa-eye");

      const password = document.getElementById("password");
      if (password.type === "password") password.type = "text";
      else password.type = "password";
    });
  }

  _renderSpinner() {
    const markUp = `
      <section class="spinner">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </section> 
  `;
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
  }

  _addHandlerEmail(handle) {
    this._btnParentContainer.addEventListener("click", function (e) {
      const emailBtn = e.target.closest("#email");
      if (!emailBtn) return;
      handle();
    });
  }
  _addHandlerSignUp(handler, spinner) {
    this.mainContent?.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest("#submit");
      if (!btn) return;
      handler();
      spinner();
    });
  }

  _btnTryAgain() {
    this.mainContent.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest("#btn");
      if (!btn) return;
      // console.log(btn);
      location.reload();
    });
  }

  _clear() {
    this.mainContent.innerHTML = "";
  }
  _errorMessage(message) {
    const markUp = `
    <section class="err_message">
    <img src="${errorIcon}" alt="img" />
    <h1>Whoops!</h1>
    <p>Something went wrong</p>
    <p>${message}</p>
    <button id="btn">Try Again</button>
  </section>   
    `;
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
  }

  _successMessage() {
    const markUp = `
    <section class="err_message">
    <img src="${checkIcon}" alt="img" />
    <h1>Saved!</h1>
    <p>Congratulations</p>
    <p>Account Successfully Created!</p>
    <button id="btn"  style="background-color: green;">Okay</button>
  </section>   
    `;
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
  }

  signInPageMarkUp() {
    return `
          <form action="" id="createacc" >
          <section class="logo">
          <h2>Chat</h2>
          <img src="${logo}" alt="" width="40px" />
          </section>
          <section>
          <p class="p-1">Create an account</p>
          </section>
          <section class="username">
          <label for="">Username   <i class="fa-solid fa-asterisk"></i></label>
          <input type="text" name="" id="username" value="" />
          </section>
          <section class="email">
          <label for="">Email  <i class="fa-solid fa-asterisk"></i></label>
          <input type="email" name="" id="email" value="" />
          </section>
          <section class="phone">
          <label for="">Phone Number  <i class="fa-solid fa-asterisk"></i></label>
          <input type="text" name="" id="number" value="" />
          </section>
          <section class="sex">
          <label for="">Gender  <i class="fa-solid fa-asterisk"></i></label>
          <select name="" id="option">
            <option value="Male">Male</option>
            <option value="female">Female</option>
          </select>
        </section>
          <section class="password">
          <label for="">Password  <i class="fa-solid fa-asterisk"></i></label>
          <input type="password" name="" id="password"  value=""/>
          <i class="fa-solid fa-eye"></i>
         
          </section>
          <input type="submit" id="submit" value="Sign Up" />
          </form>
  `;
  }
}

export default new SignUpView();
