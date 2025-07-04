// src/components/DownloadPanel/index.tsx
import React, { useState, useEffect } from 'react';
import { Button, Spin, Typography, message, Input, Divider, Form, Image, Alert, Progress } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useLocation } from '@docusaurus/router'; // Docusaurus 路由钩子，在这里获取 draftId
import styles from './styles.module.css'; // 导入CSS模块

// 添加API URL常量
const DEBUG = false; // 设置为true时使用本地开发服务器
const API_BASE_URL = DEBUG ? 'http://localhost:9000' : 'https://cut-jianying-vdvswivepm.cn-hongkong.fcapp.run';

interface DownloadPanelProps {
  draftId?: string; // 从父组件接收 draftId
}

function DownloadPanel({ draftId }: DownloadPanelProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [draftFolder, setDraftFolder] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [prepareDraftmessage, setPrepareDraftmessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [form] = Form.useForm();

  // 根据操作系统设置默认路径，并从 localStorage 加载保存的路径
  useEffect(() => {
    const savedPath = localStorage.getItem('jianying_draft_folder');
    if (savedPath) {
      setDraftFolder(savedPath);
    } else {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (isMac) {
        setDraftFolder(`/Users/用户名/Movies/JianyingPro/User Data/Projects/com.lveditor.draft`);
      } else {
        setDraftFolder('C:\\Users\\Administrator\\AppData\\Local\\JianyingPro\\User Data\\Projects\\com.lveditor.draft');
      }
    }
  }, []);

  // 当用户修改路径时，保存到localStorage
  const handleDraftFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = e.target.value;
    setDraftFolder(newPath);
    localStorage.setItem('jianying_draft_folder', newPath);
  };

  const handleDownload = async () => {
    if (!draftId) {
      message.error('未提供草稿ID');
      return;
    }

    setPrepareDraftmessage("");
    setError('');
    setLoading(true);
    try {
      // 启动查询任务状态的轮询
      queryDraftStatus(draftId);

      // 调用下载API
      const response = await fetch(`${API_BASE_URL}/save_draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draft_id: draftId,
          draft_folder: draftFolder,
          license_key: '539C3FEB-74AE48D4-A964D52B-C520F801' // 体验版 license key
        }),
      });

      const result = await response.json();

      if (result.output && result.output.success === true) {
        setDraftData(result.output);
        // 如果后端在 save_draft 响应中没有返回 task_id，但 query_draft_status 依赖它，
        // 那么在 queryDraftStatus 中使用 draftId 作为 task_id 是合理的，因为它们通常是关联的。
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

  // 查询草稿状态的方法
  const queryDraftStatus = async (currentDraftId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/query_draft_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: currentDraftId, // 使用传递的 draftId 作为 task_id
          license_key: '539C3FEB-74AE48D4-A964D52B-C520F801'
        }),
      });

      const result = await response.json();

      if (result.output) {
        setDraftData(result.output);
        setPrepareDraftmessage(result.output.message || '');
        setProgress(result.output.progress || 0);

        if (result.output.draft_url) {
          setProgress(100);
          setDownloadUrl(result.output.draft_url);
          message.success('草稿获取成功，正在自动下载...');
          window.location.href = result.output.draft_url;
          setLoading(false);
        } else if (result.output.status === 'failed') {
          setError(result.output.message || '获取任务出现异常');
          message.error(result.output.message || '获取任务出现异常');
          setLoading(false);
        } else if (result.output.message) {
          // 任务仍在处理中，继续查询
          setTimeout(() => queryDraftStatus(currentDraftId), 1000);
        } else {
          setError('获取草稿状态失败');
          message.error('获取草稿状态失败');
          setLoading(false);
        }
      } else {
        // 如果没有 output 或无效，继续查询
        setTimeout(() => queryDraftStatus(currentDraftId), 1000);
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
    <div className={styles.panelCard}> {/* 应用新的面板卡片样式 */}
      <Typography.Title level={4} className={styles.panelTitle}>下载草稿</Typography.Title> {/* 标题 */}
      <div className={styles.panelContent}>
        <Alert
          message="草稿仅保留10分钟，请尽快下载"
          type="info"
          showIcon
          className={styles.infoAlert} /* 应用样式 */
          style={{ marginBottom: 20 }}
        />

        <div className={styles.logoContainer}>
          <Image
            src="/img/cut_logo.png"
            alt="Logo"
            width={100}
            height={100}
            preview={false}
            className={styles.logoImage} /* 应用样式 */
          />
          <div 
            className={`${styles.logoDownloadIcon} ${loading ? styles.logoDownloadLoading : ''}`}
            onClick={!loading ? handleDownload : undefined}
            title={loading ? "正在下载中..." : "点击下载草稿"}
          >
            {loading ? <Spin size="small" /> : <DownloadOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />}
          </div>
        </div>

        <Form form={form} layout="vertical">
          <Form.Item
            label={<span className={styles.formItemLabel}>剪映目录：</span>}
            name="draftFolder"
          >
            <Input
              value={draftFolder}
              onChange={handleDraftFolderChange}
              placeholder={draftFolder}
              className={styles.pathInput} /* 应用样式 */
            />
          </Form.Item>
        </Form>

        <Divider className={styles.panelDivider} />

        <div style={{ marginBottom: 15 }}>
          <Typography.Paragraph className={styles.helpParagraph}>
            <QuestionCircleOutlined className={styles.helpIcon} />
            不知道如何获取？
            <a
              onClick={handleOpenHelp}
              className={styles.helpLink}
              style={{ cursor: 'pointer' }}
            >
              点击查看帮助
            </a>
          </Typography.Paragraph>
        </div>

        {loading && (
          <div style={{ marginTop: 15 }}>
            <Progress
              percent={progress}
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              size="small"
              className={styles.progressBar} /* 应用样式 */
            />
            <Spin size="small" className={styles.loadingSpin}>
              <Alert
                message="正在处理您的草稿"
                description={prepareDraftmessage}
                type="info"
                showIcon
                className={styles.loadingAlert} /* 应用样式 */
              />
            </Spin>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 15 }}>
            <Alert message={error} type="error" className={styles.errorAlert} /> {/* 应用样式 */}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadPanel;