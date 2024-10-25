@echo off
:: 检查是否以管理员身份运行
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo 请求管理员权限...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: 检测剩余内存
for /f "tokens=2 delims==" %%a in ('wmic OS get FreePhysicalMemory /value') do set FreeMemKB=%%a
set /a FreeMemGB=%FreeMemKB% / 1024 / 1024

:: 如果剩余内存小于5GB，提示不能继续安装
if %FreeMemGB% LSS 5 (
    echo 内存不足，剩余内存为 %FreeMemGB% GB，安装无法继续。
    echo msgbox "内存不足。系统剩余内存为 %FreeMemGB% GB，需要至少 5 GB 才能继续安装。" ^& vbCrLf ^& "请释放一些内存或升级硬件后重试。", vbCritical, "内存检测失败" > "%temp%\memprompt.vbs"
    cscript //nologo "%temp%\memprompt.vbs"
    del "%temp%\memprompt.vbs"
    exit /b
) else (
    echo 剩余内存为 %FreeMemGB% GB，满足安装要求。
)

pause
