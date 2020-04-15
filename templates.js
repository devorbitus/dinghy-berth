
const templates = {
    default_config_template: `
# enter the address to reach the spinnaker (gate) api
# 
# Your Spinnaker operator should know what this address is and it would probably look something like...
#   gate.spinnaker.example.com or spinnaker-api.example.com
# 
# 
spinnakerApiAddress: 
# 
# ==========================================================
#  * * *  Preconfigured Repositories * * *
# ==========================================================
# 
# If your organization already has a repository that has the appropriate configuration already setup then comment 
#  out the spinnakerApiAddress line and uncomment and modify one of the _extends lines below
# 
# You can reference another repo inside your org like this...
# _extends: another-repo
# 
# You can reference another repo in another org like this...
# _extends: another-org/another-repo
#
# 
`
}

module.exports = templates