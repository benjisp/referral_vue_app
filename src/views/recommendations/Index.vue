<template>
  <div>
    <!-- home -->
    <section class="home">
      <!-- home bg -->
      <div class="owl-carousel home__bg">
        <div class="item home__cover" data-bg="https://wallpapercave.com/wp/wp1945897.jpg"></div>
      </div>
      <!-- end home bg -->
    </section>
    <!-- end home -->
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
    <!-- content -->
    <section class="content">
      <div class="content__head">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <!-- content title -->
              <h2 class="content__title">
                Features
                <b>List</b>
              </h2>
              <!-- end content title -->
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <!-- content tabs -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row">
              <!-- card -->
              <div v-if="recommendations.length <= 0" class="faq__title">
                Add some friends so they can send you recommendations!
              </div>
              <div v-else v-for="recommendation in recommendations" class="col-6 col-sm-12 col-lg-6">
                <div class="card card--list">
                  <div class="row">
                    <div class="col-12 col-sm-4">
                      <div class="card__cover">
                        <img :src="recommendation.feature.poster" alt="" />
                        <a class="card__play">
                          <button class="remove" v-on:click="removeRecommendation(recommendation)">
                            Remove From List
                          </button>
                        </a>
                      </div>
                    </div>

                    <div class="col-12 col-sm-8">
                      <div class="card__content">
                        <h3 class="card__title">
                          {{ recommendation.feature.title }} ({{ recommendation.feature.year }})
                        </h3>
                        <span class="card__category">
                          <a>{{ recommendation.feature.genre }}</a>
                        </span>
                        <span class="card__rate">Director: {{ recommendation.feature.director }}</span>

                        <div class="card__description">
                          <p>
                            {{ recommendation.feature.plot }}
                          </p>
                        </div>
                        <div class="card__wrap">
                          <span class="card__rate">Sent By: {{ recommendation.sender.username }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card -->
            </div>
          </div>
        </div>
        <!-- end content tabs -->
      </div>
    </section>
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
  </div>
</template>

<style>
.remove {
  color: white;
  font-size: 35px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user_id: localStorage.getItem("user_id"),
      recommendations: [],
      recommendation: {},
      friends: [],
      user: "",
      users: [],
      friendId: "",
      pendingId: "",
      pendingFriends: [],
      errors: [],
      friendInput: "",
      friendAdd: {}
    };
  },
  created: function() {
    axios.get("/api/recommendations").then(response => {
      this.recommendations = response.data;
    });
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log(this.users);
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
    changeRoute: function() {
      this.$router.push({ path: "/users/" + this.friendId });
    },
    removeRecommendation: function(recommendation) {
      axios.delete("/api/recommendations/" + recommendation.id).then(response => {
        var index = this.recommendations.indexOf(recommendation);
        this.recommendations.splice(index, 1);
      });
    },
    hasRequests: function() {
      this.pendingFriends.forEach(function(pending) {
        console.log("pending", pending);
        if (localStorage.getItem("user_id") !== pending.user.id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
