module.exports = {
  apps: [
    {
      name: 'flask-backend',
      cwd: './backend',
      script: 'python3',
      args: 'app.py',
      interpreter: '',
      env: {
        FLASK_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'express-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        API_URL: 'http://localhost:5000'
      }
    }
  ]
};