# Initializes the environment variables which contains
# the path locations for running wine.
env() {
  mode=$1
  dir=$(dirname "${BASH_SOURCE[0]}")
  
  cd $dir
  cd ../
  
  # Gets the folder path of shell scripts.
  export CONFIG_APP="config-app.app"
  export WINE_BASE_PATH="$HOME/Wine"
  export WINE_LIBS_PATH="$WINE_BASE_PATH/libs"
  export WINE_ENGINES_PATH="$WINE_BASE_PATH/engines"
  export WINE_APPS_PATH="$WINE_BASE_PATH/apps"
  export WINE_APP_PATH="$WINE_APPS_PATH/$WINE_APP_NAME.app"
  export WINE_APP_SCRIPTS_PATH="$WINE_APP_PATH/$CONFIG_APP/Resources/bash"
  export COMPRESSED_PATH="$PWD/compressed"
}

env "$@"