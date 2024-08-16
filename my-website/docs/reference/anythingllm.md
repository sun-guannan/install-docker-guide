---
sidebar_position: 3
---

# 设置本地知识库

## 1.安装anythingLLM


现在的AI大模型层出不穷，能力越来越强，但是在回答的专业性，数据的私密性上还不够完善，现在我们要创建本地知识库，让AI回答更加专业。

创建本地知识库，需要依赖向量数据库RAG技术。向量模型的作用是将文档信息转为特征向量，并存储在向量数据库中。相比较于常见的精确匹配，向量数据库擅长模糊匹配，例如我们搜索“小狗”，传统搜索很难命中“柯基”，“泰迪”等等，向量数据库则具备这样的能力。

通过向量模型，把文档信息转为向量数据库，这样我们在向大模型提问前，会先经过向量数据库查询相关信息，然后携带信息一起向大模型提问，这样看起来就像是大模型记住了我们提供的所有文档信息。

以前搭建这样的工具链还是比较复杂的，但是现在我们有方便的工具来帮助我们完成这一过程，那就是anythingLLM。

通过下面的链接下载anythingLLM安装包：


下载完毕后就像其他软件一样双击安装即可。


<video controls width='800' src="/video/001-hello-llama3.mp4" title="补充ollama run qwen的运行视频"/>

//todo: 补充anythingLLM的使用视频


安装完成之后，打开anythingLLM，点击左下角的设置，然后在LLM Preference里打开ollama，如果你的ollama已经在运行状态，可以看到他在监听默认的11434端口，这里保持默认不去修改，设置好模型和最大token后记得保存。然后选择Embedding Model，依然选择Ollama，这里的向量模型选择nomic，这里的最大chunk lengh设置为512，一般设置在256～512之间，表示文本被划分的颗粒度。接下来我们选择vector database，可以选择默认的lanceDB作为向量数据库。

<video controls width='800' src="/video/001-hello-llama3.mp4" title="补充ollama run qwen的运行视频"/>

//todo: 补充anythingLLM的存储数据库原理

我们来捋一下原理，想要和你的文档进行对话，第一步你需要创建向量数据库。将你的文档上传至anythingLLM，然后anythingLLM会调用nomic将这些文件进行向量化，向量转化之后的数据会被存放进lanceDB或者其他你配置的向量数据库中。


<video controls width='800' src="/video/001-hello-llama3.mp4" title="补充ollama run qwen的运行视频"/>

//todo: 补充anythingLLM的使用原理


现在我们已经将文档全面向量化，现在我们向大模型提问，大模型将会带着你的问题去向量数据库中搜索相关内容，再结合搜索到的内容回答给出答案。

<video controls width='800' src="/video/001-hello-llama3.mp4" title="补充ollama run qwen的运行视频"/>

//todo: 补充anythingLLM的操作视频


下面我们来操作anythingLLM，我们需要创建一个新的workspace工作空间。创建一个新的聊天，我们试试输入“你好”。然后再创建一个新的聊天窗口，在这个窗口里上传文档


<video controls width='800' src="/video/001-hello-llama3.mp4" title="补充ollama run qwen的运行视频"/>

//todo: 补充anythingLLM的操作视频

这里我上传的是《2023年AI大模型市场研究报告》，这篇报告详细介绍了2023年通用大模型的发展情况
下面我将导入这篇文档，选中，然后导入到workspace，记得点击保存。你需要等待一会儿，时长取决于你使用的是cpu还是gpu。上传完毕后，我们点击设置，再点击ChatSetting，将ChatMode改为Query，表示我们使用向量数据库里的知识，点击update workspace，保存生效，现在我们尝试向他提问，“2022年中国人工智能的市场行业规模有多大？”，点击show citations，可以看到相应数据的出处。

## 2.进阶使用，搭建私域的AI助手


