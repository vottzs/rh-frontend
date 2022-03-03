<template>
  <div>
    <b-row>
      <b-col lg="5" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-container fluid>
      <b-row class="text-center">
        <b-col md="3" class="py-3" align='left'>
          <b-button v-b-modal.modal-create-new-job-posting>Create new job posting</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create-new-job-posting" :title="'Create new job posting'" ok-title="Create"
    @ok="new_job_posting()">
      <p class="my-4"><b>Title:</b> <b-form-input v-model="new_job_posting_var.title"
      placeholder="Enter job posting title"></b-form-input></p>
      <p class="my-4">
        <b>Description:</b>
        <b-form-textarea
          id="textarea"
          v-model="new_job_posting_var.description"
          placeholder="Enter job description"
          rows="3"
          max-rows="6"
        ></b-form-textarea></p>
      <p class="my-4">
        <b>Office:</b>
        <b-form-input v-model="new_job_posting_var.office" placeholder="Enter job office">
      </b-form-input></p>
      <p class="my-4">
        <b>Hiring Type:</b>
        <b-form-input v-model="new_job_posting_var.hiring_type" placeholder="Enter job hiring type">
      </b-form-input></p>
      <p class="my-4">
        <b>Benefits:</b>
        <b-form-textarea
          id="textarea"
          v-model="new_job_posting_var.benefits"
          placeholder="Enter job benefits"
          rows="3"
          max-rows="6"
        ></b-form-textarea></p>
      <p class="my-4">
        <b>Salary Max:</b>
        <b-form-input v-model="new_job_posting_var.salary_max" placeholder="Enter salary max">
      </b-form-input></p>
      <p class="my-4">
        <b>Salary Min:</b>
        <b-form-input v-model="new_job_posting_var.salary_min" placeholder="Enter salary min">
      </b-form-input></p>
    </b-modal>
      <b-table :items="job_postings" :fields="fields" striped responsive="sm"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered">
        <template #cell(title)="row">
        <b-link href="http://localhost:8080/job_postings" @click="active_job_posting(row.item)">{{row.item.title}}</b-link>
        </template>
      </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      new_job_posting_var: {
        title: '',
        description: '',
        office: '',
        hiring_type: '',
        benefits: '',
        salary_max: '',
        salary_min: '',
        stage: 'inactive',
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
      job_postings: [
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
    select_job_posting(jobPosting) {
      this.selected_job_posting = jobPosting;
    },
    active_job_posting(jobPosting) {
      this.select_job_posting(jobPosting);
      const url = `http://localhost:7011/api/v1/job_postings/${this.selected_job_posting.title}`;
      axios
        .patch(url, { stage: this.activate_jobpostingvar });
      alert('Você está sendo redirecionado');
    },
    reset_job_posting_stage(stage) {
      this.activate_jobpostingvar = stage;
      const url = `http://localhost:7011/api/v1/job_postings?stage=${stage}`;
      axios
        .post(url, { stage: this.activate_jobpostingvar });
    },
    new_job_posting() {
      const url = 'http://localhost:7011/api/v1/job_postings';
      axios
        .patch(url, this.new_job_posting_var)
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_job_postings();
          }
        });
      this.new_job_posting_var.title = '';
      this.new_job_posting_var.description = '';
      this.new_job_posting_var.office = '';
      this.new_job_posting_var.hiring_type = '';
      this.new_job_posting_var.benefits = '';
      this.new_job_posting_var.salary_max = '';
      this.new_job_posting_var.salary_min = '';
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
  },
  created() {
    this.get_job_postings();
    this.reset_job_posting_stage('active');
  },
};
</script>
