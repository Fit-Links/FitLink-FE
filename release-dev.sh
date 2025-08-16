#!/bin/bash
set -e

# Colors for readability
GREEN="\033[0;32m"
NC="\033[0m"

echo -e "${GREEN}🔄 Ensuring dev branch is up to date...${NC}"
git checkout dev
git pull origin dev

echo -e "${GREEN}📝 Creating a new changeset...${NC}"
pnpm changeset || {
  echo "⚠️ No changeset created. Aborting release."
  exit 1
}

echo -e "${GREEN}📦 Committing changeset...${NC}"
git add .changeset
git commit -m "chore: add changeset for release" || echo "No changes to commit."

echo -e "${GREEN}⬆️ Pushing dev branch...${NC}"
git push origin dev

echo -e "${GREEN}🔀 Creating PR from dev → main...${NC}"

# If GitHub CLI (gh) is installed, create PR automatically
if command -v gh &> /dev/null; then
  gh pr create --base main --head dev --title "Release: dev → main" --body "Automated release PR from dev."
else
  echo "⚠️ GitHub CLI not installed. Please open PR manually at:"
  echo "   https://github.com/Fit-links/FitLink-FE/compare/dev...main"
fi

echo -e "${GREEN}✅ Done! Review and merge the PR into main.${NC}"
