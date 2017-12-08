export class ApiResource {

    static localUrl = 'http://localhost:56231/api/';

    static devUrl = 'http://amrstore-001-site1.ftempurl.com/api/';

    static baseUrl = '';

    baseUrl = ApiResource.getApiBaseUrl();

    static getApiBaseUrl() {

        let hostName = window.location.hostname;
        if (hostName.indexOf('localhost') >= 0) {
            return ApiResource.localUrl;
        }
        else if (hostName.indexOf('shopkhongten') >= 0) {
            return ApiResource.devUrl;
        }
    }

    static customer: any = 'customer/';
    static cardRandom: any = 'cardr/';

    static getCustomer(id: string) {
        return this.devUrl + this.customer + id;
    }

    static updateCustomer: any = ApiResource.devUrl + ApiResource.customer;

    static randomCard(id: string) {
        return this.devUrl + this.cardRandom + id;
    }

}