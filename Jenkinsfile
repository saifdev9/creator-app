pipeline {
    agent { label 'rdp-node' }

    triggers {
        githubPush()
        cron('H 2 * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/saifdev9/creator-app',
                    credentialsId: 'github-pat'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                cd %WORKSPACE%
                npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                bat '''
                cd %WORKSPACE%
                npm test -- --watchAll=false
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                cd %WORKSPACE%
                npm run build
                '''
            }
        }

        stage('Run App') {
            steps {
                bat '''
                cd %WORKSPACE%
                npm run dev
                '''
            }
        }
    }
}
