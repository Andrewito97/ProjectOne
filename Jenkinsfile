pipeline {
    agent any
    
    stages {
        stage('Pull changes') {
            steps {
                bat 'git clone https://github.com/AndrewLebowski/ProjectOne.git'
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                echo 'Start app in background...'
                bat 'scripts/start-in-background.js'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}