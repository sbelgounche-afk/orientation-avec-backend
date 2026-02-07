@echo off
echo Arret du serveur en cours...
taskkill /F /IM node.exe
timeout /t 2 /nobreak >nul
echo Redemarrage...
start start.bat
exit
