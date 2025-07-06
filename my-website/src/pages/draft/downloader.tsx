// src/pages/draft/downloader.tsx
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout'; // Docusaurus 默认布局
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // Docusaurus 上下文
import { useLocation } from '@docusaurus/router'; // Docusaurus 路由钩子
import { Layout as AntdLayout, Row, Col, Typography, Divider, Spin } from 'antd'; // 引入 Ant Design 布局组件和Spin
// 导入所有子组件
import PreviewPanel from '../../components/PreviewPanel';
import TimelinePanel from '../../components/TimelinePanel';
import AIGenerateEditPanel from '../../components/AIGenerateEditPanel';
import DownloadPanel from '../../components/DownloadPanel'; // 现在 DownloadPanel 在 components 目录下

import styles from './downloader.module.css';

const { Header, Content } = AntdLayout; // 使用 AntdLayout 的组件
const { Title } = Typography;

// API URL 常量
const DEBUG = false;
const API_BASE_URL = DEBUG ? 'http://localhost:9000' : 'https://cut-jianying-vdvswivepm.cn-hongkong.fcapp.run';

// 全局样式，用于隐藏 Docusaurus 导航栏和调整布局
const globalStyles = `
  html, body, #__docusaurus {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #1a1a1a !important; /* 确保 body 背景是深色 */
  }
  .navbar {
    display: none !important; /* 强制隐藏导航栏 */
  }
  .main-wrapper {
    margin-top: 0 !important;
    padding-top: 0 !important;
    height: 100vh; /* 确保内容区域占据整个视口高度 */
    width: 100vw; /* 确保内容区域占据整个视口宽度 */
    display: flex;
    flex-direction: column;
  }
  .doc-sidebar {
    display: none !important; /* 隐藏侧边栏 */
  }
  .theme-doc-sidebar-container { /* 隐藏侧边栏的容器 */
    display: none !important;
  }
  .theme-doc-content {
    padding: 0 !important; /* 移除 Docusaurus 内容区的内边距 */
    max-width: 100% !important; /* 确保内容区宽度铺满 */
    flex-grow: 1; /* 让内容区域占据剩余空间 */
    display: flex;
    flex-direction: column;
  }
  /* 调整 Docusaurus grid system for full width content if it uses col--9 etc. */
  .col.col--9, .col.col--10, .col.col--11, .col.col--12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  /* Ant Design 默认文本颜色，确保在深色背景下可见 */
  .ant-typography {
    color: #FFFFFF !important;
  }
  /* Ant Design 默认边框颜色 */
  .ant-border {
    border-color: #444 !important;
  }
  /* 全局loading样式 */
  .global-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .global-loading .ant-spin-text {
    color: #FFFFFF;
    margin-top: 8px;
    font-size: 16px;
  }
`;

function DownloaderPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext(); // 可以获取站点配置
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const draftId = queryParams.get('draft_id') || undefined;

  const [scriptStatus, setScriptStatus] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // 添加loading状态 

  // 获取脚本状态
  useEffect(() => {
    const queryScriptStatus = async () => {
      setLoading(true); // 开始请求前设置loading为true
      try {
        const response = await fetch(`${API_BASE_URL}/query_script`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ draft_id: draftId }),
        });
        const result = await response.json();

        let parsedOutput = null;
        if (result.output) {
          if (typeof result.output === 'string') {
            try {
              parsedOutput = JSON.parse(result.output);
            } catch (e) {
              console.error('Failed to parse result.output string:', e);
              parsedOutput = result.output;
            }
          } else {
            parsedOutput = result.output;
          }
          setScriptStatus(parsedOutput);
        } else {
          console.error('Failed to get Script Status: result.output is empty');
        }
      } catch (err) {
        console.error('Request for Script Status failed:', err);
      } finally {
        setLoading(false); // 请求结束后设置loading为false
      }
    };

    if (draftId) {
      queryScriptStatus();
    }
  }, [draftId]);


  // 选中项点击处理函数
  const handleItemClick = (item: any, type: string, extraData: any = {}) => {
    setSelectedItem({ ...item, type, ...extraData });
  };

  return (
    <Layout title="剪映草稿助手" description="一个用于编辑剪映草稿的工具" noFooter>
      {/* 注入全局样式 */}
      <style>{globalStyles}</style>

      {/* 全局loading */}
      {loading && (
        <div className="global-loading">
          <Spin size="large" tip="加载中..." />
        </div>
      )}

      <AntdLayout className={styles.mainLayout}> {/* 使用 Ant Design Layout 进行内部布局 */}
        {/* 头部区域 */}
        <Header className={styles.appHeader}>
          <Title level={2} className={styles.appTitle}>
            {draftId}
          </Title>
        </Header>

        {/* 主要内容区域：上三下一切割 */}
        <Content className={styles.appContent}>
          {/* 上方三个模块 */}
          <Row gutter={[16, 16]} className={styles.topPanelsRow} > {/* 添加 gutter 确保间距 */}
            {/* <Col xs={24} lg={8} className={styles.panelCol}>
              <AIGenerateEditPanel />
            </Col> */}
            <Col xs={24} lg={12} className={styles.panelCol}>
              <PreviewPanel selectedItem={selectedItem} />
            </Col>
            <Col xs={24} lg={12} className={styles.panelCol}>
              <DownloadPanel draftId={draftId} />
            </Col>
          </Row>

          {/* 下方轨道时间轴 */}
          <Row className={styles.timelineRow}>
            <Col span={24}>
              <TimelinePanel
                scriptStatus={scriptStatus}
                selectedItem={selectedItem}
                handleItemClick={handleItemClick}
              />
            </Col>
          </Row>
        </Content>
      </AntdLayout>
    </Layout>
  );
}

export default DownloaderPage;
