# Jupiter Toys E2E Test Suite
Automated Test Suite deployed with a custom GitHub Actions runner that will run E2E tests on matching pull requests or branch merges for the Jupiter Toys Web Store code repository.

## Installation
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
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: bunx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### What does this do?
This run e2e tests everytime a matching branches are pushed to main/master or a pull rquest is submitted.
You cna configure github to block pull requests until tests finish running and pass if you desire. Otherwise it will be a reminder that things are either working or not.

### Environemnts
It would be nice to test our Code before it goes to a hosted environment and on testing/staging builds before it reaches productions. The current test runner has the ability to do this with a simple environment variable.

#### BASE_URL
```bash
BASE_URL=<base-environment-url>
```
Setting the ENV var `BASE_URL` before running the action will allow you to target the runner's traffic to that domain.


### Pre-deployment
Using this strategy pre-deployment will allow a developer to spin up a webserver locally via native runner or a docker container and the test runner will then make all requests to the BASE_URL instead. This allows you to effectively test code changes pre-deployment so you can take action before anything get's launched to the world.

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