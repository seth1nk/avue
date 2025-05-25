import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import ContactPage from './components/ContactPage.vue';
import OrderList from './components/OrderList.vue';
import ParfumeList from './components/ParfumeList.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ViewOrder from './components/ViewOrder.vue';
import ViewParfume from './components/ViewParfume.vue';

const routes = [
  { path: '/', component: HomePage },          
  { path: '/about', component: AboutPage },    
  { path: '/contact', component: ContactPage },
  { path: '/orders', component: OrderList },
  { path: '/parfumes', component: ParfumeList },
  { path: '/login', component: LoginPage },    
  { path: '/register', component: RegisterPage }, 
  { path: '/view-orders/:id', component: ViewOrder },
  { path: '/view-parfumes/:id', component: ViewParfume },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;