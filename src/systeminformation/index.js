/*
 * @Descripttion: 电脑信息展示
 * @Author: lihk
 * @Date: 2024-03-18 11:26:05
 */
import si from 'systeminformation';

async function displaySystemInfo () {
  try {
    // CPU信息
    const cpu = await si.cpu();
    console.log('CPU信息:');
    console.log(`- 制造商: ${cpu.manufacturer}`);
    console.log(`- 品牌: ${cpu.brand}`);
    console.log(`- 速度: ${cpu.speed}GHz`);
    console.log(`- 核心数: ${cpu.cores}`);
    console.log(`- 物理核心数: ${cpu.physicalCores}`);
    console.log('');

    // 内存信息
    const mem = await si.mem();
    console.log('内存信息:');
    console.log(`- 总计: ${(mem.total / 1024 / 1024 / 1024).toFixed(2)}GB`);
    console.log(`- 空闲: ${(mem.free / 1024 / 1024 / 1024).toFixed(2)}GB`);
    console.log('');

    // 系统信息
    const osInfo = await si.osInfo();
    console.log('操作系统信息:');
    console.log(`- 平台: ${osInfo.platform}`);
    console.log(`- 发行版: ${osInfo.distro}`);
    console.log(`- 版本: ${osInfo.release}`);
    console.log('');

    // 磁盘信息
    const disks = await si.diskLayout();
    console.log('磁盘信息:');
    disks.forEach((disk, i) => {
      console.log(`- 磁盘 ${i}:`);
      console.log(`  - 类型: ${disk.type}`);
      console.log(`  - 名称: ${disk.name}`);
      console.log(`  - 接口类型: ${disk.interfaceType}`);
      console.log(`  - 大小: ${(disk.size / 1024 / 1024 / 1024).toFixed(2)}GB`);
      console.log('');
    });

    // 网络接口信息
    const networkInterfaces = await si.networkInterfaces();
    console.log('网络接口信息:');
    networkInterfaces.forEach((iface, i) => {
      console.log(`- 接口 ${i}:`);
      console.log(`  - 名称: ${iface.iface}`);
      console.log(`  - 型号: ${iface.model}`);
      console.log(`  - MAC地址: ${iface.mac}`);
      console.log(`  - IPv4地址: ${iface.ip4}`);
      console.log(`  - IPv6地址: ${iface.ip6}`);
      console.log('');
    });
    console.log('');
    console.log('-----电脑信息获取完毕！！');
  } catch (error) {
    console.error(`获取系统信息出错: ${error}`);
  }
}

export {
  displaySystemInfo
}