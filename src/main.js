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
                if(this.getAttribute('placeholder')) {
                    this._input.placeholder = this.getAttribute('placeholder');
                }
                this._input.type = 'text';
                if (this.getAttribute('defaultFilter')) {
                    this._input.value = this.getAttribute('defaultFilter');
                }
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
                e.preventDefault();
                this.onFilterUpdate();
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
                        filterType: this.getAttribute('filterType'),
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
