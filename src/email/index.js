/*
 * @Descripttion: 发送主题为每日词云图邮件
 * @Author: lihk
 * @Date: 2024-03-16 10:46:40
 */
import nodemailer from 'nodemailer';
import path from 'path';
async function sendEmailWithImage (attachmentPath, recipientEmail) {
  console.log("🚀 ~ sendEmailWithImage ~ attachmentPath:", attachmentPath)
  // 创建一个SMTP客户端配置
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 您的SMTP服务提供商的主机名
    port: 587, // SMTP端口
    secure: false, // 如果端口为465，则为true，其他端口通常为false
    auth: {
      user: '1438828140@qq.com', // 发送者邮箱
      pass: 'hzdxyilxtvlfiggf' // 邮箱密码或应用专用密码
    }
  });
  // 生成邮件的 HTML 内容，包含所有图片
  let htmlContent = '<h3>这里是每日词云图推荐频道的推荐:</h3>';
  for (const [index, imgPath] of attachmentPath.entries()) {
    const filename = path.basename(imgPath);
    htmlContent += `<div><strong>${filename.split('.png')[0]}：</strong><br /><img src="cid:image${index}" style="max-width: 100%;" /></div><br />`;
  }
  // 设置邮件内容
  let mailOptions = {
    from: '"掘金每日词云图频道" <1438828140@qq.com>', // 发件人
    to: recipientEmail, // 收件人
    subject: '掘金每日词云图', // 主题
    text: '这里是每日词云图推荐频道的推荐.', // 纯文本内容
    html: htmlContent, // HTML内容
    attachments: attachmentPath.map((imgPath, index) => ({
      filename: path.basename(imgPath),
      path: imgPath,
      cid: `image${index}` // Content ID，用于在HTML内容中引用图片
    }))
  };

  // 发送邮件
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

export {
  sendEmailWithImage
}