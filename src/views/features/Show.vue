<template>
  <div class="container">
    <h2>Title: {{ feature.title }}</h2>
    <h2>Year: {{ feature.year }}</h2>
    <h2>Genre: {{ feature.genre }}</h2>
    <h2>Plot: {{ feature.plot }}</h2>
    <h2>Director: {{ feature.director }}</h2>
    <img :src="feature.poster" alt="" />
    <br />
    <router-link to="/features">Back To Search</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      feature: {}
    };
  },
  created: function() {
    axios.get("/api/features/" + this.$route.params.id).then(response => {
      this.feature = response.data;
    });
  },
  methods: {}
};
</script>
