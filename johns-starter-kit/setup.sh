if [ -n "`$SHELL -c 'echo $ZSH_VERSION'`" ]; then
   # assume Zsh
   PROFILE=".zshrc"
elif [ -n "`$SHELL -c 'echo $BASH_VERSION'`" ]; then
   # assume Bash
   PROFILE=".bash_profile"
   source $HOME/$PROFILE
else
   echo "Unrecognized shell"
   echo $0
   exit 1
fi

echo "Using ${PROFILE}"
source $HOME/$PROFILE

echo "Sourcing user profile for command detection."

echo "Home directory is $HOME"

command -v brew >/dev/null 2>&1 &&
{
    echo "Homebrew already installed."
} || {
    echo "No homebrew detected installing homebrew."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
}

command -v nvm >/dev/null 2>&1 &&
{
    echo "NVM already installed."
} || {
    echo "No NVM detected installing NVM."
    brew install nvm
    echo export NVM_DIR="$HOME/.nvm" >> $HOME/$PROFILE
    echo . "$(brew --prefix nvm)/nvm.sh" >> $HOME/$PROFILE

    # Source the profile
    source $HOME/$PROFILE;
}

echo "Using node v10"

nvm install 10
nvm use 10

echo "Installing global node packages"

command -v yarn >/dev/null 2>&1 && {
    echo "yarn already installed."
} || {
    echo "No yarn detected, installing yarn."
    npm i -g yarn
}

command -v expo-cli >/dev/null 2>&1 && {
    echo "expo-cli already installed."
} || {
    echo "No expo-cli detected, installing expo-cli."
    npm i -g expo-cli
}

command -v firebase >/dev/null 2>&1 && {
    echo "firebase-tools already installed."
} || {
    echo "No firebase-tools detected, installing firebase-tools"
    npm i -g firebase-tools
}

echo "Global config complete"
