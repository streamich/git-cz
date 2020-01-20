const runNonInteractiveMode = (state, params) => {
  state.config.disableEmoji = true;

  Object.keys(state.answers).forEach((key) => {
    if (params[key]) {
      state.answers[key] = params[key];
      delete params[key];
    }
  });
};

module.exports = runNonInteractiveMode;
