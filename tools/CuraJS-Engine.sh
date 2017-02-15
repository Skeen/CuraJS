#!/bin/bash

# Pull the latest engine release
#curl -s https://api.github.com/repos/Skeen/CuraJS-Engine/releases/latest | grep "browser_download_url" | sed 's#.*: "\(.*\)"#\1#g' | xargs curl -L

curl -L https://github.com/Skeen/CuraJS-Engine/releases/download/TravisReleaseTest4/CuraEngine.js

