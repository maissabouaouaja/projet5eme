pipeline {
    agent any

    environment {
        // Variables globales
        IMAGE_NAME = 'votre_nouvelle_image:version'
        DOCKER_HUB_REGISTRY = 'maissabouaouja'
        DOCKER_HUB_PASSWORD = credentials('maissa123')
    }

    stages {
        stage('Initialisation des variables globales') {
            steps {
                script {
                    echo "Initialisation des variables globales..."
                    // Vous pouvez ajouter ici d'autres initialisations de variables globales si nécessaire
                }
            }
        }

        stage('Build de l\'image Docker') {
            steps {
                script {
                    echo "Construction de l'image Docker..."
                    // Assurez-vous que Docker est installé sur votre agent Jenkins
                    sh "docker build -t ${DOCKER_HUB_REGISTRY}/${IMAGE_NAME} ."
                }
            }
        }

        stage('Tests unitaires ou d\'intégration') {
            steps {
                script {
                    echo "Exécution des tests unitaires ou d'intégration..."
                    // Ajoutez ici vos commandes pour exécuter les tests
                }
            }
        }

        stage('Login au registre Docker Hub') {
            steps {
                script {
                    echo "Connexion au registre Docker Hub..."
                    // Vous pouvez utiliser la variable d'environnement pour le mot de passe sécurisé
                    sh "docker login -u ${DOCKER_HUB_REGISTRY} -p ${DOCKER_HUB_PASSWORD}"
                }
            }
        }

        stage('Push de l\'image vers Docker Hub') {
            steps {
                script {
                    echo "Pousser l'image vers Docker Hub..."
                    sh "docker push ${DOCKER_HUB_REGISTRY}/${IMAGE_NAME}"
                }
            }
        }

        stage('Nettoyage') {
            steps {
                script {
                    echo "Nettoyage si nécessaire..."
                    // Ajoutez ici des commandes pour le nettoyage si nécessaire
                }
            }
        }
    }

    post {
        always {
            // Ajoutez ici des étapes à exécuter toujours, par exemple, nettoyer les ressources temporaires
        }
    }
}
