###########################
# Launch Script 		  #
# Author: Donald Isaac    #
###########################

# Variables
node_env="development"			# NODE_ENV environment variable
dev=false						# Launch in development mode? Development mode
								# means the server will restart on changes, and
								# the development html file will open 

# Get the option flags passed to the script
while getopts ":hpd" opt; do
  case ${opt} in
    h )	# Help
      echo "Usage: launch [options]"
      echo "    -h						Display this help message."
      echo "    -p						Launch with NODE_ENV set to production."
	  echo "	-d						Launch in development mode."
      exit 0
      ;;
	p) # Production flag. Defaults to development.
	  $node_env="production"
	d)
	  $dev=true
	  ;;
    \? )
      echo "Invalid Option: -$OPTARG" 1>&2
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))


# Build the frontend
webpack --env.NODE_ENV=$node_env --config ./Frontend/webpack.config.ts \
	--output ./Backend/src/files/ --output-filename bugsleuth.js



if [ $dev ] ; then
	echo "Launching server in development mode..."
	NODE_ENV=development DEBUG=bugsleuth:* nodemon Backend/src/index.js
	open Playground/index.html
else
	echo "Launching BugSleuth in production mode..."
	NODE_ENV=$node_env node ./Backend/src/index.js
fi