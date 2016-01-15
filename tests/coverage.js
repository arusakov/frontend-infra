import 'babel-polyfill';

const componentsContext = require.context('../srcjs', true, /\.jsx?$/);
componentsContext.keys().forEach(componentsContext);

const testsContext = require.context(".", true, /\.spec\.jsx?$/);
testsContext.keys().forEach(testsContext);
