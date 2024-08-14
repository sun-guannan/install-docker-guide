---
sidebar_position: 1
---
import Link from '@docusaurus/Link';

# 概述

不需要昂贵的GPU，现在在本地跑大模型，最简单的方法是使用软件**ollama**，不管是在mac，linux还是windows上，你都可以用ollama去跑各种各样的大模型。但是ollama是一个纯命令行的工具，交互太过原始，再搭配**Open WebUI**可以轻松获取交互界面。如果还想进一步定制，还可以使用**AnythingLLM**实现简单的本地RAG数据库，创建一个完全属于私人的AI小助手

:::tip 教程内容

Ollama+Open WebUI+AnythingLLM

:::


export const PlatformButton = ({text, subtitle, to}) => (
  <Link
      to={to}
      style={{
        display: 'inline-block',
        marginTop: '20px',
        width: '100vh',
        height: '80px',
        backgroundColor: '#FEFEFE',
        color: 'black',
        borderRadius: '5px',
        textAlign: 'center',
        border: '1px solid black',
        textDecoration: 'none',
      }}
    >
    {text}
  </Link>
);

<PlatformButton text='在windows上安装' subtitle='支持apple和intel芯片，快速在本地安装' to='./install/install-windows'/>
<PlatformButton text='在mac上安装' subtitle='支持apple和intel芯片，快速在本地安装' to='./install/install-mac'/>
<PlatformButton text='在linux上安装' subtitle='支持apple和intel芯片，快速在本地安装' to='./install/install-linux'/>

