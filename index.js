const core = require('@actions/core')
const eventPayload = require(process.env.GITHUB_EVENT_PATH)
const titleRegex = core.getInput('title-regex') || ''
const titleFlags = core.getInput('title-flags') || ''
const titleErrmsg = core.getInput('title-error-message') || 'The pull request title must match the following regex pattern to be valid:'
const bodyRegex = core.getInput('body-regex') || ''
const bodyFlags = core.getInput('body-flags') || ''
const bodyErrmsg = core.getInput('body-error-message') || 'The pull request body must match the following regex pattern to be valid:'

const reTitle = new RegExp(titleRegex, titleFlags)
const reBody = new RegExp(bodyRegex, bodyFlags)

;(async () => {
  try {
    const title = eventPayload.pull_request.title
    const body = eventPayload.pull_request.body

    if (reTitle.test(title) === false) {
      core.setFailed(titleErrmsg + ' regex: ' + titleRegex + ' flags: ' + titleFlags)
    }
    if (reBody.test(body) === false) {
      core.setFailed(bodyErrmsg + ' regex: ' + bodyRegex + ' flags: ' + bodyFlags)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
})()
