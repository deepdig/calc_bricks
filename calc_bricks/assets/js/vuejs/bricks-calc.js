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
            name: '250x120x65 Облицовочный(одинарный)',
            coef: 2
        }, {
            name: '250*120*65   1 НФ (одинарный)',
            coef: 3
        }, {
            name: '250*120*88   1,4 НФ (полуторный)',
            coef: 4
        }, {
            name: '250*120*140   2,1 НФ (двойной)',
            coef: 5
        }, {
            name: '250*85*65   0,7 НФ («Евро»)',
            coef: 5
        }, {
            name: '288*63*138    1,3 НФ (модульный одинарный)',
            coef: 5
        }, {
            name: '250*120*138   Силикатный 3х пустотный',
            coef: 5
        }],
        // толщина кирпича
        bricksDepthArr: [{
            name: 'Половина кирпича',
            coef: 2
        }, {
            name: 'В 1 кирпич',
            coef: 3
        }, {
            name: 'В 1,5 кирпича',
            coef: 4
        }, {
            name: 'В 2 кирпича',
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
        // подсчет предпологаемого дохода
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
        // end - завершение функции "подсчет предпологаемого дохода" - totalPrice

    }
});
