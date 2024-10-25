@echo off
:: 检查是否以管理员身份运行
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo 请求管理员权限...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

set logfile=install_log.txt

rem 创建或追加到 log.txt 文件
echo ⚡ 开始安装 Ubuntu Appx 包 ⚡ >> %logfile%
echo. >> %logfile%

rem 检查 Appx 包是否已安装
echo 正在检查 Ubuntu Appx 包是否已安装... >> %logfile%
powershell -Command "Get-AppxPackage -Name CanonicalGroupLimited.UbuntuonWindows" >> %logfile% 2>&1
if %errorlevel%==0 (
    echo Ubuntu Appx 包已安装，无需重新安装。 >> %logfile%
) else (
    rem 如果 Appx 包未安装，则进行安装
    echo Ubuntu Appx 包未安装，开始安装... >> %logfile%
    powershell -Command "Add-AppxPackage -Path '%~dp0CanonicalGroupLimited.UbuntuonWindows_2004.2021.825.0.AppxBundle'" >> %logfile% 2>&1
    if %errorlevel%==0 (
        echo Ubuntu Appx 包安装成功。 >> %logfile%
    ) else (
        echo Ubuntu Appx 包安装失败，错误代码：%errorlevel%。 >> %logfile%
        exit /b %errorlevel%
    )
)

rem 安装完成后启动 Ubuntu 并执行设置用户的 bash 脚本
echo. >> %logfile%
echo 安装完成，正在启动 Ubuntu 并设置默认用户名和密码... >> %logfile%
start ubuntu run bash -c "echo 'admin:Admin@12345' | sudo chpasswd && sudo usermod -aG sudo admin" >> %logfile% 2>&1

pause
