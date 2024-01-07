pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dh_cred')
        DOCKER_IMAGE_NAME = 'votre_image'
        DOCKER_PASSWORD = 'maissa123'
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Utilisation des informations d'identification Docker
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dh_cred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
                        
                        // Étape de construction de l'image Docker
                        sh "docker build -t $DOCKER_IMAGE_NAME ."

                        // Étape de connexion au registre Docker et pousser l'image
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                        sh "docker push $DOCKER_IMAGE_NAME"
                    }
                }
            }
        }
    }
}
