
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

`,
    dinghyfile_contents: `
{
"application": "my-store-app",
"spec": {
    "email": "chris_gruel@homedepot.com"
},
"pipelines": [
    {
    "name":"Deploy to All",
    "appConfig": {},
    "expectedArtifacts": [
        {
        "defaultArtifact": {
            "id": "0d953750-1e1b-46bf-b778-ff2ab6532e83",
            "name": "gcr.io/hd-sqa-nonprod/github.com/devorbitus/spin-kub-v2-demo",
            "reference": "gcr.io/hd-sqa-nonprod/github.com/devorbitus/spin-kub-v2-demo@sha256:c5c43d3899ece36fc5bdc7e46d6416c0385ad3190f3fb253b2582c9d91bc36d4",
            "type": "docker/image",
            "version": "sha256:c5c43d3899ece36fc5bdc7e46d6416c0385ad3190f3fb253b2582c9d91bc36d4"
        },
        "displayName": "devorbitus/spin-kub-v2-demo",
        "id": "db6915c2-703e-4bea-bfad-a8d89d4e72a3",
        "matchArtifact": {
            "id": "5f58d35c-5223-4d57-85ed-990aa44704e7",
            "name": "gcr.io/hd-sqa-nonprod/github.com/devorbitus/spin-kub-v2-demo",
            "type": "docker/image"
        },
        "useDefaultArtifact": true,
        "usePriorArtifact": true
        },
        {
        "defaultArtifact": {
            "id": "ac3f5b3e-a40a-41eb-a23d-99fa9bc3f23e",
            "name": "manifests/demo.yml",
            "reference": "https://api.github.com/repos/devorbitus/spin-kub-v2-demo/contents/manifests/demo.yml",
            "type": "github/file",
            "version": "master"
        },
        "displayName": "manifests/demo.yml",
        "id": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "matchArtifact": {
            "id": "d85efe40-595f-42a6-9e23-676d14626d68",
            "name": "manifests/demo.yml",
            "type": "github/file"
        },
        "useDefaultArtifact": true,
        "usePriorArtifact": true
        }
    ],
    "keepWaitingPipelines": false,
    "lastModifiedBy": "chris_gruel@homedepot.com",
    "limitConcurrent": true,
    "parameterConfig": [],
    "stages": [
        {
        "account": "st9001",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9001",
        "refId": "1",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9002",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9002",
        "refId": "2",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9003",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9003",
        "refId": "3",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9004",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9004",
        "refId": "4",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9005",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9005",
        "refId": "5",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9006",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9006",
        "refId": "6",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9007",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9007",
        "refId": "7",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9008",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9008",
        "refId": "8",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st9009",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st9009",
        "refId": "9",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "account": "st90010",
        "cloudProvider": "kubernetes",
        "manifestArtifactAccount": "spinnaker",
        "manifestArtifactId": "18c874a1-aece-4d00-97ef-acf138b6cf6c",
        "moniker": {
            "app": "cghellospin"
        },
        "name": "Deploy (Manifest) st90010",
        "refId": "10",
        "relationships": {
            "loadBalancers": [],
            "securityGroups": []
        },
        "requiredArtifactIds": [],
        "requisiteStageRefIds": [
            "11"
        ],
        "skipExpressionEvaluation": false,
        "source": "artifact",
        "trafficManagement": {
            "enabled": false,
            "options": {
            "enableTraffic": false,
            "services": []
            }
        },
        "type": "deployManifest"
        },
        {
        "name": "Create Change Request",
        "refId": "11",
        "requisiteStageRefIds": [],
        "type": "wait",
        "waitTime": 5
        }
    ],
    "triggers": [
        {
        "account": "gcr-reg-hd-sqa-nonprod",
        "enabled": true,
        "expectedArtifactIds": [
            "db6915c2-703e-4bea-bfad-a8d89d4e72a3"
        ],
        "organization": "hd-sqa-nonprod/github.com/devorbitus",
        "registry": "gcr.io",
        "repository": "hd-sqa-nonprod/github.com/devorbitus/spin-kub-v2-demo",
        "runAsUser": "gg_cloud_thdk8s-edit",
        "type": "docker"
        },
        {
        "branch": "master",
        "enabled": true,
        "expectedArtifactIds": [
            "18c874a1-aece-4d00-97ef-acf138b6cf6c"
        ],
        "project": "devorbitus",
        "runAsUser": "gg_cloud_thdk8s-edit",
        "secret": "nosecrets",
        "slug": "spin-kub-v2-demo",
        "source": "github",
        "type": "git"
        }
    ],
    "updateTs": "1562687037014"
    }
]
}    
`
}

module.exports = templates