<template>
  <body class="body">
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
