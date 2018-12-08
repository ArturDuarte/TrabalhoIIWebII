import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import CadastraCategoria from '../components/CadastraCategoria'

import CadastroProdutos from '../components/CadastroProdutos'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'App', component: App},
    {path: '/CadastraCategoria', name: 'CadastraCategoria', component: CadastraCategoria},
    {path: '/CadastroProdutos', name: 'CadastroProdutos', component: CadastroProdutos},

  ]
})
