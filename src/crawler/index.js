/*
 * @Descripttion: 
 * @Author: lihk
 * @Date: 2024-03-16 10:55:34
 */
import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
const crawler = async () => {
  const browser = await puppeteer.launch({
    headless: true,//无头模式，不打开页面
  });
  const page = await browser.newPage(); //打开一个页面
  page.setViewport({ width: 1920, height: 1080 }); //设置页面宽高
  await page.goto('https://juejin.cn/'); //跳转到掘金
  await page.waitForSelector('.side-navigator-wrap'); //等待这个元素出现

  const elements = await page.$$('.side-navigator-wrap .nav-item-wrap .nav-item-text') //获取menu下面的span
  //去掉大模型子站，因为会跳转到一个新的页面//去掉关注，因为打开的页面没有登录账号
  elements.splice(0, 2)

  const articleList = []
  const collectFunc = async (btnText) => {
    //获取列表的信息
    await page.waitForSelector('.entry-list')
    const elements = await page.$$('.entry-list .title-row a')
    for await (let el of elements) {
      const text = await el.getProperty('innerText')
      const name = await text.jsonValue()
      articleList.push(name)
    }
    console.log(articleList, '-----', btnText)
    await new Promise((resolve) => {
      //调用python脚本进行中文分词 输出词云图
      const pythonProcess = spawn('python', ['index.py', articleList.join(','), btnText])
      pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString())
      })
      pythonProcess.stderr.on('data', (data) => {
        console.log(data.toString())
      })
      pythonProcess.on('close', (code) => {
        console.log("关闭：", `child process exited with code ${code}`)
        resolve();
      })
    })
  }

  for await (let el of elements) {
    const text = await el.getProperty('innerText') //获取span的属性
    const name = await text.jsonValue() //获取内容
    await el.click() //自动点击对应的菜单
    await collectFunc(name) //调用函数
  }
  console.log('生成所有类别的词云图完成')

}

export {
  crawler
}