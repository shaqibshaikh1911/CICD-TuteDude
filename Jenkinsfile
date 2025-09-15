// Jenkinsfile (Final Version with Deploy Stage)
pipeline {
    agent any

    stages {
        // Stage 1: Set up the Python Backend
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo 'Installing Python packages...'
                    sh '/home/ubuntu/app/CICD-TudeDude/backend/venv/bin/pip install -r requirements.txt'
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

        // Stage 3: Deploy Code to Live Directory (THE NEW STAGE)
        stage('Deploy Code') {
            steps {
                echo 'Copying new code to the live application directory...'
                // This command syncs the files from the Jenkins workspace
                // to your live app folder.
                sh 'rsync -av --delete ./ /home/ubuntu/app/CICD-TudeDude/'
            }
        }

        // Stage 4: Restart the Application
        stage('Reload PM2') {
            steps {
                echo 'Reloading applications with PM2...'
                withEnv(['PM2_HOME=/home/ubuntu/.pm2']) {
                    sh 'pm2 reload ecosystem.config.js'
                }
            }
        }
    }
}