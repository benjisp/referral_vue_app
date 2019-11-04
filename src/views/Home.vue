<template>
  <div class="home">
    <h1>My Features</h1>
    <div v-for="recommendation in recommendations">
      <h2>{{ recommendation }}</h2>
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
  },
  methods: {}
};
</script>
