class OsagoController {
    constructor(model) {
        this.model = model;
        this.params = this.getDefaultParams();
        this.premium = 0;
    }

    /*getControllerInstance(){
     return this;
     }*/

    /**
     * Связать себя со View
     * Раз View готов, заполнить нач. значения коеффициентов
     * и отобрать начальное состояние интерфейса
     * @param view
     */
    setView(view) {
        console.log("OsagoController.setView()");
        this.view = view;

        this.factors = this.getDefaultFactors();
        this.calculate();

        this.refreshView();
    }

    /**
     * Начальные значения параметров калькулятора
     */
    getDefaultParams() {
        return {
          owner: "fiz",
          registration: "regRu",
          typeTC: "tc22",
          trailer: false,
          powerTC: 'p70',
          term: 't12',
          period: 't8',
          kbm: 'kbm3',
          regions: null,
          city: null,
          crime: false,
          limit: false,
          driving_experience: null,

          fixedTerm: 't12',   //фиксированный срок договора: =null => выводим список;
                                // =key in model.getTerm() => выводим только эту опцию
          fixedPeriod: null
        }
    }

    /**
     * Начальные значения коэффициентов калькулятора
     */
    getDefaultFactors() {
        var factors = {};
        var keys = this.getFactorKeys();
        for (var i in keys) {
            factors[keys[i]] = null; //no value
        }
        return factors;
    }

    /**
     * Обновить интерфейс
     */
    refreshView() {
        this.view.display(this.params, this.factors, this.premium);
    }

    /**
     * Принять новое значение параметра формы
     * @param key
     * @param value
     */
    assign(key, value) {
        if (key == 'regions' || key == 'city') {
         //   console.log('OsagoController5.assign() key=' + key + " value=" + value);
        }

        let params = {};
        params[key] = value;
        this.params = Object.assign(this.params, params);
        // ...
        this.calculate();
    }

    /**
     * Выдать массив ключей коэффициентов, полученный у View
     * @returns {*|Array}
     */
    getFactorKeys() {
        return this.view.getFactorKeys();
    }

    /**
     * Рассчитать
     */
    calculate() {
        this.handleDependences(); //обработка зависимостей

        this.loadFromModel();
        this.calculateFactors();
        this.calculatePremium();
        this.refreshView();
    }

    handleDependences() {
        this.handleRegistrationDependencies();
        this.handleOwnerDepencies();
    }


    handleOwnerDepencies() {
        //this.params.yurPeriod = false;
        switch (this.params.owner) {
            case "yur":
              this.params.limit = true;
              this.params.driving_experience = null;
              break;

          case "fiz":
              break;
        }
    }

    handleRegistrationDependencies() {
      this.params.fixedPeriod = null;

      switch (this.params.registration) {

            case "regRu":
                this.params.fixedTerm = 't12';  // 1 год
                this.params.term = 't12';
                break;
            case "regNo":
                this.params.fixedTerm = 't20';  // до 20 дней
                this.params.term = 't20';
                this.params.fixedPeriod = 't8';
                this.params.period = 't8';
                this.params.crime = false;

                break;

            case "regFo":
              break;

            default:
                this.params.fixedTerm = null;
                //Только при переходе на "regFo" с "regRu" или с "regRu" нужно сбросить:
                if (['t12', 't20'].indexOf(this.params.term) >= 0)
                    this.params.term = null;
        }


    }

    loadFromModel() {

        this.typeTC = this.model.getTypeTC(this.params.typeTC, this.params.owner);//value
        this.regions = this.model.getRegions(this.params.regions);
        this.powerTC = this.model.getPowerTC(this.params.powerTC);//value
        if (this.params.term)
            this.term = this.model.getTerm(this.params.term);//value
        this.kbm = this.model.getKbm(this.params.kbm);
        if (this.params.period)
            this.period = this.model.getPeriod(this.params.period);
        this.driving_experience = this.model.getDriving_experience(this.params.driving_experience);
    }


    getPowerTC() {
        /*применяется для всех владельцев транспортных средств категории «B», в том числе используемых в качестве такси.*/
        var ptc = null;
        if (this.params.powerTC &&
            (this.params.typeTC == 'tc21' ||
            this.params.typeTC == 'tc22' ||
            this.params.typeTC == 'tc23')) {
            ptc = this.powerTC.coeff;
        } else {
            ptc = null;
        }
        return ptc;
    }

    getTrailer() {
        var trailer = null;
        if (this.params.trailer) {
            switch (this.params.typeTC) {
                case 'tc1':
                    trailer = 1.16;
                    break;//мотоциклы
                case 'tc21':
                    trailer = 1.16;
                    break; //"B" юр л
                case 'tc22':
                    trailer = null;
                    break; //"B" физ л
                case 'tc23':
                    (this.params.owner === 'yur') ? trailer = 1.16 : trailer = null;
                    break; //такси


                case 'tc31':
                    trailer = 1.4;
                    break; //до 16 тонн
                case 'tc32':
                    trailer = 1.25;
                    break; //более 16 тонн

                case 'tc7':
                    trailer = 1.24;
                    break; //трактор

                case 'tc41':
                case 'tc42':
                case 'tc43':
                case 'tc5':
                case 'tc6':
                default:
                    trailer = 1;
            }
        }
        return trailer;
    }

    getTypeTC() {
        if (this.params.typeTC) {
            //console.log("this.regions.st_group == "+ this.regions.st_group);

            console.log("this.typeTC==");
            console.dir(this.typeTC);
            var typeTC_koeff;
            switch (this.regions.st_group) {
                case 'st4':
                    typeTC_koeff = this.typeTC.st4;
                    break;
                case 'st5':
                    typeTC_koeff = this.typeTC.st5;
                    break;
                case 'st6':
                    typeTC_koeff = this.typeTC.st6;
                    break;
                default:
                    typeTC_koeff = this.typeTC.st3;
            }
            if (this.params.registration == "regNo" || this.params.registration == "regFo")
                typeTC_koeff = this.typeTC.st6;  // st6 для ТС, зарегистрированных в иностранных гос-вах,
                                                 // временно используемые на терр-ии РФ;
                                                 // Для ТС, следующих к месту регистрации, к месту ТО или повторного ТО

            //console.log("!! typeTC_koeff == "+ typeTC_koeff+"   >>>this.regions.st_group  ="+this.regions.st_group);
            return typeTC_koeff;
            //return this.typeTC.st_num;
            /*
             switch (st_num) {
             case 'st3':
             return this.typeTC.st3;//st3 - территория страхования может быть и st4, st5.. тут надо доделать - !!!

             case 'st4':
             return this.typeTC.st4;

             case 'st5':
             return this.typeTC.st5;

             default:
             return   0;
             }

             }
             */
        }
    }

    getDriving_experience() {
        /*Коэффициент КВС учитывать, если
         --выбрали физическое лицо
         --колич-во водителей ограничено*/

        var de = null;

        if (this.params.owner == 'yur') {
            if (this.params.typeTC != 'tc21' || this.params.typeTC != 'tc22' || this.params.typeTC != 'tc23') {
                if (this.params.registration == 'regFo') {
                    de = 1;
                } else {
                    de = null;
               //     document.getElementById('driving_experience').disabled = true;
                }
            }
        } else {
          //  document.getElementById('driving_experience').disabled = false;

            /* if(this.driving_experience.coeff && (this.params.typeTC !='tc21' || this.params.typeTC !='tc22' || this.params.typeTC !='tc23')){
             de=1.7;
             }*/
            de = this.driving_experience.coeff;
            if (this.params.limit == false) {
             //   document.getElementById('driving_experience').disabled = false;
                if (this.params.typeTC == 'tc22' || this.params.typeTC == 'tc23') {
                    de = this.driving_experience.coeff;
                } else {
                    de = 1.7;
              //      document.getElementById('driving_experience').disabled = false;
                }
            } else {
                de = null;
             //   document.getElementById('driving_experience').disabled = false;
            }

        }


        return de;
    }

    getTerritory() {
        var factor_terr = null;
        //document.getElementById('regions').disabled = false;
       // document.getElementById('city').disabled = false;
        if (this.params.registration === "regRu") {
            var region = this.params.regions ? this.model.getRegions(this.params.regions) : null;
            if (region) {
                if (region.city[this.params.city]) {
                    var city_arrs_coeff = region.city[this.params.city].split(', ');
                    //КТ для тракторов, самоходных дорожно-строительных и иных машин и прицепов к ним : this.params.typeTC == 'tc7'
                    factor_terr = this.params.typeTC == 'tc7' ? parseFloat(city_arrs_coeff[1]) : parseFloat(city_arrs_coeff[0]);
                }
            }
        } else if (this.params.registration == "regFo") {
            //Метод.пособие, стр.6 : При обязательном страховании ответственности владельцев транспортных средств, зарегистрированных в иностранных государствах и временно используемых на территории Российской Федерации, КТ = 1,7.
           // document.getElementById('regions').disabled = true;
           // document.getElementById('city').disabled = true;
            factor_terr = 1.7;

        } else {
            //Метод.пособие, стр.6 :КТ НЕ ПРИМЕНЯЕТСЯ при страховании гражданской ответственности владельцев транспортных средств на срок следования к месту регистрации.
            factor_terr = null;
            //document.getElementById('regions').disabled = true;
           // document.getElementById('city').disabled = true;
        }

        return factor_terr;
    }

    getKbm() {
        /*КБМ НЕ ПРИМЕНЯЕТСЯ при страховании гражданской ответственности владельцев
          прицепов (в том числе полуприцепов и прицепов-роспусков);
          транспортных средств, зарегистрированных в иностранных государствах;
          транспортных средств на срок следования к месту регистрации.*/
        var kbmCoeff = 1;
        if (this.params.registration != "regRu") {
            kbmCoeff = null;
            if (this.params.registration === "regFo") {
                kbmCoeff = 1;
            }
        } else if (this.params.kbm)
            kbmCoeff = this.kbm.coeff;
        else
            kbmCoeff = null;

        return kbmCoeff;
    }

    getLimit() {

        if (this.params.limit) {
            var l = null;
            if (this.params.owner == "yur") {
                l = 1.8;
            }
            if (this.params.owner == "fiz" && this.params.registration == 'regFo') {
                l = 1;
            }
            if (this.params.owner == "fiz" && this.params.registration == 'regRu' ||
                this.params.owner == "fiz" && this.params.registration == 'regNo') {
                l = 1.8;
            }
        }
        return l;
    }

    getPeriod() {
        //document.getElementById("period").disabled = false;
        if (this.params.registration == "regNo" ||
            this.params.registration == "regFo") {
           // document.getElementById("period").disabled = true;
            return null;
        }

        if (this.params.period)//тракторы и спец техника:  && this.params.typeTC=='tc7'
            return this.period.coeff;

        return null;
    }

    getCrime() {
        var crime = null;
        if (this.params.crime) {
            switch (this.params.registration) {
                case 'regNo':
                    crime = null;
                    break;
                case 'regRu':
                    crime = 1.5;
                    break;
                default:
                    if (this.params.typeTC === 'tc21' || this.params.typeTC === 'tc22' || this.params.typeTC === 'tc23') {
                        crime = null;
                    } else {
                        crime = 1.5;
                    }
                    ;
            }
        }
        return crime;
    }

    getTerm() {
        return this.params.term ? this.term.coeff : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }

    /**
     * Рассчитать коэффициенты
     */
    calculateFactors() {
        this.factors.term = this.getTerm();
        this.factors.period = this.getPeriod();
        this.factors.trailer = this.getTrailer();
        this.factors.typeTC = this.getTypeTC();
        this.factors.powerTC = this.getPowerTC();
        this.factors.kbm = this.getKbm();
        this.factors.limit = this.getLimit();
        this.factors.crime = this.getCrime();
        this.factors.territory = this.getTerritory();
        this.factors.driving_experience = this.getDriving_experience();
    }


    /**
     * Рассчитать премию
     */
    calculatePremium() {
        var premium = null;
        if (this.factors.typeTC) {
            premium = this.factors.typeTC; //базовый тариф зависит от типа ТС(авто, трамвай, троллебус, трактор...) и города, в котором зарегистрировано ТС
        }
        if (this.factors.territory) {
            premium *= this.factors.territory;
        }
        if (this.factors.kbm)
            premium *= this.factors.kbm;

        if (this.factors.driving_experience)
            premium *= this.factors.driving_experience;

        if (this.factors.powerTC)
            premium *= this.factors.powerTC; //мощность ТС

        if (this.factors.trailer)
            premium *= this.factors.trailer; //наличие прицепа

        if (this.factors.term)
            premium *= this.factors.term; // срок договора

        if (this.factors.period)
            premium *= this.factors.period; //период использования ТС

        if (this.factors.crime)
            premium *= this.factors.crime; //имелись грубые нарушения

        if (this.factors.limit)
            premium *= this.factors.limit;

        if (premium) {
            premium = premium.toFixed(2);
        }
        if (this.factors.typeTC && this.factors.territory) {
            if (this.premium > this.factors.typeTC * this.factors.territory * 3 && !this.factors.crime) {
                this.premium = this.factors.typeTC * this.factors.territory * 3;
            } else if (this.premium > this.factors.typeTC * this.factors.territory * 5 && this.factors.crime) {
                this.premium = this.factors.typeTC * this.factors.territory * 5;
            }
        }
        if(this.factors.typeTC && this.factors.territory){
            var dopustimoe;
            if (this.factors.crime){
                dopustimoe = this.factors.typeTC *5*this.factors.territory;
            }else{
                dopustimoe = this.factors.typeTC *3*this.factors.territory;
            }

            if(premium>dopustimoe){
                premium = dopustimoe;
            }
        }

        this.premium = premium;
    }
}
module.exports = OsagoController;