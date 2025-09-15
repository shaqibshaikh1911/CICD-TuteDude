// Jenkinsfile (Final, most robust version)
pipeline {
    agent any

    stages {
        // Stage 1: Set up the Python Backend
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo 'Installing Python packages...'
                    // THIS IS THE CHANGED COMMAND
                    sh '/home/ubuntu/app/CICD-TuteDude/backend/venv/bin/python -m pip install -r requirements.txt'
                }
            }
        }

        // Stage 2: Set up the Node.js Frontend
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    echo 'Installing Node.js packages...'
                    sh 'npm install'
                }
            }
        }

        // Stage 3: Deploy Code to Live Directory
        stage('Deploy Code') {
    steps {
        echo 'Copying new code to the live application directory...'
        sh '''
          set -e
          DEST="/home/ubuntu/app/CICD-TuteDude"

          rsync -rlptDz --delete \
            --no-owner --no-group \
            --exclude ".git/" \
            --exclude "backend/venv/" \
            --exclude "frontend/node_modules/" \
            ./ "$DEST/"
        '''
    }
}
