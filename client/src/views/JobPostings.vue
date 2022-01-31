<template>
  <div>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

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
      <p class="my-4"><b>Status:</b> {{job_posting.status}}</p>
      <p class="my-4"><b>Description:</b> {{job_posting.description}}</p>
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
      <p class="my-4"><b>Email:</b> {{selected_candidate.email}}</p>
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
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="tab_name in hiring_stages" :key="'dyn-tab-' + tab_name" :title="tab_name">
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
              <b-button size="sm" class="mr-2" @click="archive_cadidate(row.item, row.index)">
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
export default {
  data() {
    return {
      hiring_stages: ['Applied', 'Resume Analysis', 'Contacted'],
      fields: [
        {
          key: 'name',
          label: 'name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'Applied_On',
          label: 'Applied On',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'Stage',
          label: 'Stage',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'last_modify_on',
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
      },
      selected_hiring_stages: '',
      candidates: [
        {
          name: 'Michelangelo Tartaruga Ninja',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
          phone: '+1 (212) 846-2543',
          linkedin: 'www.linkedin.com/michelangelo',
          Applied_On: 'December 10, 1815',
          Stage: 'Applied',
          last_modify_on: 'December 10, 1815',
          email: 'michelangelo@tmnt.com',
        },
        {
          name: 'Leonardo Tartaruga Ninja',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
          phone: '+1 (212) 846-2543',
          linkedin: 'www.linkedin.com/leonardo',
          Applied_On: 'December 10, 1815',
          Stage: 'Applied',
          last_modify_on: 'December 10, 1815',
          email: 'leonardo@tmnt.com',
        },
        {
          name: 'Rafael Tartaruga Ninja',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
          phone: '+1 (212) 846-2543',
          linkedin: 'www.linkedin.com/rafael',
          Applied_On: 'December 10, 1815',
          Stage: 'Applied',
          last_modify_on: 'December 10, 1815',
          email: 'rafael@tmnt.com',
        },
        {
          name: 'Donatello Tartaruga Ninja',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
          phone: '+1 (212) 846-2543',
          linkedin: 'www.linkedin.com/donatello',
          Applied_On: 'December 10, 1815',
          Stage: 'Applied',
          last_modify_on: 'December 10, 1815',
          email: 'donatello@tmnt.com',
        },
        {
          name: 'Senhor Splinter Rato',
          address: 'Boeiro de Rua, 1, New York, NY, USA',
          phone: '+1 (212) 846-2543',
          linkedin: 'www.linkedin.com/splinter',
          Applied_On: 'December 10, 1815',
          Stage: 'Applied',
          last_modify_on: 'December 10, 1815',
          email: 'splinter@tmnt.com',
        },
      ],
      selected_candidate: {
      },
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
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
      this.selected_candidate.Stage = this.selected_hiring_stages;
      this.selected_hiring_stages = '';
    },
    archive_cadidate(candidate, index) {
      this.select_candidate(candidate);
      this.selected_candidate.Stage = 'Archived';
      this.candidates.splice(index, 1);
    },
  },
};
</script>
