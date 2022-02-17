<template>
  <div>
    <b-container fluid>
      <b-row class="text-left">
        <b-col md="8" class="py-3" align=left>
          <b-button v-b-modal.modal-create-new-benefit>CREATE NEW BENEFIT</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create-new-benefit" :title="selected_candidate.name" ok-title=Create
    @ok="new_benefit()">
      <p class="my-4"><b>Name:</b> <b-form-input v-model="new_benefit_var.name"
      placeholder="Enter benefit name"></b-form-input></p>
    </b-modal>
    <b-card no-body>
          <b-table :items="benefits" :fields="fields" striped responsive="sm">
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
      new_benefit_var: {
        name: '',
      },
      hiring_stages: ['Applied', 'Resume Analysis', 'Contacted'],
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'creation_date',
          label: 'Creation Date',
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
        benefit: 'benefit 1',
        status: 'Published',
        hiring_type: 'Full time job',
        benefits: 'Health Insurance, PTO and Remote Work',
      },
      selected_hiring_stages: '',
      selected_tab: '',
      benefits: [
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
    new_benefit() {
      const url = 'http://localhost:7011/api/v1/benefits';
      axios
        .patch(url, this.new_benefit_var)
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_benefits();
          }
        });
      this.new_benefit_var.name = '';
    },
    onFiltered() {

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
    this.get_benefits();
  },
};
</script>
