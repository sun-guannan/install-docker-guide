---
sidebar_position: 1
---
import Link from '@docusaurus/Link';


# 教程概述

## 问题🤔️🤔️🤔️ 

🤔️没有GPU，想要学习大模型知识？

🤔️不能访问OpenAI API，想要测试自己的微调方案？

🤔️数据不能外漏，不放心使用公开大模型？

## 本地部署教程⚡️⚡️⚡️

不需要昂贵的GPU，在本地就能部署大模型🚀🚀🚀。

🐑目前最简单的方法是使用软件ollama，不管是在mac，linux还是windows上，你都可以**用ollama去跑各种各样的大模型**。

💥但是ollama是一个纯命令行的工具，交互太过原始，再搭配**Open WebUI可以轻松获取交互界面**。

⚡️如果还想进一步定制，还可以使用**AnythingLLM**实现简单的本地RAG数据库，创建一个**完全属于私人的AI小助手**。




:::tip 🔥教程内容🔥

⬇️⬇️⬇️    安装 Ollama + Open WebUI + AnythingLLM

:::

export const PlatformButton = ({ icon, title, subtitle, to }) => (
  <Link
    to={to}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      width: '100vh',
      height: 'auto',
      backgroundColor: '#FEFEFE',
      color: 'black',
      borderRadius: '10px',
      textAlign: 'left',
      border: '1px solid #ddd',
      textDecoration: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '30px',
      marginBottom: '20px'
    }}
  >
    <img src={icon} alt="" style={{ width: '40px', marginRight: '15px' }} />
    <div>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
      <div style={{ fontSize: '14px', color: '#666' }}>{subtitle}</div>
    </div>
  </Link>
);

<PlatformButton
  icon="/img/apple_48.svg"
  title="在Mac上安装"
  subtitle="支持apple和intel芯片."
  to="./install/install-windows"
/>

<PlatformButton
  icon="/img/windows_48.svg"
  title="在Windows上安装"
  subtitle="支持win10以上系统，最少需要8GB内存."
  to="./install/install-mac"
/>

<PlatformButton
  icon="/img/linux_48.svg"
  title="在Linux上安装"
  subtitle="支持多种linux系统."
  to="./install/install-linux"
/>