import { createApp,  } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import Simple from './pages/Simple.vue';
import Editor from './pages/Editor.vue';
import Advanced from './pages/Advanced.vue';

const routes = [
  { path: '/', component: Simple },
  { path: '/advanced', component: Advanced },
  { path: '/editor', component: Editor },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App);

app.use(router);

app.mount('#app');
