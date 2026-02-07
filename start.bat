@echo off
echo l'installation des modules...
call npm install
echo.
echo Lancement du serveur Orienta...
echo Ouvrez votre navigateur sur http://localhost:3000
echo.
node server.js
pause
