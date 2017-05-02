(function (window) {
    var hQuery = function (statement) {
        return new hQuery.fn.init(statement)
    }


    hQuery.fn = hQuery.prototype = {

        init: function (statement) {
            //init创造一个hQuery实例

            if (typeof statement === undefined) {
                //不传参时，默认为window
            } else if (typeof statement === "string") {
                //选择器
                var resultSet = window.document.querySelectorAll(statement)
                for (var i = 0; i < resultSet.length; i++) {
                    this[i] = resultSet[i];
                }
                this.length = function () {
                    return resultSet.length
                }
            }


        },
        ready: function (func) {
            if (typeof func !== "function") {
                return
            }
            window.addEventListener('DOMContentLoaded', func, false)
        },
        addClass: function (cName) {
            var cur = 0;
            while (this[cur] !== undefined) {
                this[cur].className = this[cur].className.replace(cName,'');
                this[cur].className += " " + cName
                cur+=1;
            }
        },
        removeClass:function (cName) {
            var cur = 0;
            while (this[cur] !== undefined){
                this[cur].className = this[cur].className.replace(cName,'');
                this[cur].className = this[cur].className.replace(/\s{2,}/," ");
                cur+=1;
            }
        }


    }
    hQuery.fn.init.prototype = hQuery.fn


    window.$ = window.hQuery = hQuery
})(window);