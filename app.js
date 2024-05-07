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
// 测试
const main = async () => {
  // 获取 access_token
  try {
    signIn()
    await sendEmailWithImage2('lihk180542@gmail.com');
    await sendEmailWithImage2('2764639880@qq.com');
  } catch (error) {
    console.error('获取 access_token 出错：', error);
  }
}
main()
