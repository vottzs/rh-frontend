<template>
  <div>
    <b-container fluid>
      <b-row class="text-left">
        <b-col md="8" class="py-3" align=left>
          <b-button v-b-modal.modal-create-new-hiring_type>Create new hiring type</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create-new-hiring_type" :title="'Create new hiring type'" ok-title="Create"
    @ok="new_hiring_type()">
      <p class="my-4"><b>Name:</b> <b-form-input v-model="new_hiring_type_var.name"
      placeholder="Enter hiring type name"></b-form-input></p>
    </b-modal>
    <b-card no-body>
          <b-table :items="hiring_types" :fields="fields" striped responsive="sm">
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
      new_hiring_type_var: {
        name: '',
      },
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
      hiring_types: [
      ],
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
    new_hiring_type() {
      const url = 'http://localhost:7011/api/v1/hiring_types';
      axios
        .patch(url, this.new_hiring_type_var)
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_hiring_types();
          }
        });
      this.new_hiring_type_var.name = '';
    },
    onFiltered() {

    },
    get_hiring_types() {
      const url = 'http://localhost:7011/api/v1/hiring_types';
      axios
        .get(url)
        .then((response) => {
          this.hiring_types = response.data.hiring_types;
        });
    },
  },
  created() {
    this.get_hiring_types();
  },
};
</script>
