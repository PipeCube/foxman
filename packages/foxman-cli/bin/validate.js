const typeOf = (obj, type) => {
    if (Array.isArray(type)) {
        return type.some(item => {
            return typeOf(obj, item);
        });
    }
    return Object.prototype.toString.call(obj).toLowerCase().slice(8, -1) ==
        type;
};

module.exports = function(config) {
    if (!typeOf(config.server.port, 'number')) {
        return 'config.server.port must be number';
    }

    if (!typeOf(config.server.viewRoot, 'string')) {
        return 'config.server.viewRoot must be string';
    }

    if (!typeOf(config.server.templatePaths, 'object')) {
        return 'config.server.templatePaths must be object';
    }

    if (!typeOf(config.server.syncData, 'string')) {
        return 'config.server.syncData must be string';
    }

    if (!typeOf(config.server.asyncData, 'string')) {
        return 'config.server.asyncData must be string';
    }

    return true;
};
