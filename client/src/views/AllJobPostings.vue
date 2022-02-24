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
      <p class="my-4"><b>Tittle:</b> <b-form-input v-model="new_job_posting_var.tittle"
      placeholder="Enter job posting tittle"></b-form-input></p>
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
      </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      new_job_posting_var: {
        tittle: '',
        description: '',
        office: '',
        hiring_type: '',
        benefits: '',
        salary_max: '',
        salary_min: '',
      },
      fields: [
        {
          key: 'tittle',
          label: 'Tittle',
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
      job_posting: {
        title: 'Quality Assurance',
        description: 'A quality assurance specialist ensures that the final product observes the company\'s quality standards. In general, these detail-oriented professionals are responsible for the development and implementation of inspection activities, the detection and resolution of problems, and the delivery of satisfactory outcomes.',
        salary_min: 1000,
        salary_max: 5000,
        office: 'Office 1',
        status: 'Published',
        hiring_type: 'Full time job',
        benefits: 'Health Insurance, PTO and Remote Work',
      },
      selected_hiring_stages: '',
      selected_tab: '',
      job_postings: [
      ],
      candidates: [],
      selected_candidate: {
      },
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      archive_cadidatevar: 'Archived',
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
    new_job_posting() {
      const url = 'http://localhost:7011/api/v1/job_postings';
      axios
        .patch(url, this.new_job_posting_var)
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_job_postings();
          }
        });
      this.new_job_posting_var.tittle = '';
      this.new_job_posting_var.description = '';
      this.new_job_posting_var.office = '';
      this.new_job_posting_var.hiring_type = '';
      this.new_job_posting_var.benefits = '';
      this.new_job_posting_var.salary_max = '';
      this.new_job_posting_var.salary_min = '';
    },
    move_candidate() {
      const url = `http://localhost:7011/api/v1/candidates/${this.selected_candidate.id}`;
      axios
        .patch(url, { stage: this.selected_hiring_stages })
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_candidates(this.selected_tab);
          }
        });
      this.selected_hiring_stages = '';
    },
    archive_cadidate(candidate) {
      this.select_candidate(candidate);
      const url = `http://localhost:7011/api/v1/candidates/${this.selected_candidate.id}`;
      axios
        .patch(url, { stage: this.archive_cadidatevar })
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_candidates(this.selected_tab);
          }
        });
    },
    onFiltered() {

    },
    get_candidates(stage) {
      this.selected_tab = stage;
      const url = `http://localhost:7011/api/v1/candidates?stage=${stage}`;
      axios
        .get(url)
        .then((response) => {
          this.candidates = response.data.candidates;
        });
    },
    get_hiring_stages() {
      axios
        .get('http://localhost:7011/api/v1/hiring_stages')
        .then((response) => {
          this.hiring_stages = response.data.hiring_stages;
        });
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
  },
};
</script>
