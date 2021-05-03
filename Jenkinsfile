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
                dir('ProjectOne') 
                {
                    bat 'npm install'
                    bat "copy D:\\Andrew\\Projects\\ProjectOne\\.env %CD%\\.env"
                    bat 'webpack --mode=development'
                    echo 'Start app in background...'
                    bat '%CD%/scripts/start-in-background.js'
                }
            }
        }
        stage('Test') {
            steps {
                dir('ProjectOne')
                {
                    bat 'npm test'
                }
            }
        }
    }
    post {
        always {
            dir('ProjectOne')
            {
                deleteDir()
            }
        }
    }
}