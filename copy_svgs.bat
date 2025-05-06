@echo off
echo SVG File Copying Helper
echo ====================
echo.

REM Create letters directory if it doesn't exist
if not exist "letters" mkdir letters
echo Letters directory ready.
echo.

set /p SOURCE_FOLDER=Enter the full path to your SVG files folder: 

if not exist "%SOURCE_FOLDER%" (
    echo ERROR: The folder %SOURCE_FOLDER% does not exist.
    goto :END
)

echo.
echo Copying SVG files from %SOURCE_FOLDER% to letters folder...
echo.

copy "%SOURCE_FOLDER%\*.svg" "letters\"
copy "%SOURCE_FOLDER%\*.SVG" "letters\"

echo.
echo All SVG files have been copied to the letters folder.
echo You can now use your SVG files in the lab report cover page creator.
echo.

:END
pause 