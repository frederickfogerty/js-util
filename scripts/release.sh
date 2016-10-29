#!/bin/bash

set -ex

VERSION=$(node -p -e "require('./package.json').version")
git tag "v${VERSION}"
echo "v$VERSION"
git push origin master --follow-tags