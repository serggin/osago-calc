const React = require('react')
const FormRadioGroup = require('../form/FormRadioGroup.jsx')
const PropTypes = require('prop-types')
const FormSelect = require('../form/FormSelect.jsx')
const FormCheckbox1 = require('../form/FormCheckbox1.jsx')


class CalcForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states;
  }
  setStates(states) {
    this.setState(states);
//    console.log('CalcForm state:');
//    console.dir(this.state);
  }
  getButtons(name) {
    var buttons;
    switch (name) {
      case 'ownerButtons':
        buttons = [
          {value: "fiz", label: "Физическое лицо", checked: false},
          {value: "yur", label: "Юридическое лицо", checked: false},
        ];
        break;
      case 'registrationButtons':
        buttons = [
          {value: "regRu", label: "ТС зарегистрировано в России", checked: true},
          {value: "regFo", label: "ТС зарегистрировано в иностранном государстве", checked: false},
          {value: "regNo", label: "ТС следует к месту регистрации", checked: false},
        ];
        break;
      default:
        buttons = [];
    }
    return buttons;
  }
  assignedHandler(key, value) {
    this.props.view.assign(key, value);
  }

  getOptions(name, parameter = null) {
    return this.props.view.getOptions(name, parameter);
  }

  render() {
    return (
        <div className="well">
          <FormRadioGroup name="owner" formlabel="Владелец"
                           buttons={this.getButtons("ownerButtons")}
                           checked={this.state.owner.buttonChecked}
                           labelProps={{className: "col-lg-12 label label-info"}}
                           orientation="vertical"
                           assigned={(v)=>this.assignedHandler('owner', v)}/>

          <FormRadioGroup name="registration" formlabel="Регистрация ТС"
                           buttons={this.getButtons("registrationButtons")}
                           checked={this.state.registration.buttonChecked}
                           labelProps={{className: "col-lg-12 label label-info"}}
                           orientation="vertical"
                           assigned={(v)=>this.assignedHandler('registration', v)}/>

          <FormSelect name="typeTC" formlabel="Тип ТС"
                       labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                       options={this.getOptions("typeTC")}
                       placeholder="Выберите тип ТС"
                       assigned={(v)=>this.assignedHandler('typeTC', v)}
                      selected={this.state.typeTC.selected}
          />

          <FormCheckbox1 name="trailer" formlabel="ТС с прицепом"
                          id="trailer"
                          labelProps={{className: "col-lg-12 label label-info"}} label="Да, есть прицеп"
                          checked={this.state.trailer.checked}
                          assigned={(v)=>this.assignedHandler('trailer', v)}/>

          <FormSelect name="powerTC" formlabel="Мощность двигателя (л.с.)"
                       labelProps={{className: "col-lg-12 label label-info"}}
                       options={this.getOptions("powerTC")}
                       placeholder="Выберите мощность ТС"
                       assigned={(v)=>this.assignedHandler('powerTC', v)}/>

          <FormSelect name="term" formlabel="Срок договора"
                       labelProps={{className: "col-lg-12 label label-info"}}
                       options={this.getOptions("term")}
                       placeholder="Выберите срок договора"
                       assigned={(v)=>this.assignedHandler('term', v)}/>

          <FormSelect id="period" name="period" formlabel="Период использования ТС"
                       labelProps={{className: "col-lg-12 label label-info"}}
                       options={this.getOptions("period")}
                       placeholder="Выберите период использования"
                       assigned={(v)=>this.assignedHandler('period', v)}/>


          <FormSelect id="kbm" name="kbm" formlabel="КБМ"
                       labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                       options={this.getOptions("kbm")}
                       placeholder="Выберите КБМ"
                       assigned={(v)=>this.assignedHandler('kbm', v)}/>

          <FormSelect id="regions" name="regions" formlabel="Регион"
                       labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                       options={this.getOptions("regions")}
                       placeholder="Выберите регион"
                       assigned={(v)=>this.assignedHandler('regions', v)}/>

          <FormSelect id="city" name="city" formlabel="Место регистрации собственника ТС "
                       labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                       options={this.getOptions("city", this.state.region.region)}
                       placeholder="Выберите город"
                       assigned={(v)=>this.assignedHandler('city', v)}/>

          <FormCheckbox1 name="crime" formlabel="Имеются грубые нарушения условий страхования"
                          id="crime"
                          labelProps={{className: "col-lg-12 label label-info"}}
                          label="Да, имеются грубые нарушения условий страхования"
                          checked={this.state.crime.checked}
                          assigned={(v)=>this.assignedHandler('crime', v)}/>

          <FormCheckbox1 name="limit" formlabel="Количество водителей ограничено"
                          id="limit"
                          labelProps={{className: "col-lg-12 label label-info"}}
                          label="Нет, не ограничено"
                          checked={this.state.limit.checked}
                          assigned={(v)=>this.assignedHandler('limit', v)}/>

          <FormSelect id="driving_experience" name="driving_experience" formlabel="Минимальный возраст и водительский стаж лиц, допущенных к управлению ТС"
                       labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                       options={this.getOptions("driving_experience")}
                       placeholder="Выберите соответствующий возраст и стаж"
                       assigned={(v)=>this.assignedHandler('driving_experience', v)}/>
        </div>
    )
  }
}
CalcForm.propTypes = {
  states: PropTypes.object,
  view: PropTypes.object
}

module.exports = CalcForm