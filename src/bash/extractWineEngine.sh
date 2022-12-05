. "${SCRIPTS_PATH}cdWineApp.sh";

tar -xf $WINE_ENGINES_ABS_PATH/$WINE_ENGINE_VERSION.tar.7z -C $WINE_APP_ABS_PATH -v
mv ./wswine.bundle/* .$WINE_APP_ENGINE_PATH
rm -r "$WINE_APP_ABS_PATH/wswine.bundle"