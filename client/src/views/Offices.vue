<template>
  <div>
    <b-container fluid>
      <b-row class="text-left">
        <b-col md="8" class="py-3" align=left>
          <b-button v-b-modal.modal-create-new-office>CREATE NEW OFFICE</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create-new-office" :title="selected_candidate.name" ok-title=Create
    @ok="move_candidate">
      <p class="my-4"><b>Tittle:</b> <b-form-input v-model="text"
      placeholder="Enter office tittle"></b-form-input></p>
      <p class="my-4">
        <b>Address:</b>
        <b-form-input v-model="text" placeholder="Enter office address">
      </b-form-input>
      </p>
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
      <p class="my-4"><b>Current Stage:</b> {{selected_candidate.Stage}}</p>
      <p class="my-4">
        <b>Move to:</b>
        <b-form-select v-model="selected_hiring_stages" :options="hiring_stages"
        class="form-select">
        </b-form-select>
      </p>
    </b-modal>
    <b-card no-body>
          <b-table :items="candidates" :fields="fields" striped responsive="sm">
            <template #cell(Actions)>
              <b-button size="sm" class="mr-2">
                Delete
              </b-button>&nbsp;
              <b-button size="sm" class="mr-2">
                Edit
              </b-button>
            </template>
          </b-table>
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
          key: 'tittle',
          label: 'Tittle',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'address',
          label: 'Address',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'creation_time',
          label: 'Creation Time',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'Actions',
          label: 'Actions',
          sortable: false,
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
        {
          tittle: 'Headquarter',
          address: '1515 Broadway New York, New York 10036 ',
          phone: '+1 (201) 766-7329',
        },
        {
          tittle: 'Office 1',
          address: '1515 Broadway New York, New York 10038',
          phone: '+1 (212) 846-6006',
        },
        {
          tittle: 'Office 2',
          address: '17 - 29 Hawley Crescent, Camden, London NW1 8TT',
          phone: '+1 (212) 846-6007',
        },
      ],
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
    select_candidate(candidate) {
      this.selected_candidate = candidate;
    },
    move_candidate() {
      const url = `http://localhost:7011/api/v1/candidates/${this.selected_candidate.id}`;
      axios
        .patch(url, { Stage: this.selected_hiring_stages })
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
        .patch(url, { Stage: this.archive_cadidatevar })
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_candidates(this.selected_tab);
          }
        });
    },
    onFiltered() {

    },
    get_candidates(Stage) {
      this.selected_tab = Stage;
      const url = `http://localhost:7011/api/v1/candidates?Stage=${Stage}`;
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
  },
  created() {
    this.get_candidates('Applied');
    this.get_hiring_stages();
  },
};
</script>
