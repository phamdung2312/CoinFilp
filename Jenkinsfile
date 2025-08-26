pipeline {
    agent any

    environment {
        HARBOR_REGISTRY = 'harbor.local'
        HARBOR_PROJECT = 'starbucks'
        IMAGE_NAME = 'inventory-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = credentials('kubeconfig')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Harbor') {
            steps {
                script {
                    docker.withRegistry("http://${HARBOR_REGISTRY}", 'harbor-registry') {
                        docker.image("${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}").push()
                        docker.image("${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                script {
                    sh """
                        sed -i 's|image: .*|image: ${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}|' k8s/deployment.yaml
                        git add k8s/deployment.yaml
                        git commit -m "Update image tag to ${IMAGE_TAG}"
                        git push origin main
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}