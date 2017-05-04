(function (window, undefined) {
    var hQuery = function (statement) {
        return new hQuery.fn.init(statement)
    }

    hQuery.fn = hQuery.prototype = {

        init: function (statement) {
            //init创造一个hQuery实例
            var resultSet = [];

            if (typeof statement === undefined) {
                //不传参时，默认为window
            }
            else if (typeof statement === "string") {
                //参数为选择器
                resultSet = window.document.querySelectorAll(statement)
                for (var i = 0; i < resultSet.length; i++) {
                    this[i] = resultSet[i];
                }
                this.length = function () {
                    return resultSet.length
                }
            }
            else if (typeof statement === "object" && statement instanceof Element) {
                //参数为Element节点
                resultSet.push(statement)
                this[0] = statement;
                this.length = function () {
                    return resultSet.length
                }
            }
            else if (typeof statement === "object" && typeof statement.length === "number" && Object.getPrototypeOf(statement).constructor === HTMLCollection) {
                //参数为节点的类数组
                resultSet.push(statement)
                for (var i = 0; i < statement.length; i++) {
                    this[i] = statement[i]
                }
                this.length = function () {
                    return resultSet.length
                }
            }
            else if (statement instanceof hQuery.fn.init) {
                //参数为hQuery对象
                for (var cur in statement) {
                    this[cur] = statement[cur];
                }
            }


        },
        ready: function (func) {
            return hQuery.ready(func)
        },
        addClass: function (cName) {
            var cur = 0;
            while (this[cur] !== undefined) {
                this[cur].className = this[cur].className.replace(cName, '');
                this[cur].className += " " + cName
                cur += 1;
            }
        },
        removeClass: function (cName) {
            var cur = 0;
            while (this[cur] !== undefined) {
                this[cur].className = this[cur].className.replace(cName, '');
                this[cur].className = this[cur].className.replace(/\s{2,}/, " ");
                cur += 1;
            }
        },
        ajax: function (params) {
            if (typeof params !== "object") return;
            var http = new XMLHttpRequest(),
                async = typeof params.async === "boolean" ? params.async : true,
                url = params.url || "",
                type = params.type || "GET",
                beforeSend = new Function();

            if (typeof params.beforeSend === "function"){
                beforeSend = params.beforeSend;
            }

            http.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (typeof params.complete === "function") {
                        params.complete();
                    }
                    if (this.status == 200) {
                        if (typeof params.success === "function") {
                            params.success();
                        }
                    }else {
                        if (typeof params.error === "function") {
                            params.error();
                        }
                    }
                }
            }
            if (type.toUpperCase() === "GET") {
                url += "?" + object2URL(params.data)
                http.open(type, url, async);
                beforeSend(http);
                http.send();
            } else if (type.toUpperCase() === "POST"){
                http.open(type, url, async);
                beforeSend(http);
                http.send(object2URL(params.data))
            }


        }


    }
    hQuery.fn.init.prototype = hQuery.fn

    //拓展静态方法
    hQuery.extend = function (code) {
        if (typeof code !== "object") return;

        for (var cur in code) {
            hQuery[cur] = code[cur];
        }
    }

    //静态方法
    hQuery.extend({
        ready: function (func) {
            if (typeof func !== "function") {
                return
            }
            window.addEventListener('DOMContentLoaded', func, false)
        },
        ajax: function (params) {
            return hQuery().ajax(params)
        }


    })


    function object2URL(data) {
        var result = "";
        for (var cur in data) {
            if (typeof data[cur] === "string"||typeof data[cur] === "boolean"||typeof data[cur] === "number" ) {
                result += cur + "=" + data[cur] + "&";
            }
        }
        if (result.length>0){
            result = result.substring(0,result.length-2)
        }
        return result;
    }

    window.$ = window.hQuery = hQuery;
})(window);