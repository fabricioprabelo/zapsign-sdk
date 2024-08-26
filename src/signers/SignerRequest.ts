import { SignBatch } from "../body/signer/SignBatch";
import { Signer } from "../body/signer/Signer";
import { HttpRequestFactory } from "../services/HttpRequestFactory";

export class SignerRequest {
  private sandboxRoute: string = "https://sandbox.api.zapsign.com.br/api/v1/";
  private productionRoute: string = "https://api.zapsign.com.br/api/v1/";
  private apiRoute: string = "";
  private apiToken: string = "";

  constructor(apiToken: string, sandbox: boolean = false) {
    this.apiRoute = sandbox ? this.sandboxRoute : this.productionRoute;
    this.apiToken = apiToken;
  }

  public getApiToken(): string {
    return this.apiToken;
  }

  public setApiToken(apiToken: string): this {
    this.apiToken = apiToken;
    return this;
  }

  public async detailSigner(signerToken: string): Promise<Signer> {
    const uri: string = `${this.apiRoute}signers/${signerToken}/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().getRequest<Signer>(uri);

    return response;
  }

  public async updateSigner(
    signerToken: string,
    signer: Signer
  ): Promise<Signer> {
    const uri: string = `${this.apiRoute}signers/${signerToken}/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().postRequest<Signer>(
      uri,
      signer
    );

    return response;
  }

  public async addSigner(docToken: string, signer: Signer): Promise<Signer> {
    const uri: string = `${this.apiRoute}docs/${docToken}/add-signer/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().postRequest<Signer>(
      uri,
      signer
    );

    return response;
  }

  public async deleteSigner(docToken: string): Promise<string> {
    const uri: string = `${this.apiRoute}signer/${docToken}/remove/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().deleteRequest<string>(
      uri
    );

    return response;
  }

  public async signInBatch(signBatch: SignBatch): Promise<string> {
    const uri: string = `${this.apiRoute}sign/?api_token=${this.apiToken}`;

    const { response } = await new HttpRequestFactory().postRequest<string>(
      uri,
      signBatch
    );

    return response;
  }
}
