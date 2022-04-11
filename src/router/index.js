import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');

    if (to.matched.some(record => record.meta.requiresAuth)) {
      let timeBefore = moment(Router.app.$session.get('1').date);
      let timeNow = moment(new Date());
      let timeDiff = moment.duration(timeNow.diff(timeBefore)).asMinutes();
      if (timeDiff > Router.app.$session.get('1').limit) {
        next({ path: '/login' });
      } else {
        next();
      }
    } else {
      next();
    }

    // Now you need to add your authentication logic here, like calling an API endpoint
    if (requiresAuth && !isAuthenticated) {
      next('login');
    } else {
      next();
    }
  });

  return Router;
});
