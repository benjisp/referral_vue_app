<template>
  <div class="container">
    <h4>
      My Friends:
      <select v-model="friendId" class="form-control" v-on:change="changeRoute" id="">
        <option disabled>Choose Friend</option>
        <option v-for="friend in friends" v-bind:value="friend.user.id">{{ friend.user.username }}</option>
      </select>
    </h4>
    <h4>
      Friend Requests:
      <ul>
        <li v-for="pendingFriend in pendingFriends" v-bind:value="pendingFriend.user.id">
          {{ pendingFriend.user.username }}
          <button v-on:click="acceptFriend(pendingFriend)">Accept</button>
          <button v-on:click="declineFriend(pendingFriend)">Decline</button>
        </li>
      </ul>
      <form v-on:submit.prevent="addFriend()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Add Friend:</label>
          <input type="text" class="form-control" v-model="friendInput" />
        </div>
        <input type="submit" class="btn btn-primary" value="Send Friend Request" />
      </form>
    </h4>
    <h1>My Features</h1>
    <div v-for="recommendation in recommendations">
      <h2>{{ recommendation.feature.title }} ({{ recommendation.feature.year }})</h2>
      <h3>{{ recommendation.feature.plot }}</h3>
      <h3>Genre: {{ recommendation.feature.genre }}</h3>
      <h3>Director: {{ recommendation.feature.director }}</h3>
      <img :src="recommendation.feature.poster" alt="" />
      <h4>
        Sent by: {{ recommendation.sender.username }}
        <button v-on:click="removeRecommendation(recommendation)">Remove From List</button>
      </h4>
      <br />
    </div>
  </div>
</template>

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
      friendAdd: {}
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
          console.log(response.data);
        })
        .catch(error => {
          this.errors = ["User does not exist."];
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
