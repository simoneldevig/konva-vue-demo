import { createApp,  } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import Simple from './components/Simple.vue';
import Editor from './components/Editor.vue';
import Advanced from './components/Advanced.vue';
import Transform from './components/Transform.vue';
import './index.css';

const routes = [
  { path: '/', component: Simple },
  { path: '/advanced', component: Advanced },
  { path: '/editor', component: Editor },
  { path: '/transform', component: Transform },
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
