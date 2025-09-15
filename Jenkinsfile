pipeline {
  agent any
  environment {
    BASE_DIR = "/home/ubuntu/app/CICD-TuteDude"
    PATH     = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/usr/local/sbin"
    BRANCH   = "main"
    REPO     = "https://github.com/shaqibshaikh1911/CICD-TuteDude.git"
  }

  // Add a global timeout so nothing can run forever
  options {
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
    // optional, avoids duplicate "Declarative: Checkout SCM" when job does its own checkout
    skipDefaultCheckout(true)
  }

  // Rely on GitHub webhook in the job config; no polling from here
  // (Remove this block entirely if you already ticked "GitHub hook trigger" in the job UI.)
  // triggers { pollSCM('') }

  stages {
    stage('Checkout') {
      steps {
        git branch: env.BRANCH, url: env.REPO
      }
    }

    stage('Sync to Deploy Dir') {
      steps {
        sh '''
          # Directory should be owned by the Jenkins user already.
          # If not, run once on the box: sudo mkdir -p /home/ubuntu/app && sudo chown -R jenkins:jenkins /home/ubuntu/app
          mkdir -p /home/ubuntu/app
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
            npm ci --no-audit --no-fund
          else
            npm install --no-audit --no-fund
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

          pm2 startOrReload "${BASE_DIR}/ecosystem.config.js" --update-env || pm2 start "${BASE_DIR}/ecosystem.config.js"
          pm2 save
          pm2 status
        '''
      }
    }
  }

  post {
    failure {
      // Make logs finite; --nostream makes pm2 exit after printing
      sh 'pm2 logs --lines 200 --nostream || true'
    }
    always {
      // Small, finite tail of console logs for both apps (optional)
      sh '''
        pm2 jlist || true
        pm2 describe flask-backend || true
        pm2 describe express-frontend || true
      '''
    }
  }
}
