pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/saifdev9/todos-next-ts'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test -- --watchAll=false'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
}
