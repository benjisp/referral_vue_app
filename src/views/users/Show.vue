<template>
  <div class="container">
    <h2>Username: {{ user.username }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <router-link v-bind:to="`/users/${user.id}/edit`">Edit User</router-link>
    <br />
    <br />
    <router-link to="/">Back to Home</router-link>
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
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function(user) {
      axios.delete("/api/users/" + user.id).then(response => {
        this.$router.push("/signup");
      });
    }
  }
};
</script>
