import ServiceBase from "./ServiceBase";

export default class SeasonService extends ServiceBase{
    apiSeasonPath = "season";
    getSeasons() {
        return this.service.get(this.apiSeasonPath);
    }
}
