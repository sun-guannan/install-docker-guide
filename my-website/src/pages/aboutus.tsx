import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import AboutUsFeatures from '../components/AboutUsFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header 
    className={clsx('hero hero--custom', styles.heroBanner)}
    style={{ backgroundColor: '#1877F2', color: '#ffffff' }}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          智AI小铺
        </Heading>
        <p className="hero__subtitle">我们专注于提供顶尖的AI私有化部署解决方案，无需互联网，您的数据始终安全可靠。</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://item.taobao.com/item.htm?ft=t&id=831508489260">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='img/logo.svg' alt="Install" style={{ marginRight: '12px', width: '22px', height: '22px' }}/>
              <span>联系我们</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <AboutUsFeatures />
      </main>
    </Layout>
  );
}
