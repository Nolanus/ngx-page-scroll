#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; Not correct branch or just a PR"
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into ghpages/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deploy)
git clone $REPO ghpages
cd ghpages
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
# Clean out existing contents (except for the .git dir)
ls -A1 | grep -v .git | xargs rm -rf || exit 0

cd ..

# Copy over the build/compiled files from the demo app
echo "Moving over the demo dist from $DEMO_DIST"
cp -a $DEMO_DIST/. ghpages/

# Now let's go have some fun with the cloned repo
echo "Go into ghpages folder"
cd ghpages

# Adjust the baseurl href property to meet the one of github pages
echo "Adjust base href"
sed -i -e 's/base href="\/"/base href="\/ng2-page-scroll\/"/g' index.html

# Configure git
echo "Configure git"
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

echo "Check git diff status"
# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ $(git status --porcelain | wc -l) -lt 1 ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
echo "Committing the changes"
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

echo "Doing ssl key stuff"
# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../ssh.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
echo "Pushing to Github"
git push $SSH_REPO $TARGET_BRANCH
