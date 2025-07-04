// src/components/AIGenerateEditPanel/index.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import styles from './styles.module.css';

const { Title } = Typography;

const AIGenerateEditPanel: React.FC = () => {
  return (
    <Card className={styles.panelCard} title={<Title level={4} className={styles.panelTitle}>AI 生成 / 编辑</Title>}>
      <div className={styles.content}>
        <p>这里将是 AI 生成和编辑内容的区域。</p>
        <p>例如：文本输入、AI 能力触发按钮等。</p>
      </div>
    </Card>
  );
};

export default AIGenerateEditPanel;