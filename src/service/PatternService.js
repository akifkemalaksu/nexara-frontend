import ServiceBase from "./ServiceBase";

export default class PatternService extends ServiceBase{
    apiPatternPath = "patterns";
    getPatterns() {
        return this.service.get(this.apiPatternPath);
    }
}
