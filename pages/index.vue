<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <div v-if="accessToken">
      <p>Access token: {{ accessToken }}</p>
      <strong v-if="username">Welcome, {{ username }}!</strong>
    </div>
    <a v-else :href="loginUrl">Connect with Twitch</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      accessToken: null as string | null,
      username: null as string | null,
    }
  },

  mounted() {
    if (document.location.hash && document.location.hash !== '') {
      const parsedHash = new URLSearchParams(window.location.hash.substr(1))
      this.accessToken = parsedHash.get('access_token')
    }
  },

  watch: {
    async accessToken() {
      if (this.accessToken) {
        const user = (
          await this.$axios.$get('https://api.twitch.tv/helix/users', {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`,
              'Client-ID': <string>process.env.twitchClientId,
            },
          })
        ).data[0]

        this.username = user.display_name
      }
    },
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
