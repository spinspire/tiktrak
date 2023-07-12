#!/bin/sh

# This example script, along with hooks.go, shows how to trigger a command
# when a record changes in PocketBase and how to feed the changed record to this
# script.

params=$1 # `action_params` field passed from the "hooks" table
echo "PARAMS=$params"

# The body of the record (as JSON) is fed to this script as stdin.
# The following just reformats it and pretty-prints it.
cat | jq -C

# example: transform incoming JSON
#json=$(cat | jq -r '{message: "ticket updated: \(.title); in project \(.expand.project.title)"}')
# post it somewhere
#curl -s --data "$json" -H 'Content-Type: application/json' $webhook_url