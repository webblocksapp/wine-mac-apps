# Initializes the environment variables which contains
# the path locations for running wine.
env() {
  mode=$1
  dir=$PWD
  
  if [ $mode == "development" ]
  then
    # In dev mode the current script is located at
    # /apps/config-app/src-tauri/target/debug/bash
    export WINE_APP_SCRIPTS_PATH="$dir/bash"
    cd ../../../packages/app-contents
  elif [ $mode == "production" ]
  then
    # In prod mode the current script is located at
    # /WineApp.app/Config.app/Contents/Resources
    export WINE_APP_SCRIPTS_PATH="$dir/bash"
    cd ../../../packages/app-contents
  else
    echo "Invalid mode"
    exit 1;
  fi
  
  dir=$PWD
  export WINE_APP_CONTENTS_PATH=$dir
  export WINE_APP_SHARED_SUPPORT_PATH=$WINE_APP_CONTENTS_PATH/SharedSupport
  export WINE_APP_PREFIX_PATH=$WINE_APP_SHARED_SUPPORT_PATH/prefix
  export WINE_APP_BIN_PATH=$WINE_APP_SHARED_SUPPORT_PATH/wine/bin
  export WINE_APP_FRAMEWORKS_PATH=$WINE_APP_CONTENTS_PATH/Frameworks
  export WINE_APP_DRIVE_C=$WINE_APP_PREFIX_PATH/drive_c
}

env "$@"