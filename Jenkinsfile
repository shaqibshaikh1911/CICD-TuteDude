pipeline {
  agent any
  environment {
    BASE_DIR = "/home/ubuntu/app/CICD-TuteDude"
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/usr/local/sbin"
    BRANCH = "main"
    REPO   = "https://github.com/shaqibshaikh1911/CICD-TuteDude.git"
  }
  options { timestamps() }  // removed ansiColor
  // You can keep this or even remove triggers entirely since your job already says "Started by GitHub push"
  triggers { pollSCM('') }

  stages {
    stage('Checkout') {
      steps {
        git branch: env.BRANCH, url: env.REPO
      }
    }
    stage('Sync to Deploy Dir') {
      steps {
        sh '''
          sudo mkdir -p /home/ubuntu/app
          sudo chown -R $(whoami):$(whoami) /home/ubuntu/app || true
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
          if ! command -v pm2 >/dev/null 2>&1; then
            echo "ERROR: pm2 not found. Install with: sudo npm i -g pm2"
            exit 1
          fi
          pm2 startOrReload "${BASE_DIR}/ecosystem.config.js" || pm2 start "${BASE_DIR}/ecosystem.config.js"
          pm2 save
          pm2 status
        '''
      }
    }
  }
  post {
    failure {
      sh 'pm2 logs --lines 100 || true'
    }
  }
}
