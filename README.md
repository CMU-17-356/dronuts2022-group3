# Dronuts
In order to get ready to write productive code, complete the following steps during Sprint 0:

### Repository Tools
1. Repository is utilizing npm, running the Express Framework.

2. GithubActions allows for tracking of builds, though currently configured to a default
set of actions as specified in .github/workflows/github-actions-demo.yml.

3. eslint, eslint-watch, npm-watch, and jest are all installed and configured. Any other dependencies
can be found in the package*.json files.

### Deployment
1. You should have received an email about signing-up/accepting a assignment/lab
from Microsoft, related to the class and registering with azure. Let us know 
if you haven't. We recommend using the [Azure Cli](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?view=azure-cli-latest) 
to access your account info.

2. Using your Azure credentials, follow [these instructions](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/docker-machine) to manually
setup a Virtual Machine suitable for running Docker **with the following considerations**:
  * Instead of `myvm` use your project team name as your Docker Machine name.
  * Use "Standard_A1_v2" as the plan name / VM size.
  * Before running docker-create (creating your VM), make sure to additionally
  add the flag/option **--azure-resource-group cmu-17-356** when running the command.
  * The full command you'll run should look something like this:
    ```shell
    docker-machine create -d azure \
    --azure-subscription-id $sub \
    --azure-ssh-user azureuser \
    --azure-open-port 80 \
    --azure-resource-group cmu-17-356 \
    --azure-size "Standard_A1_v2" \
    $repository_name
     ```
  * **stop before the step "run a container"**.
  * Copy the IP address of your VM and your *$repository_name* (i.e. project/machine-name) into your Github Actions `.yml`
  * If you've set that ENV var, Run `cp -r "$DOCKER_CERT_PATH" ./azure`to copy your deployment certificates
  into your repository. Otherwise, you can run `cp -r ~/.docker/machine/machines/$repository_name/* ./azure`

This should enable automatic deployment via Github Actions!
