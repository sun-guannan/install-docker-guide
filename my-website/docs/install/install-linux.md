---
sidebar_position: 3
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Linux 安装指南

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


欢迎来到《Linux 安装指南》！🚀 在这里，你将学会如何在 Linux 上安装 **Ollama** 、 **Open WebUI** 以及 **AnythingLLM** 。让我们开始吧！🎉

:::info   ⚡️⚡️⚡️ 系统要求 ⚡️⚡️⚡️

- 最少8GB内存
- 请确保防火墙的兼容性，可能会使用的端口号有3000, 11434

:::

:::danger   🔥 联系我们 🔥
 
欢迎来淘宝店联系我们的客服
- 获取网盘提取密码
- 寻求人工指导

:::

## 1. 安装 Ollama

<img src='/img/ollama.png' style={{width:'40px', height:'60px', marginRight:'12px'}}/>ollama可以帮助我们非常方便的获取和运行大模型。


安装 Ollama 非常简单，可以按照以下步骤进行：

### 1.1 安装 Ollama

通过运行以下单行命令来安装Ollama：

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

<details>
  <summary>不能访问网络🤔️？手动安装👏</summary>
  
  如果遇到不能下载的问题，就要稍微麻烦一些。

  **1. 手动下载ollama**

  <Tabs>
    <TabItem value="ollama-linux-x86" label="x86_64">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://pan.baidu.com/s/1h0JlkT9pDUCc9FafxwhaBQ">下载 Ollama</InstallButton>
        </div>
    </TabItem>
  </Tabs>

  下载完成后，添加执行权限：
  ```bash
  chmod +x ollama-linux-amd64
  ```

  移动文件到系统路径
  ```bash
  sudo mv ollama-linux-amd64 /usr/bin/ollama
  ```
  这时候执行 `ollama` 可以验证是否安装，你应该可以看到：
  ```bash
  Usage:
  ollama [flags]
  ollama [command]

  Available Commands:
    serve       Start ollama
    create      Create a model from a Modelfile
    show        Show information for a model
    run         Run a model
    pull        Pull a model from a registry
    push        Push a model to a registry
    list        List models
    ps          List running models
    cp          Copy a model
    rm          Remove a model
    help        Help about any command

  Flags:
    -h, --help      help for ollama
    -v, --version   Show version information

  Use "ollama [command] --help" for more information about a command.
  ```

  **2. 将 Ollama 添加为启动服务**
  
  创建一个 Ollama 用户:
  
  ```bash
  sudo useradd -r -s /bin/false -m -d /usr/share/ollama ollama
  ```
  
  创建一个服务文件`/etc/systemd/system/ollama.service`：

  ```bash
  [Unit]
  Description=Ollama Service
  After=network-online.target

  [Service]
  ExecStart=/usr/bin/ollama serve
  User=ollama
  Group=ollama
  Restart=always
  RestartSec=3

  [Install]
  WantedBy=default.target
  ```

  然后启动服务：

  ```bash
  sudo systemctl daemon-reload
  sudo systemctl enable ollama
  ```

  **4. （可选）添加Nvidia GPU或者AMD Radeon GPU？**

  如果你已经有Nvidia或者AMD的GPU，确保已经成功安装驱动，遇到问题，可以联系我们
  <Tabs>
    <TabItem value="install-driver" label="安装GPU驱动">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://item.taobao.com/item.htm?ft=t&id=831508489260">➡️淘宝店铺⬅️</InstallButton>
        </div>
    </TabItem>
  </Tabs>

  **5. 启动Ollama**

  使用systemed启动Ollama
  ```bash
  sudo systemctl start ollama
  ```

</details>

### 1.2 安装模型
- 启动一个终端窗口，输入以下命令来安装 **qwen:7b** 模型
```bash
ollama run qwen2
```
- 顺利的话，你应该可以从ollama的仓库里直接获取模型并安装。例如:
```bash
pulling manifest
pulling 43f7a214e532...   1% ▕                ▏  63 MB/4.4 GB  7.0 MB/s  10m21s
```

<details>
  <summary>不能下载模型😵？或者想使用自定义模型🤔️？</summary>
  
  如果遇到不能下载的问题，或者想要运行不在官方仓库里支持的模型，就要稍微麻烦一些。

  **1. 首先你需要手动下载模型**
  
  下面的链接是已经配置好的qwen7b模型，如果你需要更多其他模型可以联系我们。

  <Tabs>
    <TabItem value="qwen7b" label="qwen:7b">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://pan.baidu.com/s/10MgXJTzzCW_jcD3DpMwzJQ">下载 qwen:7b 模型</InstallButton>
        </div>
    </TabItem>
    <TabItem value="more" label="更多模型">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
          <InstallButton to="https://item.taobao.com/item.htm?ft=t&id=831508489260">➡️淘宝店铺⬅️</InstallButton>
        </div>
    </TabItem>
  </Tabs>
  
  下载完成应该包含一个`Modelfile`文件和一个后缀名为`gguf`的模型文件

  **2. 安装模型**
  
  - 打开一个终端窗口，进入刚才下载的目录中，例如：
  
  ``` bash
  cd ~/Downloads/Qwen2-7B-F16
  ```
  - 输入执行`ls`，确保文件在该路径中，你应该看到：
  ``` bash
  Qwen2-7B-F16.gguf     Modelfile
  ```
  - 创建模型，执行
  ```bash
    ollama create qwen2 -f Modelfile
  ```
  
  这里的qwen2是自定义的模型名称，下面运行时还会用到

  - 运行模型，执行
  ```bash
    ollama run qwen2
  ```

</details>

:::info 🚩🚩🚩 现在就可以在终端里与大模型进行交互了 ⏬⏬⏬⏬
:::

<video controls width='600' src="/video/ollama-run-qwen-demo.mp4" title="ollama run qwen2的运行视频"/>

你也可以在ollama的官网里找到它支持的其他模型⏬⏬⏬

<div class="center">
  <img src='/img/ollama-library.png' style={{width:'600px', height:'600px', marginRight:'12px'}}/>
</div>

:::tip 选择合适的模型
在这个列表里，你可以针对你的机器的内存大小，选择对应的版本，然后复制后面这一条命令就ok，一般来说7b的模型至少需要8G的内存，13b需要16G，70B需要64G内存，大家量力而行，不要过分选择太大的模型，不然跑起来真的非常慢。
:::

这样，你就成功的在Linux上安装并配置好了Ollama🎉🎉🎉

由于模型完全运行在本地，可以在断网的情况下运行，完全不担心数据泄漏的风险👍。

## 2. 安装 Docker 🐳

⚡️⚡️⚡️ 我们显然不满足仅仅使用命令行交互，这实在太原始了，我们还是想要有更现代，更好用的交互界面。

💥💥💥 Open WebUI可以快速的搭建聊天机器人的页面，而且可以一键集成ollama

🐳🐳🐳 不过想要安装Open WebUI，我们需要先安装Docker，简化我们的配置和安装环节。

### 2.1 卸载旧版本

运行以下命令卸载所有冲突的软件包：
```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### 2.2 下载Docker Engine

下面提供了针对ubuntu-22.04-x86_64版本的docker engine安装包，如果需要其他版本或者芯片类型的安装包，可以联系我们
<Tabs>
  <TabItem value="ubuntu" label="ubuntu-22.04-x86_64">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1UpNzWjIYOB_lW-09dIMRkQ">下载docker engine</InstallButton>
      </div>
  </TabItem>
  <TabItem value="more" label="更多版本">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1LRS7h248w4iGgLpgoKG6kw/">➡️淘宝店铺⬅️</InstallButton>
      </div>
  </TabItem>
</Tabs>

### 2.2 安装Docker Engine

将文件夹内的所有文件都下载完毕后，安装这些`.deb`文件
```bash
sudo dpkg -i ./containerd.io_1.7.20-1_amd64.deb \
  ./docker-ce_27.1.2-1~ubuntu.22.04~jammy_amd64.deb \
  ./docker-ce-cli_27.1.2-1~ubuntu.22.04~jammy_amd64.deb \
  ./docker-buildx-plugin_0.16.2-1~ubuntu.22.04~jammy_amd64.deb \
  ./docker-compose-plugin_2.29.1-1~ubuntu.22.04~jammy_amd64.deb
```
Docker 守护进程会自动启动。

### 2.3 验证安装

输入指令`docker --version`确认安装已经完毕，你应该会看到Docker的版本信息，例如：
``` bash
Docker version 20.10.8, build 3967b7d
```

这样，你就成功的在Linux上安装并配置好了docker👏👏👏

下一步就是安装open-webui的镜像并运行

## 3. 安装Open Webui

### 3.1 下载 Open Webui 的镜像

<Tabs>
  <TabItem value="openwebui" label="Open WebUI 镜像">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor:'#EFEFEF', paddingTop:'12px', paddingBottom:'12px', borderRadius: '12px' }}>
        <InstallButton to="https://pan.baidu.com/s/1Zd0QrMCjcr07lLqT3B92Ng">下载 Open WebUI 镜像</InstallButton>
      </div>
  </TabItem>
</Tabs>

### 3.2 加载镜像

- 打开一个终端窗口，输入指令进入到下载目录，例如

``` bash
cd ~/Download/docker-images-openwebui-tar
```

- 执行`ls`，确保文件夹里包含镜像文件，你应该看到
``` bash
docker-images-tar.zip
```
- 执行下面的命令解压缩镜像文件
```bash
unzip docker-images-tar.zip
tar -xzvf x86-64-images.tar.gz
```

- 执行`ls`，确保文件里包含解压缩之后的镜像，他应该是`.tar`后缀的，例如
``` bash
ghcr.io_open--webui_open-webui/main-amd64.tar
```

- 使用docker加载镜像，执行`sudo docker load -i ghcr.io_open--webui_open-webui\:main-amd64.tar`，你应该可以看到docker开始加载镜像，例如：
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
```bash
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

```bash
% docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

a09512f358ee3c497543b3103878b1f06c89d0c956ba542baf58fb2e067f4727
```

至此，你已经成功安装了open webui的镜像🎉🎉🎉，让我们执行 `curl http://127.0.0.1:3000` 可以看到页面的一些内容，如果这个服务器部署在内网或者外网，可以访问的话，就可以用客户机访问看看👀

<div class="center">
  <video controls width='600' src="/video/open-webui-demo.mp4" title="open webui的运行视频"/>
</div>

这个**Open WebUI** 除了具备基本的聊天功能之外，还 **RAG**（检索增强生成）能力，不管你是网页还是文档，都可以作为参考资料给到大模型，你如果想让大模型读取网页的话，那在链接前面加个‘#’号就行

你如果想让大模型读取文档的话，可以在对话框的位置倒入，在对话框页面输入`#`就会出现已经导入的所有文档，你可以选择一个，或者干脆让大模型把所有文档都作为参考资料.

如果你的要求不太高，那做到这一步就OK了，如果你对知识库想有更多的掌控的话，那再去下载anythingLLM，去做更多进阶的操作:

 - [使用AnythingLLM配置本地数据库](../reference/anythingllm.md)

如果你想将ollama设置为服务器模式，在内网搭建AI助手的服务器，那再去看这份指南:

 - [在内网搭建AI机器人助手](../reference/ollama-openwebui-private-server.md)
