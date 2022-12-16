#!/usr/bin/env bash

# Set default values for the arguments
config="{}"
url="/"

winemacapps() {
  # Parse the command line arguments
  while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in    
      --config)
        config=$(cat $2)
        shift
        shift
        ;;
      --url)
        url=$2
        shift
        shift
        ;;
      *)
        echo "Unknown option: $key"
        exit 1
        ;;
    esac
  done

  echo -e "{\n\t\"config\": $config,\n\t\"url\":\"$url\"\n\t}"
}

winemacapps "$@"