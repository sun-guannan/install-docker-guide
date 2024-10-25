@echo off
:: 获取脚本所在的目录
set scriptDir=%~dp0

:: 将Windows路径转换为WSL路径
for /f "tokens=*" %%i in ('wsl wslpath "%scriptDir%"') do set wslDir=%%i

:: 使用WSL打开Ubuntu，切换到脚本所在的目录并执行指定的命令
wsl -d Ubuntu -e bash -c "cd '%wslDir%'; chmod +x ollama-linux-amd64; sudo mv ollama-linux-amd64 /usr/bin/ollama; ollama serve"

pause
