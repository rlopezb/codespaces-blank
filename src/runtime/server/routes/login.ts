import { defineEventHandler, readBody, setCookie } from 'h3'
import { useLoginService } from '../../composables/useLoginService'
import type { Login, User } from '../../types'

export default defineEventHandler(async (event) => {
  const login: Login = await readBody(event)
  const loginService = useLoginService()
  const user: User = await loginService.login(login)
  setCookie(event, 'user', JSON.stringify(user), {
    httpOnly: true,
    secure: true,
  })
  return user
})
