pipeline {
  agent any
  stages {
    stage('Git clone and setup') {
      steps {
        echo 'Check out Brand Master Flash code'
      }
    }
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'Building application and Docker images'
          }
        }
        stage('Build frontend') {
          steps {
            echo 'Build frontend'
          }
        }
        stage('Build backend') {
          steps {
            echo 'Build backend'
          }
        }
      }
    }
    stage('Publish Docker') {
      parallel {
        stage('Publish Docker') {
          steps {
            echo 'Publish application and Docker image'
          }
        }
        stage('Publish frontend') {
          steps {
            echo 'Publish frontend'
          }
        }
        stage('Publish backend') {
          steps {
            echo 'Publish backend'
          }
        }
      }
    }
    stage('Deploy to Stage Server') {
      steps {
        echo 'Deploying to Stage Server'
      }
    }
    stage('Deploy to Production Server') {
      steps {
        echo 'Deploying to Production Server'
      }
    }
  }
}