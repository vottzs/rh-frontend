<template>
  <div>
    <h4>Job Posting Title</h4>
    <b-button v-b-modal.modal-job-posting-detail>Details</b-button>
    <b-modal id="modal-job-posting-detail" hide-footer>
      <template v-slot:modal-header>
        <h4 class="modal-title">
            <b>Title Details</b>
        </h4>
        <div class="w-100">
            <b-button variant="light border-dark"
              class="btn btn-primary action_btn float-right" v-on:click= "closeModal">
                Edit
            </b-button>
          </div>
  </template>
        <p class="my-4"><b>Office:</b> office</p>
        <p class="my-4"><b>Status:</b> status</p>
        <p class="my-4"><b>Description:</b> description</p>
        <p class="my-4"><b>Salary Range:</b> salary range</p>
        <p class="my-4"><b>Benefits:</b> benefits</p>
      </b-modal>
      <b-modal id="modal-candidate-detail" hide-footer>
  <template v-slot:modal-header>
      <h4 class="modal-title">
        <b>Name Details</b>
      </h4>
        <div class="w-100">
          <b-button variant="light border-dark"
            class="btn btn-primary action_btn float-right" v-on:click="closeModal">
             Edit
          </b-button>
        </div>
      </template>
        <p class="my-4"><b>Office:</b> office</p>
        <p class="my-4"><b>Status:</b> status</p>
        <p class="my-4"><b>Description:</b> description</p>
        <p class="my-4"><b>Salary Range:</b> salary range</p>
        <p class="my-4"><b>Benefits:</b> benefits</p>
  </b-modal>
      <b-modal id="modal-move-candidate" title="<Name>" ok-title="Move">
      <p class="my-4"><b>Current stage:</b> stage</p>
        <b>Move to:</b>
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
      </select>
  </b-modal>
    <b-card no body>
          <b-tabs card>
          <b-tab title="Applied" active>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Applied On</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Last Action</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Ada Lovelace</td>
                  <td>December 10, 1815</td>
                  <td>Resume Analysis</td>
                  <td>December 15, 1815</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button v-b-modal.modal-move-candidate>Details</b-button>
                  <b-button v-b-modal.modal-candidate-detail>Details</b-button>
                </td>
              </tr>
              <tr>
                  <td scope="row">Grace Hopper</td>
                  <td>December 09, 1906</td>
                  <td>Resume Analysis</td>
                  <td>December 09, 1906</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button v-b-modal.modal-move-candidate>Details</b-button>
                  <b-button v-b-modal.modal-candidate-detail>Details</b-button>
                </td>
              </tr>
                <tr>
                  <td scope="row">Margaret Hamilton</td>
                  <td>December 17, 1936</td>
                  <td>Resume Analysis</td>
                  <td>December 17, 1936</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button v-b-modal.modal-move-candidate>Details</b-button>
                  <b-button v-b-modal.modal-candidate-detail>Details</b-button>
                </td>
                </tr>
                <tr>
                  <td scope="row">Joan Clarke</td>
                  <td>June 24, 1917</td>
                  <td>Resume Analysis</td>
                  <td>June 24, 1917</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button v-b-modal.modal-move-candidate>Details</b-button>
                  <b-button v-b-modal.modal-candidate-detail>Details</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Resume Analysis">
        <b-card-text>Tab contents 2</b-card-text>
           <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Applied On</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Last Action</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Ada Lovelace</td>
                  <td>December 10, 1815</td>
                  <td>Resume Analysis</td>
                  <td>December 15, 1815</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
              <tr>
                  <td scope="row">Grace Hopper</td>
                  <td>December 09, 1906</td>
                  <td>Resume Analysis</td>
                  <td>December 09, 1906</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
                <tr>
                  <td scope="row">Margaret Hamilton</td>
                  <td>December 17, 1936</td>
                  <td>Resume Analysis</td>
                  <td>December 17, 1936</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
                </tr>
                <tr>
                  <td scope="row">Joan Clarke</td>
                  <td>June 24, 1917</td>
                  <td>Resume Analysis</td>
                  <td>June 24, 1917</td>
                <td>
                  <b-button>Archive</b-button>
                  <b-button>Move</b-button>
                  <b-button>Details</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
            <b-tab title="contacted">
                <b-card-text>Tab contents 3</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
        </div>
      </template>
