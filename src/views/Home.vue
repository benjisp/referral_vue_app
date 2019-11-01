<template>
  <div class="home">
    <h1>My Features</h1>
    <div v-for="recommendation in recommendations">
      <h2>{{ recommendation.recommendations }}</h2>
    </div>
    <div v-for="user in users">
      <router-link v-bind:to="`/users/${user.id}`">Profile</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recommendations: [],
      user: {}
    };
  },
  created: function() {
    axios.get("/api/recommendations").then(response => {
      this.recommendations = response.data;
    });
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {}
};
</script>
