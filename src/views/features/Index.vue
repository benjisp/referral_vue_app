<template>
  <div class="container">
    <h1>Search Features</h1>
    <input type="text" v-model="titleSearch" />
    <button v-on:click="search()">Search</button>
    <div v-for="feature in features">
      <h2>{{ feature.Title }} ({{ feature.Year }})</h2>
      <img :src="feature.Poster" alt="" />
      <br />
      <select v-model="friendId" id="">
        <option disabled>Choose Friend</option>
        <option v-for="friend in friends" v-bind:value="friend.user.id">{{ friend.user.username }}</option>
      </select>
      {{ friendId }}
      <button v-on:click="createRecommendation(feature.imdbID)">Send to Friend</button>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
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
    search: function() {
      axios.get("/api/features?search=" + this.titleSearch).then(response => {
        this.features = response.data;
      });
    },
    createRecommendation: function(imdbID) {
      var params = {
        recipient_id: this.friendId,
        imdbID: imdbID
      };
      axios.post("/api/recommendations", params).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
