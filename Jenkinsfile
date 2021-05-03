pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat "copy D:\\Andrew\\Projects\\ProjectOne\\.env %CD%\\.env"
                bat 'webpack --mode=development'
                echo 'Start app in background...'
                bat '%CD%/scripts/start-in-background.js'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}