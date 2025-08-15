# Quick Setup Guide

This guide helps you get the GitHub automation working quickly with minimal configuration.

## 🚀 **Option 1: Direct Push (Recommended - Matches Your Working Pattern)**

**File**: `.github/workflows/update-ddg-bangs.yml`

**What it does**:
- ✅ Works with your current setup
- ✅ Matches proven pattern from your other project
- ✅ No additional secrets needed
- ✅ Direct push to main branch
- ✅ Triggers on workflow file updates

**How to use**:
1. Go to **Actions** tab in your repository
2. Select **"Update Bang List"**
3. Click **"Run workflow"**
4. That's it! No configuration needed

**Why this is recommended**:
- Matches the exact pattern that works in your other project
- Simple and straightforward
- No complex PR creation
- Triggers automatically when you update the workflow

## 🔄 **Option 2: Alternative Direct Push**

**File**: `.github/workflows/update-ddg-bangs-simple.yml`

**What it does**:
- ✅ Same functionality as Option 1
- ✅ Backup workflow option
- ✅ Same proven pattern

## 🔑 **Option 3: Pull Request with Personal Access Token**

**File**: `.github/workflows/update-ddg-bangs-pr.yml`

**What it does**:
- ✅ Creates pull requests instead of direct push
- ✅ Works with strict branch protection
- ⚠️ Requires PAT_TOKEN secret

## 🛠️ **Quick Setup Steps**

### **Step 1: Use the Working Pattern**

**Start with Option 1** - it matches your proven workflow from the other project!

### **Step 2: Test the Workflow**

1. Go to **Actions** tab
2. Select **"Update Bang List"**
3. Click **"Run workflow"**
4. Watch it execute
5. Check for any errors

### **Step 3: Verify It Works**

- **Success**: You'll see changes committed and pushed to main branch
- **Failure**: Check the Actions logs for error messages

## 🔧 **If You Need PAT_TOKEN (Option 3)**

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

- [ ] **"Protected branch update failed"**
  - Solution: Use Option 3 (Pull Request workflow)
  - Or adjust branch protection settings

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

1. **Start with Option 1** - it matches your working pattern!
2. **Test manually** first to make sure everything works
3. **Let it run monthly** on the scheduled cron
4. **Monitor Actions tab** for any issues
5. **Use Option 3** only if you need PR workflow

## 🚨 **Important Notes**

- **Option 1 matches your working pattern** from the other project
- **Monthly schedule** runs automatically on 1st of each month
- **Push trigger** runs when workflow file is updated
- **Workflows can be run manually** anytime via Actions tab
- **Direct push** works best when GitHub Actions can push to main

## 🆘 **Need Help?**

1. Check the **Actions tab** for error messages
2. Look at **workflow logs** for detailed information
3. See [PROTECTED_BRANCHES.md](PROTECTED_BRANCHES.md) for detailed solutions
4. Check [GITHUB_AUTOMATION.md](GITHUB_AUTOMATION.md) for full documentation

**Option 1 should work immediately since it matches your proven pattern from the other project!**
