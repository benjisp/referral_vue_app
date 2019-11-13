<template>
  <body class="body">
    <section class="section section--first section--bg" data-bg="">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <!-- section title -->
              <h2 class="section__title">
                My
                <b>Profile</b>
              </h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="/recommendations">Home</a></li>
                <li class="breadcrumb__item breadcrumb__item--active">Profile</li>
              </ul>
              <!-- end breadcrumb -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content -->
    <div class="content">
      <!-- profile -->
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="profile__content">
                <div class="profile__user">
                  <div class="profile__avatar">
                    <img src="img/user.png" alt="" />
                  </div>
                  <div class="profile__meta">
                    <h3>{{ user.username }}</h3>
                  </div>
                </div>

                <a href="/" class="profile__logout">
                  <i class="icon ion-ios-log-out"></i>
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end profile -->

      <div class="container">
        <!-- content tabs -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row">
              <!-- details form -->
              <div class="col-12 col-lg-6">
                <form v-on:submit.prevent="updateUser(user)" class="profile__form">
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="col-12">
                      <h4 class="profile__title">Update Profile</h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="username">Username</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          class="profile__input"
                          v-model="user.username"
                        />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="email">Email</label>
                        <input id="email" type="text" name="email" class="profile__input" v-model="user.email" />
                      </div>
                    </div>

                    <div class="col-12">
                      <input type="submit" class="profile__btn" value="SAVE" />
                    </div>
                  </div>
                </form>
              </div>
              <!-- end details form -->

              <!-- password form -->
              <div class="col-12 col-lg-6">
                <form v-on:submit.prevent="updateUser(user)" class="profile__form">
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="row">
                    <div class="col-12">
                      <h4 class="profile__title">Change Password</h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="newpass">New Password</label>
                        <input id="newpass" type="text" name="newpass" class="profile__input" v-model="user.password" />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="confirmpass">Confirm New Password</label>
                        <input
                          id="confirmpass"
                          type="text"
                          name="confirmpass"
                          class="profile__input"
                          v-model="user.password_confirmation"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <input type="submit" class="profile__btn" value="CHANGE" />
                    </div>
                  </div>
                </form>
              </div>
              <!-- end password form -->
            </div>
          </div>
        </div>
        <!-- end content tabs -->
      </div>
    </div>
    <!-- end content -->
  </body>
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
          this.$router.push("/users/" + this.user.id + "/edit");
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
