MACOS_FOLDER="$WINE_APP_PATH/Contents/MacOS"
EXEC_FILE="$WINE_APP_NAME"
read
EXE_PATH=$REPLY

mkdir $MACOS_FOLDER
cd $MACOS_FOLDER

cat <<EOM > $EXEC_FILE
#!/bin/sh
cd "\$(dirname "\$0")"
cd ../
BASEDIR=\$PWD

WINE_APP_PREFIX_PATH="\${BASEDIR}/SharedSupport/prefix"
WINE_APP_BIN_PATH="\${BASEDIR}/SharedSupport/wine/bin"
EXE_PATH="\${BASEDIR}/SharedSupport/prefix${EXE_PATH}"

PATH="\${WINE_APP_BIN_PATH}":\$PATH WINEPREFIX="\${WINE_APP_PREFIX_PATH}" exec wine32on64 "\$EXE_PATH" \$EXE_FLAGS;
EOM

chmod +x $EXEC_FILE

cd ../../..

mv $WINE_APP_NAME "$WINE_APP_NAME.app"