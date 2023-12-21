pipeline {
    agent any

    tools {
        // Spécifiez l'outil Docker avec le chemin
        dockerTool 'Docker' // Assurez-vous que 'Docker' correspond à l'outil configuré dans Jenkins
    }

    environment {
        // Initialisez vos variables globales ici
        IMAGE_NAME = 'votre_image'
        DOCKER_HUB_REGISTRY = 'maissabouaouja'
    }

    stages {
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
                // Assurez-vous que vous avez déjà effectué docker login avant cette étape
                script {
                    docker.build("$DOCKER_HUB_REGISTRY/$IMAGE_NAME")
                    docker.withRegistry("https://registry.hub.docker.com", "docker-hub-credentials") {
                        docker.push("$DOCKER_HUB_REGISTRY/$IMAGE_NAME")
                    }
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
