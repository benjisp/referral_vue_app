<template>
  <body class="body">
    <!-- page title -->
    <section class="section section--first section--bg" data-bg="">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <!-- section title -->
              <h2 class="section__title">
                Feature
                <b>Search</b>
              </h2>
              <!-- end section title -->

              <!-- breadcrumb -->
              <ul class="breadcrumb">
                <li class="breadcrumb__item"><a href="/recommendations">Home</a></li>
                <li class="breadcrumb__item breadcrumb__item--active">Feature Search</li>
              </ul>
              <!-- end breadcrumb -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end page title -->

    <!-- filter -->
    <div class="filter">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter__content">
              <div class="filter__items">
                <!-- filter item -->
                <div class="header__search">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <div class="header__search-content">
                          <input
                            type="text"
                            v-model="titleSearch"
                            placeholder="Search for a movie or show to send your friends"
                          />

                          <button v-on:click="search()">search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end filter item -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end filter -->

    <!-- catalog -->
    <div class="catalog">
      <div class="container">
        <div class="row">
          <!-- card -->
          <div v-for="feature in features" class="col-6 col-sm-4 col-lg-3 col-xl-2">
            <div class="card">
              <div class="card__cover">
                <img :src="feature.Poster" alt="" />
              </div>
              <div class="card__content">
                <h3 class="card__title">{{ feature.Title }}</h3>
                <span class="card__rate">
                  {{ feature.Year }}
                </span>
                <!-- dropdown -->
                <div class="dropdown header__nav-item">
                  <a
                    class="dropdown-toggle header__nav-link"
                    href="#"
                    role="button"
                    id="dropdownMenuLang"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Choose Friend
                  </a>

                  <ul class="dropdown-menu header__dropdown-menu" aria-labelledby="dropdownMenuLang">
                    <li class="card__title" v-for="friend in friends">
                      {{ friend.user.username }}
                      <button
                        class="profile__btn col-sm-6"
                        v-on:click="createRecommendation(feature.imdbID, friend.user.id)"
                      >
                        Send
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- end dropdown -->
              </div>
            </div>
          </div>
          <!-- end card -->
        </div>
      </div>
    </div>
    <!-- end catalog -->
  </body>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      features: [],
      titleSearch: "",
      friends: [],
      friendId: ""
    };
  },
  created: function() {
    axios.get("/api/friends").then(response => {
      this.friends = response.data.friends;
      console.log(this.friends);
    });
  },
  methods: {
    search: function() {
      axios.get("/api/features?search=" + this.titleSearch).then(response => {
        this.features = response.data;
      });
    },
    createRecommendation: function(imdbID, friendId) {
      var params = {
        recipient_id: friendId,
        imdbID: imdbID
      };
      axios.post("/api/recommendations", params).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
