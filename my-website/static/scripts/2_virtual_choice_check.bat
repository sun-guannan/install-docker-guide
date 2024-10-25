@echo off
:: 检查是否以管理员身份运行
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo 请求管理员权限...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

set logfile=log.txt
set all_enabled=true

rem 创建或追加到 log.txt 文件
echo ⚡ 系统组件检测 ⚡ >> %logfile%
echo. >> %logfile%

rem 检查并启用 "虚拟机平台"
echo 检查虚拟机平台是否启用... >> %logfile%
dism /online /get-features | findstr /i "VirtualMachinePlatform" > nul
if %errorlevel%==0 (
    echo 虚拟机平台已启用。 >> %logfile%
) else (
    echo 虚拟机平台未启用。正在启用虚拟机平台... >> %logfile%
    dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    echo 虚拟机平台已成功启用。 >> %logfile%
    set all_enabled=false
)

echo. >> %logfile%

rem 检查并启用 "适用于 Linux 的 Windows 子系统 (WSL)"
echo 检查 WSL 是否启用... >> %logfile%
dism /online /get-features | findstr /i "Microsoft-Windows-Subsystem-Linux" > nul
if %errorlevel%==0 (
    echo WSL 已启用。 >> %logfile%
) else (
    echo WSL 未启用。正在启用 WSL... >> %logfile%
    dism /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    echo WSL 已成功启用。 >> %logfile%
    set all_enabled=false
)

echo. >> %logfile%

rem 如果两个组件都启用，则提示已启用
if "%all_enabled%"=="true" (
    echo 所有组件都已启用。 >> %logfile%
    echo 检测完成。 >> %logfile%
) else (
    rem 如果有组件需要重启，弹窗提示
    echo 需要重新启动系统才能生效。 >> %logfile%
    
    rem 弹出确认框，询问用户是否立即重启
    echo msgbox "组件已启用，需要重新启动系统才能生效。是否立即重新启动计算机？",vbYesNo+vbQuestion,"重启确认" > %temp%\prompt.vbs
    cscript //nologo %temp%\prompt.vbs > nul
    set /p userChoice=<nul
    del %temp%\prompt.vbs

    rem 用户选择处理
    if %userChoice%==6 (
        echo 用户选择了重启。 >> %logfile%
        shutdown /r /t 0
    ) else (
        echo 用户选择了稍后重启。 >> %logfile%
    )
)

pause
