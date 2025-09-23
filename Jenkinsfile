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
                    sh '''
                        git config user.email "jenkins@example.com"
                        git config user.name "Jenkins"
                        git remote set-url origin "https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/phamdung2312/CoinFilp.git"
                        git checkout main
                        git pull origin main
                        # Lấy giá trị image hiện tại
                        CURRENT_IMAGE=$(grep "image:" k8s/deployment.yaml | sed 's|image: ||' | xargs)
                        NEW_IMAGE="${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
                        if [ "$CURRENT_IMAGE" != "$NEW_IMAGE" ]; then
                            sed -i "s|image: .*|image: $NEW_IMAGE|" k8s/deployment.yaml
                            git add k8s/deployment.yaml
                            git commit -m "Update image tag to ${IMAGE_TAG}"
                            git push origin main
                        else
                            echo "Image tag ${IMAGE_TAG} already applied, no update needed"
                        fi
                    '''
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
