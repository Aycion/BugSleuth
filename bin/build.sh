################################################################################
# 									 build.sh								   #
#																			   #
# Builds the frontend and backend and puts them in the dist/ folder.		   #
#																			   #
# Author: Donald Isaac														   #
# Licensed under the MIT License											   #
#																			   #
################################################################################

root_dir=$(pwd)								# Project's root directory
is_prod=true								# Build in production mode?
											# TODO: use optargs to set is_prod


#### FRONTEND BUILD ####
echo "BugSleuth: building frontend..."
cd ${root_dir}/packages/frontend			# Move to the frontend directory

if [ -e dist/ ] ; then
	rm -rf dist/
fi

if [ is_prod ] ; then						# Build the widget UI
	webpack --env.NODE_ENV=production
else
	webpack --env.NODE_ENV=development
fi


sass src/styles/app.scss dist/bugsleuth.css	# Compile the stylesheet

#### BACKEND BUILD ####
echo "BugSleuth: building backend..."
cd ${root_dir}/packages/backend				# Move to the backend directory

if [ -e dist/ ] ; then
	rm -rf dist/
fi

if [ is_prod ] ; then						# Build the widget UI
	webpack --env.NODE_ENV=production
else
	webpack --env.NODE_ENV=development
fi



################################# DIST FOLDER ##################################
# The dist/ folder has the following file structure:						   #
#																			   #
# dist/																		   #
# |																			   #
# ├── server.js								# Compiled backend script		   #
# ├── package.json							# Dependencies for server.js	   #
# ├── package-lock.json														   #
# ├── node_modules/															   #
# └── assets								# Assets that the backend serves   #
# |   └── bugsleuth.js						# Widget UI script				   #
#																			   #
################################################################################

cd $root_dir
if [ -f -e dist ] ; then					# Remove the old dist folder
	rm -f dist/*.js
	rm -f dist/*.json
	rm -f dist/assets/*.*
	
fi

mkdir -p dist/assets								# Remake the dist folder
cp packages/frontend/dist/bugsleuth.* dist/assets/	# Move the built widget and 
													# stylesheet to the 
													# dist/assets folder

cp packages/backend/dist/server.js dist/			# Add server.js to dist
cp packages/backend/package.json dist/				# Add package.json to dist


echo "BugSleuth: installing..."
cd ${root_dir}/dist				
npm install											# Install dependencies and
													# create package-lock.json
