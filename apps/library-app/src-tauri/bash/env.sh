# Initializes the environment variables which contains
# the path locations for running wine.
env() {
  # Gets the folder path of shell scripts.
  export WINE_APP_PATH="$HOME/Wine/apps/$WINE_APP_NAME.app"
  export WINE_APP_CONTENTS_PATH="$WINE_APP_PATH/Contents"
  export WINE_CONFIG_APP_NAME="config-app"
  export WINE_CONFIG_APP_PATH="$WINE_APP_PATH/$WINE_CONFIG_APP_NAME.app"
  export WINE_APP_SCRIPTS_PATH="$WINE_CONFIG_APP_PATH/Contents/Resources/bash"
  export COMPRESSED_PATH="$PWD/compressed"
}

env "$@"