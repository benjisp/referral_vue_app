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
                Feature
                <b>Search</b>
              </h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="/recommendations">Home</a></li>
                <li class="breadcrumb__item breadcrumb__item--active">Feature Search</li>
              </ul>
              <!-- end breadcrumb -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end page title -->

    <!-- filter -->
    <div class="filter">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter__content">
              <div class="filter__items">
                <!-- filter item -->
                <div class="header__search">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <div class="header__search-content">
                          <input
                            type="text"
                            v-model="titleSearch"
                            placeholder="Search for a movie or show to send your friends"
                          />

                          <button v-on:click="search()">search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end filter item -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end filter -->

    <!-- catalog -->
    <div class="catalog">
      <div class="container">
        <div class="row">
          <!-- card -->
          <div v-for="feature in features" class="col-6 col-sm-4 col-lg-3 col-xl-2">
            <div class="card">
              <div class="card__cover">
                <img :src="feature.Poster" alt="" />
              </div>
              <div class="card__content">
                <h3 class="card__title">{{ feature.Title }}</h3>
                <span class="card__rate">
                  {{ feature.Year }}
                </span>
                <!-- dropdown -->
                <div class="dropdown header__nav-item">
                  <a
                    class="dropdown-toggle header__nav-link"
                    href="#"
                    role="button"
                    id="dropdownMenuLang"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Choose Friend
                  </a>

                  <ul class="dropdown-menu header__dropdown-menu" aria-labelledby="dropdownMenuLang">
                    <li class="card__title" v-for="friend in friends">
                      {{ friend.user.username }}
                      <button
                        class="profile__btn col-sm-6"
                        v-on:click="createRecommendation(feature.imdbID, friend.user.id)"
                      >
                        Send
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- end dropdown -->
              </div>
            </div>
          </div>
          <!-- end card -->
        </div>
      </div>
    </div>
    <!-- end catalog -->
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
      features: [],
      titleSearch: "",
      friends: [],
      friendId: ""
    };
  },
  created: function() {
    axios.get("/api/friends").then(response => {
      this.friends = response.data.friends;
      console.log(this.friends);
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
    search: function() {
      axios.get("/api/features?search=" + this.titleSearch).then(response => {
        this.features = response.data;
      });
    },
    createRecommendation: function(imdbID, friendId) {
      var params = {
        recipient_id: friendId,
        imdbID: imdbID
      };
      axios.post("/api/recommendations", params).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
