<template>
  <div id="app">
    <div id="nav">
      <!-- header -->
      <header class="header">
        <div class="header__wrap">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="header__content">
                  <!-- header logo -->
                  <a href="index.html" class="header__logo">
                    <img src="img/logo.svg" alt="" />
                  </a>
                  <!-- end header logo -->

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
                    <router-link v-if="isLoggedIn()" :to="`/users/${user_id}`" class="header__nav-link">
                      Profile
                    </router-link>
                  </li>

                  <li class="header__nav-item">
                    <router-link v-if="!isLoggedIn()" to="/" class="header__nav-link">login</router-link>
                  </li>

                  <li class="header__nav-item">
                    <router-link v-if="isLoggedIn()" to="/logout" class="header__nav-link">logout</router-link>
                  </li>

                  <li class="header__nav-item">
                    <router-link v-if="!isLoggedIn()" to="/signup" class="header__nav-link">Signup</router-link>
                  </li>

                  <!-- dropdown -->
                  <li class="dropdown header__nav-item">
                    <a
                      class="dropdown-toggle header__nav-link header__nav-link--more"
                      href="#"
                      role="button"
                      id="dropdownMenuMore"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="icon ion-ios-more"></i>
                    </a>

                    <ul class="dropdown-menu header__dropdown-menu" aria-labelledby="dropdownMenuMore">
                      <li><router-link v-if="isLoggedIn()" to="/recommendations">My Features</router-link></li>
                      <li><router-link v-if="isLoggedIn()" to="/features">Search</router-link></li>
                      <li><router-link v-if="isLoggedIn()" :to="`/users/${user_id}`">Profile</router-link></li>
                      <li><router-link v-if="!isLoggedIn()" to="/">Login</router-link></li>
                      <li><router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
                      <li><router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link></li>
                    </ul>
                  </li>
                  <!-- end dropdown -->
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
                      </ul>
                    </div>
                    <!-- end dropdown -->

                    <a href="/" class="header__sign-in">
                      <i class="icon ion-ios-log-in"></i>
                      <span>Login</span>
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
      <router-view />
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
                <li><a href="#">Pricing Plan</a></li>
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
                <li><a href="tel:+18002345678">+1 (800) 234-5678</a></li>
                <li><a href="mailto:support@moviego.com">support@flixgo.com</a></li>
              </ul>
              <ul class="footer__social">
                <li class="facebook">
                  <a href="#"><i class="icon ion-logo-facebook"></i></a>
                </li>
                <li class="instagram">
                  <a href="#"><i class="icon ion-logo-instagram"></i></a>
                </li>
                <li class="twitter">
                  <a href="#"><i class="icon ion-logo-twitter"></i></a>
                </li>
                <li class="vk">
                  <a href="#"><i class="icon ion-logo-vk"></i></a>
                </li>
              </ul>
            </div>
            <!-- end footer list -->

            <!-- footer copyright -->
            <div class="col-12">
              <div class="footer__copyright">
                <small>
                  © 2018 FlixGo. Create by
                  <a href="https://themeforest.net/user/dmitryvolkov/portfolio?ref=DmitryVolkov" target="_blank">
                    Dmitry Volkov
                  </a>
                </small>

                <ul>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <!-- end footer copyright -->
          </div>
        </div>
      </footer>
      <!-- end footer -->
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user_id: localStorage.getItem("user_id")
    };
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style></style>
