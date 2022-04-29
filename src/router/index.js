import { createRouter, createWebHistory } from 'vue-router'
import SuratView from '../views/SuratView.vue'
import JuzView from '../views/JuzView.vue'
import PenandaView from '../views/PenandaView.vue'
import AyatView from '../views/AyatView.vue'
import PenandaEditView from '../views/PenandaEditView.vue'

const routes = [
  {
    path: '/',
    name: 'surat',
    component: SuratView
  },
  {
    path: '/juz',
    name: 'juz',
    component: JuzView
  },
  {
    path: '/penanda',
    name: 'penanda',
    component: PenandaView
  },
  {
    path: '/surat/:id',
    name: 'ayat',
    component: AyatView
  },
  {
    path: '/penanda/:id',
    name: 'penandaEdit',
    component: PenandaEditView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
