<template>
  <div>

    <b-button v-b-modal.modal-1>Details</b-button>

    <b-modal id="modal-1" title="<Title> Details">
      <p class="my-4"><b>Office:</b>Office</p>
      <p class="my-4"><b>Status:</b>Office</p>
      <p class="my-4"><b>Description:</b>Office</p>
      <p class="my-4"><b>Salary Range:</b>Office</p>
      <p class="my-4"><b>Benefits:</b>Office</p>
    </b-modal>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Applied" active>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Applied on</th>
                <th scope="col">Stage</th>
                <th scope="col">Last Action On</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Ada Lovelace</td>
                <td>December 15, 1815</td>
                <td>Resume Analysis</td>
                <td>December, 10, 1815</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
              <tr>
                <td scope="row">Grace Hopper</td>
                <td>December, 9, 1906</td>
                <td>Resume Analysis</td>
                <td>December, 9, 1906</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
              <tr>
                <td scope="row">Margareth Hamilton</td>
                <td>August, 17, 1936</td>
                <td>Resume Analysis</td>
                <td>August, 17, 1936</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
              <tr>
                <td scope="row">Joan Clarke</td>
                <td>June, 24, 1917</td>
                <td>Resume Analysis</td>
                <td>June, 24, 1917</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
            </tbody>
          </table>
      </b-tab>
      <b-tab title="Resumee Analysis">
        <b-card-text>Tab contents 2</b-card-text>
      </b-tab>
      <b-tab title="Contacted">
          <b-card-text>Tab contents 3</b-card-text>
      </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
