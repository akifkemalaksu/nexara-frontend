import ServiceBase from "./ServiceBase";

export default class CountryService extends ServiceBase {
    apiCountryPath = "countries";
    getCountries() {
        return this.service.get(this.apiCountryPath);
    }
}
