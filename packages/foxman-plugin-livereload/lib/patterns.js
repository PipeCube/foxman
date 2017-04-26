const path = require('path');

function joinPattern({ root, extension }) {
    return path.join(root, '**', '*.' + extension);
}

function files(root) {
    return ['css', 'js', 'html'].map(extension =>
        joinPattern({ root, extension })
    );
}

function getSyncDataPattern(root) {
    return joinPattern({ root, extension: 'json' });
}

function getTemplatePattern({ extension, viewRoot, templatePaths = [] }) {
    if (!Array.isArray(templatePaths)) {
        templatePaths = Object.keys(templatePaths).map(
            key => templatePaths[key]
        );
    }

    return [...templatePaths, viewRoot].map(root =>
        joinPattern({ root, extension })
    );
}

function getResourcesPattern(statics) {
    return statics.map(item => item.dir || item).reduce((total, current) => {
        return [...total, ...files(current)];
    }, []);
}

exports.getTemplatePattern = getTemplatePattern;
exports.getSyncDataPattern = getSyncDataPattern;
exports.getResourcesPattern = getResourcesPattern;
