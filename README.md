# GitHub Pull Request Naming Policy Action

> A GitHub Action to verify if a pull request title or body contains a valid regex pattern.

> This action is particularly useful for validating that pull request titles or bodies contain Azure Boards Work Item IDs or JIRA issue keys. This ensures that every pull request is associated with a tracked task or issue, improving project management and traceability when the respective GitHub integration is enabled.

- When a [branch protection](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) rule is configured and [`Require status checks before merging`](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#require-status-checks-before-merging) is enabled, this action can be used to enforce a naming policy for pull request titles or bodies.

## Usage

```yml
name: GitHub Pull Request Naming Policy Action

on:
  pull_request:
    types: [opened, edited, reopened, synchronize]

jobs:
  naming_policy_action:
    runs-on: ubuntu-latest

    steps:
      - name: Verify policy
        uses: nicklegan/github-pull-request-naming-policy-action@v1.0.0
        with:
          title-regex: '^AB#\d+'
          title-flags: 'i'
          title-error-message: 'The pull request title must match the following regex pattern to be valid:'
          # body-regex: 'AB#\d+'
          # body-flags: 'i'
          # body-error-message: 'The pull request body must match the following regex pattern to be valid:'
```

## Action inputs

| Name                  | Description                                                    | Default                                                                      | Required |
| :-------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------- | :------- |
| `title-regex`         | A regex string to match the pull request issue title           |                                                                              | `false`  |
| `title-flags`         | Optional flag for regex string e.g. `i` for case-insensitivity |                                                                              | `false`  |
| `title-error-message` | Custom error message for invalid pull request issue title      | `The pull request title must match the following regex pattern to be valid:` | `false`  |
| `body-regex`          | A regex string to match the pull request issue body            |                                                                              | `false`  |
| `body-flags`          | Optional flag for regex string e.g. `i` for case-insensitivity |                                                                              | `false`  |
| `body-error-message`  | Custom error message for invalid pull request body             | `The pull request body must match the following regex pattern to be valid:`  | `false`  |

## Regex examples

Regex example 1: `AB#1234` (Azure work item ID at the beginning of the title).

- `^AB#\d+`

Regex example 2: `AB#1234` (Azure work item ID somewhere present in the title or body).

- `AB#\d+`

Regex example 3: `ABC-1234` (JIRA issue key somewhere present in the title).

- `[A-Z]{3}-\d+`

:bulb: For more info about regular expressions visit [Regular-Expressions.info](https://www.regular-expressions.info)

## Resources

Available GitHub integrations to automatically link Azure Boards Work Items or JIRA issues to GitHub pull requests.

### Azure Boards

- [About Azure Boards-GitHub integration](https://learn.microsoft.com/en-us/azure/devops/boards/github)

### Jira

- [Integrate Jira Cloud with GitHub](https://support.atlassian.com/jira-cloud-administration/docs/integrate-jira-software-with-github)
- [Integrate Jira Data Center with GitHub using DVCS connector](https://confluence.atlassian.com/adminjiraserver/linking-github-accounts-1047552694.html)
