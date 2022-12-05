. "${SCRIPTS_PATH}cdWineApp.sh";

MOLTENVK_LIB=$WINE_LIBS_PATH/libMoltenVK.dylib
cp $MOLTENVK_LIB "${PWD}${WINE_APP_ENGINE_PATH}/lib/wine/x86_64-unix";
PATH="${PWD}${WINE_APP_BIN_PATH}":$PATH WINEPREFIX="${PWD}${WINE_APP_PREFIX_PATH}" WINE="${PWD}${WINE_APP_BIN_PATH}"/wine32on64 winetricks --force --unattended dxvk_macos.verb;