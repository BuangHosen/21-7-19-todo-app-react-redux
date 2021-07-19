/* eslint-disable no-console */
const envFlagPrinter = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  let envLog = `Environment Flag set to "${process.env.NEXT_PUBLIC_ENV_FLAG}"`;
  let baseUrlLog = `baseURL set to "${baseURL}"`;
  const longestLength =
    (baseUrlLog.length > envLog.length ? baseUrlLog.length : envLog.length) + 4;
  const sillyEnclosure = Array(longestLength)
    .fill('=')
    .join('');
  const emptyspace = size =>
    Array(size)
      .fill(' ')
      .join('');

  if (envLog.length !== longestLength) {
    const differenceInHalf = parseInt((longestLength - envLog.length) / 2, 0);

    envLog = `${emptyspace(differenceInHalf)}${envLog}${emptyspace(
      differenceInHalf
    )}`;
  }

  if (baseUrlLog.length !== longestLength) {
    const differenceInHalf = parseInt(
      (longestLength - baseUrlLog.length) / 2,
      0
    );

    baseUrlLog = `${emptyspace(differenceInHalf)}${baseUrlLog}${emptyspace(
      differenceInHalf
    )}`;
  }

  console.log(sillyEnclosure);
  console.log(envLog);
  console.log(baseUrlLog);
  console.log(sillyEnclosure);
};

const fixturesFlagPrinter = () => {
  const fixLog = `== Fixtures Mode: ON ==`;
  const sillyEnclosure = Array(fixLog.length)
    .fill('=')
    .join('');

  console.log(sillyEnclosure);
  console.log(fixLog);
  console.log(sillyEnclosure);
};

export default {
  useFixtures: process.env.NEXT_PUBLIC_USE_FIXTURES,
  envFlagPrinter,
  fixturesFlagPrinter,
};
