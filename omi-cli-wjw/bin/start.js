const exec = require('child_process').exec;
const { config } = require("./config");
/**
 * 安装依赖并启动项目
 */
exports.start = async (path,template_name) => {
    await installLib(path,template_name);
    console.log('项目依赖安装完毕...');
    await startProject(path,template_name);
    console.log('项目启动成功...');
};

const installLib = (path,template_name) => {

    const install_command = config[template_name].install || "npm i"; //安装依赖的命令

    return new Promise((resolve, reject) => {
        const workerProcess = exec(
            install_command,
            {
                cwd: path,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(null);
                }
            }
        );

        workerProcess.stdout.on('data', function (data) {
            console.log(data);
        });

        workerProcess.stderr.on('data', function (data) {
            console.log(data);
        });
    });
};

const startProject = (path,template_name) => {

    const bootstrap_command = config[template_name].bootstrap || "npm run serve"; //启动项目的命令

    return new Promise((resolve, reject) => {
        const workerProcess = exec(
            bootstrap_command,
            {
                cwd: path,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(null);
                }
            }
        );

        workerProcess.stdout.on('data', function (data) {
            console.log(data);
        });

        workerProcess.stderr.on('data', function (data) {
            console.log(data);
        });
    });
};

/**
 * 打开浏览器
 */
const openBroswer = (url) => {
    return new Promise((resolve, reject) => {
        exec(`start ${url}`, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(null);
            }
        });
    });
};