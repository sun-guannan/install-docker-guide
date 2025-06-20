import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { Button, Card, Spin, Typography, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import BrowserOnly from '@docusaurus/BrowserOnly';

// 创建CSS模块文件（可选）
// 如果需要，可以创建 downloader.module.css 文件

interface DownloaderProps {
  draftId?: string;
}

function DownloaderContent({ draftId }: DownloaderProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [draftData, setDraftData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    // 当组件加载或draftId变化时获取数据
    const fetchDraftData = async () => {
      if (!draftId) {
        setError('未提供草稿ID');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // 这里替换为实际的API调用
        // const response = await fetch(`/api/drafts/${draftId}`);
        // const data = await response.json();
        
        // 模拟API响应
        setTimeout(() => {
          setDraftData({
            id: draftId,
            title: `草稿 ${draftId}`,
            content: '这是草稿内容示例',
            createdAt: new Date().toISOString(),
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('获取草稿数据失败');
        setLoading(false);
        message.error('获取草稿数据失败');
      }
    };
    
    fetchDraftData();
  }, [draftId]);
  
  const handleDownload = () => {
    if (!draftData) return;
    
    message.success(`开始下载草稿 ${draftId}`);
    // 这里实现实际的下载逻辑
  };
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Typography.Title level={4} type="danger">{error}</Typography.Title>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <Card title={draftData?.title} bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
        <Typography.Paragraph>
          <strong>ID:</strong> {draftData?.id}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>创建时间:</strong> {new Date(draftData?.createdAt).toLocaleString()}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>内容:</strong> {draftData?.content}
        </Typography.Paragraph>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          size="large"
        >
          下载草稿
        </Button>
      </Card>
    </div>
  );
}

export default function Downloader(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  // 使用BrowserOnly确保只在客户端渲染时访问window对象
  return (
    <Layout
      title={`草稿下载器 | ${siteConfig.title}`}
      description="下载您的草稿文件">
      <BrowserOnly>
        {() => {
          // 解析URL参数获取draft_id
          const location = useLocation();
          const params = new URLSearchParams(location.search);
          const draftId = params.get('draft_id') || undefined;
          
          return <DownloaderContent draftId={draftId} />;
        }}
      </BrowserOnly>
    </Layout>
  );
}