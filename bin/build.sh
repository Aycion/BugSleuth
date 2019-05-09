##
# build.sh
#
# Builds the frontend and backend and puts them in the dist/ folder.
#
# Author: Donald Isaac
#

working_directory=$(pwd)					# Root directory
is_prod=true								# Build in production mode?



#### FRONTEND BUILD ####
echo "Building frontend..."
cd ${working_directory}/packages/frontend	# Move to the frontend directory

if [ -e dist/ ] ; then
	rm -rf dist/
fi

if [ is_prod ] ; then						# Build the widget UI
	webpack --env.NODE_ENV=production
else
	webpack --env.NODE_ENV=development
fi



#### BACKEND BUILD ####
echo "Building backend..."
cd ${working_directory}/packages/backend	# Move to the backend directory

if [ -e dist/ ] ; then
	rm -rf dist/
fi

if [ is_prod ] ; then						# Build the widget UI
	webpack --env.NODE_ENV=production
else
	webpack --env.NODE_ENV=development
fi



#### MOVE ASSETS TO DIST ####
cd $working_directory
if [ -f -e dist/ ] ; then					# Remove the old dist folder
	rm -rf dist/
fi

mkdir -p dist/assets						# Remake the dist folder
cp packages/frontend/dist/bugsleuth.js \	# Move the built widget to the 
	dist/assets/							# dist/assets folder
cp packages/backend/dist/server.js \
	dist/
cp packages/backend/package.json \
	dist/

echo "Installing..."
cd ${working_directory}/dist

npm install
