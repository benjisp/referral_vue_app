<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="sign__content">
            <!-- authorization form -->
            <form v-on:submit.prevent="submit()" class="sign__form">
              <a class="sign__logo">
                <img src="img/logo.svg" alt="" />
              </a>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="sign__group">
                <input type="email" class="sign__input" placeholder="email" v-model="email" />
              </div>

              <div class="sign__group">
                <input type="password" class="sign__input" placeholder="password" v-model="password" />
              </div>

              <div class="sign__group sign__group--checkbox">
                <input id="remember" name="remember" type="checkbox" checked="checked" />
                <label for="remember">Remember Me</label>
              </div>

              <input type="submit" class="sign__btn" value="Login" />

              <span class="sign__text">
                Don't have an account?
                <a href="/signup">Sign up!</a>
              </span>

              <span class="sign__text"><a href="#">Forgot password?</a></span>
            </form>
            <!-- end authorization form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          window.location.href = "/recommendations";
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
