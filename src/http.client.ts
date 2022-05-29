

export class HttpClient {
    private baseUrl: string;
    private headers: { [key: string]: string };

    constructor(pBaseUrl: string, pHeaders?: { [key: string]: string }) {
        this.baseUrl = pBaseUrl;
        this.headers = pHeaders ? JSON.parse(JSON.stringify(pHeaders)) : {};
    }

    public request(pUrl: string, pMethod: string, pData?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            //const vUrl: string = this.baseUrl + pUrl;
            const vUrl: string = pUrl;
            const vHeaders: { [key: string]: string } = {};
            for (const vKey in this.headers) {
                if (this.headers.hasOwnProperty(vKey)) {
                    vHeaders[vKey] = this.headers[vKey];
                }
            }
            const vRequest: RequestInit = {
                method: pMethod,
                headers: vHeaders,
                body: pData ? JSON.stringify(pData) : undefined,
            };
            fetch(vUrl, vRequest).then(function (pResponse) {
                return pResponse.text();
            }).then(function (pRespContent) {
                resolve(pRespContent);
            }).catch(function (pError) {
                reject(pError);
            });
        });
    }
}