/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    plugins: [
      Vue({
        include: [/\.vue$/],
      })
    ]
  };
});
