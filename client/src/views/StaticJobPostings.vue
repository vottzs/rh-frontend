<template>
        <div>
          <b-card no-body>
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
