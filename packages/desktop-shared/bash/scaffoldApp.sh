#!/bin/bash

mkdir -p $WINE_APP_PATH;
tar -xf $COMPRESSED_PATH/config-app.zip -C $WINE_APP_PATH -v;

# Loads env from Config.app/Resources/bash/env.sh
# $WINE_APP_SCRIPTS_PATH/env.sh


# mkdir -p $WINE_APP_LOGS_PATH;
# mkdir -p $WINE_APP_ENGINE_PATH;
# mkdir -p $WINE_APP_PREFIX_PATH;