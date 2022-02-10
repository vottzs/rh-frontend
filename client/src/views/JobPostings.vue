<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
          <b-tab v-for="tab_name in tabs" :key="'dyn-tab-' + tab_name" :title="tab_name">
            <b-table :items="items" :fields="fields" striped responsive="sm">
          <template #cell(actions)>
              <b-button size="sm" class="mr-2">
              Archive
              </b-button>
              <b-button size="sm" class="mr-2">
              Move
              </b-button>
              <b-button size="sm" class="mr-2">
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
      tabs: ['Applied', 'Resume Analysis', 'Contacted', 'Interview'],
      fields: ['name', 'appliede on', 'stage', 'last_modified_on', 'actions'],
      items: [
        {
          Name: 'Michelangelo',
          Applied_On: 'December 15, 1815',
          Stage: 'Resume Analysis',
          Last_modified_on: 'December 15, 1815',
        },
        {
          Name: 'Leonardo',
          Applied_On: 'December 15, 1815',
          Stage: 'Resume Analysis',
          Last_modified_on: 'December 15, 1815',
        },
        {
          Name: 'Donatello',
          Applied_On: 'December 15, 1815',
          Stage: 'Resume Analysis',
          Last_modified_on: 'December 15, 1815',
        },
        {
          Name: 'Rafael',
          Applied_On: 'December 15, 1815',
          Stage: 'Resume Analysis',
          Last_modified_on: 'December 15, 1815',
        },
        {
          Name: 'Spliter',
          Applied_On: 'December 15, 1815',
          Stage: 'Resume Analysis',
          Last_modified_on: 'December 15, 1815',
        },
      ],
    };
  },
  methods: {
  },
};
</script>
