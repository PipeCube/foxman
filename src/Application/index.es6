import {initialsLower, log, notify, entries, error, isPromise, isGeneratorDone} from '../helper/util';
import co from 'co';
import {init} from './Instance';
import {register, resolve, dependencies} from './DI';


function* execute() {
    for (let [, plugin] of entries(dependencies)) {
        if (plugin.init && plugin.enable) {
            resolve(plugin.init, plugin);

            if (plugin.pendings) {
                notify({
                    title: 'Plugin start pending',
                    msg: `${plugin.name} start pending`
                });

                yield Promise.all(plugin.pendings);

                notify({
                    title: 'Plugin end pending',
                    msg: `${plugin.name} end pending`
                });
            }
        }
    }
}

function runPlugins() {
    for (let [, plugin] of entries(dependencies)) {
        if (plugin.runOnSuccess) {
            plugin.runOnSuccess();
        }
    }
}

export function use(plugin) {
    if (!plugin) {
        return false;
    }
    if (Array.isArray(plugin)) return plugin.forEach(use);

    init(plugin);

    register(initialsLower(plugin.name), plugin);

    log(`plugin loaded: ${plugin.name}`);
}

export function run() {
    co(execute())
        .then(runPlugins)
        .catch((e) => {
            console.error(e);
        });
}

export function get(pluginName) {
    return dependencies[initialsLower(pluginName)];
}
