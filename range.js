// ;(function($) {
var thumb = document.querySelector('.thumb');
var thumbLeft = document.querySelector('.thumbLeft');
var thumbRight = document.querySelector('.thumbRight');
var field_range = document.querySelector('.field_range');
var fieldOneRange = document.querySelector('.field_range');
var range = document.querySelector('.range');
var containerRange = document.querySelector('.container_range');
var valueOutputLeftHTML = document.getElementById('valueLeft');
var valueOutputRightHTML = document.getElementById('valueRight');
// var valueOutputLeftSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueLeft')).step);
// var valueOutputRightSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueRight')).step);
var valueOutputLeft = document.getElementById('valueLeft');
var valueOutputRight = document.getElementById('valueRight');
var valueTopL = document.querySelector('.valueTopLeft'); // цифры сверху
var valueTopR = document.querySelector('.valueTopRight'); // цифры сверху
var btnTip = document.getElementById('btnTip'); // Кнопка для tip
var bar = document.getElementById('bar');
var minimum = document.getElementById('minimum'); // минимум
var minimumEvent = document.getElementById('minimum'); // минимум
var maximum = document.getElementById('maximum'); // максимум
var maximumEvent = document.getElementById('maximum'); // максимум
var thumbTop = document.querySelector('.thumbTop'); // верхний ползунок вертикального слайдера
var containerVR = document.querySelector('.container_range_vertical'); // вертикальный слайдер
var fieldRangeVR = document.querySelector('.field_range_vertical'); // внутри вертикального салйдера
var step = parseInt(document.getElementById('valueSteps').value); //шаг
var stepEvent = document.getElementById('valueSteps'); //шаг
var filedSteps = document.querySelector('.stepsIn');
var fieldStepsOut = document.querySelector('.steps');
var startStep = document.querySelector('.startStep');
var endStep = document.querySelector('.endStep');
var typeRange = document.querySelector('.typeRange');
var leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
var offLeft = containerRange.offsetLeft;
var widthThumb = parseInt(thumb.style.width) / 10;
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
var widthRange = parseInt(getComputedStyle(range).width);
var stopMax = parseInt(document.getElementById('valueRight').max);
valueOutputLeft.value = '' + Math.round(((parseInt(thumbLeft.style.left) - 3) * (parseInt(valueOutputLeft.max)) / 100));
valueOutputRight.value = '' + Math.round(((parseInt(thumbRight.style.left) + 3) * (parseInt(valueOutputRight.max)) / 100));
field_range.style.left = valueLeft + '%';
field_range.style.width = valueRight - valueLeft + widthThumb + '%';
valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
minimum.value = minimum.min;
maximum.value = maximum.max;
var tip = {
    valueTopL: valueOutputLeftHTML.addEventListener('keyup', function () {
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
    }),
    valueTopR: valueOutputRightHTML.addEventListener('keyup', function () {
        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
    }),
    // вкл/выкл 
    buttonTip: btnTip.addEventListener('click', function () {
        if (valueTopL.classList.contains('hidden')) {
            if (thumbLeft.classList.contains('hidden') && valueTopR.classList.contains('hidden')) {
                valueTopR.classList.remove('hidden');
                range.setAttribute('tip', 'on');
            }
            else if (thumbLeft.classList.contains('hidden')) {
                valueTopR.classList.add('hidden');
                range.setAttribute('tip', 'off');
            }
            else if (!thumbLeft.classList.contains('hidden') && !thumbRight.classList.contains('hidden')) {
                valueTopR.classList.remove('hidden');
                valueTopL.classList.remove('hidden');
                range.setAttribute('tip', 'on');
            }
        }
        else {
            valueTopR.classList.add('hidden');
            valueTopL.classList.add('hidden');
        }
    })
};
var barClick = {
    onBar: bar.addEventListener('click', function () {
        if (!(field_range.classList.contains('hidden'))) {
            field_range.classList.add('hidden');
        }
        else {
            field_range.classList.remove('hidden');
        }
    })
};
var moveClickFieldRange = {
    moveDoubleBar: field_range.addEventListener('click', function (event) {
        // если есть бар и двойной диапозон то выполнить работу
        if (range.getAttribute('range') === 'double' && range.getAttribute('bar') === 'on') {
            event.preventDefault();
            var tl = thumbLeft.getBoundingClientRect().left; // margin от левого ползунка до конца страницы по левую сторону
            var tr = thumbRight.getBoundingClientRect().left; // аналогично с правой 
            var newPosMove = ((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width));
            if (event.target == field_range) {
                if (tr - event.clientX > event.clientX - tl) {
                    thumbRight.style.left = newPosMove * 100 + '%' + " ";
                    field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((newPosMove * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                    valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                    valueTopL.style.zIndex = '98';
                    thumbLeft.style.zIndex = '98';
                    valueTopR.style.zIndex = '99';
                    thumbRight.style.zIndex = '99';
                }
                else {
                    thumbLeft.style.left = "" + (((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width)) * 100 + '%');
                    field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                    field_range.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
                    // преобразуем в значения
                    valueOutputLeft.value = '' + Math.round((newPosMove * 104.168) * (parseInt(valueOutputLeft.max)) / 100);
                    // Добавляем минимум
                    valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                    valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
                    valueTopR.style.zIndex = '98';
                    valueTopL.style.zIndex = '99';
                    thumbLeft.style.zIndex = '99';
                    thumbRight.style.zIndex = '98';
                }
            }
        }
        else {
            if (event.target == field_range) {
                var newPosMove = ((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width));
                thumbRight.style.left = "" + (newPosMove * 100 + '%');
                field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                // преобразуем в значения 
                valueOutputRight.value = '' + Math.round((newPosMove * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                // Добавляем минимум
                valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
                // Значения сверху
                valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                valueTopL.style.zIndex = '98';
                thumbLeft.style.zIndex = '98';
                valueTopR.style.zIndex = '99';
                thumbRight.style.zIndex = '99';
            }
        }
    })
};
var moveCLickRange = {
    moveDoubleBar: range.addEventListener('click', function (event) {
        if (range.getAttribute('range') === 'double' && range.getAttribute('bar') === 'on') {
            event.preventDefault(); // отключаем поведение по умолчанию
            var tl = thumbLeft.getBoundingClientRect().left; // margin от левого ползунка до конца страницы по левую сторону
            var tr = thumbRight.getBoundingClientRect().left; // аналогично с правой 
            var posAfterThumbR = (event.clientX - leftDifference - ((parseInt(thumbRight.style.left) * widthRange) / 100)); // позиция после правого ползунка
            var posAfterThumbL = (event.clientX - leftDifference - ((parseInt(thumbLeft.style.left) * widthRange) / 100)); // позиция перед левым ползунком
            if (posAfterThumbR < 0) {
                posAfterThumbR = posAfterThumbR * -1;
            }
            if (posAfterThumbL < 0) {
                posAfterThumbL = posAfterThumbL * -1;
            }
            if (event.target == range) {
                if (posAfterThumbR < posAfterThumbL) {
                    thumbRight.style.left = "" + (parseInt(thumbRight.style.left) + ((posAfterThumbR * 100) / widthRange) + '%');
                    field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width)) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                    valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                    // tip правый поверх левого
                    valueTopL.style.zIndex = '98';
                    valueTopR.style.zIndex = '99';
                }
                else {
                    thumbLeft.style.left = "" + (((event.clientX - leftDifference) * 100) / widthRange + '%');
                    field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                    field_range.style.left = "" + thumbLeft.style.left;
                    // преобразуем в значения 
                    valueOutputLeft.value = '' + Math.round((((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width)) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                    valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
                    valueTopL.style.zIndex = '99';
                    valueTopR.style.zIndex = '98';
                }
            }
        }
        else {
            if (event.target == range) {
                var posAfterThumbR = (event.clientX - leftDifference - ((parseInt(thumbRight.style.left) * widthRange) / 100)); // позиция после правого ползунка
                thumbRight.style.left = "" + (parseInt(thumbRight.style.left) + ((posAfterThumbR * 100) / widthRange) + '%');
                field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%');
                // преобразуем в значения 
                valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width)) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                // Добавляем минимум
                valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
                // Значения сверху
                valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
            }
        }
    })
};
var steps = {
    enterSteps: stepEvent.addEventListener('input', function (event) {
        var maxValue = parseInt(document.getElementById('valueRight').max); // максимум 
        var steps = parseInt(document.getElementById('valueSteps').value); // заданный шаг
        var valueLabel = maxValue / steps; // кол-во делений
        filedSteps.innerHTML = ''; // очишаем прошлые шаги
        startStep.innerHTML = '';
        endStep.innerHTML = '';
        valueOutputLeft.step = "" + step;
        valueOutputRight.step = "" + step;
        document.getElementById('valueRight').step = "" + step;
        // добавляем шаги
        if (valueLabel != Infinity || valueLabel != NaN) {
            startStep.insertAdjacentHTML('beforeend', "<label>0</label>");
            for (var j = 0, i = 0; j < valueLabel - 1; j++) {
                i += steps;
                filedSteps.insertAdjacentHTML('beforeend', "<label>" + i + "</label>");
            }
        }
        endStep.insertAdjacentHTML('beforeend', "<label>" + maxValue + "</label>");
    })
};
var controller = {
    enterMinumum: minimumEvent.addEventListener('input', function () {
        valueOutputLeft.min = "" + parseInt(minimum.value);
        valueOutputRight.min = "" + parseInt(minimum.value);
        minimum.min = minimum.value;
        // переставляем ползунок в начало
        valueOutputLeft.value = minimum.min;
        thumbLeft.style.left = 1 + '%';
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
        field_range.style.left = 0 + '%';
        field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + '%');
        // Меняем максимум под минимальное значеие так чтобы он остался прежним
        // p.s. в инпуте всегда прибавляется минимум
        // прибавляем к максимум если min < 0 & вычитаем из максимума если min > 0
        if (parseInt(minimum.value) < 0) {
            valueOutputRight.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
            valueOutputLeft.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
        }
        else {
            valueOutputRight.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
            valueOutputLeft.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
        }
        if (parseInt(minimum.min) > parseInt(maximum.max)) {
            maximum.value = "" + (parseInt(minimum.value) + 1);
            valueOutputRight.max = "" + (parseInt(maximum.value) + 1);
            valueOutputLeft.max = "" + (parseInt(maximum.value) + 1);
            if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
                valueOutputRight.value = maximum.value;
                thumbRight.style.left = 95 + '%';
                thumbLeft.style.left = 1 + '%';
            }
        }
        if (parseInt(minimum.value) == NaN || minimum.value == '') {
            valueOutputLeft.min = "" + 0;
        }
    }),
    enterMaximum: maximumEvent.addEventListener('input', function () {
        if (parseInt(minimum.value) < 0) {
            valueOutputRight.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
            valueOutputLeft.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
        }
        else {
            valueOutputRight.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
            valueOutputLeft.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
        }
        // valueOutputRight.max = `${maximum.value}`;
        if (maximum.value == null || parseInt(maximum.value) == NaN) {
            valueOutputRight.max = "" + stopMax;
        }
    }),
    oneRange: 
    //одинарный слайдер
    typeRange.addEventListener('click', function () {
        thumbLeft.style.left = 0 + '%';
        field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left));
        // Убираем левый ползунок и заполняем field range else добавляем ползунок обратно
        if (thumbLeft.classList.contains('hidden')) {
            // меняем класс диапозона
            range.setAttribute('range', 'double');
            // показываем все ползунки
            thumbLeft.classList.remove('hidden');
            valueTopL.classList.remove('hidden');
            valueTopR.classList.remove('hidden');
            valueOutputLeft.value = '0';
        }
        else {
            // меняем класс диапозона
            range.setAttribute('range', 'one');
            // скрываем левый ползунок оставляем правый
            thumbLeft.classList.add('hidden');
            valueTopL.classList.add('hidden');
            valueTopL.innerHTML = '0';
            valueTopL.style.left = 0 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) + 2 + '%';
            field_range.style.left = 0 + '%';
            valueOutputLeft.value = '0';
        }
    }),
    eventThumbLeft: thumbLeft.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var shiftX = event.clientX - thumbLeft.getBoundingClientRect().left; // смещение позиции мыши клиента  
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        thumbLeft.style.zIndex = '99';
        valueTopL.style.zIndex = '99';
        valueTopR.style.zIndex = '98';
        thumbRight.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            var rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки
            // if (newPos < parseInt(valueOutputLeft.min)) {
            //     newPos = parseInt(valueOutputLeft.min);
            // }
            if (newPos < 0) {
                newPos = 0;
            }
            // Если левый ползунок пытается быть больше правого
            if (newPos / parseFloat(getComputedStyle(range).width) * 100 >= parseFloat(thumbRight.style.left) || parseInt(valueOutputLeft.value) >= parseInt(valueOutputRight.value)) {
                newPos = ((parseFloat(thumbRight.style.left) * parseFloat(getComputedStyle(range).width)) / 100) - 0.1;
            }
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            // Перемещение ползунка
            thumbLeft.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%';
            // Заполнение инпутов. преобразуем из % в целые значения инпутов
            valueOutputLeft.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputLeft.max)) / 100);
            // настройка минимума
            valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min));
            // Верхние значения
            valueTopL.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
            valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
        }
        function changeWidth() {
            var widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);
            field_range.style.width = (leftPositionThumbRight - leftPositionThumbLeft) + widthThumb + '%';
            field_range.style.left = leftPositionThumbLeft + 0.7 + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    }),
    eventThumbRight: thumbRight.onmousedown = function (event) {
        event.preventDefault();
        var shiftX = event.clientX - thumbRight.getBoundingClientRect().left;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        thumbRight.style.zIndex = '99';
        valueTopR.style.zIndex = '99';
        valueTopL.style.zIndex = '98';
        thumbLeft.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            var rightEdge = range.offsetWidth - thumbRight.offsetWidth;
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            if (newPos / parseFloat(getComputedStyle(range).width) * 100 <= parseFloat(thumbLeft.style.left) || parseInt(valueOutputRight.value) <= parseInt(valueOutputLeft.value)) {
                newPos = ((parseFloat(thumbLeft.style.left) * parseFloat(getComputedStyle(range).width)) / 100) + 0.1;
            }
            thumbRight.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%'; // переводим в % range
            // преобразуем в значения
            valueOutputRight.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
            // Добавляем минимум
            valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
            // Значения сверху
            valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
            valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
        }
        function changeWidth() {
            var widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);
            field_range.style.width = (leftPositionThumbRight - leftPositionThumbLeft) + widthThumb + '%';
            field_range.style.left = leftPositionThumbLeft + 0.9 + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
            // biss=false;
        }
    },
    enterInputLeft: valueOutputLeftHTML.oninput = function () {
        // Выстраиваем числовые значения в инпутах
        // 92 и 5 т.к. field range заполняется всего на 92 процента
        thumbLeft.style.left = (parseFloat(valueOutputLeft.value) / parseInt(valueOutputLeft.max)) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputLeft.value)) > parseInt(valueOutputLeft.max)) {
            valueOutputLeft.value = "" + parseInt(valueOutputLeft.max);
            thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        if (parseInt(valueOutputLeft.value) > parseInt(valueOutputRight.value)) {
            valueOutputLeft.value = valueOutputRight.value;
            thumbLeft.style.zIndex = '99';
            thumbLeft.style.left = thumbRight.style.left;
            field_range.style.width = 0 + '%';
        }
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
    },
    enterInputRight: valueOutputRightHTML.oninput = function () {
        thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputRight.value)) > parseInt(valueOutputRight.max)) {
            valueOutputRight.value = "" + parseInt(valueOutputRight.max);
            thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
            valueTopR.innerHTML = valueOutputLeft.value;
            thumbRight.style.left = thumbLeft.style.left;
            field_range.style.width = '0%';
        }
        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
    }
};
var verticalRange = {
    thumbTop: thumbTop.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var shiftY = event.clientY - thumbTop.getBoundingClientRect().top;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mouseup', nowMouseUp);
        document.addEventListener('mousemove', changeWidth);
        function nowMouseMove(event) {
            var newPosVertical = event.clientY - shiftY - containerVR.getBoundingClientRect().top;
            if (newPosVertical < 0) {
                newPosVertical = 0;
            }
            var downEdge = containerVR.offsetHeight - thumbTop.offsetHeight;
            if (newPosVertical > downEdge) {
                newPosVertical = downEdge;
            }
            // преобразуем в значения
            thumbTop.style.top = (newPosVertical / parseInt(getComputedStyle(containerVR).height)) * 100 + '%'; // переводим в % range
            valueOutputRight.value = '' + Math.round((newPosVertical / parseInt(getComputedStyle(containerVR).height) * 109.9) * (parseInt(valueOutputRight.max)) / 100);
            // Значения сверху
        }
        function changeWidth() {
            var topPosThumbTop = parseInt(thumbTop.style.top);
            fieldRangeVR.style.height = topPosThumbTop + widthThumb + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    })
};
