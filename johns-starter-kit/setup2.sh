EXPO="./app.json"

# input project name
read -p "Enter the name of your project (use alphanumeric characters and hyphens only): " PROJECTNAME
VALIDPROJECTNAME=$(grep -E '^[[:alnum:]][-[:alnum:]]{0,61}[[:alnum:]]$' <<< $PROJECTNAME)

# validate project name
while [ -z "$VALIDPROJECTNAME" ]
do
read -p "Invalid project name, try again (use alphanumeric characters and hyphens only): " PROJECTNAME
VALIDPROJECTNAME=$(grep -E '^[[:alnum:]][-[:alnum:]]{0,61}[[:alnum:]]$' <<< $PROJECTNAME)
done

# change project name in app.json file
echo "Changing project name to $VALIDPROJECTNAME"
awk -v var=${VALIDPROJECTNAME} "{gsub(/johns-starter-kit/,var)}1" $EXPO > tmp && mv tmp $EXPO && rm -f tmp
echo "Project name updated. You're all set!!! :]"
