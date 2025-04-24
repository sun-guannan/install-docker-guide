import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './license.module.css';

interface LicenseResponse {
  license_key: string;
  expiration_date: string;
  order_id: string[];
  project_name: string;
}

interface RenewResponse {
  new_expiration_date: string;
  order_id: string[];
  project_id: string;
  project_name: string;
  user_id: string;
}

export default function License(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [licenseInfo, setLicenseInfo] = useState({
    productName: "正在获取...",
    licenseKey: "",
    expiryDate: "正在计算..."
  });
  const [isRenewMode, setIsRenewMode] = useState(false);
  const [inputLicenseKey, setInputLicenseKey] = useState("");
  const [renewParams, setRenewParams] = useState(null);
  const [isFromRenew, setIsFromRenew] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    
    if (action === 'renew_license') {
      setIsRenewMode(true);
      setRenewParams({
        days: parseInt(params.get('days')),
        project_id: params.get('product_id'),
        order_id: params.get('order_id')
      });
    } else if (action === 'generate_license') {
      setIsFromRenew(params.get('from') === 'renew');
      generateLicense();
    }
  }, []);

  const generateLicense = async () => {
    // 获取URL参数
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    
    if (action === 'generate_license') {
      const requestData = {
        user_id: params.get('user_id'),
        days: parseInt(params.get('days')),
        project_id: params.get('product_id'),
        order_id: params.get('order_id')
      };

      try {
        const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/generate_license', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data: LicenseResponse = await response.json();
        
        setLicenseInfo({
          productName: data.project_name,  // 使用API返回的project_name
          licenseKey: data.license_key,
          expiryDate: data.expiration_date
        });
      } catch (error) {
        console.error('生成license失败:', error);
        setLicenseInfo({
          productName: "获取失败",  // 修改错误状态的显示
          licenseKey: "生成失败",
          expiryDate: "生成失败"
        });
      }
    }
  };

  const handleRenewLicense = async () => {
    if (!inputLicenseKey || !renewParams) return;

    try {
      const response = await fetch('https://license-key-wxfxflihjr.cn-hongkong.fcapp.run/renew_license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          license_key: inputLicenseKey,
          ...renewParams
        }),
      });

      const data: RenewResponse = await response.json();
      
      // 使用API返回的user_id构建新URL
      const newUrl = `${window.location.pathname}?action=generate_license&from=renew&product_id=${data.project_id}&user_id=${data.user_id}&order_id=${renewParams.order_id}&days=${renewParams.days}`;
      window.location.href = newUrl;
      
    } catch (error) {
      console.error('续费失败:', error);
      setLicenseInfo(prev => ({
        ...prev,
        expiryDate: "续费失败"
      }));
    }
  };

  return (
    <Layout
      title="License 信息"
      description="您的授权信息">
      <main className={styles.licensePage}>
        <div className={styles.licenseContainer}>
          <h1>授权信息</h1>
          <div className={styles.licenseCard}>
            {isRenewMode ? (
              <>
                <div className={styles.licenseItem}>
                  <label>License Key:</label>
                  <input
                    type="text"
                    value={inputLicenseKey}
                    onChange={(e) => setInputLicenseKey(e.target.value)}
                    placeholder="请输入您的License Key"
                    className={styles.licenseInput}
                  />
                </div>
                <div className={styles.licenseItem}>
                  <button
                    onClick={handleRenewLicense}
                    className={styles.renewButton}
                    disabled={!inputLicenseKey}
                  >
                    续费
                  </button>
                </div>
                {licenseInfo.expiryDate !== "正在计算..." && (
                  <div className={styles.licenseItem}>
                    <label>新到期时间:</label>
                    <span>{licenseInfo.expiryDate}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={styles.licenseItem}>
                  <label>产品名称:</label>
                  <span>{licenseInfo.productName}</span>
                </div>
                <div className={styles.licenseItem}>
                  <label>License Key:</label>
                  <span>{licenseInfo.licenseKey}</span>
                </div>
                <div className={styles.licenseItem}>
                  <label>到期时间:</label>
                  <span>
                    {isFromRenew && (
                      <svg 
                        className={styles.newIcon} 
                        viewBox="0 0 24 24" 
                        width="32"  // 从16改为32
                        height="32" // 从16改为32
                      >
                        <path 
                          fill="currentColor" 
                          d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" 
                        />
                      </svg>
                    )}
                    {licenseInfo.expiryDate}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}