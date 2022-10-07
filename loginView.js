import errorIcon from "../../img/error.png";
import checkIcon from "../../img/check.png";

class LoginView {
  _btnParentContainer = document.querySelector(".btn-group");
  mainContent = document.querySelector(".main-content");
  _spinnerParent = document.querySelector(".spinner");
  _body = document.querySelector(".whole");
  _parent = document.querySelector("body");

  _addHandlerShowLoginForm(handle) {
    document.querySelector(".sp-1").addEventListener("click", function () {
      handle();
    });
  }

  _clear() {
    this.mainContent.innerHTML = "";
  }

  _errorMessage(message) {
    const markUp = `
    <section class="err_message">
    <img src="${errorIcon}" alt="img" id="errIcon" />
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
    <p>Login Successfull!</p>
    <button id="btn"  style="background-color: green;">Okay</button>
  </section>   
    `;
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
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

  logInMarkUp() {
    return `
    <form id="form-login">
    <h1>Log In</h1>
    <section class="email-login">
      <label for="">Email</label>
      <input type="email" name="" id="email-login" value="" />
    </section>

    <section class="password-login">
      <label for="">Password</label>
      <input type="password" name="" id="password-login" value="" />
      <i class="fa-solid fa-eye"></i>
    </section>
    <input type="submit" id="login" value="Log In" />
  </form>    
    `;
  }

  _renderLoginMakup() {
    const markUp = this.logInMarkUp();
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
    this.mainContent.addEventListener("click", function (e) {
      const btn = e.target.closest("i");
      if (!btn) return;
      btn.classList.toggle("fa-eye-slash");
      btn.classList.toggle("fa-eye");
      const password = document.getElementById("password-login");
      if (password.type === "password") password.type = "text";
      else password.type = "password";
    });
  }
  _addHandlerlogin(handler, spinner) {
    this.mainContent.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest("#login");
      if (!btn) return;
      handler();
      spinner();
    });
  }
}

export default new LoginView();
