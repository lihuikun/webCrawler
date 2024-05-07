/*
 * @Descripttion: 
 * @Author: lihk
 * @Date: 2024-03-16 15:21:05
 */

import axios from "axios";

// 微信公众号的 AppID 和 AppSecret
const APPID = 'wxa0f8782c760fb40b';
const APPSECRET = '53d2c052b27a1d628313199f02dfbc47';

// 获取 access_token 的 URL
const accessTokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;

// 发送消息的函数
async function sendWechatMessage (accessToken, weatherData, user_id) {
  console.log("🚀 ~ sendWechatMessage ~ weatherData:", weatherData)
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
  const data = {
    // touser: 'oNY2V6sZfOqHhhfAVn5zqR_C3n1Y', // 用户的 OpenID
    touser: user_id, // 用户的 OpenID
    template_id: '5m98fNGzT0ZX042JyVJT0y3oc-g_MP-p0bQl9fflOv4', // 模板ID
    data: {
      // 根据您的模板内容，这里填写对应的字段
      date: {
        value: weatherData.date, // 使用 weatherData 中的日期
        color: "#173177"
      },
      weather: {
        value: weatherData.weather, // 使用 weatherData 中的天气情况
        color: "#173177"
      },
      temperature: {
        value: weatherData.temperature, // 使用 weatherData 中的温度范围
        color: "#173177"
      },
      tip: {
        value: weatherData.tip, // 使用 weatherData 中的提示信息
        color: "#FF4500"
      },
      day: {
        value: weatherData.day,
        color: "#173177"
      },
      content: {
        value: weatherData.content,
        color: "#173177"
      },
      note: {
        value: weatherData.note,
        color: "#173177"
      },
      love: {
        value: weatherData.love,
        color: "#173177"
      },
      // ...其他模板数据
    }
  };
  try {
    const response = await axios.post(url, data);
    console.log('消息发送结果：', response.data);
  } catch (error) {
    console.error('发送消息失败：', error);
  }
}
function calculateDaysSince (dateString) {
  const startDate = new Date(dateString);
  const currentDate = new Date();

  // 计算两个日期之间的时间差（以毫秒为单位）
  const timeDifference = currentDate - startDate;

  // 将时间差转换为天数
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // 返回天数差的绝对值并向下取整
  return Math.floor(Math.abs(daysDifference));
}

export {
  sendWechatMessage,
  accessTokenUrl,
  calculateDaysSince
}