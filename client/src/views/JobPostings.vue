<template>
  <div>
    <h4>{{job_posting.title}}</h4>
    <b-button v-b-modal.modal-job-posting-detail>Details</b-button>
    <b-modal id="modal-job-posting-detail" hide-footer>
      <template v-slot:modal-header>
        <h4 class="modal-title">
          <b>Title Details</b>
        </h4>
        <div class="w-100">
            <b-button variant="light border-dark" class="btn btn-primary action_btn float-right"
              v-on:click="closeModal">
                Edit
            </b-button>
        </div>
    </template>
      <p class="my-4"><b>Office:</b> {{job_posting.office}}</p>
      <p class="my-4"><b>Status:</b> {{job_posting.status}}</p>
      <p class="my-4"><b>Description:</b> {{job_posting.description}}</p>
    </b-modal>
    <b-modal id="modal-candidate-detail" hide-footer>
      <template v-slot:modal-header>
        <h4 class="modal-title">
          <b>{{selected_candidate.name}} Details</b>
        </h4>
        <div class="w-100">
            <b-button variant="light border-dark" class="btn btn-primary action_btn float-right"
              v-on:click="closeModal">
                Edit
            </b-button>
        </div>
    </template>
      <p class="my-4"><b>Address:</b> {{selected_candidate.address}}</p>
      <p class="my-4"><b>Email:</b> {{selected_candidate.email}}</p>
    </b-modal>
    <b-modal id="modal-move-candidate" :title="selected_candidate.name"
      ok-title="Move" @ok="move_candidate">
      <p class="my-4"><b>Current stage:</b> {{selected_candidate.stage}}</p>
      <p class="my-4">
        <b>Move to:</b>
        <b-form-select v-model="selected_hiring_stage" :options="hiring_stages"
          class="form-select">
        </b-form-select>
      </p>
    </b-modal>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="stage in hiring_stages" :key="'dyn-tab-' + stage" :title="stage"
        v-on:click="get_candidates(stage)">
          <b-table :items="candidates" :fields="fields" striped responsive="sm">
            <template #cell(actions)="row">
              <b-button size="sm" class="mr-2" @click="archive_candidate(row.item)">
                Archive
              </b-button>
              <b-button size="sm" class="mr-2"
                v-b-modal.modal-move-candidate @click="select_candidate(row.item)">
                Move
              </b-button>
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
      hiring_stages: ['Applied', 'Resume Analysis', 'Interview'],
      fields: ['name', 'applied_on', 'stage', 'last_modified_on', 'actions'],
      job_posting: {
        title: 'Quality Assurance',
        description: 'A quality assurance specialist ensures that the final product observes the company\'s quality standards. In general, these detail-oriented professionals are responsible for the development and implementation of inspection activities, the detection and resolution of problems, and the delivery of satisfactory outcomes.',
        salary_min: 1000,
        salary_max: 5000,
        office: 'Headquarters',
        status: 'Published',
      },
      candidates: [
        {
          name: 'Michelangelo',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified_on: 'December 10, 1815',
          email: 'Michelangelo@tmtn.com',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
        },
      ],
      selected_candidate: {
      },
      selected_hiring_stage: '',
      selected_tab: '',
    };
  },
  methods: {
    select_candidate(candidate) {
      this.selected_candidate = candidate;
    },
    move_candidate() {
      const url = `http://localhost:7011/api/v1/candidates/${this.selected_candidate.id}`;
      axios
        .patch(url, { stage: this.selected_hiring_stage })
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_candidates(this.selected_tab);
          }
        });
      this.selected_candidate.stage = this.selected_hiring_stage;
      this.selected_hiring_stage = '';
    },
    archive_candidate() {
      const url = `http://localhost:7011/api/v1/candidates/${this.selected_candidate.id}`;
      axios
        .patch(url, { stage: 'Archived' })
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_candidates(this.selected_tab);
          }
        });
      this.selected_candidate.stage = 'Archived';
      this.selected_hiring_stage = '';
      // this.select_candidate(candidate);
      // this.selected_candidate.stage = 'Archived';
      // this.candidates.splice(index, 1);
    },
    get_candidates(stage) {
      this.selected_tab = stage;
      let newStage = stage;
      if (stage === undefined) {
        newStage = 'Applied';
      }
      const url = `http://192.168.1.21:7011/api/v1/candidates?stage=${newStage}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.candidates = response.data.candidates;
        });
    },
    get_hiring_stages() {
      axios
        .get('http://192.168.1.21:7011/api/v1/hiring_stages')
        .then((response) => {
          // console.log(response);
          this.hiring_stages = response.data.hiring_stages;
        });
    },
  },
  created() {
    this.get_candidates();
    this.get_hiring_stages();
  },
};
</script>
