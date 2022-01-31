import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import StaticJobPostings from '../views/StaticJobPostings.vue';
import JobPostings from '../views/JobPostings.vue';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
