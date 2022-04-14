import ServiceBase from "./ServiceBase";

export default class PatternService extends ServiceBase{
    apiPatternPath = "pattern";
    getPatterns() {
        return this.service.get(this.apiPatternPath);
    }
}
