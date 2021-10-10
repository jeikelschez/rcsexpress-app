const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/Menu.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'sales',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'operations',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'administration',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reports',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'system',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'maintenance',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
