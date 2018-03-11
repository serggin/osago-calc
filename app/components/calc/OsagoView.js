const React = require('react')
const OsagoPremium = require('../calc/OsagoPremium.jsx')
const CalcForm = require('../calc/CalcForm.jsx')
const CalcTable = require('../calc/CalcTable.jsx')

class OsagoView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        // this.render = this.render.bind(this);
        this.states = this.getInitialStates();
        this.params = {};
        this.callback = null;
        //this.premium = 0;
    }

  setCallBack(callback){
      this.callback = callback;

  }

    /**
     * Отобразить форму и таблицу
     * @param params
     * @param factors
     */
    display(params, factors, premium) {
        // this.premium = premium;

       /* console.log('OsagoView5.display: params=');
        console.dir(params);
        console.log('OsagoView5.display: factors=');
        console.dir(factors);*/
        this.params = params;

        this.states.typeTC.selected = params.typeTC;
        this.states.owner.buttonChecked = params.owner;
        this.states.registration.buttonChecked = params.registration;
        this.states.trailer.selected = params.trailer;

        this.states.limit.selected = params.limit;

        this.states.region.region = params.regions;
        this.states.crime.selected = params.crime;

        this.displayDependencies();
    console.log('this.states=');
    console.dir(this.states);
        this.calcForm.setStates(this.states); // обновить форму
        this.calcTable.setFactors(factors);   // обновить таблицу

        this.osagoPremium.setPremium(premium);

        if(this.callback){
          var data = this.model.getNamesFromParams(params);
          data = Object.assign(data, {factors:factors, premium:premium});
          /*console.log('%%%%%%%%%% factors %%%%%%%%%%5 === ');
          console.dir(factors);*/
          this.callback(data);
        }
    }

    displayDependencies(){
      console.log('------params');
        console.dir(this.params);

      this.states.term.enabled = true;
      this.states.period.enabled = true;
      this.states.kbm.enabled = true;
      this.states.regions.enabled = true;
      this.states.crime.enabled = true;
      this.states.city.enabled =  true;
      this.states.trailer.enabled = true;
      this.states.driving_experience.enabled = true;
      this.states.limit.enabled = true;
      this.states.powerTC.enabled = true;

      if(!this.params.regions){
           this.states.city.enabled =  false;
           this.states.city.enabled =  false;
      }

        //прицеп не учитывается для физ лица тип ТС=В
      var typeTC = this.params.typeTC;
      if(this.params.owner=='fiz' && (typeTC=='tc22' || typeTC == 'tc23'))
        this.states.trailer.enabled = false;


      //нет лимита на доступ лиц
      if(this.params.limit)
        this.states.driving_experience.enabled = false;


      if(this.params.owner=='yur'){
        this.states.limit.enabled = false;
        this.states.driving_experience.enabled = false;
      }

      //Cледует к месту регистрации
      if(this.params.registration=='regNo'){
        this.states.term.enabled = false;
        this.states.period.enabled = false;
        this.states.kbm.enabled = false;
        this.states.regions.enabled = false;
        this.states.crime.enabled = false;
      }

      //Cледует Иностр гос
      if(this.params.registration=='regFo'){
        this.states.period.enabled = false;
        this.states.kbm.enabled = false;
        this.states.regions.enabled = false;
        this.states.crime.enabled = false;
        this.states.limit.enabled = false;
        this.states.driving_experience.enabled = false;
      }
      //мощность не учитывать если не кат B
      if(!(this.params.typeTC=='tc21' || this.params.typeTC=='tc22' || this.params.typeTC=='tc23'))
        this.states.powerTC.enabled = false;

    }



    /**
     * Выдать начальные значения параметров формы
     * @returns {{owner: {buttonChecked: string}, registration: {buttonChecked: string}}}
     */
    getInitialStates() {
        return {
            owner: {buttonChecked: "fiz"},
            typeTC:{selected: "tc22", enabled:true },
            registration: {buttonChecked: "regRu"},
            trailer: {selected: false, enabled:false},
            powerTC:{selected: 'p70'},
            period: {selected:"t8"},
          regions:{enabled: true},
            city:{enabled: false},
            term:{enabled:'false'},
            limit: {selected: false},
          driving_experience:{enabled:true},
            region: {region: null},
            crime: {selected: false, },
            kbm:{selected: "kbm3"},

        }
    }

    /**
     * Сообщить "наверх" новое значение параметра формы
     * @param key
     * @param value
     */
    assign(key, value) {
        //console.log("OsagoView assign() key=" + key + ", value=" + value);
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
                 /* console.log('*********************driving_experience');
                  console.dir(options);*/

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
              if (this.params.fixedPeriod) {  //это key или null
                //для фиксированного key формируем единствееную опцию
                var key = this.params.fixedPeriod;
                if (obj.hasOwnProperty(key)) {
                  options.push({value: key, label: obj[key].label, selected: true});
                }
              } else {
                for (var key in obj) {
                  options.push({
                    value: key,
                    label: obj[key].label,
                    selected: false
                  });
                }
                if (this.params.yurPeriod) {
                  //удалить из массива лишние периоды для юр лиц
                  options = options.slice(3);
                  /*  console.log(" options period");
                    console.dir(options);*/
                }
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
        if (this.calcForm && this.calcTable && this.osagoPremium)
            this.controller.setView(this);
    }

  render() {
    return (
        <div>
          <div id="calc-content" className="col-lg-7">
            <CalcForm     view={this}
                          states={this.getInitialStates()}
                          ref={(element)=>{this.calcForm = element; this.checkReady()}}/>

          </div>
          <div  className="col-lg-5">
            <div id="premium-content">
              <OsagoPremium ref={(element)=>{this.osagoPremium = element; this.checkReady()}}/>

            </div>
            <div id="table-content">
              <CalcTable ref={(element)=>{this.calcTable = element; this.checkReady()}}/>
            </div>
            <div id="zayavka-content">

            </div>
          </div>

        </div>

    )
  }





}
module.exports = OsagoView;
