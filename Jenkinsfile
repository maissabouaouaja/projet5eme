pipeline {
agent any

environment {
// Initialisez vos variables globales ici
IMAGE_NAME = 'votre_image'  // Ajustez le nom de l'image si nécessaire
// Les credentials DockerHub seront récupérés à partir de la variable d'authentification
}

triggers {
pollSCM('*/5 * * * *')  // Vérifier toutes les 5 minutes
}

stages {
stage('Checkout SCM') {
agent any
steps {
echo 'Checking out SCM'
checkout scm
}
}

stage('Initialization') {
    steps {
        echo 'Initializing global variables'
        withCredentials([usernamePassword(credentialsId: 'maissabouaouja', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
            script {
                // Export des variables pour utilisation dans les autres étapes
                sh "export DOCKER_HUB_REGISTRY=${DOCKER_HUB_USERNAME}"
            }
        }
    }
}

stage('Build') {
    steps {
        echo 'Building the application'
        // Ajoutez ici les commandes de build de votre application
        // Exemple : mvn clean install pour un projet Java avec Maven

        // Build de l'image Docker en utilisant les variables récupérées
        script {
            env.PATH = "${tool 'docker'}/bin:${env.PATH}"
            sh "docker build -t ${env.DOCKER_HUB_REGISTRY}/${IMAGE_NAME}:${BUILD_ID} ."
        }
    }
}

stage('Test') {
    steps {
        echo 'Testing the application'
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

            // Authentification à DockerHub en utilisant les variables récupérées
            sh "echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USERNAME} --password-stdin"

            // Push de l'image Docker
            sh "docker push ${env.DOCKER_HUB_REGISTRY}/${IMAGE_NAME}:${BUILD_ID}"
        }
    }
}

stage('Deploy to other environment') {
    steps {
        echo 'Deploying the application to other environment'
        // Ajoutez ici les commandes de déploiement de votre application
        // Exemple : aws ecs run-task pour un déploiement sur AWS
    }
}

stage('Cleanup') {
    steps {
        echo 'Cleaning up'
        // Suppression de l'image locale et déconnexion de DockerHub
        sh "docker rmi ${env.DOCKER_HUB_REGISTRY}/${IMAGE_NAME}:${BUILD_ID}"
        sh 'docker logout'
    }
}
}

post {
always {
echo 'Pipeline finished'
}
}
}