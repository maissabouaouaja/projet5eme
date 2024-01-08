pipeline {
    agent any
    parameters {
        string(name: 'K8S_NAMESPACE', defaultValue: 'default', description: 'Kubernetes namespace')
        string(name: 'BRANCH_NAME', defaultValue: '', description: 'Git branch name')
    }
    environment {
        // Variables globales
        IMAGE_NAME = 'votre_image'  // Correction : remplacez l'espace par un underscore dans le nom de l'image
        DOCKER_HUB_REGISTRY = 'maissabouaouja'
        DOCKER_HUB_PASSWORD = credentials('maissa123')
        KUBECONFIG = "${JENKINS_HOME}/.kube/config"  // Ajout : spécifiez le chemin du fichier de configuration kubeconfig
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

        stage('Déploiement sur Kubernetes') {
            steps {
                script {
                    def kubernetesNamespace = params.K8S_NAMESPACE
                    echo "Déploiement sur le namespace Kubernetes : ${kubernetesNamespace}"
                    sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s -n $kubernetesNamespace"  // Modification : utilisez un chemin absolu pour kubeconfig
                    sh "kubectl --kubeconfig=${KUBECONFIG} rollout status deployment <deployment> -n $kubernetesNamespace"  // Modification : remplacez <deployment> par le nom de votre déploiement
                }
            }
        }

        stage('Nettoyage') {
            steps {
                script {
                    echo "Nettoyage si nécessaire..."
                    sh "kubectl --kubeconfig=${KUBECONFIG} delete -f k8s -n $kubernetesNamespace"
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
