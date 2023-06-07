import { IResponseTime } from "../interfaces/IReponseTime";
import { IDisplayResponseData } from "../interfaces/IResponseData";
import * as moment from 'moment';

function getCurrentDate() {
    moment.locale('pt-BR')
    return `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`;
}

export function displayResponseData(responseTime: IResponseTime): IDisplayResponseData {
    const displayedResponseData: IDisplayResponseData = {
        responded: '',
        responseTime: '',
        url: '',
        date: '',
    }
    if (responseTime.responded) {
        displayedResponseData.responded = 'Sim'
    } else {
        displayedResponseData.responded = 'Não'
    }
    displayedResponseData.responseTime = responseTime.responseTime as string;
    displayedResponseData.url = responseTime.url as string;
    displayedResponseData.date = getCurrentDate() as string;

    return displayedResponseData;
}