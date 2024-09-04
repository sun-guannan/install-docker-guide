# 安装WSL

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

export const InstallButton = ({ to, children }) => (
  <Link
    to={to}
    style={{
      backgroundColor: '#049270',
      borderRadius: '8px',
      color: '#fff',
      padding: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      margin: '10px',
      marginLeft: '30px',
      marginRight: '30px',
      display: 'block',
      textAlign: 'center',
      transition: 'background-color 0.3s ease', // 添加平滑过渡效果
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#05A880';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#049270';
    }}
  >
    {children}
  </Link>
);

## 什么是 Windows Subsystem for Linux (WSL)？🤔

Windows Subsystem for Linux (WSL) 是 Windows 系统上的一个功能，它允许你在 Windows 机器上运行 Linux 环境，而无需使用虚拟机或双系统启动。WSL 提供了开发人员在 Windows 和 Linux 环境下同时工作的便利，极大提升了效率。🎯

通过 WSL，你可以安装各种 Linux 发行版，如 Ubuntu、Debian 和 Kali，并且可以：

- 🗂️ 在隔离的 Linux 文件系统中存储文件。
- 💻 使用命令行工具，如 Bash。
- ⚙️ 运行常见的 Bash 命令行工具，如 `grep`、`sed`、`awk`，以及其他 ELF-64 二进制文件。
- 🚀 运行脚本、应用程序，如：
  - 常用工具：vim、emacs、tmux。
  - 编程语言：NodeJS、JavaScript、Python、Ruby、C/C++ 等。
  - 服务：SSHD、MySQL、Apache、MongoDB 等。
- 🖥️ 在 Windows 中调用 Linux 应用，或通过命令行调用 Windows 应用。
- 🎨 直接在 Windows 上运行 Linux 图形应用程序。
- 🧠 使用 GPU 加速在 Linux 上的机器学习任务。

## 什么是 WSL 2？🌟

WSL 2 是 WSL 的最新版本，默认情况下，你在 Windows 上安装的 Linux 发行版将基于 WSL 2 架构。与 WSL 1 相比，WSL 2 提供了显著的文件系统性能提升，并且支持完整的系统调用兼容性。

WSL 2 使用虚拟化技术在轻量虚拟机 (VM) 中运行完整的 Linux 内核，具有更强的隔离性和性能。💡

### WSL 2 的优点：

- ⚡ 文件系统性能显著提升。
- 🔧 完整的系统调用支持。
- 🛠️ 独立的 PID、挂载和用户命名空间。

## 安装步骤 🛠️

- 如果你使用的是 PC 电脑，参考[在 Windows PC 上安装 WSL](../install-wsl/for-windows-pc.md)。
- 如果你使用的是服务器系统，参考[在 Windows Server 上安装 WSL](../install-wsl/for-windows-server.md)。
