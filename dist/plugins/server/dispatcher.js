'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dirDispatcher = dirDispatcher;
exports.ftlDispatcher = ftlDispatcher;
exports.jsonDispatcher = jsonDispatcher;

var _path = require('path');

var _render = require('../../helper/render');

var _render2 = _interopRequireDefault(_render);

var _foxmanApi = require('foxman-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [dirDispatcher, ftlDispatcher, jsonDispatcher].map(regeneratorRuntime.mark);

function dirDispatcher(url, config, context) {
	var path, files, promises, result, fileList;
	return regeneratorRuntime.wrap(function dirDispatcher$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					path = (0, _path.join)(config.root, url);
					_context.next = 3;
					return _foxmanApi.fileUtil.getDirInfo(path);

				case 3:
					files = _context.sent;
					promises = files.map(function (file) {
						return _foxmanApi.fileUtil.getFileStat((0, _path.join)(path, file));
					});
					_context.next = 7;
					return Promise.all(promises);

				case 7:
					result = _context.sent;
					fileList = result.map(function (item, idx) {
						return Object.assign(item, {
							name: files[idx],
							isFile: item.isFile(),
							url: [url, files[idx], item.isFile() ? '' : '/'].join('')
						});
					});
					_context.next = 11;
					return context.render('cataLog', { fileList: fileList });

				case 11:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

function ftlDispatcher(url, config, context) {
	var dataPath, dataModel, output, errInfo;
	return regeneratorRuntime.wrap(function ftlDispatcher$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					dataPath = (0, _path.join)(config.syncData, url.replace(/.ftl$/, '') + '.json');
					dataModel = void 0;

					try {
						dataModel = require(dataPath);
					} catch (err) {
						_foxmanApi.util.error(dataPath + ' is not found!');
					}
					output = (0, _render2.default)().parse(url, dataModel);

					context.type = 'text/html; charset=utf-8';
					context.body = output.stdout;

					errInfo = [];

					output.stderr.on('data', function (chunk) {
						errInfo.push(chunk);
					});
					output.stderr.on('end', function () {
						console.log(errInfo.join(''));
					});

				case 9:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this);
}

function jsonDispatcher(url, config, context) {
	var file, json;
	return regeneratorRuntime.wrap(function jsonDispatcher$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					file = (0, _path.join)(config.path.asyncData, url);
					json = _foxmanApi.fileUtil.getFileByStream(file);


					context.type = 'application/json; charset=utf-8';
					context.body = json;

				case 4:
				case 'end':
					return _context3.stop();
			}
		}
	}, _marked[2], this);
}