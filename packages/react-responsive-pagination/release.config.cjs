const { execSync } = require('child_process');

module.exports = isDryRun() ? getDryRunConfig() : getNormalConfig();

function getDryRunConfig() {
  return {
    repositoryUrl: getLocalRepoUrl(),
    branches: getCurrentBranch(),
    plugins: [
      ['@semantic-release/commit-analyzer', getCommitAnalyzerConfig()],
      '@semantic-release/release-notes-generator',
    ],
  };
}

function getNormalConfig() {
  return {
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'main',
      'next',
      'next-major',
      { name: 'beta', prerelease: true },
      { name: 'alpha', prerelease: true },
    ],
    plugins: [
      ['@semantic-release/commit-analyzer', getCommitAnalyzerConfig()],
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/changelog',
        {
          changelogTitle: '# React Responsive Pagination Changelog',
        },
      ],
      '@semantic-release/npm',
      '@semantic-release/github',
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json'],
          successComment: false,
        },
      ],
    ],
  };
}

function getCommitAnalyzerConfig() {
  return {
    preset: 'angular',
    releaseRules: [{ type: 'docs', scope: 'readme', release: 'patch' }],
  };
}

function isDryRun() {
  return process.argv.includes('--dry-run');
}

function getLocalRepoUrl() {
  const topLevelDir = execSync('git rev-parse --show-toplevel').toString().trim();

  return `file://${topLevelDir}/.git`;
}

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
