<template>
  <div>
    <h4>Sign Up Here!</h4>
    <h6>Please fill the fields below with your information!</h6>
    <p class="my-4"><b>Name:</b> <b-form-input v-model="new_candidate_var.name"
    placeholder="Enter your full name"></b-form-input></p>
    <p class="my-4">
    <p class="my-4"><b>Address:</b> <b-form-input v-model="new_candidate_var.address"
    placeholder="Enter your full address"></b-form-input></p>
    <p class="my-4"><b>Phone:</b> <b-form-input v-model="new_candidate_var.phone"
    placeholder="Enter your phone number"></b-form-input></p>
    <p class="my-4"><b>LinkedIn:</b> <b-form-input v-model="new_candidate_var.linkedin"
    placeholder="Enter your LinkedIn profile link"></b-form-input></p>
    <p class="my-4">
    <p class="my-4"><b>E-mail:</b> <b-form-input v-model="new_candidate_var.email"
    placeholder="Enter your best e-mail"></b-form-input></p>
    <p class="my-4">
    <b>Select the jobs you want to apply for:</b>
    <b-form-select v-model="new_candidate_var.applied_to_job_postings" :options="job_postings"
    multiple :select-size="4" value-field="title" text-field="title"
    class="form-select">
    </b-form-select></p>
    <b-button @click="new_candidate()">
          Sign Up</b-button>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      new_candidate_var: {
        name: '',
        address: '',
        phone: '',
        linkedin: '',
        email: '',
        applied_to_job_postings: [],

      },
      fields: [
        {
          key: 'title',
          label: 'Title',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'description',
          label: 'Description',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'office',
          label: 'Office',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'hiring_type',
          label: 'Hiring Type',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'benefits',
          label: 'Benefits',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'salary_max',
          label: 'Salary Max',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'salary_min',
          label: 'Salary Min',
          sortable: false,
          class: 'text-center',
        },
      ],
      selected_office: '',
      offices: [
      ],
      selected_hiring_type: '',
      hiring_types: [
      ],
      job_postings: [
      ],
      selected_benefits: [
      ],
      benefits: [
      ],
      selected_job_posting: {
      },
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      activate_jobpostingvar: 'active',
      deactivate_jobpostingvar: 'inactive',
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  methods: {
    new_candidate() {
      const url = 'http://localhost:7011/api/v1/candidates/create';
      axios
        .patch(url, this.new_candidate_var);
      this.new_candidate_var.name = '';
      this.new_candidate_var.address = '';
      this.new_candidate_var.phone = '';
      this.new_candidate_var.linkedin = '';
      this.new_candidate_var.email = '';
      this.new_candidate_var.applied_to_job_postings = [];
    },
    onFiltered() {

    },
    get_job_postings() {
      const url = 'http://localhost:7011/api/v1/job_postings';
      axios
        .get(url)
        .then((response) => {
          this.job_postings = response.data.job_postings;
        });
    },
    get_offices() {
      const url = 'http://localhost:7011/api/v1/offices';
      axios
        .get(url)
        .then((response) => {
          this.offices = response.data.offices;
        });
    },
    get_hiring_types() {
      const url = 'http://localhost:7011/api/v1/hiring_types';
      axios
        .get(url)
        .then((response) => {
          this.hiring_types = response.data.hiring_types;
        });
    },
    get_benefits() {
      const url = 'http://localhost:7011/api/v1/benefits';
      axios
        .get(url)
        .then((response) => {
          this.benefits = response.data.benefits;
        });
    },
  },
  created() {
    this.get_job_postings();
  },
};
</script>
