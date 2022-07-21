<template>
  <div class="row" v-if="debtor">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title">
          Account Detail
        </h4>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="control-label">First Name</label>
            <div>{{ debtor.firstName }}</div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="control-label">Last Name</label>
            <div>{{ debtor.lastName }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="control-label">Email</label>
            <div>{{ debtor.email }}</div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="control-label">Mobile</label>
            <div>{{ debtor.mobilePhone }}</div>
          </div>
        </div>

        <template v-if="debtor.address">
          <div class="row">
            <div class="col-md-12 mb-3">
              <label class="control-label">Address</label>
              <div>{{ debtor.address.address }}</div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="control-label">City</label>
              <div>{{ debtor.address.city }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label class="control-label">State</label>
              <div>{{ debtor.address.state }}</div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="control-label">Zipcode</label>
              <div>{{ debtor.address.zip }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label class="control-label">Country</label>
              <div>{{ debtor.address.country }}</div>
            </div>
          </div>
        </template>
      </card>

      <card
        class="strpied-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <h4 slot="header" class="card-title">Claims</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Base Amount</th>
              <th>Fees</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in claims" :key="item.id">
              <td>{{ item.currency }}</td>
              <td>
                {{ item.baseAmount }}
              </td>
              <td>{{ item.fees }}</td>
              <td>
                {{ item.dueDate }}
              </td>
              <td>
                <div>
                  <span class="badge bg-primary" v-if="item.status === 'OPEN'">
                    {{ item.status }}
                  </span>
                  <span class="badge bg-success" v-if="item.status === 'PAID'">
                    {{ item.status }}
                  </span>
                  <span class="badge bg-danger" v-if="item.status === 'DELETED'">
                    {{ item.status }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class AccountDetailPage extends Vue {
  account: Account = null
  debtor: Debtor = null
  claims: Array<Claim> = []

  mounted(): void {}

  beforeRouteEnter(to, from, next) {
    axios
      .get('http://localhost:9001/accounts', {
        params: { id: to.params.id },
      })
      .then((res) => {
        if (res.data.length > 0) {
          next((vm) => vm.setData(res.data[0]))
        }
      })
  }

  beforeRouteUpdate(to, from, next) {
    this.account = null

    axios
      .get('http://localhost:9001/accounts', {
        params: { id: to.params.id },
      })
      .then((res) => {
        if (res.data.length > 0) {
          this.setData(res.data[0])
          next()
        }
      })
  }

  setData(account: Account) {
    this.account = account
    this.debtor = account.debtor

    axios
      .get('http://localhost:9001/claims', {
        params: {
          accountId: account.id,
        },
      })
      .then((res) => {
        this.claims = res.data
      })
  }
}
</script>
