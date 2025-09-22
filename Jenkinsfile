pipeline {
    agent any //macgine(node) where my pipeline stages actually run

       triggers {
        cron('H 2 * * *')   // Runs every day at 2 AM
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/saifdev9/creator-app'
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
