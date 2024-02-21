import { createContainer, Lifetime, asClass, asFunction, asValue } from 'awilix'

const container = createContainer({
  injectionMode: 'CLASSIC',
  strict: true,
});

container.register({
  // messageService: asClass(Page).scoped(),
  // Register the page context or... create new ones?????
})

export default container;