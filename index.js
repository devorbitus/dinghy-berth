// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more

const yaml = require('js-yaml');
const { default_config_template } = require('./templates');


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
  const branch = `berthbot-config-template-${Math.floor(Math.random() * 9999)}`

  // Get current reference in Git
  const reference = await context.github.git.getRef({
    repo, // the repo
    owner, // the owner of the repo
    ref: 'heads/master'
  })
  // Create a branch
  await context.github.git.createRef({
    repo,
    owner,
    ref: `refs/heads/${branch}`,
    sha: reference.data.object.sha // accesses the sha from the heads/master reference we got
  })
  // create a new file
  await context.github.repos.createOrUpdateFile({
    repo,
    owner,
    path: '.github/berthbot.yml', // the path to your config file
    message: 'adds berthbot config template file', // a commit message
    content: Buffer.from(default_config_template).toString('base64'),
    // the content of your file, must be base64 encoded
    branch // the branch name we used when creating a Git reference
  })
  // create a PR from that branch with the commit of our added file
  await context.github.pulls.create({
    repo,
    owner,
    title: 'Adding berthbot config template file!', // the title of the PR
    head: branch, // the branch our chances are on
    base: 'master', // the branch to which you want to merge your changes
    body: 'Adds berthbot config template file!', // the body of your PR,
    maintainer_can_modify: true // allows maintainers to edit your app's PR
  })
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {

  app.log('Yay, the app was loaded!')
  
  // Opens a PR every time someone installs your app for the first time
  app.on(['installation.created','installation_repositories.added'], check)
  
  async function check (context) {
    // shows all repos you've installed the app on
    context.log(context.payload)

    const owner = context.payload.installation.account.login

    const repos = context.event == 'installation' ? context.payload.repositories : context.payload.repositories_added

    repos.forEach(async (repository) => {
      const repo = repository.name

      const repoConfig = await loadYaml(context, {owner, repo, path: '.github/berthbot.yml'})

      if (repoConfig == null) {
        // No config file found
        context.log('No config file found')

        const newContext = Object.create(context)
        newContext.repo = () => ({owner, repo})

        await sendConfigTemplate(newContext, owner, repo)
      } else {
        // Found a config file
        context.log(`Configuration file found for ${owner}/${repo}`)
      }
      
    })
  }

  app.on('*', async context => {
    context.log({ event: context.event, action: context.payload.action })
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
