---
sidebar_position: 2
---
# 在 Windows Server 上安装 WSL

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

:::info ⚡ 系统要求 ⚡

- **系统版本 🖥️**：
  - Windows Server 2019（版本 1709）及更高版本。

:::

:::tip 🧐 如何查看当前 Windows 设备使用的是 x86 还是 ARM 芯片？

1. 打开命令提示符：
  - 按 `Win + R` 打开“运行”对话框，输入 `cmd`，然后按 Enter。

2. 输入以下命令并按 Enter：

```bash
echo %PROCESSOR_ARCHITECTURE%
```

  - 输出结果将显示架构类型：
    - `AMD64` 表示 x86（64 位）架构。
    - `ARM64` 表示 ARM 架构。
:::

:::tip 🔎 如何检查 Windows 版本和构建号？

按下 `Windows 键 + R`，输入 `winver`，然后选择确定。

:::

:::danger 🔥 联系我们 🔥

欢迎来淘宝店联系我们的客服 💬

- 获取网盘提取密码 🔑
- 寻求人工指导 👩‍💻👨‍💻

:::

## 1. 启用 **虚拟化** 功能

1.1 需要在 BIOS 中启用 **虚拟化技术(VT)** 。具体步骤因计算机型号不同有所差异，但通常如下：

- **重新启动计算机**并进入 BIOS 设置。进入 BIOS 的方法一般是在启动时按 `F2`, `F10`, `Delete`, 或 `Esc` 键，具体请参考你的电脑手册。
- 在 BIOS 设置中，找到与 `Virtualization` 或 `Intel VT-x`, `AMD-V` 类似的选项，并将其设置为 `Enabled`。
- 保存并退出 BIOS 设置。

1.2 启用“虚拟机平台”可选组件
你可以通过以下步骤启用 Windows 的虚拟机平台：

- 打开 **控制面板** > **程序和功能**。
- 选择左侧的 **启用或关闭 Windows 功能**。
- 勾选 **虚拟机平台** 和 **适用于Linux的Windows子系统**，然后点击 **确定**。
- 计算机可能会要求重启，重启后生效。

1.3 检查任务管理器中的虚拟化状态：

- 按 Ctrl + Shift + Esc 打开任务管理器。
- 选择“性能”选项卡，然后选择左侧的“CPU”。
- 在右下角，你应该看到“虚拟化：已启用”或“虚拟化：已禁用”。
- 如果显示为“已启用”，说明 BIOS 中的虚拟化技术已成功启用。

<img src='/img/windows-vt-open.png' style={{width:'800px', height:'600px', marginRight:'12px'}}/>


## 2. 启用 "适用于 Linux 的 Windows 子系统"

需要先启用“适用于 Linux 的 Windows 子系统”可选功能，然后才能在 Windows 上安装 Linux 分发。

以管理员身份打开 PowerShell（“开始”菜单 >“PowerShell” >单击右键 >“以管理员身份运行”），然后输入以下命令：

``` powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

## 3. 重启电脑。🔄

## 4. 确认 “适用于 Linux 的 Windows 子系统” 已经开启

可通过在 `PowerShell` 窗口中运行以下命令来确认是否已启用“适用于 Linux 的 Windows 子系统”：

```powershell
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

## 5. 安装 Ubuntu 20.04

这里提供了适用于x64机器的ubuntu 20.04版本，如果你想要其他的linux发行版本，例如Debian, SUSE，Fedora，或者适配ARM64的内核包，可以联系我们
<Tabs>
  <TabItem value="ubuntu_20_04" label="Ubuntu 20.04 - for x64">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1bEpFmTmk7U1lnpvXj78-xg">下载Ubuntu 20.04</InstallButton>
      </div>
  </TabItem>
  <TabItem value="more" label="更多发行版本">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://item.taobao.com/item.htm?ft=t&id=831508489260">➡️淘宝店铺⬅️</InstallButton>
      </div>
  </TabItem>
</Tabs>

### 5.1 使用 PowerShell 安装 `<DistributionName>.AppxBundle` 包：

```powershell
Add-AppxPackage .\Ubuntu.AppxBundle
```

### 5.2 安装

在`开始`菜单里找到ubuntu，点击安装，安装完成后，就可以为你的linux设置用户名和密码。

:::tip 📋 常见问题

[查看常见问题](./faq.md)

:::

## 6. 设置你的 Linux 用户名和密码

- 当使用WSL完成Linux发行版的安装过程后，使用开始菜单打开该发行版（例如Ubuntu）。系统会要求你为你的Linux发行版创建用户名和密码。

- 这个用户名和密码特定于你安装的每个单独的Linux发行版，与Windows用户名无关。

- 请注意，在输入密码时，屏幕上不会出现任何东西。这称为盲打。你不会看到你正在输入的内容，这是完全正常的。

- 一旦创建了用户名和密码，该帐户将成为该发行版的默认用户，并在启动时自动登录。

- 该帐户将被视为Linux管理员，具有运行`sudo`（超级用户权限）管理命令的能力。

在WSL上运行的每个Linux发行版都有其自己的Linux用户帐户和密码。每次添加发行版、重新安装或重置时，你都必须配置一个Linux用户帐户。

<div class="center">
  <video controls width='600' src="/video/windows-wsl-ubuntu.mp4" title="安装ubuntu的视频"/>
</div>

