import ServiceBase from "./ServiceBase";

export default class SeasonService extends ServiceBase{
    apiSeasonPath = "seasons";
    getSeasons() {
        return this.service.get(this.apiSeasonPath);
    }
}
