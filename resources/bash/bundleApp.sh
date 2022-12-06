#Creates info.plist file
read
INFO_PLIST="$REPLY"
CONTENTS_PATH="$WINE_APP_PATH/Contents"
cd $CONTENTS_PATH

cat <<EOM > "Info.plist"
$INFO_PLIST
EOM

#Creates config.json file
read
CONFIG_JSON="$REPLY"
cat <<EOM > "config.json"
$CONFIG_JSON
EOM

#Creates launcher file
MACOS_PATH="$CONTENTS_PATH/MacOS"
EXEC_FILE="winemacapp"
read
EXE_PATH=$REPLY

mkdir $MACOS_PATH
cd $MACOS_PATH

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

#mv $WINE_APP_NAME "$WINE_APP_NAME.app"