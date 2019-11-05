<template>
  <div class="home">
    <h2>
      My Friends:
      <select v-model="friendId" class="form-control" v-on:change="changeRoute" id="">
        <option disabled>Choose Friend</option>
        <option v-for="friend in friends" v-bind:value="friend.user.id">{{ friend.user.username }}</option>
      </select>
      {{ friendId }}
    </h2>
    <h1>My Features</h1>
    <div v-for="recommendation in recommendations">
      <h2>{{ recommendation.feature.title }}</h2>
      <h2>{{ recommendation.feature.year }}</h2>
      <h2>{{ recommendation.feature.genre }}</h2>
      <h2>{{ recommendation.feature.plot }}</h2>
      <h2>{{ recommendation.feature.director }}</h2>
      <img :src="recommendation.feature.poster" alt="" />
      <h2>Sent by: {{ recommendation.sender.username }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recommendations: [],
      user: {},
      friends: [],
      friendId: ""
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
  },
  methods: {
    changeRoute: function() {
      this.$router.push({ path: "/users/" + this.friendId });
    }
  }
};
</script>
