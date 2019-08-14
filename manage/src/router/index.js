import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: (resolve) => require(['@/pages/login/login'], resolve)
    },
    {
      path: '/messageList',
      name: 'messageList',
      component: (resolve) => require(['@/pages/messageList/index'], resolve)
    },
    {
      path: '/taskPlan',
      name: 'taskPlan',
      component: (resolve) => require(['@/pages/taskPlan/index'], resolve)
    },
    {
      path: '/taskPlan/lowerTesk',
      name: 'lowerTesk',
      component: (resolve) => require(['@/pages/taskPlan/lowerTesk/lowerTesk'], resolve)
    },
    {
      path: '/taskPlan/siteManage',
      name: 'siteManage',
      component: (resolve) => require(['@/pages/taskPlan/siteManage/siteManage'], resolve)
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: (resolve) => require(['@/pages/analysis/analysis'], resolve)
    },
    {
      path: '/systemManage',
      name: 'systemManage',
      component: (resolve) => require(['@/pages/systemManage/index'], resolve)
    },
    {
      path: '/systemManage/userList',
      name: 'userList',
      component: (resolve) => require(['@/pages/systemManage/userList/userList'], resolve)
    },
    {
      path: '/systemManage/policy',
      name: 'policy',
      component: (resolve) => require(['@/pages/systemManage/policy/policy'], resolve)
    },
    {
      path: '/systemManage/blacklist',
      name: 'blacklist',
      component: (resolve) => require(['@/pages/systemManage/blacklist/blacklist'], resolve)
    },
    {
      path: '/systemManage/InterfaceManage',
      name: 'InterfaceManage',
      component: (resolve) => require(['@/pages/systemManage/InterfaceManage/InterfaceManage'], resolve)
    },
    {
      path: '/systemManage/logManage',
      name: 'logManage',
      component: (resolve) => require(['@/pages/systemManage/logManage/logManage'], resolve)
    },
    {
      path: '/informationList',
      name: 'informationList',
      component: (resolve) => require(['@/pages/informationList/informationList'], resolve)
    },
    {
      path: '/systemAnalysis',
      name: 'systemAnalysis',
      component: (resolve) => require(['@/pages/systemAnalysis/systemAnalysis'], resolve)
    }
  ]
})
