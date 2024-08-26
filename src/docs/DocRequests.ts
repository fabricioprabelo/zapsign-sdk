import { DocFromDocx } from "../body/doc/DocFromDocx";
import { DocFromTemplate } from "../body/doc/DocFromTemplate";
import { ExtraDoc } from "../body/doc/ExtraDoc";
import { RubricasArray } from "../body/doc/RubricasArray";
import { DocFromPdf } from "../body/doc/DocFromPdf";
import { HttpRequestFactory } from "../services/HttpRequestFactory";
import { ExtraDocResponse } from "../response/ExtraDocResponse";
import { DocAsyncResponse } from "../response/DocAsyncResponse";
import { DocResponse } from "../response/DocResponse";
import { DocsResponse } from "../response/DocsResponse";

export default class DocRequests {
  private sandboxRoute: string = "https://sandbox.api.zapsign.com.br/api/v1/";
  private productionRoute: string = "https://api.zapsign.com.br/api/v1/";
  private apiRoute: string = "";
  private apiToken: string = "";

  constructor(apiToken: string, sandbox: boolean = false) {
    this.apiRoute = sandbox ? this.sandboxRoute : this.productionRoute;
    this.apiToken = apiToken;
  }

  public DocRequests(apiToken: string) {
    this.apiToken = apiToken;
  }

  public getTokenApi(): string {
    return this.apiToken;
  }

  public setTokenApi(apiToken: string): this {
    this.apiToken = apiToken;
    return this;
  }

  public async createDocFromUploadPdf(doc: DocFromPdf): Promise<DocResponse> {
    const uri: string = `${this.apiRoute}docs/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<DocResponse>(uri, doc);

    return response;
  }

  public async getDocs(): Promise<DocsResponse> {
    const uri: string = `${this.apiRoute}docs/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().getRequest<DocsResponse>(uri);

    return response;
  }

  public async createDocFromUploadDocx(doc: DocFromDocx): Promise<DocResponse> {
    const uri: string = `${this.apiRoute}docs/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<DocResponse>(uri, doc);

    return response;
  }

  public async createDocFromUploadAsync(
    doc: DocFromPdf
  ): Promise<DocAsyncResponse> {
    const uri: string = `${this.apiRoute}docs/async/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<DocAsyncResponse>(uri, doc);

    return response;
  }

  public async createDocFromTemplate(
    doc: DocFromTemplate
  ): Promise<DocFromTemplate> {
    const uri: string = `${this.apiRoute}models/create-doc/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<DocFromTemplate>(uri, doc);

    return response;
  }

  public async createDocFromTemplateAsync(
    doc: DocFromTemplate
  ): Promise<DocAsyncResponse> {
    const uri: string = `${this.apiRoute}models/create-doc/async/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<DocAsyncResponse>(uri, doc);

    return response;
  }

  public async addExtraDoc(
    docToken: string,
    extraDoc: ExtraDoc
  ): Promise<ExtraDocResponse> {
    const uri: string = `${this.apiRoute}docs/${docToken}/upload-extra-doc/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().postRequest<ExtraDocResponse>(
        uri,
        extraDoc
      );

    return response;
  }

  public async detailDoc(docToken: string): Promise<DocResponse> {
    const uri: string = `${this.apiRoute}docs/${docToken}/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().getRequest<DocResponse>(
      uri
    );

    return response;
  }

  public async deleteDoc(docToken: string): Promise<DocsResponse> {
    const uri: string = `${this.apiRoute}docs/${docToken}/?api_token=${this.apiToken}`;

    const { response } =
      await new HttpRequestFactory().deleteRequest<DocsResponse>(uri);

    return response;
  }

  public async placeSignatures(
    docToken: string,
    rubricaList: RubricasArray
  ): Promise<number> {
    const uri: string = `${this.apiRoute}docs/${docToken}/place-signatures/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().postRequest<number>(
      uri,
      rubricaList
    );

    return response;
  }
}
