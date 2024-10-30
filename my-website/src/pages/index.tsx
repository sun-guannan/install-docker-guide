import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          🔥私有部署AI大模型
        </Heading>
        <p className="hero__subtitle">没网络🤔️？没问题👌👌！可以单机运行的私有AI助手🚀🚀🚀</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/private_llm/intro">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='img/download.svg' alt="Install" style={{ marginRight: '12px', width: '22px', height: '22px' }}/>
              <span>立即开始私有部署⚡️</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    // 动态创建 script 标签引入外部 JavaScript
    const script = document.createElement('script');
    script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.7/libs/cn/index.js";
    script.async = true;

    // 当脚本加载完成后，初始化 CozeWebSDK
    script.onload = () => {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7431101651919978508',
        },
        componentProps: {
          title: '智AI小铺',
          icon: 'https://lf6-appstore-sign.oceancloudapi.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/279695297087852_1730282162823599099_s7w2pwsuNs.png?lk3s=68e6b6b5&x-expires=1730285762&x-signature=1xqnvxrWuxqVf9iYKyeT3OsnBW8%3D'
        },
      });
    };

    // 将脚本添加到文档中
    document.body.appendChild(script);

    // 清理函数，在组件卸载时移除脚本
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
