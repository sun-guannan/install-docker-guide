import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './cozepluginAdmin.module.css';

interface CreateProjectResponse {
  project_id: string;
}

interface ProjectInfo {
  project_id: string;
  project_name: string;
  license_count: number;
}

interface CreateProjectState {
    step: number;
    projectName: string;
    projectId: string;
    licenseKey: string;
    icon: string;
  }
  

export default function CozepluginAdmin(): JSX.Element {
  const [backupStatus, setBackupStatus] = useState('');
  const {siteConfig} = useDocusaurusContext();
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [createState, setCreateState] = useState<CreateProjectState>({
    step: 1,
    projectName: '',
    projectId: '',
    licenseKey: '',
    icon: ''
  });

  const [result, setResult] = useState({
    success: false,
    projectId: '',
    message: ''
  });

  const [experimentalLicenseResult, setExperimentalLicenseResult] = useState({
    success: false,
    licenseKey: '',
    message: ''
  });

  const handleCreateProject = async () => {
    if (!createState.projectName.trim()) {
      setResult({
        success: false,
        projectId: '',
        message: '请输入项目名称'
      });
      return;
    }

    try {
      const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/create_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_name: createState.projectName
        }),
      });

      const data: CreateProjectResponse = await response.json();
      
      setResult({
        success: true,
        projectId: data.project_id,
        message: '创建成功'
      });
      
      // 更新 createState 中的 projectId
      setCreateState(prev => ({
        ...prev,
        projectId: data.project_id
      }));
      
    } catch (error) {
      setResult({
        success: false,
        projectId: '',
        message: '创建失败，请稍后重试'
      });
    }
  };

  const handleBackup = async () => {
    try {
      const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/save_to_oss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      setBackupStatus(data.message);
      
    } catch (error) {
      setBackupStatus('备份失败，请稍后重试');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/get_projects_list');
      const data = await response.json();
      if (data.status === 'success') {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('获取项目列表失败:', error);
    }
  };
  
  const handleCreateExperimentalLicense = async () => {
    const projectId = createState.projectId.trim();
    if (!projectId) {
      setExperimentalLicenseResult({
        success: false,
        licenseKey: '',
        message: '请输入项目ID'
      });
      return;
    }
  
    try {
      const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/generate_license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: projectId,
          user_id: "1",         // 固定体验版用户ID
          order_id: "1",        // 固定体验版订单ID
          days: 3650           // 10年有效期
        }),
      });
  
      const data = await response.json();
      setExperimentalLicenseResult({
        success: true,
        licenseKey: data.license_key,
        message: '体验版 License Key 创建成功'
      });
    } catch (error) {
      setExperimentalLicenseResult({
        success: false,
        licenseKey: '',
        message: '创建失败，请稍后重试'
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout
      title="Coze Plugin 管理"
      description="创建新的项目">
      <main className={styles.adminPage}>
        <div className={styles.container}>
          <div className={styles.card}>
            <button
              onClick={handleBackup}
              className={styles.backupButton}
            >
              备份数据
            </button>
            {backupStatus && (
              <div className={`${styles.result} ${styles.success}`}>
                <p>{backupStatus}</p>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2>项目列表</h2>
            <div className={styles.projectsList}>
              <div className={styles.projectsHeader}>
                <span>项目名称</span>
                <span>项目ID</span>
                <span>License数量</span>
              </div>
              {projects.map(project => (
                <div key={project.project_id} className={styles.projectItem}>
                  <span>{project.project_name}</span>
                  <span className={styles.projectId}>{project.project_id}</span>
                  <span>{project.license_count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h1>创建新项目</h1>
            <div className={styles.stepSection}>
              <h2>第一步：设置项目名称</h2>
              <div className={styles.formItem}>
                <label>项目名称:</label>
                <input
                  type="text"
                  value={createState.projectName}
                  onChange={(e) => setCreateState(prev => ({...prev, projectName: e.target.value}))}
                  placeholder="请输入项目名称"
                  className={styles.input}
                />
              </div>
              <button
                onClick={handleCreateProject}
                className={styles.createButton}
                disabled={!createState.projectName.trim()}
              >
                创建项目
              </button>
              {result.message && (
                <div className={`${styles.result} ${result.success ? styles.success : styles.error}`}>
                  <p>{result.message}</p>
                  {result.success && (
                    <p className={styles.projectId}>项目 ID: {result.projectId}</p>
                  )}
                </div>
              )}
            </div>

            <div className={styles.stepSection}>
              <h2>第二步：创建体验版 License Key</h2>
              <div className={styles.formItem}>
                <label>项目ID:</label>
                <input
                  type="text"
                  value={createState.projectId}
                  onChange={(e) => setCreateState(prev => ({...prev, projectId: e.target.value}))}
                  placeholder="请输入项目ID"
                  className={styles.input}
                />
              </div>
              <button
                onClick={handleCreateExperimentalLicense}
                className={styles.createButton}
                disabled={!createState.projectId.trim()}
              >
                创建体验版 License Key
              </button>
              {experimentalLicenseResult.message && (
                <div className={`${styles.result} ${experimentalLicenseResult.success ? styles.success : styles.error}`}>
                  <p>{experimentalLicenseResult.message}</p>
                  {experimentalLicenseResult.success && (
                    <p className={styles.licenseKey}>License Key: {experimentalLicenseResult.licenseKey}</p>
                  )}
                </div>
              )}
            </div>

            <div className={styles.stepSection}>
              <h2>第三步：创建项目图标</h2>
              <div className={styles.formItem}>
                <p>请从以下网址获取项目图标：</p>
                <ul className={styles.linkList}>
                  <li><a href="https://tongyi.aliyun.com/wanxiang/creation" target="_blank">通义万相</a></li>
                  <li><a href="https://replicate.com/black-forest-labs/flux-1.1-pro-ultra" target="_blank">Replicate Flux</a></li>
                </ul>
              </div>
            </div>
          </div>
            {result.message && (
              <div className={`${styles.result} ${result.success ? styles.success : styles.error}`}>
                <p>{result.message}</p>
                {result.success && (
                  <p className={styles.projectId}>项目 ID: {result.projectId}</p>
                )}
              </div>
            )}
        </div>
      </main>
    </Layout>
  );
}