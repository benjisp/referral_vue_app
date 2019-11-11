<template>
  <div class="container">
    <h2>Username: {{ user.username }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <router-link v-if="isCurrentUser()" v-bind:to="`/users/${user.id}/edit`">Edit Profile</router-link>
    <br />
    <br />
    <router-link to="/recommendations">Back to my features</router-link>
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
    isCurrentUser: function() {
      if (localStorage.getItem("user_id") === this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
