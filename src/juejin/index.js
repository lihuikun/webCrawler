import axios from 'axios'

const config = {
  cookie: process.env.COOKIE,
  url: 'https://juejin.cn/',
  check_url: 'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uid=7187686052052125222'
}
const config2 = {
  cookie: process.env.COOKIES,
  url: 'https://juejin.cn/',
  check_url: 'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uid=7382208359380108863'
}
const signIn = async () => {
  const {data}= await axios({
    method: 'post',
    url: config.check_url,
    headers: {
      'Referer': config.url,
      'Cookie': config.cookie
    },
  })
  const { data:data2 } = await axios({
    method: 'post',
    url: config2.check_url,
    headers: {
      'Referer': config2.url,
      'Cookie': config2.cookie
    },
  })
  console.log('掘金签到：' + data.err_msg+data2.err_msg)
}
export {
  signIn
}
