<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <h4 class="card-title" slot="header">Accounts</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Country</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in accounts" :key="item.id">
                  <td>{{ item.debtor.email }}</td>
                  <td>
                    {{ item.debtor.firstName + ' ' + item.debtor.lastName }}
                  </td>
                  <td>{{ item.debtor.mobilePhone }}</td>
                  <td>
                    {{ item.debtor.address && item.debtor.address.country }}
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'AccountDetail', params: { id: item.id } }"
                      class="btn btn-info btn-fill btn-sm"
                      >Detail</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  name: 'accounts',
})
export default class DashboardPage extends Vue {
  accounts: Array<Account> = []

  mounted(): void {
    axios.get('http://localhost:9001/accounts').then((res) => {
      this.accounts = res.data
    })
  }
}
</script>
