import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeInputDto,
    FindInvoiceFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private generateInvoiceUseCase: UseCaseInterface,
        private findInvoiceUseCase: UseCaseInterface
    ) { }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDTO> {
        return await this.findInvoiceUseCase.execute(input);
    }

    async create(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this.generateInvoiceUseCase.execute(invoice);
    }
}