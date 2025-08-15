# ProjectUnBigTechify

A project to unbigtechify the web with custom search bangs and redirects.

## Features

- **DuckDuckGo Bangs**: Comprehensive collection of search shortcuts for DuckDuckGo
- **Custom Redirects**: User scripts for redirecting from big tech platforms to alternatives
- **Nitterify**: Tools for converting Twitter usernames to Nitter instances
- **URL Changers**: Bash scripts for URL manipulation

## GitHub Automation

This project automatically updates the DuckDuckGo bang list every month using GitHub Actions.

### How it works

1. **Monthly Schedule**: The workflow runs on the 1st of every month at 2 AM UTC
2. **Push Trigger**: Also runs when the workflow file itself is updated
3. **API Fetch**: Fetches the latest bang list from `https://duckduckgo.com/bang.js`
4. **Format Conversion**: Converts DuckDuckGo's format to our TypeScript format
5. **Auto-commit**: Automatically commits and pushes changes if updates are found
6. **Build Verification**: Runs build process to ensure everything works

### Workflow Options

#### Option 1: Direct Push (`.github/workflows/update-ddg-bangs.yml`) ⭐ **Recommended**
- Updates bangs and pushes directly to main branch
- **Triggers**: Monthly schedule + when workflow file is updated
- **Use case**: Works with your current setup, matches proven pattern

#### Option 2: Simple Direct Push (`.github/workflows/update-ddg-bangs-simple.yml`)
- Alternative workflow with same functionality
- **Triggers**: Monthly schedule + when workflow file is updated
- **Use case**: Backup option, same proven pattern

#### Option 3: Pull Request (`.github/workflows/update-ddg-bangs-pr.yml`)
- Updates bangs and creates pull requests using Personal Access Token
- **Requires**: `PAT_TOKEN` secret in repository settings
- **Use case**: If you prefer PR workflow over direct push

### Manual Trigger

You can manually trigger the update by:
1. Going to the Actions tab in GitHub
2. Selecting the "Update Bang List" workflow
3. Clicking "Run workflow"

### Protected Branches

If you're getting errors about protected branches, see [PROTECTED_BRANCHES.md](PROTECTED_BRANCHES.md) for detailed solutions.

**Note**: The direct push workflows work best when your main branch allows pushes from GitHub Actions. If you have strict branch protection, you may need to adjust your repository settings.

### Workflow Files

- `.github/workflows/update-ddg-bangs.yml` - Main workflow (recommended)
- `.github/workflows/update-ddg-bangs-simple.yml` - Alternative workflow
- `.github/workflows/update-ddg-bangs-pr.yml` - Pull request workflow (requires PAT_TOKEN)
- `scripts-for-workflow/update-ddg-bangs.js` - Node.js script for fetching and converting bangs
- `src/bang.ts` - Auto-generated TypeScript file with all bangs

## Development

### Prerequisites

- Node.js 18+ (for running the update script locally)

### Local Development

```bash
# Update bangs locally
npm run update-bangs

# Build project
npm run build

# Validate current bang list
npm run validate-bangs

# Test DuckDuckGo API connectivity
npm run test-api
```

## Documentation

- [GitHub Automation Guide](GITHUB_AUTOMATION.md) - Detailed automation documentation
- [Protected Branches Guide](PROTECTED_BRANCHES.md) - Solutions for branch protection issues
- [Quick Setup Guide](QUICK_SETUP.md) - Get started quickly with minimal configuration

## License

MIT License - see LICENSE file for details.
