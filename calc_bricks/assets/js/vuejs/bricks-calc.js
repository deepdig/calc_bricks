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
            length: 250, // длина кирпича мм
            width: 120, // ширина кирпича мм
            height: 65, // высота мм
            weight: 3.6, // вес 1 кирпича
            volume: 0.00195, // объем 1 кирпича m3
            num3: 394, // Количество кирпича в кубе c учетом швов
            coef: 2
        }, {
            name: '250х120х88 кирпич лицевой пустотелый полуторный',
            img: '02_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 88, // высота мм
            weight: 4.3, // вес 1 кирпича
            volume: 0.00264, // объем 1 кирпича m3
            num3: 302, // Количество кирпича в кубе c учетом швов
            coef: 3
        }, {
            name: '250х120х65 кирпич печной одинарный',
            img: '03_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 65, // высота мм
            weight: 3.6, // вес 1 кирпича
            volume: 0.00195, // объем 1 кирпича m3
            num3: 394, // Количество кирпича в кубе c учетом швов
            coef: 4
        }, {
            name: '250х120х65 кирпич шамотный одинарный',
            img: '04_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 65, // высота мм
            weight: 3.6, // вес 1 кирпича
            volume: 0.00195, // объем 1 кирпича m3
            num3: 394, // Количество кирпича в кубе c учетом швов
            coef: 5
        }, {
            name: '250х120х65 кирпич силикатный одинарный',
            img: '05_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 65, // высота мм
            weight: 3.6, // вес 1 кирпича
            volume: 0.00195, // объем 1 кирпича m3
            num3: 394, // Количество кирпича в кубе c учетом швов
            coef: 5
        }, {
            name: '250х120х88 кирпич силикатный полуторный',
            img: '06_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 88, // высота мм
            weight: 4.3, // вес 1 кирпича
            volume: 0.00264, // объем 1 кирпича m3
            num3: 302, // Количество кирпича в кубе c учетом швов
            coef: 5
        }, {
            name: '250х120х65 кирпич строительный одинарный',
            img: '07_bricks',
            length: 250, // длина кирпича
            depth: 120, // ширина кирпича мм
            height: 65, // высота мм
            weight: 3.6, // вес 1 кирпича
            volume: 0.00195, // объем 1 кирпича m3
            num3: 394, // Количество кирпича в кубе c учетом швов
            coef: 5
        }, {
            name: '250х120х140 кирпич строительный двойной пустотелый',
            img: '08_bricks',
            length: 250, // длина кирпича
            width: 120, // ширина кирпича мм
            height: 140, // высота мм
            weight: 7.2, // вес 1 кирпича
            volume: 0.0042, // объем 1 кирпича m3
            num3: 200, // Количество кирпича в кубе c учетом швов
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
            value: 0
        }, {
            name: 'Через ряд',
            value: 1
        }, {
            name: 'Через 2 ряда',
            value: 2
        }, {
            name: 'Через 3 ряда',
            value: 3
        }, {
            name: 'Через 4 ряда',
            value: 4
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
            var brick = this.selectSize.height; // высота, тип кирпича
            var liq = this.selectLiquorDepth.value; // толщина раствора
            var depth = this.selectDepth.value; // толщина кладки
            var x = 0; // кирпичей на кв.м
            var brickFlag = 0; // тип кирпича

            var square = Math.round( (perimeter * height)/100 ); // находим площадь

            // расчет типа кирпича
            switch (brick) {
                case 65:
                    brickFlag = 1; // одинарный
                    break;
                case 88:
                    brickFlag = 1.5; // полуторный
                    break;
                case 140:
                    brickFlag = 2; // двойной
                    break;
                default:
                   brickFlag = 0;
            }

            if (brickFlag == 1) {

                // кирпичей в 1кв.м для одинарного кирпича в зависимости от типа кладки
                switch (depth) {
                    case 0:
                        x = 51;
                        break;
                    case 1:
                        x = 102;
                        break;
                    case 1.5:
                        x = 153;
                        break;
                    case 2:
                        x = 204;
                        break;
                    default:
                       x = 0;
                }
            } else if (brickFlag == 1.5) {

                // кирпичей в 1кв.м для полуторного кирпича в зависимости от типа кладки
                switch (depth) {
                    case 0:
                        x = 39;
                        break;
                    case 1:
                        x = 78;
                        break;
                    case 1.5:
                        x = 78;
                        break;
                    case 2:
                        x = 156;
                        break;
                    default:
                       x = 0;
                }

            } else if (brickFlag == 2) {

                // кирпичей в 1кв.м для двойного кирпича в зависимости от типа кладки
                switch (depth) {
                    case 0:
                        x = 26;
                        break;
                    case 1:
                        x = 52;
                        break;
                    case 1.5:
                        x = 52;
                        break;
                    case 2:
                        x = 104;
                        break;
                    default:
                       x = 0;
                }

            }

            return Math.round( square * x );

        },

        // расчет Оптимальная высота стены
        wallResult: function() {
            var width = this.selectSize.width; // ширина кирпича
            var height = this.inputDegHeight; // высота стен
            var liq = this.selectLiquorDepth.value; // толщина раствора
            var sum = (width + liq)/10; // кирпич и слой раствора в см
            var row = Math.round(height / (width/10)); // сколько рядов кирпича в стене

            return Math.round( row * sum );
        },

        // расчет рядов с учетом швов
        rowResult: function() {
            var width = this.selectSize.width; // ширина кирпича
            var height = this.inputDegHeight; // высота стен
            var liq = this.selectLiquorDepth.value; // толщина раствора
            var sum = (width + liq)/10; // кирпич и слой раствора в см

            return Math.round(height / sum);
        },

        // расчет объема раствора
        volumeResult: function() {
            var num = this.numResult; // количество кирпича
            var brickVolume = this.selectSize.volume; // объем одного кирпича
            var brick = this.selectSize.height; // высота, тип кирпича
            var volume = Math.round(num * brickVolume * 100)/100; // Общий объем кирпича
            var brickCoef = 0;

            // расчет раствора на 1м3 от типа кирпича
            switch (brick) {
                case 65:
                    brickCoef = 0.189; // одинарный
                    break;
                case 88:
                    brickCoef = 0.221; // полуторный
                    break;
                case 140:
                    brickCoef = 0.24; // двойной
                    break;
                default:
                   brickCoef = 0;
            }


            return volume * brickCoef;
        },

        // расчет кладочной сетки
        gridsResult: function() {
            var square = this.squareResult; // Общая площадь кладки
            var grid = this.selectGrid.value; // кладочная сетка
            var x = 0;
            // расчет кладочной сетки
                switch (grid) {
                    case 0:                  // каждый ряд
                        x = square*10 * 1.3; // 1.3м сетки на 0.1м2 кладки
                        break;
                    case 1:                  // через ряд
                        x = (square*10 * 1.3)/2;
                        break;
                    case 2:                  // через два ряда
                        x = (square*10 * 1.3)/4;
                        break;
                    case 3:                  // через три ряда
                        x = (square*10 * 1.3)/6;
                        break;
                    case 4:                  // через четыре ряда
                        x = (square*10 * 1.3)/8;
                        break;
                    default:
                       x = 0;
                }

            return x;
        },

        // вес готовых стен
        wallWeightResult: function() {
            var weight = this.selectSize.weight; // вес кирпича
            var num = this.numResult; // количество кирпича
            var volume = this.volumeResult;
            // Math.round(weight * num * 10)/10 + volumeResult * 2200

            return Math.round( (weight * num * 10)/10 + volume * 2200 );
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
