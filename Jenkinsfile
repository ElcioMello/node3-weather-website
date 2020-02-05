pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            agent {
                docker {
                    image 'node:alpine'
                    args '-p 3000:3000 -p 5000:5000 --add-host="registry.npmjs.org npmjs.org registry.npmjs.com npmjs.com:104.16.110.30"'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Unit Test') {
            agent {
                docker {
                    image 'node:alpine'
                    args '-p 3000:3000 -p 5000:5000 --user root --add-host="registry.npmjs.org npmjs.org registry.npmjs.com npmjs.com:104.16.110.30"'
                }
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Build a Image(compose)') {
            agent any
            steps {
                sh 'docker build --add-host="registry.npmjs.org npmjs.org registry.npmjs.com npmjs.com:104.16.110.30" -t dockernode .'
                sh 'docker images'


            }
        }

        stage('Tag and Login') {
            agent any
            steps {

                sh "docker tag dockernode mycontainerregelcio01.azurecr.io/dockernode:v${currentBuild.number}"


                withCredentials([azureServicePrincipal(credentialsId: 'AzureTeste',
                    subscriptionIdVariable: 'SUBS_ID',
                    clientIdVariable: 'CLIENT_ID',
                    clientSecretVariable: 'CLIENT_SECRET',
                    tenantIdVariable: 'TENANT_ID')]) {
                    sh 'docker login mycontainerregelcio01.azurecr.io -u $CLIENT_ID -p $CLIENT_SECRET'
                }
                sh 'docker images'

            }
        }



        stage('Push  and Prune Image') {
            agent any
            steps {
                sh "docker push mycontainerregelcio01.azurecr.io/dockernode:v${currentBuild.number}"
                sh 'docker images -f dangling=true -q | xargs -r docker images rmi'
                sh 'docker images'

            }
        }

        stage('Aply Azure Yaml') {
            agent {
                docker {
                    image 'mcr.microsoft.com/azure-cli'
                    args '-p 3000:3000 -p 5000:5000 --user root'
                }
            }
            steps {
                withCredentials([azureServicePrincipal(credentialsId: 'AzureLogin',
                    subscriptionIdVariable: 'SUBS_ID',
                    clientIdVariable: 'CLIENT_ID',
                    clientSecretVariable: 'CLIENT_SECRET',
                    tenantIdVariable: 'TENANT_ID')]) {
                    sh 'az login --service-principal -u $CLIENT_ID --password $CLIENT_SECRET --tenant $TENANT_ID'
                }
                sh 'az aks install-cli'
                sh 'az aks get-credentials --resource-group myResourceGroup --name myAKSCluster'
                sh 'az acr list --resource-group myResourceGroup --query "[].{acrLoginServer:loginServer}" --output table'
                sh "sed 's/changetextversion/v${currentBuild.number}/g' azure-dockernode.yaml"
                
                sh 'kubectl get pods'
                sh "kubectl set image deployment dockernode dockernode=mycontainerregelcio01.azurecr.io/dockernode:v${currentBuild.number}"
                sh 'kubectl get service dockernode'
                sh 'kubectl get pods'
                
            }
        }


    }
}