<template>
  <div>
    <!-- home -->
    <section class="home">
      <!-- home bg -->
      <div class="owl-carousel home__bg">
        <div class="item home__cover" data-bg="https://wallpapercave.com/wp/wp1945897.jpg"></div>
      </div>
      <!-- end home bg -->
    </section>
    <!-- end home -->
    <!-- content -->
    <section class="content">
      <div class="content__head">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <!-- content title -->
              <h2 class="content__title">
                Features
                <b>List</b>
              </h2>
              <!-- end content title -->
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <!-- content tabs -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row">
              <!-- card -->
              <div v-if="recommendations.length <= 0" class="faq__title">
                Add some friends so they can send you recommendations!
              </div>
              <div v-else v-for="recommendation in recommendations" class="col-6 col-sm-12 col-lg-6">
                <div class="card card--list">
                  <div class="row">
                    <div class="col-12 col-sm-4">
                      <div class="card__cover">
                        <img :src="recommendation.feature.poster" alt="" />
                        <a class="card__play">
                          <button class="remove" v-on:click="removeRecommendation(recommendation)">
                            Remove From List
                          </button>
                        </a>
                      </div>
                    </div>

                    <div class="col-12 col-sm-8">
                      <div class="card__content">
                        <h3 class="card__title">
                          {{ recommendation.feature.title }} ({{ recommendation.feature.year }})
                        </h3>
                        <span class="card__category">
                          <a>{{ recommendation.feature.genre }}</a>
                        </span>
                        <span class="card__rate">Director: {{ recommendation.feature.director }}</span>

                        <div class="card__description">
                          <p>
                            {{ recommendation.feature.plot }}
                          </p>
                        </div>
                        <div class="card__wrap">
                          <span class="card__rate">Sent By: {{ recommendation.sender.username }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card -->
            </div>
          </div>
        </div>
        <!-- end content tabs -->
      </div>
    </section>
    <!-- end content -->
  </div>
</template>

<style>
.remove {
  color: white;
  font-size: 35px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recommendations: [],
      recommendation: {},
      friends: [],
      user: "",
      users: [],
      friendId: "",
      pendingId: "",
      pendingFriends: [],
      errors: [],
      friendInput: "",
      friendAdd: {}
    };
  },
  created: function() {
    axios.get("/api/recommendations").then(response => {
      this.recommendations = response.data;
    });
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log(this.users);
    });
  },
  methods: {
    changeRoute: function() {
      this.$router.push({ path: "/users/" + this.friendId });
    },
    removeRecommendation: function(recommendation) {
      axios.delete("/api/recommendations/" + recommendation.id).then(response => {
        var index = this.recommendations.indexOf(recommendation);
        this.recommendations.splice(index, 1);
      });
    },
    hasRequests: function() {
      this.pendingFriends.forEach(function(pending) {
        console.log("pending", pending);
        if (localStorage.getItem("user_id") !== pending.user.id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
