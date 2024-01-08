pipeline {
    agent any
    parameters {
        string(name: 'K8S_NAMESPACE', defaultValue: 'default', description: 'Kubernetes namespace')
        string(name: 'BRANCH_NAME', defaultValue: '', description: 'Git branch name')
    }
    environment {
        // Variables globales
        IMAGE_NAME = 'image'.replaceAll(' ', '_')  // Correction : remplacez l'espace par un underscore dans le nom de l'image
        DOCKER_HUB_REGISTRY = 'maissabouaouja'
        KUBECONFIG = "${JENKINS_HOME}/.kube/config"  // Ajout : spécifiez le chemin absolu du fichier de configuration kubeconfig

        // Utilisez le plugin Credentials pour définir les informations d'identification Docker Hub
        DOCKER_HUB_CREDENTIALS = credentials('maissa123')
    }

    stages {
        stage('Initialisation des variables globales') {
            steps {
                script {
                    echo "Initialisation des variables globales..."
                    // Ajoutez ici d'autres initialisations de variables globales si nécessaire
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
                    // Utilisez les informations d'identification Docker Hub
                    sh "docker login -u ${DOCKER_HUB_REGISTRY} -p ${DOCKER_HUB_CREDENTIALS}"
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
                    sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s -n $kubernetesNamespace"
                    sh "kubectl --kubeconfig=${KUBECONFIG} rollout status deployment ${IMAGE_NAME} -n $kubernetesNamespace"
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
            script {
                echo "Étapes à exécuter toujours..."
                // Ajoutez ici des étapes à exécuter toujours, par exemple, nettoyer les ressources temporaires
            }
        }
    }
}
