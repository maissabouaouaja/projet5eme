pipeline {
    agent any

    environment {
        // Initialisez vos variables globales ici
        IMAGE_NAME = 'votre_image'
        DOCKER_HUB_REGISTRY = 'maissabouaouja'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out SCM'
                checkout scm
            }
        }

        stage('Initialization') {
            steps {
                echo 'Initializing global variables'
                // Vous pouvez ajouter ici des commandes d'initialisation de variables globales
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application'
                // Ajoutez ici les commandes de build de votre application
                // Exemple : mvn clean install pour un projet Java avec Maven
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests'
                // Ajoutez ici les commandes de test de votre application
                // Exemple : mvn test pour un projet Java avec Maven
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing the application image to DockerHub'
                script {
                    def dockerHome = tool 'docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"

                    // Log in to DockerHub
                    sh "docker login -u ${DOCKER_HUB_REGISTRY} -p 3DF8etKp"

                    // Build and push the Docker image
                    sh "docker build -t ${DOCKER_HUB_REGISTRY}/${IMAGE_NAME} ."
                    sh "docker push ${DOCKER_HUB_REGISTRY}/${IMAGE_NAME}"

                    // Log out from DockerHub
                    sh 'docker logout'
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up'
                // Ajoutez ici les commandes de nettoyage après le déploiement
                // Exemple : supprimer les artefacts temporaires ou les conteneurs inutiles
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
