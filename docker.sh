## Bash Script to run docker build process.

echo 'Checking for build folder in root'
echo

if [[ -e build ]]; then
    echo 'Build folder already present'
    echo 'Deleting build folder'
    rm -rf build
    echo
    echo
    echo 'Creating new build for client'
    cd client
    npm run build
    echo 'Moving build to root'
    echo
    echo
    mv -- build ..
    cd ..
    echo
    echo 'Building docker File'
    docker build -t peppermint:latest pepperlabs/peppermint pepperlabs/peppermint:latest pepperlabs/peppermint:v0.1.5-alpha. .
    echo 'Build completed'
else
    echo 'No client build folder found'
    echo
    echo 'Creating new build for client'
    cd client
    npm run build
    echo 'Moving build to root'
    echo
    mv -- build ..
    cd ..
    echo
    echo 'Building docker File'
    docker build -t peppermint:latest pepperlabs/peppermint pepperlabs/peppermint:latest pepperlabs/peppermint:v0.1.5-alpha. .
    echo 'Build completed'
fi
