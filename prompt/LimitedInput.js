const inquirer = require('inquirer');
const util = require('util');

function LimitedInput() {
  inquirer.prompt.prompts.input.apply(this, arguments);

  if (!this.opt.maxLength) {
    this.throwParamError('maxLength');
  }
  this.opt._message = this.opt.message;
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

  console.log(this.leadingLength)
}



util.inherits(LimitedInput, inquirer.prompt.prompts.input);

LimitedInput.prototype.updateMessage = function(e) {
  this.opt.message = `${this.opt._message}
[${this.spacer}] ${this.remainingChar()} remaining chars
${this.leadingLabel}`;
};

LimitedInput.prototype.remainingChar = function(e) {
  return (this.opt.maxLength - this.leadingLength) - this.rl.line.length;
};

LimitedInput.prototype.onKeypress = function(e) {
  if(this.rl.line.length > (this.opt.maxLength - this.leadingLength)) {
    this.rl.line = this.rl.line.slice(0, this.opt.maxLength - this.leadingLength);
    this.rl.cursor--;
  }

  this.updateMessage();
  this.render();
};

module.exports = LimitedInput;
