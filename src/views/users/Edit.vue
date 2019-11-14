<template>
  <body class="body">
    <!-- header -->
    <header class="header">
      <div class="header__wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="header__content">
                <!-- header logo -->
                <a href="/recommendations" class="">
                  <img class="logo" src="img/retro.jpg" alt="" />
                </a>
                <!-- end header logo -->
                <li class="header__nav-item"></li>

                <li class="header__nav-item">
                  <router-link v-if="isLoggedIn()" to="/recommendations" class="header__nav-link">
                    My Features
                  </router-link>
                </li>

                <li class="header__nav-item">
                  <router-link v-if="isLoggedIn()" to="/features" class="header__nav-link">
                    Search
                  </router-link>
                </li>

                <li class="header__nav-item">
                  <router-link v-if="isLoggedIn()" :to="`/users/${user_id}/edit`" class="header__nav-link">
                    Profile
                  </router-link>
                </li>

                <li class="header__nav-item">
                  <router-link v-if="isLoggedIn()" to="/friends" class="header__nav-link">
                    Friends
                  </router-link>
                </li>
                <!-- end header nav -->

                <!-- header auth -->
                <div class="header__auth">
                  <!-- dropdown -->
                  <div class="dropdown header__lang">
                    <a
                      class="dropdown-toggle header__nav-link"
                      href="#"
                      role="button"
                      id="dropdownMenuLang"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      EN
                    </a>

                    <ul class="dropdown-menu header__dropdown-menu" aria-labelledby="dropdownMenuLang">
                      <li><a href="#">English</a></li>
                      <li><a href="#">Spanish</a></li>
                      <li><a href="#">Russian</a></li>
                      <li><a href="#">German</a></li>
                      <li><a href="#">French</a></li>
                      <li><a href="#">Korean</a></li>
                      <li><a href="#">Japanese</a></li>
                      <li><a href="#">Taiwanese</a></li>
                    </ul>
                  </div>
                  <!-- end dropdown -->

                  <a v-if="!isLoggedIn()" href="/" class="header__sign-in">
                    <i class="icon ion-ios-log-in"></i>
                    <span>Login</span>
                  </a>
                  <a v-else href="/logout" class="header__sign-in">
                    <i class="icon ion-ios-log-in"></i>
                    <span>Logout</span>
                  </a>
                </div>
                <!-- end header auth -->

                <!-- header menu btn -->
                <button class="header__btn" type="button">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <!-- end header menu btn -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- header search -->
      <form action="/#" class="header__search">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="header__search-content">
                <input type="text" placeholder="Search for a movie, TV Series that you are looking for" />

                <button type="button">search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- end header search -->
    </header>
    <!-- end header -->
    <!-- page title -->
    <section class="section section--first section--bg" data-bg="">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <!-- section title -->
              <h2 class="section__title">
                My
                <b>Profile</b>
              </h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="/recommendations">Home</a></li>
                <li class="breadcrumb__item breadcrumb__item--active">Profile</li>
              </ul>
              <!-- end breadcrumb -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end page title -->

    <!-- content -->
    <div class="content">
      <!-- profile -->
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="profile__content">
                <div class="profile__user">
                  <div class="profile__avatar">
                    <img src="img/user.png" alt="" />
                  </div>
                  <div class="profile__meta">
                    <h3>{{ user.username }}</h3>
                  </div>
                </div>

                <a href="/" class="profile__logout">
                  <i class="icon ion-ios-log-out"></i>
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end profile -->

      <div class="container">
        <!-- content tabs -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row">
              <!-- details form -->
              <div class="col-12 col-lg-6">
                <form v-on:submit.prevent="updateUser(user)" class="profile__form">
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="col-12">
                      <h4 class="profile__title">Update Profile</h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="username">Username</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          class="profile__input"
                          v-model="user.username"
                        />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="email">Email</label>
                        <input id="email" type="text" name="email" class="profile__input" v-model="user.email" />
                      </div>
                    </div>

                    <div class="col-12">
                      <input type="submit" class="profile__btn" value="SAVE" />
                    </div>
                  </div>
                </form>
              </div>
              <!-- end details form -->

              <!-- password form -->
              <div class="col-12 col-lg-6">
                <form v-on:submit.prevent="updateUser(user)" class="profile__form">
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="col-12">
                      <h4 class="profile__title">Change Password</h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="newpass">New Password</label>
                        <input id="newpass" type="text" name="newpass" class="profile__input" v-model="user.password" />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="confirmpass">Confirm New Password</label>
                        <input
                          id="confirmpass"
                          type="text"
                          name="confirmpass"
                          class="profile__input"
                          v-model="user.password_confirmation"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <input type="submit" class="profile__btn" value="CHANGE" />
                    </div>
                  </div>
                </form>
              </div>
              <!-- end password form -->
            </div>
          </div>
        </div>
        <!-- end content tabs -->
      </div>
    </div>
    <!-- end content -->
    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <!-- footer list -->
          <div class="col-12 col-md-3">
            <h6 class="footer__title">Download Our App</h6>
            <ul class="footer__app">
              <li>
                <a href="#"><img src="img/Download_on_the_App_Store_Badge.svg" alt="" /></a>
              </li>
              <li>
                <a href="#"><img src="img/google-play-badge.png" alt="" /></a>
              </li>
            </ul>
          </div>
          <!-- end footer list -->

          <!-- footer list -->
          <div class="col-6 col-sm-4 col-md-3">
            <h6 class="footer__title">Resources</h6>
            <ul class="footer__list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
          <!-- end footer list -->

          <!-- footer list -->
          <div class="col-6 col-sm-4 col-md-3">
            <h6 class="footer__title">Legal</h6>
            <ul class="footer__list">
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          <!-- end footer list -->

          <!-- footer list -->
          <div class="col-12 col-sm-4 col-md-3">
            <h6 class="footer__title">Contact</h6>
            <ul class="footer__list">
              <li><a href="tel:+18002345678">+1 (800) 420-6918</a></li>
              <li><a href="mailto:support@moviego.com">support@moviemate.com</a></li>
            </ul>
            <ul class="footer__social">
              <li class="github">
                <a href="#"><i class="icon ion-logo-github"></i></a>
              </li>
              <li class="instagram">
                <a href="#"><i class="icon ion-logo-instagram"></i></a>
              </li>
              <li class="twitter">
                <a href="#"><i class="icon ion-logo-twitter"></i></a>
              </li>
              <li class="facebook">
                <a href="#"><i class="icon ion-logo-facebook"></i></a>
              </li>
            </ul>
          </div>
          <!-- end footer list -->
        </div>
      </div>
    </footer>
    <!-- end footer -->
  </body>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user_id: localStorage.getItem("user_id"),
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    updateUser: function(user) {
      var params = {
        username: user.username,
        email: user.email,
        password: user.password
      };
      axios
        .patch("/api/users/" + user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id + "/edit");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function(user) {
      axios.delete("/api/users/" + user.id).then(response => {
        this.$router.push("/signup");
      });
    }
  }
};
</script>
