// Jenkinsfile (Final Version)
pipeline {
    agent any

    stages {
        // Stage 1: Set up the Python Backend
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo 'Installing Python packages...'
                    sh '/home/ubuntu/app/CICD-TuteDude/backend/venv/bin/pip install -r requirements.txt'
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

        // Stage 3: Restart the Application
        stage('Reload PM2') {
            steps {
                echo 'Reloading applications with PM2...'
                // THIS BLOCK IS THE FIX
                withEnv(['PM2_HOME=/home/ubuntu/.pm2']) {
                    sh 'pm2 reload ecosystem.config.js'
                }
            }
        }
    }
}