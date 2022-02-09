<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
          <b-tab v-for="tab_name in tabs" :key="'dyn-tab-' + tab_name" :title="tab_name">
             <b-table striped hover :items="items"></b-table>
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
