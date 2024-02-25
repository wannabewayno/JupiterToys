# Jupiter Toys E2E Test Suite
Automated Test Suite deployed with a custom GitHub Actions runner that will run E2E on matching pull requests or branch merges for the Jupiter Toys Web Store code repository.

## Future Work
### Playwright Abstraction
Playwright is great, however to make our tests more resiliant, we can abstract the `page` class that playwright provides into an page interface that we define. This will allow us to provide implementations that can be fulfilled by any headless browser technology.

