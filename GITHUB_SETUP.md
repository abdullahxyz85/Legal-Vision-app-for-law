# GitHub Repository Setup Instructions

Follow these steps to push your LegalVision project to GitHub:

## Step 1: Create a new repository on GitHub

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Enter "LegalVision" or "Law-Project" as the repository name
4. Add a description (optional): "AI Civic Copilot for legal guidance and document analysis"
5. Choose whether you want the repository to be public or private
6. Do NOT initialize the repository with README, .gitignore, or license (since we already have these files)
7. Click "Create repository"

## Step 2: Connect your local repository to GitHub

After creating the repository, GitHub will show you commands to push an existing repository.
Run the following commands in your terminal:

```bash
# Add the remote repository URL (replace USERNAME with your GitHub username and REPONAME with your repository name)
git remote add origin https://github.com/USERNAME/REPONAME.git

# Push your local repository to GitHub
git push -u origin master
```

## Step 3: Verify your repository

Go back to your GitHub repository page and refresh. You should now see all your project files there.

## Additional commands for future updates

After making changes to your project, use these commands to push them to GitHub:

```bash
# Check what files have changed
git status

# Add all changed files
git add .

# Commit your changes with a descriptive message
git commit -m "Describe your changes here"

# Push to GitHub
git push
```
