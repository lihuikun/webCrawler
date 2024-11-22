/*
 * @Descripttion: 每日定时任务
 * @Author: lihk
 * @Date: 2024-03-16 10:49:43
 */
import { sendEmailWithImage2 } from './src/email/index2.js';
import { signIn } from './src/juejin/index.js';
// 测试
const main = async () => {
  // 获取 access_token
  try {
    // signIn()
    await sendEmailWithImage2('lihk180542@gmail.com');
    await sendEmailWithImage2('2764639880@qq.com');
  } catch (error) {
    console.error('获取 access_token 出错：', error);
  }
}
main()
