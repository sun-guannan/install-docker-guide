import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '定制化的AI解决方案',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        我们专注于提供高度定制化的AI私有化部署服务。通过深入理解客户需求，我们为每个企业量身打造独特的AI解决方案，确保数据安全的同时提升业务效率。我们的方案不仅灵活，还能与现有系统无缝集成，帮助企业快速实现数字化转型。
      </>
    ),
  },
  {
    title: '高效的部署与支持',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        我们的AI私有化部署流程经过多次优化，结合了最新的技术和实践经验，确保部署过程高效且顺利。我们提供全方位的技术支持，从规划到实施，再到后期维护，保障系统的持续稳定运行，帮助企业轻松应对未来挑战。
      </>
    ),
  },
  {
    title: '提升客户数据安全性',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        通过AI私有化部署，我们帮助企业确保核心数据的绝对安全。我们严格遵循数据保护标准，并提供全天候监控与防护措施，确保数据始终在本地保存，不泄露、不外流。通过我们的解决方案，企业可以在享受AI带来便利的同时，彻底消除数据安全隐患。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function AboutUsFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
