$(document).ready(function () {
    var input = document.getElementById('Cpf'),
        oldValue,
        regex = new RegExp(/^\d{0,14}$/g),
        mask = function (value) {
            var cpf = input.value;
            cpf = cpf.replace(/\D/g, "")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            return cpf;
        },
        unmask = function (value) {
            /^\d{0,14}$/g
            var output = value.replace(new RegExp(/[^\d]/, 'g'), '');
            return output;
        },
        keydownHandler = function (e) {
            oldValue = e.target.value;
        },
        inputHandler = function (e) {
            var el = e.target,
                newValue = el.value;
            newValue = unmask(newValue);

            if (newValue.match(regex)) {
                newValue = mask(newValue);
                el.value = newValue;
            } else {
                el.value = oldValue;
            }
        }
        ;

    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('input', inputHandler);
    input.addEventListener('change', inputHandler);

})

$(document).ready(function () {
    var input = document.getElementById('CpfBnf'),
        oldValue,
        regex = new RegExp(/^\d{0,14}$/g),
        mask = function (value) {
            var cpf = input.value;
            cpf = cpf.replace(/\D/g, "")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            return cpf;
        },
        unmask = function (value) {
            /^\d{0,14}$/g
            var output = value.replace(new RegExp(/[^\d]/, 'g'), '');
            return output;
        },
        keydownHandler = function (e) {
            oldValue = e.target.value;
        },
        inputHandler = function (e) {
            var el = e.target,
                newValue = el.value;
            newValue = unmask(newValue);

            if (newValue.match(regex)) {
                newValue = mask(newValue);
                el.value = newValue;
            } else {
                el.value = oldValue;
            }
        }
        ;

    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('input', inputHandler);
    input.addEventListener('change', inputHandler);

})

