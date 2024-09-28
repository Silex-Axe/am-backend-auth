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

stage('Install Dependencies') {
            steps {
                // Install dependencies before running tests
                sh 'npm install'
            }
        }
        stage('Run Unit Tests') {
            steps {
                // Run tests (use npm for TypeScript projects)
                sh 'npm run test'
            }
        }

        stage('Docker Image') {
            steps {
                // Build Docker image
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:$BUILD_NUMBER")
                }
            }
        }
        
       /**
       stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
            
        stage('Clean up') {
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

        failure {
            // Notify on failure (email, Slack, etc.)
            echo "Pipeline failed"
        }
    }
}