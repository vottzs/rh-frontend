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
          <h4>{{job_posting.title}}</h4>
        </b-col>
        <b-col md="1" class="py-3">
          <b-button v-b-modal.modal-job-posting-detail>Details</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-job-posting-detail" hide-footer>
      <template v-slot:modal-header>
        <b-container fluid>
          <b-row class="text-center">
            <b-col md="9" class="py-3" align='left'>
              <h4 class="modal-title">
                <b>{{job_posting.title}}</b>
              </h4>
            </b-col>
            <b-col md="1" class="py-3" align='right'>
              <b-button variant="light border-dark" class="btn btn-primary action_btn float-right"
              v-on:click="closeModal" align="right">
                Edit
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <p class="my-4"><b>Office:</b> {{job_posting.office}}</p>
      <p class="my-4"><b>Hiring Type:</b> {{job_posting.hiring_type}}</p>
      <p class="my-4"><b>Status:</b> {{job_posting.status}}</p>
      <p class="my-4"><b>Description:</b> {{job_posting.description}}</p>
      <p class="my-4"><b>Salary Range:</b>
       From ${{job_posting.salary_min}} to ${{job_posting.salary_max}}</p>
       <p class="my-4"><b>Benefits:</b> {{job_posting.benefits}}</p>
    </b-modal>
    <b-modal id="modal-candidate-detail" hide-footer>
      <template v-slot:modal-header>
        <b-container fluid>
          <b-row class="text-center">
            <b-col md="10" class="py-3" align='left'>
              <h4 class="modal-title">
                <b>{{selected_candidate.name}}</b>
              </h4>
            </b-col>
            <b-col md="2" class="py-3" align='right'>
              <b-button variant="light border-dark" class="btn btn-primary action_btn float-right"
              v-on:click="closeModal" align="right">
                Edit
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <p class="my-4"><b>Address:</b> {{selected_candidate.address}}</p>
      <p class="my-4"><b>Phone:</b> {{selected_candidate.phone}}</p>
      <p class="my-4"><b>Email:</b> {{selected_candidate.email}}</p>
      <p class="my-4"><b>LinkedIn:</b> {{selected_candidate.linkedin}}</p>
      <p class="my-4"><b>Applied to:</b> {{job_posting.title}}</p>
    </b-modal>
    <b-modal id="modal-move-candidate" :title="selected_candidate.name" ok-title=Move
    @ok="move_candidate">
      <p class="my-4"><b>Current Stage:</b> {{selected_candidate.stage}}</p>
      <p class="my-4">
        <b>Move to:</b>
        <b-form-select v-model="selected_hiring_stages" :options="hiring_stages"
        class="form-select">
        </b-form-select>
      </p>
    </b-modal>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="stage in hiring_stages" :key="'dyn-tab-' + stage" :title="stage"
        v-on:click="get_candidates(stage)">
          <b-table :items="candidates" :fields="fields" striped responsive="sm"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered">
            <template #cell(Actions)="row">
              <b-button size="sm" class="mr-2" @click="archive_cadidate(row.item)">
                Archive
              </b-button>&nbsp;
              <b-button size="sm" class="mr-2"
              v-b-modal.modal-move-candidate @click="select_candidate(row.item)">
                Move
              </b-button>&nbsp;
              <b-button size="sm" class="mr-2"
              v-b-modal.modal-candidate-detail @click="select_candidate(row.item)">
                Details
              </b-button>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hiring_stages: ['Applied', 'Resume Analysis', 'Contacted'],
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'applied_on',
          label: 'Applied On',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'stage',
          label: 'Stage',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'last_modified_on',
          label: 'Last Modify On',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'Actions',
          label: 'Actions',
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
      candidates: [
      ],
      selected_candidate: {
      },
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      archive_cadidatevar: 'Archived',
      activate_jobpostingvar: 'active',
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
    select_candidate(candidate) {
      this.selected_candidate = candidate;
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
    get_job_postings(stage) {
      this.activate_jobpostingvar = stage;
      const url = `http://localhost:7011/api/v1/job_postings/import/${stage}`;
      axios
        .get(url)
        .then((response) => {
          this.job_posting = response.data.job_posting;
        });
    },
  },
  created() {
    this.get_candidates('Applied');
    this.get_hiring_stages();
    this.get_job_postings('active');
  },
};
</script>
