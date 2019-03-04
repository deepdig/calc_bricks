//var_dump for js
function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);

    // or, if you wanted to avoid alerts...

    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre);
}

var vm = new Vue({
    el: '#app',
    data: {
        title: 'Онлайн калькулятор расчета облицовочного и рядового кирпича',
        resultsShow: false, // состояние кнопки расчета
        selectSize: '', // размеры кирпича       select
        inputPerimeter: null, // Общая длина всех стен (периметр)
        inputDegHeight: null, // Высота стен по углам
        selectDepth: '', // толщина       select
        selectLiquorDepth: '', // толщина раствора в кладке   select
        selectGrid: '', // Кладочная сетка   select
        inputPrice: null, // Цена за 1шт
        inputVoid: null, // Пустотность кирпича

        // --- Данные ---
        // размеры кирпича
        bricksSizeArr: [{
            name: '250х120х65 кирпич лицевой пустотелый одинарный', // length x width x heigt
            img: '01_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 2
        }, {
            name: '250х120х88 кирпич лицевой пустотелый полуторный',
            img: '02_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 3
        }, {
            name: '250х120х65 кирпич печной одинарный',
            img: '03_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 4
        }, {
            name: '250х120х65 кирпич шамотный одинарный',
            img: '04_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 5
        }, {
            name: '250х120х65 кирпич силикатный одинарный',
            img: '05_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 5
        }, {
            name: '250х120х88 кирпич силикатный полуторный',
            img: '06_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 5
        }, {
            name: '250х120х65 кирпич строительный одинарный',
            img: '07_bricks',
            length: 250, // длина кирпича
            depth: 120, // ширина кирпича мм
            coef: 5
        }, {
            name: '250х120х140 кирпич строительный двойной пустотелый',
            img: '08_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            coef: 5
        }],
        // толщина кирпича
        bricksDepthArr: [{
            name: 'Половина кирпича',
            img: '01_grid',
            value: 0,
        }, {
            name: 'В 1 кирпич',
            img: '02_grid',
           value: 1,
        }, {
            name: 'В 1,5 кирпича',
            img: '03_grid',
            value: 1.5,
        }, {
            name: 'В 2 кирпича',
            img: '04_grid',
            value: 2,
        }],
        // толщина раствора в кладке
        bricksLiquorDepthArr: [{
            name: 'Раствор 10',
            value: 10,
        }, {
            name: 'Раствор 15',
            value: 15,
        }, {
            name: 'Раствор 20',
            value: 20,
        }],
        // Кладочная сетка   select
        bricksGridArr: [{
            name: 'Каждый ряд',
            coef: 2
        }, {
            name: 'Через ряд',
            coef: 3
        }, {
            name: 'Через 2 ряда',
            coef: 4
        }, {
            name: 'Через 3 ряда',
            coef: 4
        }, {
            name: 'Через 4 ряда',
            coef: 4
        }],
    },

    methods: {
        // управление аккордеоном
        mytoggle: function (n) {
            for (var i = 0; i < 13; i++) { // close all boxes
                vm.boxes[i].show = false;
            }
            vm.boxes[n].show = true; // open the corresponding box
        },
    },

    computed: {
        // расчет толщины стены
        depthResult: function() {
            var length = this.selectSize.length; // длина
            var width = this.selectSize.width; // ширина
            var depth = this.selectDepth.value; // толщина кладки
            var liq = this.selectLiquorDepth.value; // толщина раствора
            var result = 0;

            switch (depth) {
                case 0:
                    result = width;
                    break;
                case 1:
                    result = length;
                    break;
                case 1.5:
                    result = length+width+liq;
                    break;
                case 2:
                    result = length*2+liq*2;
                    break;
                default:
                   result = 0;
            }

             return result;
        },

        // расчет площади кладки
        squareResult: function() {
            var perimeter = this.inputPerimeter; // длина периметра
            var height = this.inputDegHeight; // Высота стен по углам (см.)

            return Math.round( (perimeter * height)/100 );

        },

        // расчет количества кирпича
        numResult: function() {
            var perimeter = this.inputPerimeter; // длина периметра
            var height = this.inputDegHeight; // Высота стен по углам (см.)
            var square = Math.round( (perimeter * height)/100 );

            return Math.round( 1.08 * ( square * 51) );

        },

        // возврат названия картинки с кирпичом
        imjSrc: function() {
            return this.selectSize.img;
        },
        // возврат названия картинки с толщиной стен
        imjGrids: function() {
            return this.selectDepth.img;
        },

    }
});
