<template>
  <div>
    <h1 class="my-4">{{ $t('welcome_login') }}</h1>
    <a
      class="
        bg-purple-500
        hover:bg-purple-700
        text-white
        font-bold
        py-2
        px-4
        my-4
        rounded
        cursor-pointer
      "
      @click="login"
    >
      {{ $t('connect_twitch') }}
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    if (this.$auth.loggedIn) {
      // redirect if already logged in
      this.$router.push(`/${this.$i18n.locale}`)
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('twitch')
    },
  },
})
</script>
