@echo off
set logfile=log.txt
set can_install=false

rem 如果 log.txt 存在则删除
if exist %logfile% (
    del %logfile%
)

rem 创建新的 log.txt 文件
echo ⚡ 系统要求检测 ⚡ > %logfile%
echo. >> %logfile%

rem 检查系统架构
echo 系统架构 🖥️: >> %logfile%
echo 检查系统架构类型... >> %logfile%
echo %PROCESSOR_ARCHITECTURE% >> %logfile%

rem 获取Windows版本和构建号
for /f "tokens=4-5 delims=. " %%i in ('ver') do (
    set /a version_major=%%i
    set /a version_minor=%%j
)
for /f "tokens=1-3 delims=." %%a in ('ver') do (
    set build=%%c
)

echo Windows 版本: %version_major%.%version_minor% >> %logfile%
echo Windows 构建号: %build% >> %logfile%
echo. >> %logfile%

rem 检查是否是 Windows 11
if %version_major% GEQ 11 (
    echo 检测到 Windows 11 系统。 >> %logfile%
    echo 可以安装。 >> %logfile%
    set can_install=true
    goto end
)

rem 检测 Windows 10 及架构
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    echo 系统架构为: x64 (AMD64). >> %logfile%
    if %version_major%==10 (
        if %build% GEQ 18362 (
            echo 检测 Windows 10 x64 版本... >> %logfile%
            if %build% GEQ 18362 (
                echo 版本符合要求。 >> %logfile%
                echo 可以安装。 >> %logfile%
                set can_install=true
            ) else (
                echo 构建号不符合要求，要求构建号 18362.1049 或更高。 >> %logfile%
            )
        ) else (
            echo Windows 版本或构建号不符合要求。 >> %logfile%
        )
    )
) else if "%PROCESSOR_ARCHITECTURE%"=="ARM64" (
    echo 系统架构为: ARM64. >> %logfile%
    if %version_major%==10 (
        if %build% GEQ 19041 (
            echo 检测 Windows 10 ARM64 版本... >> %logfile%
            echo 版本符合要求。 >> %logfile%
            echo 可以安装。 >> %logfile%
            set can_install=true
        ) else (
            echo 构建号不符合要求，要求构建号 19041 或更高。 >> %logfile%
        )
    ) else (
        echo Windows 版本不符合要求。 >> %logfile%
    )
) else (
    echo 未知架构: %PROCESSOR_ARCHITECTURE%. >> %logfile%
)

:end
echo 检测完成，变量 can_install 的值为: %can_install% >> %logfile%
echo.
pause
