import axios from 'axios'

const config = {
  cookie: process.env.COOKIE,
  url: 'https://juejin.cn/',
  check_url: 'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uid=7187686052052125222'
}
const signIn = async () => {
  const { data } = await axios({
    method: 'post',
    url: config.check_url,
    headers: {
      'Referer': config.url,
      'Cookie': config.cookie
    },
  })
  console.log('掘金签到：' + data.err_msg)
}
export {
  signIn
}
