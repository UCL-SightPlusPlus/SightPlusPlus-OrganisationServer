# AVINA with Sight++ v3 - OrganisationServer
# Installation

## Prerequisites
- [Docker](https://www.docker.com/get-started)

## Deployment and Configuration
The AVINA organisation server is a containerized application, so it can easily be deployed to a cloud service or configured to run on a custom (on-premises) windows, linux, or mac-os machine of your choosing.

### Deploying AVINA organisation server to a server of your choosing
- Download the code.
- Once downloaded, under the `/public/images` directory replace the existing logo.png with your organisation's logo after naming it `logo.png`.
- Open the `.env` file with any editor and replace the `ORG_NAME` value with your organisation's name.
- Deploy the server by running `docker-compose up --build -d`.
- Open a browser and redirect to localhost:5000

*For Azure deployment, you can follow this [guide](https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose)*
