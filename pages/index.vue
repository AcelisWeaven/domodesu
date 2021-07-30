<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <p v-if="accessToken">Access token: {{ accessToken }}</p>
    <a :href="loginUrl">Connect with Twitch</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      accessToken: null as string | null,
    }
  },

  mounted() {
    if (document.location.hash && document.location.hash !== '') {
      const parsedHash = new URLSearchParams(window.location.hash.substr(1))
      this.accessToken = parsedHash.get('access_token')
    }
  },

  computed: {
    loginUrl() {
      const url = new URL('https://id.twitch.tv/oauth2/authorize')
      url.searchParams.append('client_id', <string>process.env.twitchClientId)
      url.searchParams.append('redirect_uri', <string>process.env.baseUrl)
      url.searchParams.append('response_type', 'token')
      return url
    },
  },
})
</script>
