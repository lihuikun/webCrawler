/*
 * @Descripttion: 
 * @Author: lihk
 * @Date: 2024-03-20 17:19:05
 */
/*
 * @Descripttion: md转html
 * @Author: lihk
 * @Date: 2024-03-18 11:59:49
 */
import fs from 'fs';
import mammoth from 'mammoth';
import { marked } from 'marked';
// 将Markdown文件转换为HTML
async function convertMarkdownToHTML (filePath, type) {
  try {
    const files = fs.readdirSync(folderPath);

    return console.log("🚀 ~ convertMarkdownToHTML ~ files:", files)
    // 读取Markdown文件内容
    const file = fs.readFileSync(filePath, 'utf8');
    let htmlContent = ''
    if (type === 'md') {
      // 使用marked将Markdown转换为HTML
      htmlContent = marked(file).replace(/&emsp;/g, ' ');
    } else {
      // 使用mammoth将Word文档转换为HTML
      const { value } = await mammoth.convertToHtml({ path: filePath })
      htmlContent = value;
    }
    // 返回HTML内容
    htmlContent = `
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Sekonda Smart - Privacy Policy</title>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
    `
    // 将完整的HTML文档写入到指定的文件路径
    fs.writeFileSync(filePath.replace('.' + type, '.html'), htmlContent, 'utf8');
    console.log('文件已保存到：', filePath.replace('.' + type, '.html'))
    return htmlContent;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    return null;
  }
}
function wordToHTML () {
  mammoth.convertToHtml({ path: docxFilePath })
    .then(function (result) {
      const htmlContent = result.value; // 转换后的HTML内容
      const messages = result.messages; // 任何转换时的消息或警告

      // 将HTML内容写入到文件中
      fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
      console.log(`HTML file has been saved to ${htmlFilePath}`);
    })
    .catch(function (err) {
      console.error('Error converting document: ', err);
    });
}
export {
  convertMarkdownToHTML
}