var assert = require('assert');
var path = require('path');
var Application = require('../../lib/application');
var Nei = require('../../lib/plugins/NEISync');
var Reloader = require('../../lib/plugins/Reloader');
var WatchPlugin = require('../../lib/plugins/Watcher');
var ProxyPlugin = require('../../lib/plugins/Proxy');
var ServerPlugin = require('../../lib/plugins/Server');

var app = Application;

var syncPath = path.join(__dirname, 'mock', 'sync');
var asyncPath = path.join(__dirname, 'mock', 'async');

describe('Use Plugins', function () {

    it('Use WatcherPlugin', function () {
        app.use(new WatchPlugin({}));
        assert.equal(!!app.get('watcherPlugin'), 1);
    });


    it('Use ServerPlugin', function () {
        app.use(new ServerPlugin({
            routers: [],
            port: 9000,
            divideMethod: false,
            viewRoot: path.join(__dirname, 'template'),
            syncData: syncPath,
            asyncData: asyncPath,
            static: [
                path.join(__dirname, 'dist')
            ]
        }));
        assert.equal(!!app.get('serverPlugin'), 1);
    });


    it('Use ReloaderPlugin', function () {
        app.use(new Reloader({}));
        assert.equal(!!app.get('reloaderPlugin'), 1);
    });
    it('Use ProxyPlugin', function () {
        app.use(new ProxyPlugin({
            proxyServerConfig: {
                service: {
                    'test': function (){

                    }
                }
            },
            proxyConfig:{
                host: 'test'
            }
        }));
        assert.equal(!!app.get('proxyPlugin'), 1);
    });

});

describe('Application Run', function () {
    it('Application run', function () {
        app.run();
        assert.equal(1, 1);
    });
});

describe('Server Plugin Function', function () {
    it('server.syncDataMatch', function () {
        var url = app.get('serverPlugin').server.serverOptions.syncDataMatch('foo.json');
        assert.equal(url, path.join(syncPath, 'foo.json'));
    });

    it('server.asyncDataMatch', function () {
        var url = app.get('serverPlugin').server.serverOptions.syncDataMatch('foo.json');
        assert.equal(url, path.join(syncPath, 'foo.json'));
    });
});
