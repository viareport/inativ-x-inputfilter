;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (xtag) {
    xtag.register('x-eraser', {
        lifecycle: {
            created: function created() {
                this._eraser = document.createElement('div');
                this._eraser.setAttribute('class','eraser');
                this.appendChild(this._eraser);
            },
            inserted: function inserted() {
            },
            removed: function removed() {
            },
            attributeChanged: function attributedChanged(attribute) {

            }
        },
        events : {
            click : function(e) {
                e.stopPropagation();
                e.preventDefault();
                var evt = new CustomEvent('erased', {
                    'bubbles': true
                });
                this.dispatchEvent(evt);
            }
        }
    });

}(xtag));
},{}],2:[function(require,module,exports){
require('inativ-x-eraser');

(function(){  
    xtag.register('x-inputfilter', {
        lifecycle: {
            created: function created() {
                this._div = document.createElement('div');
                this._div.setAttribute('class','form-input input-full-width');

                this._eraser = document.createElement('x-eraser');
                this._div.appendChild(this._eraser);

                this._input = document.createElement('input');
                this._input.type = 'text';
                this._div.appendChild(this._input);

                this.appendChild(this._div);
            },
            inserted: function inserted() {
            },
            removed: function removed() {
            },
            attributeChanged: function attributedChanged(attribute) {
                if('defaultFilter' === attribute) {
                    this._input.value = this.getAttribute('defaultFilter');
                }
            }
        },
        events : {
            'keyup': function (e) {
                e.stopPropagation();
                e.preventDefault();
                this.onFilterUpdate();
            },
            click : function(e) {
                e.stopPropagation();
                e.preventDefault();
            },
            erased: function() {
                if('' !== this._input.value) {
                    this._input.value = '';
                    this.onFilterUpdate();  
                }
            }
        },
        methods: {
            onFilterUpdate: function onFilterUpdate() {
                var event = new CustomEvent('filter', {
                    'detail': {
                        'column': this.getAttribute('column'),
                        filterValue: this._input.value
                    },
                    'bubbles': true,
                    'cancelable': false
                });
                this.dispatchEvent(event);
            }
        }
    });
})();

},{"inativ-x-eraser":1}]},{},[2])
;