<template>
  <div class="home">
    <h2>Welcome to Movie Mate</h2>
    <h3>
      Send movie and show recommendations to your mates
    </h3>
    <h1>
      <router-link to="/signup">Signup</router-link>
      <br />
      <br />
      <router-link to="/login">Login</router-link>
    </h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
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
