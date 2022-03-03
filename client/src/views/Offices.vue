<template>
  <div>
    <b-container fluid>
      <b-row class="text-left">
        <b-col md="8" class="py-3" align=left>
          <b-button v-b-modal.modal-create-new-office>Create new office</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create-new-office" :title="'Create new office'" ok-title="Create"
    @ok="new_office()">
      <p class="my-4"><b>Title:</b> <b-form-input v-model="new_office_var.title"
      placeholder="Enter office title"></b-form-input></p>
      <p class="my-4">
        <b>Address:</b>
        <b-form-input v-model="new_office_var.address" placeholder="Enter office address">
      </b-form-input>
      </p>
    </b-modal>
    <b-card no-body>
          <b-table :items="offices" :fields="fields" striped responsive="sm">
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
      new_office_var: {
        title: '',
        address: '',
      },
      fields: [
        {
          key: 'title',
          label: 'Title',
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
      offices: [
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
    new_office() {
      const url = 'http://localhost:7011/api/v1/offices';
      axios
        .patch(url, this.new_office_var)
        .then((response) => {
          if (response.data.status === 'success') {
            this.get_offices();
          }
        });
      this.new_office_var.address = '';
      this.new_office_var.title = '';
    },
    onFiltered() {

    },
    get_offices() {
      const url = 'http://localhost:7011/api/v1/offices';
      axios
        .get(url)
        .then((response) => {
          this.offices = response.data.offices;
        });
    },
  },
  created() {
    this.get_offices();
  },
};
</script>
