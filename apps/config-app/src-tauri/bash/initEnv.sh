# Initializes the environment variables which contains
# the path locations for running wine.
initEnv() {
  mode=$1
  dir=$(dirname "$0")
  cd $dir;
  
  case $mode in
    dev)
      # In dev mode the current script is located at
      # /apps/config-app/src-tauri/target/debug/bash
      cd ../../../../packages/app-contents
    ;;
    prod)
      # In prod mode the current script is located at
      # /WineApp.app/Config.app/Contents/Resources
      cd ../../../packages/app-contents
    ;;
    *)
      echo "Invalid mode"
      exit 1;
    ;;
  esac
  
  dir=$PWD
  export WINE_APP_CONTENTS_PATH=$dir
  export WINE_APP_SHARED_SUPPORT=$WINE_APP_CONTENTS_PATH/SharedSupport
  export WINE_APP_PREFIX_PATH=$WINE_APP_SHARED_SUPPORT/prefix
  export WINE_APP_BIN_PATH=$WINE_APP_SHARED_SUPPORT/wine/bin
  export WINE_APP_FRAMEWORKS_PATH=$WINE_APP_CONTENTS_PATH/Frameworks
  export WINE_APP_DRIVE_C=$WINE_APP_PREFIX_PATH/drive_c
}

initEnv "$@"