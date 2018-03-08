class OsagoView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        // this.render = this.render.bind(this);
        this.states = this.getInitialStates();
        this.params = {};
        //this.premium = 0;
    }

    /**
     * Отобразить форму и таблицу
     * @param params
     * @param factors
     */
    display(params, factors, premium) {
        // this.premium = premium;

        console.log('OsagoView5.display: params=');
        console.dir(params);
        console.log('OsagoView5.display: factors=');
        console.dir(factors);
        this.params = params;

        this.states.owner.buttonChecked = params.owner;
        this.states.registration.buttonChecked = params.registration;
        this.states.trailer.checked = params.trailer;

        this.states.limit.checked = params.limit;

        this.states.region.region = params.regions;
        this.states.crime.checked = params.crime;

//    console.log('this.states=');
//    console.dir(this.states);
        this.calcForm.setStates(this.states); // обновить форму
        this.calcTable.setFactors(factors);   // обновить таблицу

        this.displayPremium.setPremium(premium);
        this.setRequestValues(params, factors, premium);
        //$('input[name="insurance_premium"]').val(premium);
        //(params.owner == 'fiz') ?
    }

    setRequestValues(params, factors, premium) {
        var request_values = '';
        var typeTC_customer;
        var powerTC_customer;
        var owner_customer;
        var registration;
        var term_customer;
        var period_customer;
        var kbm_customer;
        var region_customer;
        var city_customer;
        var crime_customer;
        var limit_customer;
        var driving_experience_customer;
        var trailer_customer;
        var tariff_values_customer;

        switch (this.params.registration) {
            case "regRu":
                registration = ' ТС зарегистрировано в России; ';
                break;
            case "regNo":
                registration = ' ТС зарегистрировано в  иностранном государстве; ';
                break;
            case "regFo":
                registration = " ТС следует к месту регистрации; ";
                break;
        }

        typeTC_customer = params.typeTC ? (typeTC[params.typeTC].label+'; ') : 'Не выбрано; ';

        powerTC_customer=  params.powerTC ? (powerTC[params.powerTC].label+'; ') : 'Не выбрано; ';

        owner_customer = ((params.owner == 'fiz') ? ' физ.лицо; ' : ' юр.лицо; ');

        term_customer= params.term  ? (term[params.term].label+'; ') : 'Не выбрано; ';
        period_customer=  params.period ? (period[params.period].label+'; ') : 'Не выбрано; ';
        kbm_customer=  params.kbm ? (kbm[params.kbm].label+'; ') : 'Не выбрано; ';
        region_customer=  params.regions ? (regions[params.regions].label+'; ') : 'Не выбрано; ';
        city_customer=  params.city ? (params.city + '; ') : 'Не выбрано; ';

        tariff_values_customer = (params.typeTC && params.regions) ? typeTC[params.typeTC][regions[params.regions].st_group]+'; ' : 'Не выбрано; ';

        limit_customer=  params.limit == true ? 'ДА; ' : 'НЕТ; ';
        crime_customer=  params.crime == true ? 'ДА; ' : 'НЕТ; ';
        driving_experience_customer= params.driving_experience  ? (driving_experience[params.driving_experience].label+'; ') : 'Не выбрано; ';
        trailer_customer = (params.trailer ? 'ДА; ': 'НЕТ; ');
        var str ='<table>' +
            '<tbody>' +
            '<tr>' +
                '<th>Владелец:</th>' +
                '<th>Регистрация ТС:</th>' +
                '<th>Тип ТС:</th>' +
                '<th>Прицеп:</th>' +
                '<th>Мощность ТС:</th>' +
                '<th>Срок договора:</th>' +
            '<th>Период использования ТС:</th>' +
            '<th>КБМ:</th>' +
            '<th>Регион:</th>' +
            '<th>Город:</th>' +
            '<th>Имеются грубые нарушения:</th>' +
            '<th>Кол-во водителей ограничено:</th>' +
            '<th>Минимальный возраст/стаж:</th>' +
            '</tr>' +
            '<tr>' +
                '<td>'+owner_customer+'</td>' +
            '<td>'+registration+'</td>' +
            '<td>'+typeTC_customer+'</td>' +
            '<td>'+trailer_customer+'</td>' +
        '<td>'+powerTC_customer+'</td>' +
        '<td>'+term_customer+'</td>' +
        '<td>'+period_customer+'</td>' +
        '<td>'+kbm_customer+'</td>' +
        '<td>'+region_customer+'</td>' +
        '<td>'+city_customer+'</td>' +
        '<td>'+crime_customer+'</td>' +
        '<td>'+limit_customer+'</td>' +
        '<td>'+driving_experience_customer+'</td>' +
            '</tr>' +

            '</tbody>' +
            '</table>';


        request_values  =str;



   /*     request_values += 'Владелец:' + owner_customer;
        request_values += 'Регистрация ТС:' + registration;
        request_values += 'Тип ТС:' + typeTC_customer;
        request_values += 'Прицеп:' + trailer_customer;
        request_values += 'Мощность ТС:' + powerTC_customer;
        request_values += 'Срок договора:' + term_customer;
        request_values += 'Период использования ТС:' + period_customer;
        request_values += 'КБМ:' + kbm_customer;
        request_values += 'Регион:' + region_customer;
        request_values += 'Город:' + city_customer;
        request_values += 'Имеются грубые нарушения:' + crime_customer;
        request_values += 'Кол-во водителей ограничено:' + limit_customer;
        request_values += 'Минимальный возраст/стаж:' + driving_experience_customer;

*/
        $('input[name="tariff_values"]').val(tariff_values_customer);
        $('input[name="request_values"]').val(request_values);
        $('input[name="premium_values"]').val(premium);
    }

    /**
     * Выдать начальные значения параметров формы
     * @returns {{owner: {buttonChecked: string}, registration: {buttonChecked: string}}}
     */
    getInitialStates() {
        return {
            owner: {buttonChecked: "fiz"},
            registration: {buttonChecked: "regRu"},
            trailer: {checked: false},
            limit: {checked: false},
            region: {region: null},
            crime: {checked: false},
            kbm:{selected:false},

        }
    }

    /**
     * Сообщить "наверх" новое значение параметра формы
     * @param key
     * @param value
     */
    assign(key, value) {
        console.log("OsagoView assign() key=" + key + ", value=" + value);
        this.controller.assign(key, value);
    }

    /**
     * Выдать массив ключей коэффициентов (для контроллера)
     * @returns {*|Array}
     */
    getFactorKeys() {
        return this.calcTable.getFactorKeys();
    }

    getOptions(name, parameter = null) {
        var options = [];
        switch (name) {
            case "driving_experience":
                var obj = this.model.getDriving_experience();
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;
            case "typeTC":
                var obj = this.model.getTypeTC();
             /* console.log("OsagoView. getOptions() typeTC OBJ =");
              console.dir(obj);*/
                for (var key in obj) {
                    if (this.params.owner==='yur'){
                        if(key==='tc22');
                        else{
                            options.push({value: key, label: obj[key].label, selected: false});
                        }

                    }else{
                        if(key==='tc21');
                        else{
                            options.push({value: key, label: obj[key].label, selected: false});
                        }
                    }
                 }

                break;

            case "kbm":
                var obj = this.model.getKbm();
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;

            case "powerTC":
                var obj = this.model.getPowerTC();
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;
            case "term":

              /*  console.log("OsagoView.getOptions term this.params.fixedTerm=" + this.params.fixedTerm);*/
                var obj = this.model.getTerm();
                if (this.params.fixedTerm) {  //это key или null
                    //для фиксированного key формируем единствееную опцию
                    var key = this.params.fixedTerm;
                    if (obj.hasOwnProperty(key)) {
                        options.push({value: key, label: obj[key].label, selected: true});
                    }
                } else {
                    for (var key in obj) {
                        if (obj[key].hasOwnProperty('disabled') && obj[key].disabled);
                        else {
                            options.push({value: key, label: obj[key].label, selected: false});
                        }
                    }
                    //console.log("OsagoView. getOptions()");
                    //console.dir(options);
                }
                break;
            case "period":
                var obj = this.model.getPeriod();

                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                if (this.params.yurPeriod) {
                    //удалить из массива лишние периоды для юр лиц
                    options = options.slice(3);
                  /*  console.log(" options period");
                    console.dir(options);*/
                }

              /*  console.log("OsagoView. getOptions() period **************************");
                console.dir(options);*/

                break;

            case "regions":
                var obj = this.model.getRegions();
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;

            case "city":
                var obj = this.model.getCity(parameter);
               /* console.log('OsagoView.getOptions name=city, parameter=' + parameter);
                console.log(obj);*/
                for (var key in obj) {
                    options.push({value: key, label: key, selected: false});
                }
                break;


        }


        return options;

    }

    /**
     * Проверить готовность компонентов интерфейса и связать контроллер с собой
     */
    checkReady() {
        if (this.calcForm && this.calcTable && this.displayPremium)
            this.controller.setView(this);
    }

    render() {
//    var getRef = function(element){this.calcForm = element}.bind(this);
        ReactDOM.render(
            React.createElement(
                CalcForm,
                {
                    view: this,
                    states: this.getInitialStates(),
                    ref: function (element) {
                        this.calcForm = element;
                        this.checkReady()
                    }.bind(this)
//              ref: "calcForm"
                }
            ),
            document.getElementById('calc-content-okatana')
        );
        ReactDOM.render(
            React.createElement(
                CalcTable5,
                {
                    //             view: this,
                    ref: function (element) {
                        this.calcTable = element;
                        this.checkReady()
                    }.bind(this)
                }
            ),
            document.getElementById('table-content-okatana')
        );

        ReactDOM.render(
            React.createElement(
                OsagoPremium5,
                {
                    ref: function (element) {
                        this.displayPremium = element;
                        this.checkReady()
                    }.bind(this)
                }
            ),
            document.getElementById('premium-content-okatana')
        );
    }


}
module.exports = OsagoView;
