import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import UsersShow from "./views/users/Show.vue";
import UsersEdit from "./views/users/Edit.vue";
import FeaturesIndex from "./views/features/Index.vue";
import FeaturesShow from "./views/features/Show.vue";
import FriendsIndex from "./views/friends/Index.vue";
import RecommendationsIndex from "./views/recommendations/Index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/users/:id",
      name: "users-show",
      component: UsersShow
    },
    {
      path: "/users/:id/edit",
      name: "users-edit",
      component: UsersEdit
    },
    {
      path: "/features",
      name: "features-index",
      component: FeaturesIndex
    },
    {
      path: "/features/:id",
      name: "features-show",
      component: FeaturesShow
    },
    {
      path: "/friends/",
      name: "friends-index",
      component: FriendsIndex
    },
    {
      path: "/recommendations",
      name: "recommendations-index",
      component: RecommendationsIndex
    }
  ]
});
