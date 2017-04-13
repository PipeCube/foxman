class ReloaderService {
    constructor(
        {
            watcher,
            reloader
        }
    ) {
        this.map = {};
        this.watcher = watcher;
        this.reloader = reloader;
    }

    register(
        {
            reqPath,
            dependencies,
            resourcesManager
        }
    ) {
        const oldThings = this.map[reqPath] || [];
        let diff = findNew({
            oldThings: oldThings,
            newThings: dependencies
        });

        if (diff.length === 0) {
            return;
        }

        this.watcher.onUpdate(diff, () => {
            resourcesManager.clear(reqPath);
            this.reloader.reload(reqPath);
        });

        this.map[reqPath] = [...oldThings, ...diff];
    }
}

function findNew(
    {
        oldThings = [],
        newThings = []
    }
) {
    const oldThingMap = oldThings.reduce(
        function(total, current) {
            total[current] = true;
            return total;
        },
        {}
    );

    return unique(newThings.filter(item => !oldThingMap[item]));
}

function unique(array = []) {
    return Object.keys(
        array.reduce(
            function(total, current) {
                total[current] = null;
                return total;
            },
            {}
        )
    );
}

let instance;
module.exports = function(options) {
    if (!instance) {
        instance = new ReloaderService(options);
    }
    return instance;
};
