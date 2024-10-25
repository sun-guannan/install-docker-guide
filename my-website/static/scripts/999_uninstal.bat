@echo off
:: 停止所有正在运行的WSL实例
echo Stopping all running WSL instances...
wsl --shutdown

:: 卸载Ubuntu分发
echo Uninstalling Ubuntu WSL instance...
wsl --unregister Ubuntu

:: 检查是否成功卸载
if %errorlevel%==0 (
    echo Ubuntu has been successfully uninstalled from WSL.
) else (
    echo Failed to uninstall Ubuntu. Please check if the distribution name is correct.
)

pause
