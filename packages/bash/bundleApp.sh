# Read variables
read
INFO_PLIST="$REPLY"
read
CONFIG_JSON="$REPLY"
read
EXE_PATH=$REPLY

# Creates info.plist file
CONTENTS_PATH="$WINE_APP_PATH/Contents"
cd $CONTENTS_PATH
cat <<EOM > "Info.plist"
$INFO_PLIST
EOM

# Creates launcher file
MACOS_PATH="$CONTENTS_PATH/MacOS"
EXEC_FILE="winemacapp"

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

#Creates config launcher.
cd ../..
CONFIG_MACOS_PATH=Config/Contents/MacOS
CONFIG_EXEC_FILE="$CONFIG_MACOS_PATH/Config"
mkdir -p $CONFIG_MACOS_PATH
cat <<EOM > "$CONFIG_MACOS_PATH/config.json"
$CONFIG_JSON
EOM

cat <<EOM > "$CONFIG_MACOS_PATH/Config"
#!/bin/sh
cd "\$(dirname "\$0")"
BASEDIR=\$PWD
echo "--config \$BASEDIR/config.json" > \$TMPDIR/winemacappsPipe
EOM

chmod +x $CONFIG_EXEC_FILE
mv Config "Config.app"

cd ..

mv $WINE_APP_NAME "$WINE_APP_NAME.app"