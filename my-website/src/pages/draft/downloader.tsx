import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { Button, Card, Spin, Typography, message, Input, Divider, Modal, Form, Image, Alert, Progress, Flex } from 'antd';
import { DownloadOutlined, FolderOpenOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './downloader.module.css'; // 导入CSS模块

// 添加API URL常量
const DEBUG = false; // 设置为true时使用本地开发服务器
const API_BASE_URL = DEBUG ? 'http://localhost:9000' : 'https://cut-jianying-vdvswivepm.cn-hongkong.fcapp.run';

// 添加内联样式以强制隐藏导航栏
const hideNavbarStyle = {
  '.navbar': {
    display: 'none !important',
  },
  '.main-wrapper': {
    marginTop: '0 !important',
    paddingTop: '0 !important',
  },
};

interface DownloaderProps {
  draftId?: string;
}

function DownloaderContent({ draftId }: DownloaderProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [draftFolder, setDraftFolder] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [taskId, setTaskId] = useState<string>(''); // 添加taskId状态
  const [prepareDraftmessage, setPrepareDraftmessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0); // 添加进度状态
  const [form] = Form.useForm();
  
  // 根据操作系统设置默认路径
  useEffect(() => {
    // 尝试从localStorage获取保存的路径
    const savedPath = localStorage.getItem('jianying_draft_folder');
    
    if (savedPath) {
      // 如果有保存的路径，直接使用
      setDraftFolder(savedPath);
    } else {
      // 否则设置默认路径
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (isMac) {
        // Mac系统使用默认路径，不再尝试获取用户名
        setDraftFolder(`/Users/用户名/Movies/JianyingPro/User Data/Projects/com.lveditor.draft`);
      } else {
        // Windows 默认路径
        setDraftFolder('C:\\Users\\Administrator\\AppData\\Local\\JianyingPro\\User Data\\Projects\\com.lveditor.draft');
      }
    }
  }, []);
  
  // 当用户修改路径时，保存到localStorage
  const handleDraftFolderChange = (e) => {
    const newPath = e.target.value;
    setDraftFolder(newPath);
    localStorage.setItem('jianying_draft_folder', newPath);
  };
  
  const handleDownload = async () => {
    if (!draftId) {
      message.error('未提供草稿ID');
      return;
    }

    setPrepareDraftmessage("")
    setError('')
    setLoading(true);
    try {
      // 开始查询任务状态
      queryDraftStatus(draftId);
      // 调用下载API，使用常量API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/save_draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draft_id: draftId,
          draft_folder: draftFolder,
          license_key: '539C3FEB-74AE48D4-A964D52B-C520F801' // 使用体验版license key
        }),
      });
      
      const result = await response.json();
      
      if (result.output && result.output.success === true) {
        setDraftData(result.output);
        if (result.output.task_id) {
          // 获取task_id并开始查询状态
          // setTaskId(result.output.task_id); // 修改这里，直接使用draftId而不是task_id
        } else {
          setError('未获取到任务ID');
          message.error('未获取到任务ID');
          setLoading(false);
        }
      } else {
        setError(result.output.error || '下载失败，未知错误');
        message.error(result.output.error || '下载失败，未知错误');
        setLoading(false);
      }
    } catch (err) {
      setError('请求失败，请检查网络连接');
      message.error('请求失败，请检查网络连接');
      setLoading(false);
    }
  };
  
  // 添加查询草稿状态的方法
  const queryDraftStatus = async (taskId: string) => {
    try {
      // 使用常量API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/query_draft_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: taskId,
          license_key: '539C3FEB-74AE48D4-A964D52B-C520F801'
        }),
      });
      
      const result = await response.json();
      
      if (result.output) {
        // 更新draftData以包含message信息
        setDraftData(result.output);
        
        // 如果有新消息，则添加到消息历史数组中
        setPrepareDraftmessage(result.output.message);
        setProgress(result.output.progress);
        
        if (result.output.draft_url) {
          // 获取到下载链接，完成处理
          setProgress(100); // 设置进度为100%
          setDownloadUrl(result.output.draft_url);
          message.success('草稿获取成功，正在自动下载...');
          // 自动触发下载
          window.location.href = result.output.draft_url;
          setLoading(false);
        } else if (result.output.status === 'failed') {
          // 获取任务出现异常
          setError(result.output.message);
          message.error(result.output.message);
          setLoading(false);
        } else if (result.output.message) {
          // 任务仍在处理中，继续查询
          setTimeout(() => queryDraftStatus(draftId), 1000); // 修改这里，传递draftId而不是taskId
        } else {
          // 未获取到有效信息
          setError('获取草稿状态失败');
          message.error('获取草稿状态失败');
          setLoading(false);
        }
      } else {
        setError('查询任务状态失败');
        message.error('查询任务状态失败');
        setLoading(false);
      }
    } catch (err) {
      setError('请求失败，请检查网络连接');
      message.error('请求失败，请检查网络连接');
      setLoading(false);
    }
  };
  
  const handleOpenHelp = () => {
    window.open('https://jcnwn0uxeapc.feishu.cn/wiki/RFQPw5ZKHiY4cakxMQmclEmJnLf', '_blank');
  };
  
  return (
    <div className={styles.downloaderContainer}>
      <Card 
        className={styles.card} 
        bordered={false} 
        style={{ margin: '0 auto', width: '100%', maxWidth: 800 }}
      >

        <Alert 
          message="草稿仅保留10分钟，请尽快下载" 
          type="info" 
          showIcon 
          style={{ marginBottom: 30 }}
        />

        {/* 添加圆形logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <Image
            src="/img/cut_logo.png"
            alt="Logo"
            preview={false}
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', // 使图片呈现为圆形
              objectFit: 'cover' // 确保图片填充整个区域
            }}
          />
        </div>
        
        <Typography.Title level={3} style={{ color: '#000000E0', fontSize: 24, fontWeight: 600, textAlign: 'center' }}>
          下载草稿
        </Typography.Title>
        
        <Form form={form} layout="vertical">
          <Form.Item 
            label={<span style={{ fontSize: 16, fontWeight: 500, color: '#000000E0' }}>剪映目录：</span>}
            name="draftFolder"
          >
            <Input 
              value={draftFolder}
              onChange={handleDraftFolderChange}
              placeholder={draftFolder}
              style={{ fontSize: 14, color: '#000000E0' }}
            />
          </Form.Item>
        </Form>
        
        
        <Divider style={{ borderColor: '#0505050F' }} />
        
        <div style={{ marginBottom: 20 }}>
          <Typography.Paragraph style={{ fontSize: 14, color: '#000000A6', display: 'flex', alignItems: 'center' }}>
            <QuestionCircleOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
            不知道如何获取？
            <Typography.Link 
              onClick={handleOpenHelp} 
              style={{ marginLeft: 8, color: '#13c2c2', fontSize: 14 }}
            >
              点击查看帮助
            </Typography.Link>
          </Typography.Paragraph>
        </div>
        
        
        {/* 修改按钮样式为primary类型 */}
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          loading={loading}
          disabled={loading}
          block
          style={{ 
            height: 40,
            fontSize: 16,
            fontWeight: 500,
            marginTop: 10,
          }}
        >
          {loading ? '下载草稿中...' : '下载草稿'}
        </Button>
        
        {loading && (
          <div style={{ marginTop: 10 }}>
            {/* 添加进度条 */}
            <div style={{ marginBottom: 10 }}>
              <Progress 
                percent={progress} 
                status="active" 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </div>
            
            <Spin size="default">
              <Alert
                message="正在处理您的草稿"
                description={prepareDraftmessage}
                type="info"
                showIcon
              />
            </Spin>
          </div>
        )}
        
        {error && (
          <div style={{ marginTop: 20 }}>
            <Alert message={error} type="error" />
          </div>
        )}
      </Card>
    </div>
  );
}

export default function Downloader(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  // 使用BrowserOnly确保只在客户端渲染时访问window对象
  return (
    <>
      {/* 添加内联样式标签 */}
      <style jsx global>{`
        .navbar {
          display: none !important;
        }
        .main-wrapper {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `}</style>
      
      <Layout
        title={`剪映草稿下载 | ${siteConfig.title}`}
        description="下载您的剪映草稿文件"
        wrapperClassName="docusaurus-no-header"
        noFooter={true}>
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <BrowserOnly>
            {() => {
              // 解析URL参数获取draft_id
              const location = useLocation();
              const params = new URLSearchParams(location.search);
              const draftId = params.get('draft_id') || undefined;
              
              return <DownloaderContent draftId={draftId} />;
            }}
          </BrowserOnly>
        </div>
      </Layout>
    </>
  );
}