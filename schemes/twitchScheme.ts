import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime'

export default class TwitchScheme extends Oauth2Scheme {
  async fetchUser(): Promise<void> {
    if (process.server || !this.check().valid) {
      return
    }

    if (!this.options.endpoints.userInfo) {
      this.$auth.setUser({})
      return
    }

    await this.$auth
      .requestWith(this.name, {
        url: 'https://api.twitch.tv/helix/users',
        headers: {
          'Content-type': 'application/json',
          'Client-ID': <string>process.env.twitchClientId,
        },
      })
      .then((response) => {
        const user = response.data.data[0]

        this.$auth.setUser({
          id: user.id,
          login: user.login,
          name: user.display_name,
          profilePicture: user.profile_image_url,
        })
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
  }
}
