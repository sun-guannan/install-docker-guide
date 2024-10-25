@echo off
:: 获取脚本所在的目录
set scriptDir=%~dp0

:: 将Windows路径转换为WSL路径
for /f "tokens=*" %%i in ('wsl wslpath "%scriptDir%"') do set wslDir=%%i

:: 使用WSL打开Ubuntu，执行安装unzip，解压文件，并复制到指定目录
wsl -d Ubuntu -e bash -c "
sudo apt-get install -y unzip;
cd '%wslDir%';
sudo unzip -o models-qwen2.5-7b.zip -d models-qwen2.5-7b;
sudo cp -r -f models-qwen2.5-7b/* /usr/share/ollama/.ollama/
ollama run qwen2.5"

pause
