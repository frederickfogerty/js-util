#!/bin/bash

set -ex

VERSION=$(node -p -e "require('./package.json').version")
echo $VERSION
git push origin master --follow-tags