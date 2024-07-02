/*
 * @Descripttion: 发送主题为每日词云图邮件
 * @Author: lihk
 * @Date: 2024-03-16 10:46:40
 */
import nodemailer from 'nodemailer';
import axios from 'axios';
import path from 'path';
import { accessTokenUrl, calculateDaysSince, sendWechatMessage } from '../weChat/index.js';


// 模板提示
const tipsMap = {
  '晴': '天气晴朗，记得出门戴口罩哦！',
  '多云': '天气多云，记得多带件外套哦！',
  '阴': '天气阴，记得出门带伞！',
  '阵雨': '天气阵雨，记得出门带伞！',
  '雷阵雨': '天气雷阵雨，记得出门带伞！',
  '雷阵雨伴有冰雹': '天气阴沉，记得出门带伞！',
  '雨夹雪': '天气阴沉，记得出门带伞！',
}
const weekList = {
  '星期一': '早上好呀，猪猪，今天又是元气满满的一天，加油吧，打工人',
  '星期二': '早上好呀，加油吧，打工人，还有三天就是周末了',
  '星期三': '早上好呀，猪猪，加油吧，还有两天，周末快到了',
  '星期四': '早上好呀，猪猪，今天你疯狂了？v我50',
  '星期五': '早上好呀，猪猪，摸鱼搞起来',
  '星期六': '猪猪，快乐周末开始了',
  '星期日': '猪猪，好好休息吧，明天要上班啦，呜呜呜',
}
const iconMap = {
  '晴': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E6%99%B4%E5%A4%A9.png?raw=true',
  '多云': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E5%A4%9A%E4%BA%91.png?raw=true',
  '阴': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E9%98%B4%E5%A4%A9.png?raw=true',
  '阵雨': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E5%A4%9A%E4%BA%91.png?raw=true',
  '雷阵雨': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E9%9B%B7%E9%98%B5%E9%9B%A8.png?raw=true',
  '雷阵雨伴有冰雹': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E9%9B%B7%E9%98%B5%E9%9B%A8.png?raw=true',
  '雨夹雪': 'https://github.com/lihuikun/webCrawler/blob/master/src/img/%E9%9B%B7%E9%98%B5%E9%9B%A8.png?raw=true',
}
const getdata = async () => {
  const weaterApi = `http://t.weather.itboy.net/api/weather/city/101280601`
  const { data: { result: {
    content,
    note,
  } } } = await axios.get('https://api.oioweb.cn/api/common/OneDayEnglish')
  const { data: weaterResponse } = await axios.get(weaterApi);
  const weatherData = {
    date: weaterResponse.data.forecast[0].ymd + weaterResponse.data.forecast[0].week,
    weather: `${weaterResponse.data.forecast[0].fx} - ${weaterResponse.data.forecast[0].fl} - ${weaterResponse.data.forecast[0].type}`,
    temperature: `${weaterResponse.data.forecast[0].low} - ${weaterResponse.data.forecast[0].high}`,
    tip: weaterResponse.data.forecast[0].notice, // 这里可以根据天气情况给出不同的提示,
    day: calculateDaysSince('2023/11/26'),
    note,
    content,
    love: weekList[weaterResponse.week],
    icon: iconMap[weaterResponse.wea]
  };
  return weatherData
}


async function sendEmailWithImage2 (recipientEmail) {
  const weatherData = await getdata();
  // 创建一个SMTP客户端配置
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 您的SMTP服务提供商的主机名
    port: 587, // SMTP端口
    secure: false, // 如果端口为465，则为true，其他端口通常为false
    auth: {
      user: process.env.EMAIL, // 发送者邮箱
      pass: process.env.EMAILPASSWORD // 邮箱密码或应用专用密码
    }
  });
  // 生成邮件的 HTML 内容，包含所有图片
  let htmlContent = `
    <h1>🌈 欢迎来到每日频道 🌟</h1>
    <p>以下是我们精选的内容，希望您喜欢：</p>
    <div style="background-color: #f0f0f0; padding: 15px; margin-top: 30px; border-radius: 8px;">
      <h2>🌈 今日天气</h2>
      <p>${weatherData.date}</p>
      <p>${weatherData.weather}</p>
      <p>${weatherData.temperature}</p>
      <p>${weatherData.tip}</p>
      <p>我们在一起已经 <span style="color: #91D4F9;">${weatherData.day}</span> 天</p>
    </div>
    <div style="background-color: #f0f0f0; padding: 15px; margin-top: 10px; border-radius: 8px;">
      <h2>💡 今日语录</h2>
      <p>${weatherData.note}</p>
      <p>${weatherData.content}</p>
    </div>
  `
  // 设置邮件内容
  let mailOptions = {
    from: '"每日天气预报频道" <1438828140@qq.com>', // 发件人
    to: recipientEmail, // 收件人
    subject: `我们在一起已经${weatherData.day}天，${weatherData.note}`, // 主题
    text: '这里是每日天气预报频道的推荐.', // 纯文本内容
    html: htmlContent, // HTML内容
    attachments: [{
      filename: weatherData.wea,
    }]
  };

  // 发送邮件
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

export {
  sendEmailWithImage2
}
