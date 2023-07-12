#!/bin/sh

webhook_url=$1 # `action_params` field passed from the "hooks" table

# The body of the record (as JSON) is fed to this script as stdin.
json=$(cat | jq -r '{text: "ticket updated: \(.title); \(.expand.project.config.base_url)/projects/\(.project)/tickets/\(.id)/edit/"}')

# post json to webhook endpoint
curl -s --data "$json"  -H 'Content-Type: application/json' "$webhook_url"