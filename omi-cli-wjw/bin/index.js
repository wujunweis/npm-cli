#! /usr/bin/env node
console.log('----------------OMI CLI----------------');

const {program} = require('commander');
program.version('1.0.0');

program.command("create <app-name>").description("创建一个新的OMI项目").option('-t, --template <template-name>', '请选择一个创建模版').action((appName, options) => {
    require("./create")(appName,options);
})

program.parse(process.argv);
