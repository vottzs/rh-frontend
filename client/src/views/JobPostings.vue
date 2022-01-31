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
      tabs: ['Applied', 'Resume Analysis', 'Interview'],
      items: [
        {
          name: 'Michelangelo',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified: 'January 20, 2022',
        },
        {
          name: 'Leonardo',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified: 'January 20, 2022',
        },
        {
          name: 'Donatelo',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified: 'January 20, 2022',
        },
        {
          name: 'Rafael',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified: 'January 20, 2022',
        },
        {
          name: 'Splinter',
          applied_on: 'December 10, 1815',
          stage: 'Resume Analysis',
          last_modified: 'January 20, 2022',
        },
      ],
    };
  },
  methods: {
  },
};
</script>
