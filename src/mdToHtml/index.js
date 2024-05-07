/*
 * @Descripttion: md转html
 * @Author: lihk
 * @Date: 2024-03-18 11:59:49
 */
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { marked } from 'marked';
import htmlDocx from 'html-docx-js'

function htmlToMd (html) {
  // 删除脚本和样式元素
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
  html = html.replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, '');

  // 转换标题
  html = html.replace(/<h([1-6])>(.*?)<\/h\1>/g, (_, level, content) => `${'#'.repeat(level)} ${content}\n\n`);

  // 转换段落
  html = html.replace(/<p>(.*?)<\/p>/g, (_, content) => `${content}\n\n`);

  // 转换粗体和斜体
  html = html.replace(/<b>(.*?)<\/b>/g, '**$1**');
  html = html.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  html = html.replace(/<i>(.*?)<\/i>/g, '*$1*');
  html = html.replace(/<em>(.*?)<\/em>/g, '*$1*');

  // 转换链接
  html = html.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

  // 转换图片
  html = html.replace(/<img[^>]+src="([^">]+)"[^>]*>/g, '![]($1)');
  // 将base64图片进行上传

  // 删除剩余的HTML标签
  html = html.replace(/<[^>]+>/g, '');
  console.log("🚀 ~ htmlToMd ~ html:", html)

  return html;
}
async function convertToHTML (filePath, type) {
  const file = fs.readFileSync(filePath, 'utf8');
  let htmlContent = ''
  if (type === 'md') {
    // 使用marked将Markdown转换为HTML
    htmlContent = marked(file).replace(/&emsp;/g, ' ');
    // 并给每一个图片添加在线链接

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
  <title></title>
  </head>
  <body>
    ${htmlContent}
  </body>
  </html>
  `
  return htmlContent
}
async function mdToHtml (filePath, type, typeList) {
  console.log("🚀 ~ mdToHtml ~ typeList:", typeList.includes('md'))
  const file = fs.readFileSync(filePath, 'utf8');
  // 判断是不是html文件，不是就转成html文件
  let htmlContent = type == 'html' ? file : await convertToHTML(filePath, type);
  let newFilePath = ''
  typeList.forEach(async element => {
    const dir = path.join(path.dirname(filePath), element);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    newFilePath = path.join(dir, path.basename(filePath, path.extname(filePath)) + '.' + element);
    // 检查是不是有对应的html、docx、md文件夹
    if (typeList.includes('html')) {
      fs.writeFileSync(newFilePath, htmlContent, 'utf8');
    } else if (typeList.includes('docx')) {
      const docx = htmlDocx.asBlob(htmlContent);

      // 正则表达式匹配Markdown中的Base64编码的图片
      const base64ImageRegex = /!\[.*?\]\(data:image\/.*?;base64,(.*?)\)/g;
      let match;
      while ((match = base64ImageRegex.exec(markdown)) !== null) {
        const base64Data = match[1];
        console.log("🚀 ~ mdToHtml ~ base64Data:", base64Data)
        // 上传图片并获取URL
        // const imageUrl = await uploadBase64Image(base64Data);
        // 替换Markdown中的Base64编码的图片为URL
        // markdown = markdown.replace(match[0], `![image](${imageUrl})`);
      }
      // console.log("🚀 ~ mdToHtml ~ docx:", docx)
      fs.writeFileSync(newFilePath, docx, 'utf8');
    } else if (typeList.includes('md')) {
      console.log("🚀 ~ mdToHtml ~ markdown:", 11)
      const markdown = htmlToMd(htmlContent);
      fs.writeFileSync(newFilePath, markdown.trim(), 'utf8');
    }
  });
  // console.log('文件已保存到：', filePath.replace('.' + type, '.html'))
  return htmlContent;
}
/**
 * 将指定路径下的文件转换成指定格式的HTML文件
 *
 * @param filePath 文件路径
 * @param type 源文件类型（'html'、'md'或'docx'）
 * @param fileList 要转换的文件列表
 * @returns 根据fileList实现转换后文件
 */
async function convertFile (filePath, type, fileList) {
  try {
    const files = fs.readdirSync(filePath);
    // 将md转成word
    for (const file of files) {
      const markdownFilePath = `${filePath}\\${file}`;
      // 这里判断是不是文件夹
      if (fs.statSync(markdownFilePath).isDirectory()) continue;
      // 调用markdocx的convert方法来进行转换
      mdToHtml(markdownFilePath, type, fileList)

    }
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    return null;
  }
}


export {
  convertFile
}