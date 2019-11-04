<template>
  <div class="container">
    <h1>Edit User</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Change Username:
      <input type="text" v-model="user.username" />
      <br />
      Change Email:
      <input type="text" v-model="user.email" />
      <br />
      Change Password:
      <input type="text" v-model="user.password" />
      <br />
      <input type="submit" value="Update" />
    </form>
    <br />
    <br />
    <button v-on:click="destroyUser(user)">Delete Account</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        username: user.username,
        email: user.email,
        password: user.password
      };
      axios
        .patch("/api/users/" + user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function(user) {
      axios.delete("/api/users/" + user.id).then(response => {
        this.$router.push("/signup");
      });
    }
  }
};
</script>
