---
sidebar_position: 3
---

# 常见问题 (FAQ)

## Q: 如何在 Linux 应用中使用 Windows 文件？

WSL 的一个主要优势是可以轻松地通过 Windows 和 Linux 应用或工具访问文件。WSL 会将你的 Windows 驱动器装载到 Linux 分发版中的 `/mnt/<drive>` 文件夹下。

例如，你可以通过以下命令访问 C: 驱动器上的文件：

```bash
cd /mnt/c
```

## Q: 安装失败并出现错误 0x80070003

- 适用于 Linux 的 Windows 子系统只能在系统驱动器（通常是 C: 驱动器）中运行。 请确保分发版存储在系统驱动器上：
    - 在 Windows 10 上打开“设置”->“系统”->“存储”->“更多存储设置: 更改新内容的保存位置”用于在 C: 驱动器中安装应用的系统设置屏幕截图 (Windows 10)
    - 在 Windows 11 上打开“设置”->“系统”->“存储”->“高级存储设置”->“新内容的保存位置”用于在 C: 驱动器中安装应用的系统设置屏幕截图 (Windows 11)

<img src='/img/80070003-error-win10-setting.png' style={{width:'700px', height:'300px', marginRight:'12px'}}/>

    - 在 Windows 11 上打开“设置”->“系统”->“存储”->“高级存储设置”->“新内容的保存位置”

<img src='/img/80070003-error-win11-setting.png' style={{width:'700px', height:'300px', marginRight:'12px'}}/>

## Q: WslRegisterDistribution 失败并出现错误 0x8007019e

- 未启用“适用于 Linux 的 Windows 子系统”可选组件：
- 打开“控制面板”->“程序和功能”->“打开或关闭 Windows 功能”-> 选中“适用于 Linux 的 Windows 子系统”

## Q: 安装失败，出现错误 0x80070003 或错误 0x80370102

- 请确保在计算机的 BIOS 内已启用虚拟化。 有关如何执行此操作的说明因计算机而异，并且很可能在 CPU 相关选项下。
- WSL2 要求 CPU 支持二级地址转换 (SLAT) 功能，后者已在 Intel Nehalem 处理器（Intel Core 第一代）和 AMD Opteron 中引入。 即使成功安装了虚拟机平台，旧版 CPU（例如 Intel Core 2 Duo）也无法运行 WSL2。

## Q: 安装失败，错误提示0x800701bc

- 运行以下命令以更新 WSL：

```powershell
wsl --update
```
