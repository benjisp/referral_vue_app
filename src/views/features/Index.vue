<template>
  <div class="container">
    <h1>All Features</h1>
    <div v-for="feature in features">
      <h2>{{ feature }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      features: []
    };
  },
  created: function() {
    axios.get("/api/features?search=hercules").then(response => {
      this.features = response.data;
    });
  },
  methods: {}
};
</script>
