import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import DemoDetail from '../views/DemoDetail.vue';
import DemoView from '@/views/DemoView.vue';
import BlogList from '@/views/Blog/BlogList.vue'
import Test from '@/views/Demo/DemoDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { navKey: 'home' }
  },
  {
    path: '/demo/:id',
    name: 'DemoView',
    component: DemoView,
    props: true,
    meta: { navKey: 'demoview' }
  },
  {
    path: '/blog',
    name: 'BlogList',
    component: BlogList,
    meta: { navKey: 'blogList' }
  },
  {
    path: '/blog/details',
    name: 'BlogDetail',
    component: () => import('@/views/Blog/BlogDetail.vue'),
    props: true,
    meta: { navKey: 'blogDetails' }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/demo/main',
    name: 'DemoMain',
    component: () => import('@/views/Demo/DemoMain.vue'),
    props: true,
    meta: { navKey: 'DemoMain' }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //mode:"hash",
  routes
});

export default router;