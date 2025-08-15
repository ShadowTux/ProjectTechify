# Quick Setup Guide

This guide helps you get the GitHub automation working quickly with minimal configuration.

## 🚀 **Option 1: Simple Pull Request (Recommended - No Setup Required)**

**File**: `.github/workflows/update-ddg-bangs-simple.yml`

**What it does**:
- ✅ Works with protected branches
- ✅ No additional secrets needed
- ✅ Creates pull requests automatically
- ✅ Uses standard GitHub Actions permissions

**How to use**:
1. Go to **Actions** tab in your repository
2. Select **"Update Bang List (Simple PR)"**
3. Click **"Run workflow"**
4. That's it! No configuration needed

**Why this is recommended**:
- No personal access tokens to manage
- No security risks from broad permissions
- Works immediately with your current setup
- Uses battle-tested `create-pull-request` action

## 🔑 **Option 2: Pull Request with Personal Access Token**

**File**: `.github/workflows/update-ddg-bangs-pr.yml`

**What it does**:
- ✅ Works with protected branches
- ✅ Creates pull requests using GitHub CLI
- ⚠️ Requires PAT_TOKEN secret

**Setup required**:
1. Create Personal Access Token (see below)
2. Add `PAT_TOKEN` to repository secrets
3. Use the workflow

## 📤 **Option 3: Direct Push (Only for Unprotected Branches)**

**File**: `.github/workflows/update-ddg-bangs.yml`

**What it does**:
- ✅ Pushes directly to main branch
- ❌ Only works if main branch is not protected
- ⚠️ Not recommended for production repositories

## 🛠️ **Quick Setup Steps**

### **Step 1: Choose Your Workflow**

**For most users**: Use **Option 1** (Simple Pull Request) - no setup needed!

**If you want more control**: Use **Option 2** (requires PAT_TOKEN)

**If you have unprotected branches**: Use **Option 3**

### **Step 2: Test the Workflow**

1. Go to **Actions** tab
2. Select your chosen workflow
3. Click **"Run workflow"**
4. Watch it execute
5. Check for any errors

### **Step 3: Verify It Works**

- **Success**: You'll see a new pull request created
- **Failure**: Check the Actions logs for error messages

## 🔧 **If You Need PAT_TOKEN (Option 2)**

### **Create Personal Access Token**:
1. Go to **GitHub.com** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. **Note**: "ProjectUnBigTechify Automation"
4. **Expiration**: 90 days (recommended)
5. **Scopes**: Check `repo` and `workflow`
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

### **Add to Repository Secrets**:
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. **Name**: `PAT_TOKEN`
4. **Value**: Paste the token you copied
5. Click **"Add secret"**

## 📋 **Troubleshooting Checklist**

### **Common Issues**:

- [ ] **"Input required and not supplied: token"**
  - Solution: Use Option 1 (Simple PR) instead
  - Or configure PAT_TOKEN secret

- [ ] **"Protected branch update failed"**
  - Solution: Use any of the PR workflows (Options 1 or 2)

- [ ] **"Permission denied"**
  - Solution: Check repository permissions
  - Verify token has correct scope

- [ ] **"Workflow not found"**
  - Solution: Make sure workflow files are committed to main branch

### **Debug Steps**:
1. Check **Actions** tab for error messages
2. Look at **workflow logs** for specific errors
3. Verify **repository permissions** are correct
4. Test with **manual workflow trigger**

## 🎯 **Recommended Approach**

1. **Start with Option 1** (Simple PR) - it just works!
2. **Test manually** first to make sure everything works
3. **Let it run monthly** on the scheduled cron
4. **Review PRs** before merging
5. **Monitor Actions tab** for any issues

## 🚨 **Important Notes**

- **Keep branch protection enabled** - it's good security
- **Review all PRs** before merging, even automated ones
- **Monthly schedule** runs automatically on 1st of each month
- **Workflows can be run manually** anytime via Actions tab
- **All workflows validate** the bang list before creating PRs

## 🆘 **Need Help?**

1. Check the **Actions tab** for error messages
2. Look at **workflow logs** for detailed information
3. See [PROTECTED_BRANCHES.md](PROTECTED_BRANCHES.md) for detailed solutions
4. Check [GITHUB_AUTOMATION.md](GITHUB_AUTOMATION.md) for full documentation

**The Simple PR workflow (Option 1) should work immediately with your current setup!**
