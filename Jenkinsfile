pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the application'
                script {
                    def dockerHome = tool 'docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                    sh "docker build -t ${env.DOCKER_HUB_REGISTRY}/${IMAGE_NAME}:${BUILD_ID} ."
                }
            }
        }
        // ... other stages
    }
}
