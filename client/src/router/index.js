import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import StaticJobPostings from '../views/StaticJobPostings.vue';
import JobPostings from '../views/JobPostings.vue';
import Offices from '../views/Offices.vue';
import Benefits from '../views/Benefits.vue';
import HiringTypes from '../views/HiringTypes.vue';
import AllJobPostings from '../views/AllJobPostings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/static_job_postings',
    name: 'Static Job Postings',
    component: StaticJobPostings,
  },
  {
    path: '/job_postings',
    name: 'Job Postings',
    component: JobPostings,
  },
  {
    path: '/offices',
    name: 'Offices',
    component: Offices,
  },
  {
    path: '/benefits',
    name: 'Benefits',
    component: Benefits,
  },
  {
    path: '/hiring_types',
    name: 'Hiring Types',
    component: HiringTypes,
  },
  {
    path: '/all_job_postings',
    name: 'All Job Postings',
    component: AllJobPostings,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
