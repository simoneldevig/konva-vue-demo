<template>
  <nav class="flex items-center justify-between flex-wrap bg-white p-6 shadow">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img src="https://konvajs.org/css/images/logo.png" alt="Logo">
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full flex justify-end lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-400 mr-4" to="/">Simple</router-link>

        <router-link class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-400 mr-4" to="/transform">Transform</router-link>

        <router-link class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-400 mr-4" to="/advanced">Advanced</router-link>

        <router-link class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-400 mr-4" to="/editor">Editor</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

