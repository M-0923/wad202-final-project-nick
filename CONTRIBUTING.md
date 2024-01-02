# Contributing to Nick Project

Thank you for your interest in contributing to Nick Project! This document outlines the guidelines for contributing to this project.

## Table of Contents

- Contributing to Nick Project
  - [Table of Contents](#table-of-contents)
  - [Branching Rules](#branching-rules)
    - [Types of Branches](#types-of-branches)
    - [Branch Naming Conventions](#branch-naming-conventions)
      - [Examples](#examples)
  - [Commit Convention](#commit-convention)
  - [Pull Requests](#pull-requests)
    - [For Team Members:](#for-team-members)
    - [For External Contributors:](#for-external-contributors)

## Branching Rules

### Types of Branches

- `main`: For production use. Only accepts PRs from `develop` (and `hotfix` in emergencies).
- `feature/`: Branches for developing new features or improvements.
- `hotfix/`: Branches for urgent fixes.
- `docs/`: Branches for documentation updates.

### Branch Naming Conventions

- Feature Addition: `feature/<issue_number>-<brief_description>` (develop ⇔ feature)
- Hotfix: `hotfix/<issue_number>-<brief_description>` (main ⇔ hotfix)
- Documentation Update: `docs/<issue_number>-<brief_description>` (develop ⇔ docs)

*Note: `<issue_number>-` can be omitted if the modification is not based on an issue.*


#### Examples

- feature/42-user-authentication
- hotfix/56-security-vulnerability-fix
- docs/108-update-installation-guide

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: Reverts a previous commit
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

If you are interested in the detailed specification you can visit:

- [Conventional Commits](https://www.conventionalcommits.org/)
- [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#commitlintconfig-conventional)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Pull Requests

### For Team Members:

1. Create a new branch from the `develop` branch, or from the `main` branch if you're working on a hotfix.
2. Follow the [Branch Naming Conventions](#branch-naming-conventions) while naming your branch.
3. Work on your changes locally.
4. Commit your changes, ensuring to follow the project's [commit message conventions](#commit-convention).
5. Push your branch to the repository.
6. Create a Pull Request against the original branch you branched from.
7. Await code review, and address any comments as necessary.

### For External Contributors:

1. Fork the repository to your own GitHub account.
2. Clone your forked repository locally.
3. Create a new branch from the `develop` branch on your fork.
4. Follow the [Branch Naming Conventions](#branch-naming-conventions) while naming your branch.
5. Work on your changes locally.
6. Commit your changes, ensuring to follow the project's [commit message conventions](#commit-convention).
7. Push your branch to your forked repository.
8. Create a Pull Request against the `develop` branch of the original repository.
9. Await code review, and address any comments as necessary.
