<template>
  <div class="signup">
    <div
      class="sign section--bg"
      data-bg="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="sign__content">
              <!-- registration form -->
              <form v-on:submit.prevent="submit()" class="sign__form">
                <a class="">
                  <img src="img/retro.jpg" alt="" />
                </a>
                <br />
                <div class="sign__group">
                  <input type="text" class="sign__input" placeholder="username" v-model="username" />
                </div>
                <div class="sign__group">
                  <input type="email" class="sign__input" placeholder="email" v-model="email" />
                </div>

                <div class="sign__group">
                  <input type="password" class="sign__input" placeholder="password" v-model="password" />
                </div>

                <div class="sign__group">
                  <input
                    type="password"
                    class="sign__input"
                    placeholder="re-enter password"
                    v-model="passwordConfirmation"
                  />
                </div>
                <ul>
                  <li class="error" v-for="error in errors">{{ error }}</li>
                </ul>
                <div class="sign__group sign__group--checkbox">
                  <input id="remember" name="remember" type="checkbox" checked="checked" />
                  <label for="remember">
                    I agree to the
                    <a href="#">Privacy Policy</a>
                  </label>
                </div>

                <input type="submit" class="sign__btn" value="Sign Up" />

                <span class="sign__text">
                  Already have an account?
                  <a href="/">Login!</a>
                </span>
              </form>
              <!-- registration form -->
            </div>
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
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Username already exists."];
        });
    }
  }
};
</script>
