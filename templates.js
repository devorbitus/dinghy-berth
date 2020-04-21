
const templates = {
    default_config_template: `
# enter the address to reach the spinnaker (gate) api
# 
# Your Spinnaker operator should know what this address is and it would probably look something like...
#   gate.spinnaker.yourcompany.com or spinnaker-api.yourcompany.com
# 
# 
spinnakerApiAddress: 
# 
#
# ==========================================================
#  * * *  Override Default Configurations * * *
# ==========================================================
# 
# Uncomment the following line and change it if you need to override the webhook configuration
# defaultWebhookPath: webhooks/git/github
# 
# Uncomment the following line and change it if the dinghyfile name is different i.e. Spinnakerfile
# dinghyfileName: dinghyfile
# 
# Uncomment the following line and change it if you need to use a different schema
# defaultWebhookSchema: https
# 
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
`,
    config_template_pull_request_text: `
Inside this pull request is a configuration file needed to tell berthbot where to 
find your Spinnaker deployent. You can and should alter the template file in this pull 
request to include the correct spinnakerApiAddress for your Spinnaker deployment 
or follow the instructions for pointing the configuration at a repo that is 
already configured by your Spinnaker operators.
`,
    getting_started_message: `
This repo has been configured to be setup through berthbot, the bot for creating a dinghyfile into your repo for automatic setup of your Spinnaker application and pipeline.

You have two choices:
- add a \`/template\` into an issue comment and a configuration template file will be added to this repo through a pull request, to configure berthbot to talk to your Spinnaker deployment
- close this pull request and no further action will be done to this repo until you do the above choice at a later date

`
}

module.exports = templates