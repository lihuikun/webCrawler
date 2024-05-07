/*
 * @Descripttion: 每日定时任务
 * @Author: lihk
 * @Date: 2024-03-16 10:49:43
 */
import { CronJob } from 'cron';
import fs from 'fs';
import path from 'path';
import { sendEmailWithImage } from './src/email/index.js';
import { crawler } from './src/crawler/index.js';
import axios from 'axios';
import { displaySystemInfo } from './src/systeminformation/index.js';
import { convertFile } from './src/mdToHtml/index.js';
import { sendEmailWithImage2 } from './src/email/index2.js';
import { signIn } from './src/juejin/index.js';
// 遍历wordcloud文件夹获取所有图片路径
function getWordCloudImages (directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      // 过滤出图片文件并转换为完整路径
      const imagePaths = files
        .filter((file) => /\.(png|jpe?g|gif)$/i.test(file))
        .map((file) => path.join(directory, file));
      resolve(imagePaths);
    });
  });
}

// 设置定时任务
const job = new CronJob('0 9 * * *', async function () {
  console.log('开始执行定时任务');
  main()
  // // 这里调用您的爬虫脚本和生成图片的逻辑
  // await crawler()
  // // 遍历wordclound文件夹，拿到所有的词云图
  // try {
  //   // wordcloud文件夹路径，根据实际情况修改
  //   const wordCloudDirectory = './wordcloud';
  //   const imagePaths = await getWordCloudImages(wordCloudDirectory);
  //   console.log("🚀 ~ job ~ imagePaths:", imagePaths)

  //   // 发送邮件
  //   // await sendEmailWithImage(imagePaths, 'lihk180542@gmail.com');
  // } catch (error) {
  //   console.error('定时任务执行出错:', error);
  // }

  // // 发送邮件
  // await sendEmailWithImage(imagePath, 'lihk180542@gmail.com');

  console.log('定时任务执行完毕');
}, null, true, 'Asia/Shanghai'); // 设置时区

// 启动定时任务
job.start();
// 测试
const main = async () => {
  // 获取 access_token
  try {
    // await sendWechatMessage(accessToken, weatherData, 'oNY2V6igKv4nUpzPI_FXqHwMX_Ck');
    // await sendWechatMessage(accessToken, weatherData, 'oNY2V6sZfOqHhhfAVn5zqR_C3n1Y');
    signIn()
    await sendEmailWithImage2('lihk180542@gmail.com');
    await sendEmailWithImage2('2764639880@qq.com');
  } catch (error) {
    console.error('获取 access_token 出错：', error);
  }
  // 这里调用您的爬虫脚本和生成图片的逻辑
  // await crawler()
  // const wordCloudDirectory = './wordcloud';
  // const imagePaths = await getWordCloudImages(wordCloudDirectory);
  // console.log("🚀 ~ job ~ imagePaths:", imagePaths)
  // // 发送邮件
  // await sendEmailWithImage(imagePaths, 'lihk180542@gmail.com');


}
// main()
// axios(
//   config.check_url, {
//   method: 'get',
//   headers: {
//     Referer: config.url,
//     Cookie: config.cookie
//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body)
//     }
//   }
// }
// )
// 获取系统信息
// displaySystemInfo();

// 示例：转换Markdown文件
const markdownFilePath = 'D:\\Clark\\Desktop\\ap\\CA\\Faq-2024-03-16-14'; // 正确的路径
// const htmlContent = convertFile(markdownFilePath, 'docx', ["md"]);

// const htmlContent = convertMarkdownToHTML(markdownFilePath, 'docx');
// const htmlContent = convertMarkdownToHTML(markdownFilePath, 'md');
// const htmlContent = convertFile(markdownFilePath, 'md', ["html"]);

// const markdownFilePath = 'D:\\Clark\\Desktop\\Faq-2024-03-16-14\\html'; // 正确的路径
// const htmlContent = convertFile(markdownFilePath, 'html', ["docx"]);
console.log("🚀 ~ markdownFilePath:", markdownFilePath);