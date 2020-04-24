// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more

const yaml = require('js-yaml');
const url = require('url');
const sendMessage = require('probot-messages');
const commands = require('probot-commands')
const { default_config_template, config_template_pull_request_text, dinghyfile_contents, getting_started_message } = require('./templates');

const DEFAULT_CONFIG_FILE = 'berthbot.yml'
const DEFAULT_CONFIG_FILE_PATH = '.github/berthbot.yml'
const DEFAULT_WEBHOOK_PATH = 'webhooks/git/github'
const DEFAULT_WEBHOOK_SCHEMA = 'https'


/**
 * Decodes and parses a YAML config file
 *
 * @param {string} content Base64 encoded YAML contents
 * @returns {object} The parsed YAML file as native object
 */
function parseConfig(content) {
  return yaml.safeLoad(Buffer.from(content, 'base64').toString()) || {};
}

/**
 * Loads a file from GitHub
 *
 * @param {Context} context A Probot context
 * @param {object} params Params to fetch the file with
 * @returns {Promise<object>} The parsed YAML file
 * @async
 */
async function loadYaml(context, params) {
  try {
    const response = await context.github.repos.getContents(params);
    return parseConfig(response.data.content);
  } catch (e) {
    if (e.status === 404) {
      context.log(`${params.path} not found within ${params.owner}/${params.repo}`)
      return null;
    }

    throw e;
  }
}

async function sendConfigTemplate(context, owner, repo){
  // Generates a random number to ensure the git reference isn't already taken
  // NOTE: this is not recommended and just shows an example so it can work :)
  //context.log(context.github)
  // test
  const branchName = `berthbot-config-template-${Math.floor(Math.random() * 9999)}`
  const pathToUse = '.github/berthbot.yml'
  const commitMessage = 'adds berthbot config template file'
  const pullRequestTitle = 'Adding berthbot config template file!'

  const pr = await newFileInPullRequest(context, owner, repo, branchName, pathToUse, commitMessage, default_config_template, pullRequestTitle, config_template_pull_request_text);
  return pr
}

async function sendDinghyfile(context, owner, repo){
  // Generates a random number to ensure the git reference isn't already taken
  // NOTE: this is not recommended and just shows an example so it can work :)
  //context.log(context.github)
  // test
  const branchName = `berthbot-dinghyfile-${Math.floor(Math.random() * 9999)}`
  const pathToUse = 'dinghyfile'
  const commitMessage = 'adds dinghyfile file'
  const pullRequestTitle = 'Adding dinghyfile file!'
  const pullRequestBody = 'Here is an example dinghyfile'

  const pr = await newFileInPullRequest(context, owner, repo, branchName, pathToUse, commitMessage, dinghyfile_contents, pullRequestTitle, pullRequestBody);
  return pr
}

async function newFileInPullRequest(context, owner, repo, branchName, pathToUse, commitMessage, commitFileContents, pullRequestTitle, pullRequestBody) {
  // Get current reference in Git
  const reference = await context.github.git.getRef({
    repo,
    owner,
    ref: 'heads/master'
  });
  // Create a branch
  await context.github.git.createRef({
    repo,
    owner,
    ref: `refs/heads/${branchName}`,
    sha: reference.data.object.sha // accesses the sha from the heads/master reference we got
  });
  // create a new file
  await context.github.repos.createOrUpdateFile({
    repo,
    owner,
    path: pathToUse,
    message: commitMessage,
    content: Buffer.from(commitFileContents).toString('base64'),
    // the content of your file, must be base64 encoded
    branch: branchName // the branch name we used when creating a Git reference
  });
  // create a PR from that branch with the commit of our added file
  const createPR = await context.github.pulls.create({
    repo,
    owner,
    title: pullRequestTitle,
    head: branchName,
    base: 'master',
    body: pullRequestBody,
    maintainer_can_modify: true
  });

  return createPR
}

async function offerConfigTemplate(app, context, owner, repo){
  // No config file found
  context.log('No config file found')

  await sendMessage(
    app,
    context,
    '[{appName}] Getting started',
    getting_started_message,
    {owner, repo}
  );
}

async function checkForConfigExistance(repoConfig, app, context, owner, repo) {
  if (repoConfig == null) {
    context.log('No config file found')
    await offerConfigTemplate(app, context, owner, repo)
    
  } else {
    if(repoConfig.spinnakerApiAddress){
      // Found a config file
      context.log(`Configuration file found for ${owner}/${repo}`)
      const webhookSchema = repoConfig.defaultWebhookSchema || DEFAULT_WEBHOOK_SCHEMA
      const webhookPath = repoConfig.defaultWebhookPath || DEFAULT_WEBHOOK_PATH
      const fullWebhookUrl = `${webhookSchema}://${repoConfig.spinnakerApiAddress}/${webhookPath}`
      const webhookConfig = { owner, repo, config: {url: fullWebhookUrl, content_type: 'json'}}
      
      try {
        context.github.repos.createHook(webhookConfig)
      } catch (e) {
        app.log.error(e, 'Unable to create webhook, for some reason')
      }
      
    } else {
      context.log('Config file found but no api configured')

      await offerConfigTemplate(app, context, owner, repo)
    }
    
  }
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {

  app.log('Yay, the app was loaded!')

  // setup the template command to send the PR with a template
  commands(app, 'template', async (context, _command) => {
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name

    await sendMessage(
      app,
      context,
      '[{appName}] Getting started',
      getting_started_message,
      {owner, 
        repo, 
        update: `creating a new pull request...`,
        updateAfterDays: 0
      }
    );

    const pr = await sendConfigTemplate(context, owner, repo)

    await sendMessage(
      app,
      context,
      '[{appName}] Getting started',
      getting_started_message,
      {owner, 
        repo, 
        update: `a new PR #${pr.data.number} has been created to setup the configuration of {appName}`,
        updateAfterDays: 0
      }
    );
  })
  
  commands(app, 'dinghy', async (context, _command) => {
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name

    await sendMessage(
      app,
      context,
      '[{appName}] Getting started',
      getting_started_message,
      {owner, 
        repo, 
        update: `creating a new pull request...`,
        updateAfterDays: 0
      }
    );

    const pr = await sendDinghyfile(context, owner, repo)

    await sendMessage(
      app,
      context,
      '[{appName}] Getting started',
      getting_started_message,
      {owner, 
        repo, 
        update: `a new PR #${pr.data.number} has been created to add a dinghyfile to this repo`,
        updateAfterDays: 0
      }
    );
  })

  // Opens a PR every time someone installs your app for the first time
  app.on(['installation.created','installation_repositories.added'], check)
  
  async function check (context) {
    // shows all repos you've installed the app on
    context.log(context.payload)

    const owner = context.payload.installation.account.login

    const repos = context.event == 'installation' ? context.payload.repositories : context.payload.repositories_added

    repos.forEach(async (repository) => {
      const repo = repository.name

      // we need to check things manually here because the appropriate pre-authorized context.github is not yet available
      const repoConfig = await loadYaml(context, {owner, repo, path: DEFAULT_CONFIG_FILE_PATH})
      context.github = await app.auth(context.payload.installation.id)

      await checkForConfigExistance(repoConfig, app, context, owner, repo)
    })
  }

  // Uncomment the below for debugging purposes if needed
  // app.on('*', async context => {
  //   context.log({ event: context.event, action: context.payload.action })
  // })

  app.on(['push'], async context => {
    const { payload } = context
    const { repository } = payload

    const defaultBranch = payload.ref === 'refs/heads/' + repository.default_branch
    if (!defaultBranch) {
      app.log.debug('Not working on the default branch, returning...')
      return
    }

    const settingsModified = payload.commits.find(commit => {
      return commit.added.includes(DEFAULT_CONFIG_FILE_PATH) ||
        commit.modified.includes(DEFAULT_CONFIG_FILE_PATH)
    })

    if (!settingsModified) {
      app.log.debug(`No changes in '${DEFAULT_CONFIG_FILE_PATH}' detected, returning...`)
      return
    }
    const repoConfig = await context.config(DEFAULT_CONFIG_FILE)
    const { owner, repo} = context.repo()
    await checkForConfigExistance(repoConfig, app, context, owner, repo)
    
  })

  
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
