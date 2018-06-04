const {prompter} = require('.');

const cz = {};
const onCommit = (data) => {
    console.log('receibed for commit', data);
};

prompter(cz, onCommit);
