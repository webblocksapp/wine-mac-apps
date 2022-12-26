if [[ $WINE_TRICK_FLAGS == *"force"* ]]; then
 flags+="--force "
fi

if [[ $WINE_TRICK_FLAGS == *"unattended"* ]]; then
 flags+="--unattended "
fi

PATH="$WINE_APP_BIN_PATH":$PATH WINEPREFIX=$WINE_APP_PREFIX_PATH WINE=$WINE_APP_BIN_PATH/wine32on64 winetricks $flags $WINE_TRICK;
