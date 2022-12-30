#!/bin/bash
wine() {
  $WINE_APP_SCRIPTS_PATH/wineEnv.sh wine32on64 "$@"
}

wine "$@"