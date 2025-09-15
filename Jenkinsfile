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
                    sh '/home/ubuntu/app/CICD-TudeDude/backend/venv/bin/python -m pip install -r requirements.txt'
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
                sh 'rsync -av --delete ./ /home/ubuntu/app/CICD-TudeDude/'
            }
        }

        // Stage 4: Restart the Application
        stage('Reload PM2') {
            steps {
                echo 'Reloading applications with PM2...'
                withEnv(['PM2_HOME=/home/ubuntu/.pm2']) {
                    sh 'cd /home/ubuntu/app/CICD-TudeDude/ && pm2 reload ecosystem.config.js'
                }
            }
        }
    }
}