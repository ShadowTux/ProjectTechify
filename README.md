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
2. **API Fetch**: Fetches the latest bang list from `https://duckduckgo.com/bang.js`
3. **Format Conversion**: Converts DuckDuckGo's format to our TypeScript format
4. **Auto-commit**: Automatically commits and pushes changes if updates are found
5. **Build Verification**: Runs build process to ensure everything works

### Manual Trigger

You can manually trigger the update by:
1. Going to the Actions tab in GitHub
2. Selecting "Update Bang List" workflow
3. Clicking "Run workflow"

### Workflow Files

- `.github/workflows/update-ddg-bangs.yml` - GitHub Actions workflow
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
```

## License

MIT License - see LICENSE file for details.
