<template>
  <div class="container">
    <h3>
      My Friends:
      <select v-model="friendId" class="form-control" v-on:change="changeRoute" id="">
        <option disabled>Choose Friend</option>
        <option v-for="friend in friends" v-bind:value="friend.user.id">{{ friend.user.username }}</option>
      </select>
    </h3>
    <h3>
      Friend Requests:
      <select v-model="pendingFriends" id="">
        <option disabled>Choose Friend</option>
        <option v-for="friend in friends" v-bind:value="friend.user.id">{{ friend }}</option>
      </select>
      <button v-on:click="acceptFriend()">Accept Friend Request</button>
    </h3>
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
      user: {},
      friends: {},
      friendId: "",
      pendingFriends: ""
    };
  },
  created: function() {
    axios.get("/api/recommendations").then(response => {
      this.recommendations = response.data;
    });
    axios.get("/api/friends").then(response => {
      this.friends = response.data.friends;
      console.log(this.friends);
    });
    axios.get("/api/friends").then(response => {
      this.requests = response.data.requests;
      console.log(this.requests);
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
    }
  }
};
</script>
