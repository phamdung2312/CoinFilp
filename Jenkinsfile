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
                withCredentials([sshUserPrivateKey(credentialsId: 'git-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        git config user.email "jenkins@example.com"
                        git config user.name "Jenkins"
                        git remote set-url origin git@github.com:phamdung2312/CoinFilp.git
                        sed -i 's|image: .*|image: ${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}|' k8s/deployment.yaml
                        git add k8s/deployment.yaml
                        git commit -m "Update image tag to ${IMAGE_TAG}" || echo "No changes to commit"
                        GIT_SSH_COMMAND="ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" git push origin main
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
