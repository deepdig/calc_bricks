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
            name: '250х120х65 кирпич лицевой пустотелый одинарный',
            img: '01_bricks',
            coef: 2
        }, {
            name: '250х120х88 кирпич лицевой пустотелый полуторный',
            img: '02_bricks',
            coef: 3
        }, {
            name: '250х120х65 кирпич печной одинарный',
            img: '03_bricks',
            coef: 4
        }, {
            name: '250х120х65 кирпич шамотный одинарный',
            img: '04_bricks',
            coef: 5
        }, {
            name: '250х120х65 кирпич силикатный одинарный',
            img: '05_bricks',
            coef: 5
        }, {
            name: '250х120х88 кирпич силикатный полуторный',
            img: '06_bricks',
            coef: 5
        }, {
            name: '250х120х65 кирпич строительный одинарный',
            img: '07_bricks',
            coef: 5
        }, {
            name: '250х120х140 кирпич строительный двойной пустотелый',
            img: '08_bricks',
            coef: 5
        }],
        // толщина кирпича
        bricksDepthArr: [{
            name: 'Половина кирпича',
            img: '01_grid',
            coef: 2
        }, {
            name: 'В 1 кирпич',
            img: '02_grid',
            coef: 3
        }, {
            name: 'В 1,5 кирпича',
            img: '03_grid',
            coef: 4
        }, {
            name: 'В 2 кирпича',
            img: '04_grid',
            coef: 5
        }],
        // толщина раствора в кладке
        bricksLiquorDepthArr: [{
            name: 'Раствор 10',
            coef: 2
        }, {
            name: 'Раствор 15',
            coef: 3
        }, {
            name: 'Раствор 20',
            coef: 4
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
        // расчет кирпича
        totalPrice: function() {
            var selectPopulation = this.selectTheme;
            var selectFamaly = this.selectFamaly;

            function checkedSum(array){
                var sum = 0;
                for(var i = 0; i < array.length; i++){
                    sum += array[i];
                    }
                return Number(sum);
            }

            if (agent === true) {

                var summa = 100;

            } else if (coordinator === true) {
                var summa = 200;
            }

             return summa;

//            return Math.round(
//                +selectPopulation +
//                +selectFamaly
//            );
        },
        // end - завершение функции "расчет кирпича" - totalPrice

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
