::
:: This script copies a set of Javascript files, 
:: combining them together into a single file.
::
@ECHO OFF

:: This is the name of the output file
::
SET output=scripts\level1.js

:: This is the Javascript compressor \ compiler to use
::
SET compress="true"
SET compressor="yuicompressor-2.4.2\build\yuicompressor-2.4.2.jar"

:: Create the output file
::
ECHO creating %output%
ECHO. 2>> %output%

:: For each of the following files...
::
FOR %%I IN (

scripts\utilities\javascript_utils.js
scripts\utilities\string_utils.js
scripts\utilities\arrays.js
scripts\utilities\web_browser_utils.js
scripts\utilities\ascii.js
scripts\utilities\math_utils.js
scripts\utilities\cookies.js
scripts\components\component.js
scripts\graphics\rgb_color.js
scripts\graphics\vector2.js
scripts\graphics\vector3.js
scripts\graphics\extents2.js
scripts\graphics\extents3.js
scripts\graphics\canvas.js
scripts\graphics\icon.js
scripts\graphics\element.js
scripts\graphics\sprite.js
scripts\graphics\animated_sprite.js
scripts\graphics\rect.js
scripts\graphics\text.js
scripts\graphics\digital_display.js
scripts\graphics\items_display.js
scripts\sounds\sound.js
scripts\game_element.js
scripts\missile.js
scripts\spaceship.js
scripts\scrolling_background.js
scripts\game_level.js
scripts\democrat.js
scripts\money.js
scripts\democrat_game_level.js
  
) DO (
  ECHO adding %%I
  COPY /b %output%+"scripts\separator.js"+%%I %output%
)

:: Last, compress the resulting javascript file
::
IF %compress%=="true" (
  java -jar %compressor% %output% > temp
  copy temp %output%
  del temp
)