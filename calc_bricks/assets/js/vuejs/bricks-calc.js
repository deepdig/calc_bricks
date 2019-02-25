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
        title: 'Калькулятор',

        // --- Данные ---
        // Количество населения
        selectPopulationArr: [{
            name: 'до 100 000 жителей',
            coef: 2
        }, {
            name: 'до 500 000 жителей',
            coef: 3
        }, {
            name: 'до 1 000 000 жителей',
            coef: 4
        }, {
            name: 'свыше 1 000 000 жителей',
            coef: 5
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
