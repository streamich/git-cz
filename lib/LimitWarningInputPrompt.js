const LimitedInputPrompt = require('./LimitedInputPrompt');

class LimitWarningInputPrompt extends LimitedInputPrompt {
  // eslint-disable-next-line class-methods-use-this
  generateSpacer () {
    return 'No limit mode';
  }

  onKeypress () {
    this.render();
  }

  getCharsLeftPlainText () {
    return `${this.leadingLength + this.rl.line.length}/${this.opt.maxLength}`;
  }
}

module.exports = LimitWarningInputPrompt;
