const chalk = require('chalk');
const InputPrompt = require('inquirer/lib/prompts/input');

class LimitedInputPrompt extends InputPrompt {
  constructor (...args) {
    super(...args);

    if (!this.opt.maxLength) {
      this.throwParamError('maxLength');
    }
    this.originalMessage = this.opt.message;
    this.spacer = this.generateSpacer();

    if (this.opt.leadingLabel) {
      if (typeof this.opt.leadingLabel === 'function') {
        this.leadingLabel = ' ' + this.opt.leadingLabel(this.answers);
      } else {
        this.leadingLabel = ' ' + this.opt.leadingLabel;
      }
    } else {
      this.leadingLabel = '';
    }

    this.leadingLength = this.leadingLabel.length;
  }

  generateSpacer () {
    return new Array(this.opt.maxLength).fill('-').join('');
  }

  remainingChar () {
    return this.opt.maxLength - this.leadingLength - this.rl.line.length;
  }

  onKeypress () {
    if (this.rl.line.length > this.opt.maxLength - this.leadingLength) {
      this.rl.line = this.rl.line.slice(0, this.opt.maxLength - this.leadingLength);
      this.rl.cursor--;
    }

    this.render();
  }

  getCharsLeftText () {
    const chars = this.remainingChar();
    const text = this.getCharsLeftPlainText(chars);

    if (chars > 15) {
      return chalk.green(text);
    } else if (chars > 5) {
      return chalk.yellow(text);
    } else {
      return chalk.red(text);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getCharsLeftPlainText (chars) {
    return `${chars} chars left`;
  }

  render (error) {
    let bottomContent = '';
    let message = this.getQuestion();
    let appendContent = '';
    const isFinal = this.status === 'answered';

    if (isFinal) {
      appendContent = this.answer;
    } else {
      appendContent = this.rl.line;
    }

    message = `${message}
  [${this.spacer}] ${this.getCharsLeftText()}
  ${this.leadingLabel} ${appendContent}`;

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }
}

module.exports = LimitedInputPrompt;
