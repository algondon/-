// event(事件)工具集，大部分代码参考：github.com/markyun，作者自己的修改主要是在函数柯里化上，可以不用每次都进行判断
var Event = {
    // 页面加载完成后
    readyEvent: function(fn) {
        if (fn == null) {
            fn = document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 主要优化的点在于函数柯里化，可以不用每次都进行判断
    // 参数： 操作的元素,事件名称 ,事件处理程序
    addEvent: (function() {
        if (window.addEventListener) {
            //事件类型、需要执行的函数、是否捕捉
            return function(element, type, handler) {
                element.addEventListener(type, handler, false);
            }
        } else if (window.attachEvent) {
            return function(element, type, handler) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            }
        } else {
            return function(element, type, handler) {
                element['on' + type] = handler;
            }
        }
    })(),
    // 移除事件
    //主要优化的点在于函数柯里化，可以不用每次都进行判断
    removeEvent: (function() {
      //console.log(this);//window
        if (window.removeEventListener) {
            return function(element, type, handler) {
                element.removeEventListener(type, handler, false);
            }
        } else if (window.datachEvent) {
            return function(element, type, handler) {
                element.detachEvent('on' + type, handler);
            }
        } else {
            return function(element, type, handler) {
                element['on' + type] = null;
            }
        }
    })(),
    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
    stopPropagation: function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
            console.log(this);//Event
            this.stopPropagation = function(ev) {
                ev.stopPropagation();
            }
        } else {
            ev.cancelBubble = true;
            this.stopPropagation = function(ev) {
                ev.cancelBubble = true;
            }
        }
    },
    // 取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent: function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};
