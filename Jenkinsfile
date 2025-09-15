pipeline {
  agent any
  environment {
    // Your PM2 ecosystem points here:
    BASE_DIR = "/home/ubuntu/app/CICD-TuteDude"
    // Make sure Jenkins can find Node/npm/pm2/python
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/usr/local/sbin"
    BRANCH = "main"
    REPO   = "https://github.com/shaqibshaikh1911/CICD-TuteDude.git"
  }
  options { ansiColor('xterm'); timestamps() }
  triggers {
    // Webhook-driven builds (no polling interval)
    pollSCM('')
  }
  stages {
    stage('Checkout') {
      steps {
        // Public repo => no credentials needed; if you add private, switch to SSH + creds
        git branch: env.BRANCH, url: env.REPO
      }
    }

    stage('Sync to Deploy Dir') {
      steps {
        sh '''
          # ensure target dir exists and Jenkins can write
          sudo mkdir -p /home/ubuntu/app
          sudo chown -R $(whoami):$(whoami) /home/ubuntu/app || true

          # rsync repo into the absolute path your ecosystem uses
          rsync -a --delete ./ "${BASE_DIR}/"
        '''
      }
    }

    stage('Backend: Python deps') {
      steps {
        sh '''
          set -e
          cd "${BASE_DIR}/backend"
          python3 -m venv venv
          . venv/bin/activate
          python -m pip install --upgrade pip
          pip install -r requirements.txt
        '''
      }
    }

    stage('Frontend: Node deps') {
      steps {
        sh '''
          set -e
          cd "${BASE_DIR}/frontend"
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('PM2 start/reload') {
      steps {
        sh '''
          # pm2 must already be installed system-wide
          if ! command -v pm2 >/dev/null 2>&1; then
            echo "ERROR: pm2 not found. Install with: sudo npm i -g pm2"
            exit 1
          fi

          # Use your ecosystem.js that references /home/ubuntu/app/CICD-TuteDude
          pm2 startOrReload "${BASE_DIR}/ecosystem.config.js" || pm2 start "${BASE_DIR}/ecosystem.config.js"
          pm2 save
          pm2 status
        '''
      }
    }
  }
  post {
    failure {
      // Helpful logs on failure
      sh 'pm2 logs --lines 100 || true'
    }
  }
}
