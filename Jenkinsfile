pipeline {
    agent any
    environment {
        HARBOR_REGISTRY = 'harbor.local'
        HARBOR_PROJECT = 'starbucks'
        IMAGE_NAME = 'coinflip'
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
        withCredentials([usernamePassword(credentialsId: 'github-pat', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
            sh """
                echo "Username: ${GIT_USERNAME}"
                echo "Token: ${GIT_TOKEN}"
                git config user.email "jenkins@example.com"
                git config user.name "Jenkins"
                git remote set-url origin https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/phamdung2312/CoinFilp.git
                git checkout main
                git pull origin main
                # Kiểm tra và chỉ commit nếu có thay đổi
                if ! grep -q "${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}" k8s/deployment.yaml; then
                    sed -i 's|image: .*|image: ${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}|' k8s/deployment.yaml
                    git add k8s/deployment.yaml
                    git commit -m "Update image tag to ${IMAGE_TAG}"
                    git push origin main
                else
                    echo "No image update needed"
                fi
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
