import AdministrationRoute from "../administration_route/AdministrationRoute";
export default class AdministrationProcedure{
    constructor(private administrationRoute: AdministrationRoute, private procedure: string){}

    getAdministrationRoute(): AdministrationRoute{
        return this.administrationRoute
    }

    getProcedure(): string {
        return this.procedure
    }
}