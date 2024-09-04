---
sidebar_position: 1
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Windows 安装指南

export const InstallButton = ({ to, children }) => (
  <Link
    to={to}
    style={{
      backgroundColor: '#049270',
      borderRadius: '8px',
      color: '#fff',
      padding: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      margin: '10px',
      marginLeft: '30px',
      marginRight: '30px',
      display: 'block',
      textAlign: 'center',
      transition: 'background-color 0.3s ease', // 添加平滑过渡效果
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#05A880';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#049270';
    }}
  >
    {children}
  </Link>
);

欢迎来到《Windows 安装指南》！🚀 在这里，你将学会如何在 Windows 上安装 Ollama、Open WebUI 以及 AnythingLLM。让我们开始吧！🎉

:::info   ⚡️ 系统要求 ⚡️

- **系统版本 🖥️**：
  - **PC 系统**：
    - **x64 系统**：Windows 10 版本 1903 或更高版本，构建号 18362.1049 或更高版本。
    - **ARM64 系统**：Windows 10 版本 2004 或更高版本，构建号 19041 或更高版本。
    - 或者 **Windows 11** 以上
  - **服务器系统**：
    - Windows Server 2019（版本 1709）及更高版本
- 如果使用 NVIDIA 显卡，要求 NVIDIA 452.39 及以上 🎮
- **芯片架构**：x86_64 和 ARM 架构 💻
- 最少 8GB 内存 💾

:::

:::danger   🔥 联系我们 🔥

有问题？欢迎来淘宝店联系我们的客服 💬

- 获取网盘提取密码 🔑
- 寻求人工指导 👩‍💻👨‍💻

:::

## 1. 安装 WSL

Windows Subsystem for Linux (WSL) 是 Windows 的一个功能，它允许你在 Windows 机器上运行 Linux 环境，而无需使用单独的虚拟机或双启动。为了后续的开发工作，你需要先在机器上安装 WSL：

- [安装 WSL](./install-wsl/install-wsl.md)

安装完成后，进入 Linux 虚拟环境继续下一步的安装。

## 2. 在 Linux 虚拟环境中继续安装

点击“开始”菜单，找到安装好的 Linux 虚拟环境，然后在虚拟环境中继续安装步骤：

- [在 Linux 环境中安装](../install-linux.md)
