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
    <section class="section section--first section--bg" data-bg="">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <!-- section title -->
              <h2 class="section__title">
                My
                <b>Friends</b>
              </h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="/recommendations">Home</a></li>
                <li class="breadcrumb__item breadcrumb__item--active">Friends</li>
              </ul>
              <!-- end breadcrumb -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content -->
    <div class="content">
      <div class="container">
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
                              <input type="text" v-model="friendInput" placeholder="Send a friend request" />

                              <button v-on:click="addFriend()">Send</button>
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
          <span class="success">{{ message }}</span>
          <ul>
            <li class="error" v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
        <!-- end filter -->
        <!-- content tabs -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row">
              <!-- details form -->
              <div class="col-12 col-lg-6">
                <form class="profile__form">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="section__title">
                        Friends List
                      </h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div v-if="friends.length <= 0" class="profile__title">Add some friends!</div>
                      <div v-else v-for="friend in friends" v-bind:value="friend.user.id" class="profile__group">
                        <label class="card__title" for="username">
                          <b>
                            Username:
                          </b>
                          {{ friend.user.username }}
                        </label>
                        <br />
                        <label class="card__title" for="username">
                          <b>Email:</b>
                          {{ friend.user.email }}
                        </label>
                        <button class="profile__btn" v-on:click="removeFriend(friend)">Remove Friend</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <!-- end details form -->

              <!-- password form -->
              <div class="col-12 col-lg-6">
                <form class="profile__form">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="section__title">
                        Friend Requests
                      </h4>
                    </div>

                    <div class="col-12 col-md-12">
                      <div v-if="pendingFriends.length <= 0" class="profile__title">
                        You have no pending friend requests.
                      </div>
                      <div
                        v-else
                        v-for="pendingFriend in pendingFriends"
                        v-bind:value="pendingFriend.user.id"
                        class="profile__group"
                      >
                        <label class="card__title">Username: {{ pendingFriend.user.username }}</label>
                        <button class="profile__btn" v-on:click="acceptFriend(pendingFriend)">
                          Accept
                        </button>
                        <button class="profile__btn" v-on:click="declineFriend(pendingFriend)">Decline</button>
                      </div>
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

<style>
.success {
  color: white;
}
.error {
  color: red;
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
      friendAdd: {},
      message: ""
    };
  },
  created: function() {
    axios.get("/api/recommendations").then(response => {
      this.recommendations = response.data;
    });
    axios.get("/api/friends").then(response => {
      console.log(response.data);
      this.friends = response.data.friends;
      console.log(this.friends);
      this.pendingFriends = response.data.pending_friends;
      console.log(this.pendingFriends);
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
    addFriend: function() {
      var friendAdd = {};
      var friendInputCheck = this.friendInput;
      this.users.forEach(function(user) {
        if (friendInputCheck.toUpperCase() === user.username.toUpperCase()) {
          friendAdd = user;
        }
      });
      var params = {
        user2_id: friendAdd.id
      };
      axios
        .post("/api/friends", params)
        .then(response => {
          this.message = "Friend request sent!";
          console.log(response.data);
        })
        .catch(error => {
          this.errors = ["User does not exist."];
        });
    },
    acceptFriend: function(friend) {
      axios
        .patch("/api/friends/" + friend.id)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    declineFriend: function(friend) {
      axios.delete("/api/friends/" + friend.id).then(response => {
        var index = this.pendingFriends.indexOf(friend);
        this.pendingFriends.splice(index, 1);
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
    },
    removeFriend: function(friend) {
      axios.delete("/api/friends/" + friend.id).then(response => {
        var index = this.friends.indexOf(friend);
        this.friends.splice(index, 1);
      });
    }
  }
};
</script>
