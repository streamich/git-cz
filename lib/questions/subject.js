exports.createQuestion = (state) => {
  const {config} = state;
  const minTitleLengthErrorMessage = `The subject must have at least ${config.minMessageLength} characters`;
  const question = {
    filter: (input) => {
      let subject;

      subject = input.trim();
      while (subject.endsWith('.')) {
        subject = subject.substr(0, subject.length - 1).trim();
      }

      return subject;
    },
    leadingLabel: (answers) => {
      let scope = '';

      if (answers.scope && (answers.scope !== 'none')) {
        scope = `(${answers.scope})`;
      }

      return `${answers.type}${scope}:`;
    },

    // Minus 3 chars are for emoji + space.
    maxLength: config.maxMessageLength - 3,
    message: 'Write a short, imperative mood description of the change:',
    name: 'subject',
    type: 'limitedInput',
    validate: (input) => input.length >= config.minMessageLength || minTitleLengthErrorMessage
  };

  return question;
};
