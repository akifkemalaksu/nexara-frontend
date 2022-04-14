import ServiceBase from "./ServiceBase";

export default class CountryService extends ServiceBase {
    apiCountryPath = "country";
    getCountries() {
        return this.service.get(this.apiCountryPath);
    }
}
