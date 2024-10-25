@echo off
:: 获取脚本所在的目录
set scriptDir=%~dp0

:: 将Windows路径转换为WSL路径
for /f "tokens=*" %%i in ('wsl wslpath "%scriptDir%"') do set wslDir=%%i

:: 使用WSL打开Ubuntu，进入目标目录并执行指定的命令
wsl -d Ubuntu -e bash -c "
cd '%wslDir%';
sudo unzip docker-images-openwebui-tar.zip;
sudo tar -xzvf x86-64-images.tar.gz;
sudo docker load -i ghcr.io_open--webui_open-webui:main-amd64.tar;
sudo docker run -d --network=host -v open-webui:/app/backend/data -e OLLAMA_BASE_URL=http://127.0.0.1:11434 --name open-webui --restart always ghcr.io/open-webui/open-webui:main"

pause
