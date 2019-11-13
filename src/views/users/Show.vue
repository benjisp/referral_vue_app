<template>
  <body class="body">
    <section class="section section--first section--bg" data-bg="img/section/section.jpg">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <!-- section title -->
              <h2 class="section__title">My Profile</h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="#">Home</a></li>
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

                <button class="profile__logout" type="button">
                  <i class="icon ion-ios-log-out"></i>
                  <span>Logout</span>
                </button>
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
                <form action="#" class="profile__form">
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
                          placeholder="User 123"
                        />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          class="profile__input"
                          placeholder="email@email.com"
                        />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="firstname">First Name</label>
                        <input id="firstname" type="text" name="firstname" class="profile__input" placeholder="John" />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="lastname">Last Name</label>
                        <input id="lastname" type="text" name="lastname" class="profile__input" placeholder="Doe" />
                      </div>
                    </div>

                    <div class="col-12">
                      <button class="profile__btn" type="button">Save</button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- end details form -->

              <!-- password form -->
              <div class="col-12 col-lg-6">
                <form action="#" class="profile__form">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="profile__title">Change password</h4>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="oldpass">Old Password</label>
                        <input id="oldpass" type="password" name="oldpass" class="profile__input" />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="newpass">New Password</label>
                        <input id="newpass" type="password" name="newpass" class="profile__input" />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div class="profile__group">
                        <label class="profile__label" for="confirmpass">Confirm New Password</label>
                        <input id="confirmpass" type="password" name="confirmpass" class="profile__input" />
                      </div>
                    </div>

                    <div class="col-12">
                      <button class="profile__btn" type="button">Change</button>
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
