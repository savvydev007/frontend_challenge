import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Dashboard from '@/pages/dashboard/index.vue'
import Accounts from '@/pages/accounts/index.vue'
import AccountDetail from '@/pages/accounts/detail.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts,
        exact: true,
      },
      {
        path: 'accounts/:id',
        name: 'AccountDetail',
        component: AccountDetail
      },
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
