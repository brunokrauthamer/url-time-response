import { IResponseTime } from "../interfaces/IReponseTime";
import { IDisplayResponseData } from "../interfaces/IResponseData";

export function displayResponseData(responseTime: IResponseTime): IDisplayResponseData {
    const displayedResponseData: IDisplayResponseData = {
        responded: '',
        responseTime: '',
        url: '',
    }
    if (responseTime.responded) {
        displayedResponseData.responded = 'Sim'
    } else {
        displayedResponseData.responded = 'Não'
    }
    displayedResponseData.responseTime = responseTime.responseTime as string;
    displayedResponseData.url = responseTime.url as string;

    return displayedResponseData;
}