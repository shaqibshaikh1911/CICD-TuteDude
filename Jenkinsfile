// Jenkinsfile
pipeline {
    agent any // This job can run on any available machine

    stages {
        // Stage 1: Get the newest code from GitHub
        stage('Checkout Code') {
            steps {
                echo 'Pulling the latest code from GitHub...'
                git 'https://github.com/shaqibshaikh1911/CICD-TuteDude.git'
            }
        }

        // Stage 2: Set up the Python Backend
        stage('Install Backend Dependencies') {
            steps {
                // We run the commands inside the 'backend' folder
                dir('backend') {
                    echo 'Installing Python packages...'
                    // Use the full path to pip to avoid venv issues
                    sh '/home/ubuntu/app/CICD-TuteDude/backend/venv/bin/pip install -r requirements.txt'
                }
            }
        }

        // Stage 3: Set up the Node.js Frontend
        stage('Install Frontend Dependencies') {
            steps {
                // We run the commands inside the 'frontend' folder
                dir('frontend') {
                    echo 'Installing Node.js packages...'
                    sh 'npm install'
                }
            }
        }

        // Stage 4: Restart the Application
        stage('Reload PM2') {
            steps {
                echo 'Reloading applications with PM2...'
                // This command safely reloads both apps using your config file
                sh 'pm2 reload ecosystem.config.js'
            }
        }
    }
}