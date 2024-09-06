---
sidebar_position: 2
---

# 在内网搭建AI助手 🧑‍💻

## 1. 概述

**Open WebUI** 是一个功能强大的自托管 WebUI，支持完全离线操作，适用于多种 **大模型**，包括 **Ollama** 和与 **OpenAI** 兼容的 API。

:::tip 用户角色与数据安全：

- **管理员创建**： 在 Open WebUI 上创建的第一个账户将获得管理员权限，负责用户管理和系统设置。
- **用户注册**： 后续注册的用户状态为 “待处理”，需由管理员批准后才能访问。
- **隐私和数据安全**： 所有数据（包括登录信息）都存储在本地设备上，增强隐私和安全性。
:::

推荐使用 **Docker 🐳** 快速启动，具体操作可参考 [在Linux上安装Docker](../install/install-linux.md#2-安装-docker-)。

:::danger 注意
使用 Docker 安装 Open WebUI 时，请确保在 Docker 命令中包含 `-v open-webui:/app/backend/data`。此步骤至关重要，因为它确保数据库正确挂载，防止数据丢失。
:::

## 2. 安装
### 2.1 使用默认配置安装

- **如果 Ollama 在您的计算机上**，请使用以下命令：

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
- **如果 Ollama 在不同的服务器上**，请使用此命令：

要连接到其他服务器上的 Ollama，请将 `OLLAMA_BASE_URL` 更改为该服务器的 URL：

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
要使用 Nvidia GPU 支持运行 Open WebUI，请使用此命令：
```bash
docker run -d -p 3000:8080 --gpus all --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:cuda
```
### 2.2 仅用 OpenAI API，不使用Ollama安装

如果你不打算用Ollama，而是使用OpenAI的API，请使用此命令
```bash
docker run -d -p 3000:8080 -e OPENAI_API_KEY=your_secret_key -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

### 2.3 安装内置Ollama的OpenWebUI

此安装方法使用一个容器镜像，该镜像将 Open WebUI 与 Ollama 捆绑在一起，通过一个命令即可实现流畅的安装。根据您的硬件配置，选择合适的命令：

- **支持 GPU**： 利用 GPU 资源，运行以下命令：

```bash
docker run -d -p 3000:8080 --gpus=all -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama
```
- **仅 CPU**： 如果您不使用 GPU，请使用此命令：

```bash
docker run -d -p 3000:8080 -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama
```
这两个命令都可以实现 Open WebUI 和 Ollama 的内置安装，确保您能够快速启动并运行。

安装后，您可以在本机通过 http://localhost:3000 访问 Open WebUI。确保你的机器在内网有可以访问的ip地址，那你就可以通过 http://IP地址:3000 访问 Open WebUI。

## 3. 通用配置

`WEBUI_AUTH`
- 类型: bool
- 默认设置: True
- 描述：此设置启用或禁用身份验证。

:::danger 注意
如果设置为 False，将禁用 Open WebUI 实例的身份验证。但请注意，禁用身份验证仅适用于没有任何已注册用户的全新安装。如果已经存在注册用户，则无法直接禁用身份验证。如果您打算禁用 WEBUI_AUTH，请确保数据库中没有用户。
:::

`WEBUI_NAME`
- 类型: str
- 默认值: Open WebUI
- 描述：设置主 WebUI 名称。如果被覆盖，将附加 (Open WebUI)。

`WEBUI_URL`
- 类型: str
- 默认值: http://localhost:3000
- 描述：指定 Open WebUI 可访问的 URL。目前用于搜索引擎支持。

`DATA_DIR`
- 类型: str
- 默认值: ./data
- 描述：指定数据存储的基本目录，包括上传、缓存、向量数据库等。

`FRONTEND_BUILD_DIR`
- 类型: str
- 默认值: ../build
- 描述：指定构建的前端文件的位置。

`STATIC_DIR`
- 类型: str
- 默认值: ./static
- 描述：指定静态文件的目录，如 favicon。

`CUSTOM_NAME`
- 类型: str
- 描述：设置 WEBUI_NAME，但会从 api.openwebui.com 获取元数据。

`ENABLE_SIGNUP`
- 类型: bool
- 默认值: True
- 描述：切换用户账户创建功能。

`ENABLE_LOGIN_FORM`
- 类型: bool
- 默认值: True
- 描述：切换电子邮件、密码、登录和 "or" 元素（仅在 ENABLE_OAUTH_SIGNUP 设置为 true 时）。

:::tips 注意
只有在 ENABLE_OAUTH_SIGNUP 也被使用并设置为 True 时，才应将此设置为 False。否则，无法登录。
:::

`ENABLE_RAG_WEB_LOADER_SSL_VERIFICATION`
- 类型: bool
- 默认值: True
- 描述：绕过 RAG 对网站的 SSL 验证。

`DEFAULT_MODELS`
- 类型: str
- 描述：设置默认语言模型。

`DEFAULT_USER_ROLE`
- 类型: str (枚举: pending, user, admin)
- 选项：

    - pending - 新用户的账户状态为待定，直到管理员手动激活。
    - user - 新用户会自动激活，拥有普通用户权限。
    - admin - 新用户会自动激活，拥有管理员权限。
- 默认值: pending
- 描述：设置分配给新用户的默认角色。

`USER_PERMISSIONS_CHAT_DELETION`
- 类型: bool
- 默认值: True
- 描述：切换用户删除聊天的权限。

`ENABLE_MODEL_FILTER`
- 类型: bool
- 默认值: False
- 描述：切换语言模型过滤功能。

`MODEL_FILTER_LIST`
- 类型: str
- 描述：设置语言模型过滤列表，使用分号分隔。
- 示例：llama3:instruct;gemma:instruct

`ENABLE_ADMIN_EXPORT`
- 类型: bool
- 默认值: True
- 描述：控制管理员用户是否可以导出数据。

`ENABLE_COMMUNITY_SHARING`
- 类型: bool
- 默认值: True
- 描述：控制用户是否显示共享到社区按钮。

`WEBUI_BUILD_HASH`
- 类型: str
- 默认值: dev-build
- 描述：用于标识构建版本的 Git SHA。

## 4. Ollama配置

`ENABLE_OLLAMA_API`
- 类型: bool
- 默认值: true
- 描述：启用 Ollama API 的使用。

`OLLAMA_BASE_URL`
- 类型: str
- 默认值: http://localhost:11434
- Docker 默认值：

    - 如果设置了 K8S_FLAG：http://ollama-service.open-webui.svc.cluster.local:11434
    - 如果 USE_OLLAMA_DOCKER=true：http://localhost:11434
    - 否则：http://host.docker.internal:11434
- 描述：配置 Ollama 后端的 URL。

`OLLAMA_BASE_URLS`
- 类型: str
- 描述：配置负载均衡的 Ollama 后端主机，使用分号分隔。参见 `OLLAMA_BASE_URL` 。优先于 `OLLAMA_BASE_URL` 。

`K8S_FLAG`
- 类型: bool
- 描述：如果设置，假定为 Helm chart 部署，并将 OLLAMA_BASE_URL 设置为 `http://ollama-service.open-webui.svc.cluster.local:11434`。

`USE_OLLAMA_DOCKER`
- 类型: bool
- 默认值: False
- 描述：构建包含捆绑的 Ollama 实例的 Docker 镜像。

## 5. OpenAI API配置

`ENABLE_OPENAI_API`
- 类型: bool
- 默认值: true
- 描述：启用 OpenAI API 的使用。

`OPENAI_API_KEY`
- 类型: str
- 描述：设置 OpenAI API 密钥。

`OPENAI_API_BASE_URL`
- 类型: str
- 默认值: `https://api.openai.com/v1`
- 描述：配置 OpenAI 基础 API 的 URL。

`OPENAI_API_BASE_URLS`
- 类型: str
- 描述：支持负载均衡的 OpenAI 基础 API URLs，使用分号分隔。
- 示例：`http://host-one:11434;http://host-two:11434`

`OPENAI_API_KEYS`
- 类型: str
- 描述：支持多个 OpenAI API 密钥，使用分号分隔。
- 示例：`sk-124781258123;sk-4389759834759834`

## 6. 知识库RAG配置 

`DOCS_DIR`
- 类型: `str`  
- 默认值: `${DATA_DIR}/docs`  
- 描述：指定扫描文档的目录，在触发时将这些文档添加到 RAG 数据库中。

`CHROMA_TENANT`
- 类型: `str`  
- 默认值: `default_tenant`  
- 描述：设置 ChromaDB 用于 RAG 嵌入的数据库。

`CHROMA_DATABASE`
- 类型: `str`  
- 默认值: `default_database`  
- 描述：设置 ChromaDB 中用于 RAG 嵌入的数据库。

`CHROMA_HTTP_HOST` 
- 类型: `str`  
- 描述：指定远程 ChromaDB 服务器的主机名。如果未设置，则使用本地 ChromaDB 实例。

`CHROMA_HTTP_PORT`
- 类型: `int`  
- 默认值: `8000`  
- 描述：指定远程 ChromaDB 服务器的端口。

`CHROMA_HTTP_HEADERS`
- 类型: `str`  
- 描述：要包含在每个 ChromaDB 请求中的 HTTP 头列表，以逗号分隔。  
- 示例：`Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI.`

`CHROMA_HTTP_SSL`
- 类型: `bool`  
- 默认值: `False`  
- 描述：控制是否为 ChromaDB 服务器连接使用 SSL。

`RAG_TOP_K`
- 类型: `int`  
- 默认值: `5`  
- 描述：设置使用 RAG 时要考虑的默认结果数量。

`RAG_RELEVANCE_THRESHOLD`
- 类型: `float`  
- 默认值: `0.0`  
- 描述：设置用于重新排序时文档的相关性阈值。

`ENABLE_RAG_HYBRID_SEARCH`
- 类型: `bool`  
- 默认值: `False`  
- 描述：启用 BM25 + ChromaDB 的混合搜索，并使用 `sentence_transformers` 模型进行重新排序。

`ENABLE_RAG_WEB_LOADER_SSL_VERIFICATION`
- 类型: `bool`  
- 默认值: `True`  
- 描述：启用浏览网页时的 TLS 证书验证以用于 RAG。

`RAG_EMBEDDING_ENGINE`
- 类型: `str` (枚举: `(空用于本地模型)`, `ollama`, `openai`)  
- 选项：  
    - `(空)` - 使用本地模型进行嵌入。  
    - `ollama` - 使用 Ollama API 进行嵌入。  
    - `openai` - 使用 OpenAI API 进行嵌入。  
- 描述：选择用于 RAG 的嵌入引擎。

`PDF_EXTRACT_IMAGES`
- 类型: `bool`  
- 默认值: `False`  
- 描述：在加载文档时使用 OCR 从 PDF 中提取图像。

`RAG_EMBEDDING_MODEL`
- 类型: `str`  
- 默认值: `sentence-transformers/all-MiniLM-L6`  
- 描述：设置嵌入使用的模型。在本地，使用 Sentence-Transformer 模型。

`RAG_EMBEDDING_MODEL_AUTO_UPDATE`
- 类型: `bool`  
- 默认值: `False`  
- 描述：切换 Sentence-Transformer 模型的自动更新。

`RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`
- 类型: `bool`  
- 默认值: `False`  
- 描述：确定是否允许自定义模型使用它们自己的模型文件定义在 Hub 上。

`RAG_TEMPLATE`
- 类型: `str`  
- 默认值：  
```
使用以下上下文作为您的学习知识，放在 `<context></context>` XML 标签内。  
<context>  
    [context]  
</context>

回答用户时：  
- 如果不知道，就说不知道。  
- 如果不确定，不知道时，询问澄清。  
避免提到您从上下文中获取信息。  
并根据用户问题的语言回答。

根据上下文信息，回答查询。  
查询：[query]
```  
- 描述：在聊天完成时注入 RAG 文档时使用的模板。

`RAG_RERANKING_MODEL`
- 类型: `str`  
- 描述：设置用于重新排序结果的模型。在本地，使用 Sentence-Transformer 模型。

`RAG_RERANKING_MODEL_AUTO_UPDATE`
- 类型: `bool`  
- 默认值: `False`  
- 描述：切换重新排序模型的自动更新。

`RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`
- 类型: `bool`  
- 默认值: `False`  
- 描述：确定是否允许自定义模型使用它们自己的模型文件定义在 Hub 上用于重新排序。

`RAG_OPENAI_API_BASE_URL`
- 类型: `str`  
- 默认值: `${OPENAI_API_BASE_URL}`  
- 描述：设置用于 RAG 嵌入的 OpenAI 基础 API URL。

`RAG_OPENAI_API_KEY`
- 类型: `str`  
- 默认值: `${OPENAI_API_KEY}`  
- 描述：设置用于 RAG 嵌入的 OpenAI API 密钥。

`RAG_EMBEDDING_OPENAI_BATCH_SIZE`
- 类型: `int`  
- 默认值: `1`  
- 描述：设置 OpenAI 嵌入的批处理大小。

`ENABLE_RAG_LOCAL_WEB_FETCH`
- 类型: `bool`  
- 默认值: `False`  
- 描述：启用 RAG 的本地网页抓取。启用此功能可能会允许针对本地网络资源的服务器端请求伪造攻击。

`CHUNK_SIZE`
- 类型: `int`  
- 默认值: `1500`  
- 描述：设置用于嵌入的文档块大小。

`CHUNK_OVERLAP`
- 类型: `int`  
- 默认值: `100`  
- 描述：指定块之间应有多少重叠。