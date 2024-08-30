---
sidebar_position: 1
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Windows

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


欢迎来到《Windows 安装指南》！🚀 在这里，你将学会如何在Windows上安装Ollama、Open WebUI 以及 AnythingLLM。让我们开始吧！🎉

:::info   ⚡️ 系统要求 ⚡️

- 系统版本：win10 22H2 及以上 🖥️
- 如果使用NVIDIA显卡，要求NVIDIA 452.39及以上 🎮
- 芯片架构：x86_64和arm架构  💻
- 最少8GB内存 💾

:::

:::danger   🔥 联系我们 🔥
 
有问题？欢迎来淘宝店联系我们的客服 💬

- 获取网盘提取密码 🔑
- 寻求人工指导 👩‍💻👨‍💻

:::

## 1. 安装ollama

<img src='/img/ollama.png' style={{width:'40px', height:'60px', marginRight:'12px'}}/>Ollama可以帮助我们轻松获取和运行大模型。让我们看看如何安装它吧！✨


### 1.1 下载 ollama

点击下面的链接下载⬇️⬇️⬇️

<Tabs>
  <TabItem value="pc" label="下载安装包">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1aQr48ZtZeQgoKamNNM4PQQ">下载ollama</InstallButton>
      </div>
  </TabItem>
</Tabs>

### 1.2 安装ollama

安装非常简单，找到下载的 `.exe` 文件，双击安装即可。

<div class="center">
<video controls width='600' src="/video/windows-install-ollama.mp4" title="安装ollama的视频"/>
</div>

### 1.3.安装模型
- 1.以管理员身份打开PowerShell（开始菜单 > PowerShell > 右键点击 > 以管理员身份运行），输入以下命令来安装Qwen:7B模型：

``` bash
ollama run qwen2
```
- 顺利的话，你应该可以从ollama的仓库里直接获取模型并安装。例如:
``` bash
pulling manifest
pulling 43f7a214e532...   1% ▕                ▏  63 MB/4.4 GB  7.0 MB/s  10m21s
```

<div class="center">
  <video controls width='600' src="/video/windows-ollama-run-qwen2.mp4" title="安装qwen2的视频"/>
</div>

<details>
  <summary>不能下载模型😵？或者想使用自定义模型🤔️？</summary>
  
  如果遇到不能下载的问题，或者想要运行不在官方仓库中支持的模型，需要稍微复杂一些。


  **1. 首先你需要手动下载模型**
  
  下面的链接是已经配置好的Qwen:7B模型，如果你需要更多其他模型可以联系我们。

  <Tabs>
    <TabItem value="qwen7b" label="Qwen:7B">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://pan.baidu.com/s/10q-l0doiAW6rVGG38lCbUg">下载Qwen:7B模型</InstallButton>
        </div>
    </TabItem>
    <TabItem value="more" label="更多模型">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://docs.docker.com/desktop/install/mac-install/">➡️淘宝店铺⬅️</InstallButton>
        </div>
    </TabItem>
  </Tabs>

  下载完成后，你应该会看到以下文件：
  ```powershell
  Qwen2-7B-F16.gguf     Modelfile
  ```

  **2. 配置 ollama 环境变量**

  为了确保你可以在任意目录下运行 `ollama` 命令，需要先找到 `ollama` 的安装路径，并将其添加到系统的环境变量 `PATH` 中。

  - 打开 PowerShell，输入以下命令来查找 ollama 的路径：

  ```powershell
  Get-Command ollama
  ```

  这会返回 ollama 的完整路径，类似如下的输出：

  ```powershell
  CommandType     Name                    Version    Source
  -----------     ----                    -------    ------
  Application     ollama.exe              0.0.0.0    C:\Users\Administrator\AppData\Local\Programs\Ollama\ollama.exe
  ```

  - 将输出中的路径复制，例如 `C:\Users\Administrator\AppData\Local\Programs\Ollama\`。
  - 打开“系统属性”：
    - 右键点击“此电脑”或“计算机”图标，然后选择“属性”。
    - 在左侧菜单中点击“高级系统设置”
  - 编辑环境变量：
    - 在“系统属性”窗口中，点击“环境变量”按钮。
    - 在“系统变量”部分，找到并选中 PATH，然后点击“编辑”。
  - 添加路径:
    - 在编辑窗口中，点击“新建”，然后粘贴刚才复制的路径。
    - 点击“确定”保存更改。
  - 重启 PowerShell 以应用更改。

  **3. 安装模型**
  
  - 打开PowerShell，进入刚才下载的目录中，例如：
  
  ``` powershell
  cd  C:\BaiduNetdiskDownload\Qwen2-7B-F16
  ```

  - 输入以下命令创建模型:

  ```bash
    ollama create qwen2 -f Modelfile
  ```

  - 运行模型:

  ```bash
    ollama run qwen2
  ```

</details>

:::info 🚩 现在就可以在终端里与大模型进行交互了 ⏬ 
:::

<div class="center">
  <video controls width='600' src="/video/ollama-run-qwen-demo.mp4" title="ollama run qwen2的运行视频"/>
</div>

你也可以在ollama的官网里找到它支持的其他模型⏬⏬⏬

<div class="center">
  <img src='/img/ollama-library.png' style={{width:'600px', height:'600px', marginRight:'12px'}}/>
</div>

:::tip 选择合适的模型
在这个列表里，你可以针对你的机器的内存大小，选择对应的版本，然后复制后面这一条命令就ok，一般来说7b的模型至少需要8G的内存，13b需要16G，70B需要64G内存，大家量力而行，不要过分选择太大的模型，不然跑起来真的非常慢。
:::

这样，你就成功的在Windows上安装并配置好了Ollama🎉🎉🎉

由于模型完全运行在本地，可以在断网的情况下运行，完全不担心数据泄漏的风险👍。

## 2.安装docker

💡💡💡 为了提供更加现代化和用户友好的界面，我们将使用Open WebUI，它可以快速搭建聊天机器人页面并一键集成Ollama。

🐳🐳🐳 不过想要安装Open WebUI，我们需要先安装Docker，简化我们的配置和安装环节。


### 2.1 安装WSL

在安装Docker之前，需要先安装Windows Subsystem for Linux(WSL)。

1. 以管理员身份打开PowerShell（开始菜单 > PowerShell > 右键点击 > 以管理员身份运行）。
2. 输入以下命令启用WSL:
``` powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
运行后，你应该可以看到下面输出：

``` powershell
部署映像服务和管理工具
版本: 10.0.19041.3636

映像版本: 10.0.19045.4529

启用一个或多个功能
[==========================100.0%==========================]
操作成功完成。
```
3. 重启电脑。🔄

4. 安装ubuntu 20.04

这里提供了ubuntu 20.04版本，如果你想要其他的linux发行版本，例如Debian, SUSE，Fedora 可以联系我们
<Tabs>
  <TabItem value="ubuntu_20_04" label="Ubuntu 20.04">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1bEpFmTmk7U1lnpvXj78-xg">下载Ubuntu 20.04</InstallButton>
      </div>
  </TabItem>
  <TabItem value="more" label="更多发行版本">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1QuW5Wqk0OrwBKWtQXZC8_w">➡️淘宝店铺⬅️</InstallButton>
      </div>
  </TabItem>
</Tabs>

下载完毕后，导航到下载内容的文件夹，双击安装，按照提示启动Linux子系统即可。


5. 设置你的Linux用户名和密码

- 当使用WSL完成Linux发行版的安装过程后，使用开始菜单打开该发行版（例如Ubuntu）。系统会要求你为你的Linux发行版创建用户名和密码。

- 这个用户名和密码特定于你安装的每个单独的Linux发行版，与Windows用户名无关。

- 请注意，在输入密码时，屏幕上不会出现任何东西。这称为盲打。你不会看到你正在输入的内容，这是完全正常的。

- 一旦创建了用户名和密码，该帐户将成为该发行版的默认用户，并在启动时自动登录。

- 该帐户将被视为Linux管理员，具有运行`sudo`（超级用户权限）管理命令的能力。

在WSL上运行的每个Linux发行版都有其自己的Linux用户帐户和密码。每次添加发行版、重新安装或重置时，你都必须配置一个Linux用户帐户。

<div class="center">
  <video controls width='600' src="/video/windows-wsl-ubuntu.mp4" title="open webui的运行视频"/>
</div>


<details>
  <summary>建议安装WSL2</summary>
  
#### 1. 启用虚拟化技术
你需要在 BIOS 中启用虚拟化技术。具体步骤因计算机型号不同有所差异，但通常如下：

- **重新启动计算机**并进入 BIOS 设置。进入 BIOS 的方法一般是在启动时按 `F2`, `F10`, `Delete`, 或 `Esc` 键，具体请参考你的电脑手册。
- 在 BIOS 设置中，找到与 `Virtualization` 或 `Intel VT-x`, `AMD-V` 类似的选项，并将其设置为 `Enabled`。
- 保存并退出 BIOS 设置。

#### 2. 启用“虚拟机平台”可选组件
你可以通过以下步骤启用 Windows 的虚拟机平台：

- 打开 **控制面板** > **程序和功能**。
- 选择左侧的 **启用或关闭 Windows 功能**。
- 勾选 **虚拟机平台** 和 **Windows Subsystem for Linux**，然后点击 **确定**。
- 计算机可能会要求重启，重启后生效。

#### 3. 安装 WSL 2
确保 WSL 2 已正确安装：

- 打开命令提示符或 PowerShell，运行以下命令以安装 WSL 2 和“虚拟机平台”组件：

  ```bash
  wsl --install --no-distribution
  ```

  这个命令会安装 WSL 和所需的组件，并自动将 WSL 版本设置为 2。
</details>


### 2.2 下载Docker Desktop

<Tabs>
  <TabItem value="x86_64" label="x86_64芯片">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/17P-JZgxmb1WmTcybiInfcw">下载docker desktop</InstallButton>
      </div>
  </TabItem>
  <TabItem value="arm" label="arm芯片">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1v0h0wNesOBR2G4LLuWJQHA">下载docker desktop</InstallButton>
      </div>
  </TabItem>
</Tabs>

:::tip 如何查看当前 Windows 设备使用的是 x86 还是 ARM 芯片🤔️？

1.打开命令提示符：
  - 按 `Win + R` 打开“运行”对话框，输入 `cmd`，然后按 `Enter`。
2.运行以下命令：
  - 在命令提示符中，输入以下命令并按 Enter：

```bash
echo %PROCESSOR_ARCHITECTURE%
```

  - 输出结果将显示架构类型：
    - `AMD64` 表示 x86（64位）架构。
    - `ARM64` 表示 ARM 架构。
:::

### 2.3 安装Docker Desktop

下载完毕后，找到下载的 .exe 文件双击安装。保持默认选项进行安装。🔧 

### 2.4 启动Docker Desktop

双击Docker图标启动 🐳

### 2.5 验证安装
- 打开一个终端窗口，输入指令`docker --version`确认安装已经完毕，你应该会看到Docker的版本信息，例如：
``` bash
Docker version 20.10.8, build 3967b7d
```

🎉 恭喜你！你已经成功在Windows上安装并配置好了Docker。

下一步就是安装Open WebUI的镜像并运行，让我们继续吧！

## 3.安装open webui

### 3.1 下载open webui的镜像

<Tabs>
  <TabItem value="openwebui" label="open-webui镜像">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1cWxI4ZMB0tIgvbh1F9fGlg">下载open-webui镜像</InstallButton>
      </div>
  </TabItem>
</Tabs>

### 3.2 加载镜像

- 将下载的镜像解压缩
- 打开一个PowerShell终端窗口，输入指令进入到下载目录，例如

``` bash
cd C:\BaiduNetdiskDownload
```

- 执行`ls`，确保文件夹里包含镜像文件，你应该看到包含下面的文件：

``` bash
x86-64-images.tar.gz
```

- 执行下面的命令解压缩镜像文件

```bash
wsl tar -xzvf x86-64-images.tar.gz
```

- 执行`ls`，确保文件里包含解压缩之后的镜像，他应该是`.tar`后缀的，例如
``` bash
ghcr.io_open--webui_open-webui main-amd64.tar
```

:::danger 修改文件名
注意这里因为系统的差异，所以/没有展示，建议对文件名进行修改，例如改为`ghcr.io_open--webui_open-webui-main-amd64.tar`
:::

- 双击Docker Desktop, 以确保Docker处于启动状态

- 使用docker加载镜像，执行`docker load -i ghcr.io_open--webui_open-webui-main-amd64.tar`，你应该可以看到docker开始加载镜像，例如：
``` bash
e0781bc8667f: Loading layer  77.83MB/77.83MB
8f8901bf8c60: Loading layer  9.539MB/9.539MB
5e4b20e815a6: Loading layer  35.33MB/35.33MB
8faf1c09f36d: Loading layer  4.608kB/4.608kB
74ca455fd95a: Loading layer  12.28MB/12.28MB
cd7935de2e1b: Loading layer  2.048kB/2.048kB
5f70bf18a086: Loading layer  1.024kB/1.024kB
e6d5ec2b3cc0: Loading layer   2.56kB/2.56kB
df83a515650b: Loading layer  3.584kB/3.584kB
d4e8ab7113e3: Loading layer  889.4MB/889.4MB
443d9b926388: Loading layer  4.096kB/4.096kB
52c3e995d51d: Loading layer  2.716GB/2.716GB
fe3f18aa73cd: Loading layer  186.2MB/186.2MB
8c81642b8754: Loading layer  53.25kB/53.25kB
cd1664c861dd: Loading layer   5.12kB/5.12kB
55e0318bd043: Loading layer  14.56MB/14.56MB
Loaded image: ghcr.io/open-webui/open-webui:main
```
这样，你就成功将open webui的镜像加载进了docker容器中

### 3.3 运行镜像

继续在终端中输入：
``` bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

:::tip 参数解释

1. docker run

这是 Docker 启动一个新容器的基本命令。

2. -d

这个选项让 Docker 容器以分离模式（detached mode）运行。也就是说，容器会在后台运行，而不会在终端中占用当前会话。

3. -p 3000:8080

这个参数映射端口：

- 3000 是宿主机（你的主机）上的端口。
- 8080 是容器内部的端口。
它的意思是将宿主机的 3000 端口映射到容器的 8080 端口，使外部可以通过 http://localhost:3000 访问容器内的服务（假设服务运行在 8080 端口）。

4. --add-host=host.docker.internal:host-gateway

这个选项添加了一个自定义的 DNS 映射：

- host.docker.internal 是在容器内可以访问宿主机的别名。
- host-gateway 是一个特殊的标识符，让 host.docker.internal 指向宿主机的 IP 地址。这样容器内部可以通过 host.docker.internal 访问宿主机。

5. -v open-webui:/app/backend/data

这个选项挂载一个卷（volume）：

- open-webui 是宿主机上的卷。
- /app/backend/data 是容器内部的路径。
它的意思是在容器内的 /app/backend/data 目录与宿主机的 open-webui 卷挂载一起，以便持久化存储数据，并且在容器重启后数据不会丢失。

6. --name open-webui

这个参数设置容器的名字为 open-webui。设置一个名字便于管理和操作容器，如启动、停止等。

7. --restart always

这个选项设置容器的重启策略：

always 表示无论容器为何退出，Docker 都会自动重启它。这对于需要高可用的服务非常有用。

5. ghcr.io/open-webui/open-webui:main

这是镜像的名称和标签：

- ghcr.io 是 GitHub Container Registry 的域名。
- open-webui/open-webui 是镜像的仓库名称。
- main 是镜像的标签，通常表示主分支或是最新的稳定版本。

综上所述，这条 docker run 命令启动了一个名为 open-webui 的容器，它会在后台运行，将宿主机的 3000 端口映射到容器的 8080 端口，挂载一个持久化存储卷，并且无论何种原因导致容器退出，Docker 都会自动重启这个容器。容器内的服务可以通过 host.docker.internal 访问宿主机。
:::

你应该会看到：

``` bash
% docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

a09512f358ee3c497543b3103878b1f06c89d0c956ba542baf58fb2e067f4727
```

至此，你已经成功安装了open webui的镜像🎉🎉🎉，让我们打开 http://localhost:3000  看看👀

<div class="center">
  <video controls width='600' src="/video/open-webui-demo.mp4" title="open webui的运行视频"/>
</div>

这个Web UI除了具备基本的聊天功能之外，还包含了RAG能力，不管你是网页还是文档，都可以作为参考资料给到大模型，你如果想让大模型读取网页的话，那在链接前面加个‘#’号就行

你如果想让大模型读取文档的话，可以在对话框的位置倒入，在对话框页面输入`#`就会出现已经导入的所有文档，你可以选择一个，或者干脆让大模型把所有文档都作为参考资料.

如果你的要求不太高，那做到这一步就OK了，如果你对知识库想有更多的掌控的话，那再去下载anythingLLM，去做更多进阶的操作。如果你想将ollama设置为服务器模式，在内网搭建AI助手的服务器，那再去看➡️➡️➡️这份指南。
