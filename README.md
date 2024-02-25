# Jupiter Toys E2E Test Suite
Automated Test Suite deployed with a custom GitHub Actions runner that will run E2E tests on matching pull requests or branch merges for the Jupiter Toys Web Store code repository.

## Running Locally
Running the tests locally will allow you to run tests in parallel mode for faster results.

### Installation
You can either run this locally with Bun (recommended) or with Node.js
They have their own installation and use instructions.

#### Bun
1. [Install bun](https://bun.sh/docs/installation)
2. Run `bun install`
3. Run `bunx playwright install`
4. Run tests with `bunx playwright test`

To run in headed mode (to see how the browser is interacting with the page)
```bash
bunx playwright test --headed
```

#### Node
1. [Install Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
2. Run `npm install`
3. Run `npx playwright install`
4. Run tests with `npx playwright test`

To run in headed mode (to see how the browser is interacting with the page)
```bash
npxx playwright test --headed
```

## CI Installation
You can opt into these e2e tests via GitHub actions by simply placing the following YAML file into your GitHub repository at `.github/workflows/e2e.yaml

```yaml
name: End-to-End Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - name: Run E2E Tests
        uses: wannabewayno/JupiterToys@master
        with:
          BASE_URL: 'localhost:3000'
```

### What does this do?
This runs the JupiterToys action to run e2e tests everytime matching branches are pushed to main/master or a pull rquest is opened against main, master.
You can configure github to block merging pull requests until tests finish running, and even block the pull request from being merged if you desire. Otherwise github will show the status of this test (pass/fail/running) in the pull requsest UI.

An example can be seen 

### Environemnts
It would be nice to test our Code before it goes to a hosted environment and on testing/staging builds before it reaches production. The current test runner has the ability to do this with a simple environment variable.

#### BASE_URL
```bash
BASE_URL=http://your.domain.com
```
Setting the ENV var `BASE_URL` before running the action will allow you to target the runner's traffic to that domain.

### Pre-deployment
Using this strategy pre-deployment will allow a developer to spin up a webserver locally via checking out the code and running a webserver or spinning up a docker container. The test runner will then make all requests to the BASE_URL instead (hosted on the same machine). This allows you to effectively test code changes pre-deployment so you can take action before anything get's launched to the world.

### Post-deployment
After a deployment is successfull, set the runner to the BASE_URL of the environment that's been deployed (testing/staging/production) to test that the new deployment works as intended.

## Future Work
### Playwright Abstraction
Playwright is great, however to make our tests more resiliant, we can abstract the `page` class that playwright provides into an page interface that we define. This will allow us to provide implementations that can be fulfilled by any headless browser technology.

### Unit tests
We've built some Page Objects and a little POM framework to help us test the Jupiter Toys website, however test code is untested code. It would be good to assert that our framework is doing what it's designed to do.

### Smoke tests
Over time simulating a browser to run many E2E tests will take time.
To better utilise resources, I would make some smoke tests that simply navigates to all pages known the applications and attempts to access a key feature of the page.

If anything here breaks then there is something wrong with the deployment that likely needs addressing before diving into testing page specific functionality.