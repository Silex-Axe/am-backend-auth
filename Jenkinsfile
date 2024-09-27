pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        IMAGE_NAME = 'am-backend/auth-service'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull code from GitHub
                git branch: 'main', url: 'https://github.com/Silex-Axe/am-backend-auth.git'
            }
        }


        stage('Test') {
            steps {
                // Run tests (use npm for TypeScript projects)
                sh 'npm install'
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                // Build Docker image
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:$BUILD_NUMBER")
                }
            }
        }
        
       /** stage('Clean up') {
            steps {
                // Clean up workspace and remove unused Docker images
                sh 'docker system prune -f'
            }
        }*/
    }

    post {
        always {
            // Archive test results and cleanup
            junit '**/test-reports/*.xml'
            cleanWs()
        }
    }
}