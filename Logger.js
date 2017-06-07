const uuidV4 = require('uuid/v4');

var process = require('process');
var os = require("os");

module.exports = class Logger {
    constructor(correlationId,logcb) {
        this.correlationId = correlationId;
        this.logcb = logcb;
    }
    buildJson(msg, level) {
        var metadata =
            {
                hostname: os.hostname(),
                processname: process.title,
                pid: process.pid
            };

        var data = {
            metadata: metadata,
            message: msg,
            date: new Date(),
            level: level,
            correlationId: this.correlationId
        };
        return data;
    }
    log(msg) {
        var json = this.buildJson(msg, 'log');
        this.logcb(json);
    }
    debug(msg) {
        var json = this.buildJson(msg, 'debug');
        this.logcb(json);
    }
    error(msg) {
        var json = this.buildJson(msg, 'error');
        this.logcb(json);
    }
    static genId(messageType) {
        return messageType + (new Date().getTime()) + '_' + uuidV4();
    }

}



