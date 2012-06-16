(function () {
    var _modules = {};
    var root = chrome.extension.getURL('/js');

    function path(name) {
        return root + "/" + name + ".js";
    }

    function xhr(name) {
        $.ajax({
                url:path(name),
                type:"GET",
                dataType:"text",
                success:function (text) {
                    eval(text);
                }
            }
        );
    }

    function scriptTag(name) {
        document.write("<scrip" + "t type='text/javascript' src='" + path(name) + "'></scri" + "pt>")
    }

    function load(name, loader) {
        if (_modules[name]) return _modules[name].promise();
        var def = new $.Deferred();
        _modules[name] = def;
        loader(name);
        return def.promise();
    }

    window.loader = {
        loadWithXhr:function (name) {
            return load(name, xhr);
        },
        loadWithScriptTag:function (name) {
            return load(name, scriptTag);
        },
        declare:function (name, obj) {
            _modules[name].resolve(obj);
        }
    }
})();