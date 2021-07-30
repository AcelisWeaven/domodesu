import { Auth } from '@nuxtjs/auth-next/dist/runtime'

export default ({ app, $auth }: { app: any; $auth: Auth }) => {
  $auth.onRedirect((to: string) => {
    if (to === '/login') {
      return app.localePath(to)
    }
    return null
  })
}
