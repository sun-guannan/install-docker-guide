@echo off
:: 获取脚本所在的目录
set scriptDir=%~dp0

:: 将Windows路径转换为WSL路径
for /f "tokens=*" %%i in ('wsl wslpath "%scriptDir%"') do set wslDir=%%i

:: 使用WSL打开Ubuntu，进入目标目录并执行dpkg命令
wsl -d Ubuntu -e bash -c "
cd '%wslDir%/ubuntu-20.04/x86_64';
sudo dpkg -i ./containerd.io_1.7.22-1_amd64.deb \
  ./docker-ce-cli_27.3.1-1~ubuntu.20.04~focal_amd64.deb \
  ./docker-ce_27.3.1-1~ubuntu.20.04~focal_amd64.deb \
  ./docker-buildx-plugin_0.17.1-1~ubuntu.20.04~focal_amd64.deb \
  ./docker-compose-plugin_2.29.7-1~ubuntu.20.04~focal_amd64.deb;
sudo usermod -aG docker $USER"

:: 关闭当前Ubuntu窗口并重新打开一个新窗口，执行dockerd
wsl -d Ubuntu -e bash -c "sudo shutdown now"
timeout /t 3

:: 新开一个Ubuntu窗口并执行dockerd
wsl -d Ubuntu -e bash -c "sudo dockerd"

pause
