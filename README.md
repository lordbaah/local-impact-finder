# Local Impact Finder (Smart City Hub)

A clean, modern React + Tailwind CSS web application that empowers local community members to identify, report, and prioritize urban issues under the 5 Smart City Tracks.

---

## 🚀 Setting Up & Deploying to GitHub & GitHub Pages

This project is pre-configured for automated and manual deployment to GitHub Pages. Follow these steps to set up your repository and deploy:

### Option 1: Automated Deployment via GitHub Actions (Recommended)

An automated GitHub Actions workflow is set up in `.github/workflows/deploy.yml`. Whenever you push code to `main` or `master` branches, GitHub will automatically build and publish your app.

1. **Create a new repository** on GitHub (e.g., named `local-impact-finder`).
2. **Initialize Git & push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with GitHub Pages setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/local-impact-finder.git
   git push -u origin main
   ```
3. **Enable Workflow Permissions on GitHub**:
   - Go to your GitHub repository -> **Settings** -> **Actions** -> **General**.
   - Under **Workflow permissions**, select **"Read and write permissions"** (this allows the workflow to commit the build outputs to the `gh-pages` branch).
   - Click **Save**.
4. **Configure GitHub Pages Source**:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment**, select **Deploy from a branch** as the Source.
   - Choose the `gh-pages` branch and `/ (root)` folder.
   - Click **Save**.

Your app will be live at: `https://YOUR_USERNAME.github.io/local-impact-finder/`

---

### Option 2: Manual Terminal Deployment (`gh-pages`)

If you prefer to deploy directly from your local command line, you can use the pre-configured deployment scripts:

1. **Add your GitHub repository remote**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/local-impact-finder.git
   ```
2. **Run the deployment script**:
   ```bash
   npm run deploy
   ```
   This script will automatically run `npm run build` (under `predeploy`) and push the compiled static output in `dist/` directly to your repository's `gh-pages` branch.

---

## 🛠️ Local Development

To run the application locally on your machine:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build Production Assets**:
   ```bash
   npm run build
   ```
