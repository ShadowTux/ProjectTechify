# Protected Branches and GitHub Automation

This document explains how to handle protected branches when using the automated DuckDuckGo bang list updates.

## The Problem

When your `main` branch is protected (which is a good security practice), the GitHub Actions workflow cannot push directly to it. This results in an error like:

```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: Changes must be made through a pull request.
```

## Solutions

### Option 1: Use Pull Request Workflow (Recommended)

We've created a separate workflow that creates pull requests instead of pushing directly:

**File**: `.github/workflows/update-ddg-bangs-pr.yml`

**How it works**:
1. Fetches latest bangs from DuckDuckGo
2. Creates a new branch with timestamp
3. Commits changes to that branch
4. Creates a pull request for review
5. You can review and merge manually

**To use this workflow**:
1. Go to Actions tab in GitHub
2. Select "Update Bang List (Pull Request)"
3. Click "Run workflow"

### Option 2: Configure Personal Access Token

If you want the original workflow to work with protected branches:

1. **Create a Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` scope
   - Copy the token

2. **Add to Repository Secrets**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Create a new secret named `PAT_TOKEN`
   - Paste your personal access token

3. **Update the workflow**:
   - Change `token: ${{ secrets.GITHUB_TOKEN }}` to `token: ${{ secrets.PAT_TOKEN }}`

**⚠️ Security Note**: Personal access tokens have broader permissions and should be used carefully.

### Option 3: Modify Branch Protection Rules

You can modify your branch protection to allow GitHub Actions to push:

1. Go to repository Settings → Branches
2. Click on the protection rule for `main`
3. Uncheck "Restrict pushes that create files that are larger than 100 MB"
4. Or add a specific exception for GitHub Actions

**⚠️ Security Note**: This reduces the security benefits of branch protection.

## Current Workflow Status

### Original Workflow (`.github/workflows/update-ddg-bangs.yml`)
- ✅ Fetches and updates bangs
- ✅ Validates changes
- ❌ Cannot push to protected branches
- ⚠️ Requires manual intervention

### Pull Request Workflow (`.github/workflows/update-ddg-bangs-pr.yml`)
- ✅ Fetches and updates bangs
- ✅ Validates changes
- ✅ Creates pull requests
- ✅ Works with protected branches
- ✅ Provides review process

## Recommended Approach

1. **Use the Pull Request workflow** for monthly updates
2. **Keep branch protection enabled** for security
3. **Review and merge PRs** manually when ready
4. **Monitor the Actions tab** for workflow status

## Manual Steps (if needed)

If both workflows fail, you can manually update:

```bash
# Clone your repository
git clone https://github.com/yourusername/ProjectUnBigTechify.git
cd ProjectUnBigTechify

# Install dependencies
npm install

# Update bangs
npm run update-bangs

# Validate
npm run validate-bangs

# Create branch and PR
git checkout -b update-bangs-manual
git add src/bang.ts
git commit -m "chore: manual bang list update"
git push --set-upstream origin update-bangs-manual
```

Then create a pull request on GitHub.

## Troubleshooting

### Common Issues

1. **"Changes must be made through a pull request"**
   - Use the PR workflow instead
   - Or configure PAT_TOKEN secret

2. **"Permission denied"**
   - Check repository permissions
   - Verify token has correct scope

3. **"Branch protection rule"**
   - Use PR workflow
   - Or modify protection rules

### Debug Commands

```bash
# Check branch protection
gh api repos/:owner/:repo/branches/main/protection

# Check workflow permissions
gh api repos/:owner/:repo/actions/permissions

# Test token access
gh auth status
```

## Security Best Practices

1. **Keep branch protection enabled**
2. **Use pull requests for changes**
3. **Review all automated changes**
4. **Limit token permissions**
5. **Rotate tokens regularly**

## Summary

- **Protected branches are good** - keep them
- **Use the PR workflow** for automated updates
- **Review changes before merging**
- **Monitor workflow execution**
- **Have manual fallback ready**
