Project running Screenshot : https://docs.google.com/document/d/1cR6ymgkHfpPzajBNl9kfgeNmcLL6ip_SaEzabjBUC8k/edit?usp=sharing

CI/CD for Flask & Express using Jenkins + PM2

This repository demonstrates a CI/CD pipeline for deploying both a Flask (Python) backend and an Express (Node.js) frontend using Jenkins and PM2 on an AWS EC2 instance.

Project Structure

Backend (Flask): backend/

Frontend (Express): frontend/

Deployment Notes & Installation Scripts: notes/

The CI/CD uses Jenkins Pipelines and PM2 to deploy on an EC2 instance.

steps : 1

I have floder name the notes with have installaiton command for deploying app

Prerequisites
1 - node installation
    sudo apt update
    sudo apt install -y nodejs npm

2 - python installation
    sudo apt install -y python3 python3-pip

3 - process manager installtion (pm2)
    sudo npm install -g pm2

4 - jenkins installation 
    # Add Jenkins repo & key
  curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
  echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

    # Install Jenkins
    sudo apt update
    sudo apt install -y openjdk-17-jdk jenkins


steps : 2

create the Jenkins jobs name is CICD-Pipeline --> item type [pipeline] --> pipeline defination --> script from SCM "Jenkinsfile"

Step : 3

create a webhook which sent the push event to the pipeline to run the build and deploy .

step : 4 

Almost Done ! just done chnage and push the code build will and deploy 
