################################################################################
# 									 build.sh								   #
#																			   #
# Builds the frontend and backend and puts them in the dist/ folder.		   #
# NOTICE: This script has been deprecated. Please use 'gulp build' instead.	   #
#																			   #
# Author: Donald Isaac														   #
# Licensed under the MIT License											   #
#																			   #
################################################################################

# Important Notes:
#   - It is important that an npm script calls this script. Running an npm
#     script sets the current working directory in a predictable manner that
#     this script relies on
#   - If you want to add your own assets for the backend to serve, make sure
#     you call `mv` on it in the dist/ construction section of this script. 

root_dir=$(pwd)								# Project's root directory
is_prod=true								# Build in production mode?
											# TODO: use optargs to set is_prod


#### FRONTEND BUILD SECTION ####
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

if [ ! $? ] ; then							# If building fails, exit the script
	exit $?
fi


sass src/styles/app.scss dist/bugsleuth.css	# Compile the stylesheet

#### BACKEND BUILD SECTION ####
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

if [ ! $? ] ; then							# If building fails, exit the script
	exit $?
fi

################################################################################
#                             DIST FOLDER STRUCTURE                            #
# The dist/ folder has the following file structure:                           #
#                                                                              #
# dist/                                                                        #
# |																			   #
# ├── server.js                             # Compiled backend script          #
# ├── package.json                          # Dependencies for server.js       #
# ├── package-lock.json	                                                       #
# ├── node_modules/                                                            #
# └── assets                                # Asset files the backend serves   #
#     ├── bugsleuth.js                      # Compiled widget script           #
#     ├── bugsleuth.js.map                  # Script source map                #
#     ├── bugsleuth.css                     # Compiled widget stylesheet       #
#     └── bugsleuth.css.map	                # Stylesheet source map            #
#                                                                              #
################################################################################

cd $root_dir
if [ -d dist ] ; then								# Remove the files in dist,
	rm -f dist/*.js									# But keep node_modules b/c
	rm -f dist/*.json								# re-installing dependencies
	rm -f dist/assets/*.*							# every time is pointless
	
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

echo "BugSleuth: build successful. Built files are now in the dist/ folder."
exit 0