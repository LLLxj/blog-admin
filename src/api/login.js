import request from '@/utils/request'

export function login(username, password) {
  console.log(username)
  console.log(password)
  const grant_type = 'password'
  const client_id = 2
  const client_secret = 'KqEXKMmZfiCXJ00IdlBc8gFY6SbpsvCGjBoKi3OM'
  return request({
    url: '/oauth/token',
    method: 'post',
    data: {
      username,
      password,
      grant_type,
      client_id,
      client_secret
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
