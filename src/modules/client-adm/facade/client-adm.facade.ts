import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    addUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private findUsecase: UseCaseInterface;
    private addUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this.findUsecase = usecaseProps.findUsecase;
        this.addUsecase = usecaseProps.addUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this.addUsecase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this.findUsecase.execute(input);
    }
}