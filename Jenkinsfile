pipeline {
    agent { label 'rdp-node' }  // Job RDP machine pe chalega

    triggers {
        githubPush()  // Trigger on GitHub push
        cron('H 2 * * *')   // Aur bhi run daily at 2 AM
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/saifdev9/creator-app',
                    credentialsId: 'github-pat'  // Jenkins me saved GitHub PAT
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                cd C:\\jenkins-agent\\workspace\\creator-app
                npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                bat '''
                cd C:\\jenkins-agent\\workspace\\creator-app
                npm test -- --watchAll=false
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                cd C:\\jenkins-agent\\workspace\\creator-app
                npm run build
                '''
            }
        }

        stage('Run App') {
            steps {
                bat '''
                cd C:\\jenkins-agent\\workspace\\creator-app
                npm start
                '''
            }
        }
    }
}
