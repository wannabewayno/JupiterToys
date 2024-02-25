# Jupiter Toys E2E Test Suite
Automated Test Suite deployed with a custom GitHub Actions runner that will run E2E tests on matching pull requests or branch merges for the Jupiter Toys Web Store code repository.

## Installation
You can opt into e2e tests via GitHub actions by simply placing the following file into your GitHub repository.

```yaml

```

## Future Work
### Playwright Abstraction
Playwright is great, however to make our tests more resiliant, we can abstract the `page` class that playwright provides into an page interface that we define. This will allow us to provide implementations that can be fulfilled by any headless browser technology.

### Unit tests
We've built some Page Objects and a little POM framework to help us test the Jupiter Toys website, however test code is untested code. It would be good to assert that our framework is doing what it's designed to do.