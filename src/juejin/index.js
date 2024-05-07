import axios from 'axios'

const config = {
  cookie: 'sessionid=062d09a91a3b576a95b3f2f2e88d4fd0',
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