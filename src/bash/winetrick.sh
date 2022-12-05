. "${SCRIPTS_PATH}cdWineApp.sh";

if [[ $WINE_TRICK_FLAGS == *"force"* ]]; then
 flags+="--force "
fi

if [[ $WINE_TRICK_FLAGS == *"unattended"* ]]; then
 flags+="--unattended "
fi

PATH="${PWD}${WINE_APP_BIN_PATH}":$PATH WINEPREFIX="${PWD}${WINE_APP_PREFIX_PATH}" WINE="${PWD}${WINE_APP_BIN_PATH}"/wine32on64 winetricks $flags $WINE_TRICK;