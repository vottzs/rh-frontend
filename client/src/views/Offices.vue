<template>
  <div>
     <h4>Offices</h4>
     <b-button v-b-modal.modal-job-posting-detail>Details</b-button>
     <b-table striped hover :items="items"></b-table>
   </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 40,
          address: 'Dickerson',
          creation_time: 'Macdonald',
          Actions:
            <b-button>
              Details
            </b-button>,
        },
        {
          title: 21,
          address: 'Larsen',
          creation_time: 'Shaw',
          Actions: 'Botão',
        },
        {
          title: 89,
          address: 'Geneva',
          creation_time: 'Wilson',
          Actions: 'Botão',
        },
        {
          title: 38,
          address: 'Jami',
          creation_time: 'Carney',
          Actions: 'Botão',
        },
      ],
    };
  },
};
</script>
