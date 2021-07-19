import debugConfig from "./debugConfig";

// only print it out when the NODE_ENV no in prod
// usefixtures is off. What's the need of the env flag if you're using
// mock data??
if (process.env.NODE_ENV !== "production" && !debugConfig.useFixtures) {
  debugConfig.envFlagPrinter();
}

if (debugConfig.useFixtures) {
  debugConfig.fixturesFlagPrinter();
}
