const baseCoeff = require ('./baseCoeff.js')

class OsagoModel {
  constructor() {
    this.load();

  }

  load() {
    this.typeTC = baseCoeff.typeTC;
    this.regions = baseCoeff.regions;
    this.powerTC = baseCoeff.powerTC;
    this.term = baseCoeff.term;
    this.period = baseCoeff.period;
    this.kbm = baseCoeff.kbm;
    this.driving_experience = baseCoeff.driving_experience;
//    console.log("OsagoModel load() typeTC=");
//    console.dir(this.typeTC);
    //....
  }

  getTypeTC(key=null){
      if(key)
        return this.typeTC[key];
      return this.typeTC;

  }
  getRegions(key=null){
    if(key)
      return this.regions[key];
    return this.regions;
  }

  getCity(regionKey, key=null){
    var region = this.getRegions(regionKey);
    if(key)
      return region.city[key];
    return region.city;
  }
  getKbm(key=null){
    if(key)
      return this.kbm[key];
    return this.kbm;
  }
  getPowerTC(key=null){
    if(key)
      return this.powerTC[key];
    return this.powerTC;
  }
  getTerm(key=null){
    if(key)
      return this.term[key];
    return this.term;
  }
  getPeriod(key=null){
    if(key)
      return this.period[key];
    return this.period;
  }
  getDriving_experience(key=null){
    if(key)
      return this.driving_experience[key];
    return this.driving_experience;
  }
  getPeriod(key=null){
    if(key)
      return this.period[key];
    return this.period;
  }
}
module.exports = OsagoModel;