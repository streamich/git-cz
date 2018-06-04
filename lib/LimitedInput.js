const util = require('util');
const inquirer = require('inquirer');

const LimitedInput = function (...args) {
  inquirer.prompt.prompts.input.apply(this, args);

  if (!this.opt.maxLength) {
    this.throwParamError('maxLength');
  }
  this.originalMessage = this.opt.message;
  this.spacer = new Array(this.opt.maxLength).fill('-').join('');

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
  this.updateMessage();
};

util.inherits(LimitedInput, inquirer.prompt.prompts.input);

LimitedInput.prototype.updateMessage = function () {
  this.opt.message = `${this.originalMessage}
  [${this.spacer}] ${this.remainingChar()} remaining chars
  ${this.leadingLabel}`;
};

LimitedInput.prototype.remainingChar = function () {
  return this.opt.maxLength - this.leadingLength - this.rl.line.length;
};

LimitedInput.prototype.onKeypress = function () {
  if (this.rl.line.length > this.opt.maxLength - this.leadingLength) {
    this.rl.line = this.rl.line.slice(0, this.opt.maxLength - this.leadingLength);
    this.rl.cursor--;
  }

  this.updateMessage();
  this.render();
};

module.exports = LimitedInput;
