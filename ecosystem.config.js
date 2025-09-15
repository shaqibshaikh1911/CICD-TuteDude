module.exports = {
  apps: [
    {
      name: 'flask-backend',
      cwd: '/home/ubuntu/app/CICD-TuteDude/backend',
      script: '/home/ubuntu/app/CICD-TuteDude/backend/venv/bin/python',
      args: 'app.py',
      env: {
        FLASK_ENV: 'production'
      }
    },
    {
      name: 'express-frontend',
      cwd: '/home/ubuntu/app/CICD-TuteDude/frontend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000
      }
    }
  ]
};