#!/usr/bin/env bash
# Bring project to a clean state
git stash
# Extract current version number from package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Go into demo project and build the app
cd demo/
ng build --prod
sed -i '' -e 's/base href="\/"/base href="\/ng2-page-scroll\/"/g' dist/index.html
cd ..
# Commit the new demo deployment to git
git add demo/dist
git commit -m "Deploy demo app with version $PACKAGE_VERSION"
# Push the demo/dist subfolder to github pages branch
git subtree push --prefix demo/dist origin gh-pages
# Revert the commit from above on the master branch, as we do not need it
git reset --hard HEAD~1
# Apply the stash again
git stash apply --index
