. "${SCRIPTS_PATH}cdWineApp.sh";
MACOS_FOLDER="$PWD/Contents/MacOS"
EXEC_FILE="$WINE_APP_NAME"

mkdir $MACOS_FOLDER
cd $MACOS_FOLDER

cat <<EOM >> $EXEC_FILE
#!/bin/sh
echo $PWD
EOM

chmod +x $EXEC_FILE

cd ../../..

mv $WINE_APP_NAME "$WINE_APP_NAME.app"