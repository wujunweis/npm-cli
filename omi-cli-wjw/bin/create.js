const path = require("path");
const inquirer = require('inquirer');
const {download} = require("./download");
const {config} = require('./config');
const {updatePackage} = require('./updatePackage');
const {start} = require('./start');

async function createProject(appName){
    const propList = [
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述信息'
        },
        {
            type: 'list',
            message: "请选择一个模版下载",
            name:"template_name",
            choices:Object.keys(config)
        }

    ];
    const { template_name ,description } = await inquirer.prompt(propList);
    const project_dir = path.join(process.cwd(),appName); //新建项目的路径

    try {
        await download(template_name,project_dir); // 下载项目到本地
        await updatePackage(project_dir,{name:appName,description,template:template_name}); //修改package.json
        start(project_dir,template_name);// 启动项目
    } catch (error) {
        console.log(error);
    }
}

module.exports = createProject;
