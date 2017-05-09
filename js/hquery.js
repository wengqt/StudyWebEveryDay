(function (window, undefined) {
    var hQuery = function (statement) {
        return new hQuery.fn.init(statement)
    }

    hQuery.fn = hQuery.prototype = {

        init: function (statement) {
            //init创造一个hQuery实例
            var resultSet = [];

            if (typeof statement === undefined) {
                resultSet.push(window)
                //不传参时，默认为window
            }
            else if (typeof statement === "string" && statement.match(/<.+>/)) {
                //创建新节点
                var node = window.document.createElement("div");
                node.innerHTML = statement;
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].nodeType === 1) {
                        resultSet.push(node.childNodes[i]);
                    }
                }
            }
            else if (typeof statement === "string") {
                //参数为选择器
                resultSet = Array.prototype.slice.call(window.document.querySelectorAll(statement))
            }
            else if (typeof statement === "object" && statement instanceof Element) {
                //参数为Element节点
                resultSet.push(statement)
            }
            else if (typeof statement === "object" && typeof statement.length === "number" && Object.getPrototypeOf(statement).constructor === HTMLCollection) {
                //参数为节点的类数组
                for (var i = 0; i < statement.length; i++) {
                    resultSet.push(statement[i])
                }
            }
            else if (statement instanceof hQuery.fn.init) {
                //参数为hQuery对象,直接返回这个对象吧
                return statement;
            }


            for (var i = 0; i < resultSet.length; i++) {
                this[i] = resultSet[i]
            }
            this.length = function () {
                return resultSet.length
            };
            this.toDomElement = function () {
                return resultSet;
            };


        },
        ready: function (func) {
            return hQuery.ready(func)
        },
        addClass: function (cName) {
            this.each(function () {
                value.className = value.className.replace(cName, '');
                value.className += " " + cName
            })
        },
        removeClass: function (cName) {
            this.each(function (index, value) {
                value.className = value.className.replace(cName, '');
                value.className = value.className.replace(/\s{2,}/, " ");
            })
        },
        css: function (kp, v) {
            if (typeof kp !== "string") {
                return undefined;
            }
            var k = kp[0];
            for (var i = 1; i < kp.length; i++) {
                if (kp[i]==="-"){
                    continue;
                }
                if (kp[i - 1] === "-") {
                    k+=kp[i].toUpperCase()
                }else {
                    k+=kp[i]
                }
            }
            if (typeof v === typeof undefined) {
                return window.getComputedStyle(this[0])[k];
            }else {
                this.each(function (index,value) {
                    value.style[k] = v;
                });
                return this;
            }
        },
        ajax: function (params) {
            if (typeof params !== "object") return;
            var http = new XMLHttpRequest(),
                async = typeof params.async === "boolean" ? params.async : true,
                url = params.url || "",
                type = params.type || "GET",
                beforeSend = new Function();

            if (typeof params.beforeSend === "function") {
                beforeSend = params.beforeSend;
            }

            http.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (typeof params.complete === "function") {
                        params.complete();
                    }
                    if (this.status === 200) {
                        if (typeof params.success === "function") {
                            params.success(this.responseText);
                        }
                    } else {
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
            } else if (type.toUpperCase() === "POST") {
                http.open(type, url, async);
                beforeSend(http);
                http.send(object2URL(params.data))
            }


        },
        html: function (content) {
            if (content === undefined) {
                //返回第一个元素的html
                return this[0].innerHTML
            } else {
                this.each(function (index, value) {
                    value.innerHTML = content;
                })
            }
            return this;
        },
        each: function (func) {
            this.toDomElement().forEach(function (value, index) {
                func.call(value, index, value)
            })
            return this;
        },
        eq: function (index) {
            if (typeof index !== "number" || index >= this.length() || index <= -1) {
                throw new ArrayIndexOutOfBoundsException(index)
            }
            return $(this.toDomElement()[index])
        },
        toDomElement: function () {
            return []
        },
        length: function () {
            return 0;
        },
        valueOf: function () {
            return this.toDomElement();
        },
        append: function (node) {
            if (node instanceof hQuery.fn.init) {
                node = node.valueOf();
            }
            var curNode = node;
            this.each(function (index, value) {
                if (curNode instanceof Array) {
                    curNode.forEach(function (node) {
                        value.appendChild(node);
                    })
                    curNode.forEach(function (v, index) {
                        curNode[index] = v.cloneNode(true)
                    })
                } else if (curNode instanceof HTMLElement) {
                    value.appendChild(curNode)
                    curNode = curNode.cloneNode(true)
                    console.log(curNode)
                }
            })
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
            if (typeof data[cur] === "string" || typeof data[cur] === "boolean" || typeof data[cur] === "number") {
                result += cur + "=" + data[cur] + "&";
            }
        }
        if (result.length > 0) {
            result = result.substring(0, result.length - 2)
        }
        return result;
    }


    //自定义error类型

    //数组越界，或非法
    function ArrayIndexOutOfBoundsException(index) {
        this.message = "ArrayIndexOutOfBoundsException at index : " + index;
        this.name = "ArrayIndexOutOfBoundsException";
    }

    ArrayIndexOutOfBoundsException.prototype = new Error();
    ArrayIndexOutOfBoundsException.prototype.constructor = ArrayIndexOutOfBoundsException;

    window.$ = window.hQuery = hQuery;
})(window);