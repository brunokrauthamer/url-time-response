import { IResponseTime } from "../interfaces/IReponseTime";
import { IDisplayResponseData } from "../interfaces/IResponseData";
import * as moment from 'moment';

// Função para obter a data atual formatada
function getCurrentDate() {
    moment.locale('pt-BR')
    return `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`;
}

// Função que converte os dados de tempo de resposta em dados exibidos
export function displayResponseData(responseTime: IResponseTime): IDisplayResponseData {

    // Objeto que armazenará os dados exibidos
    const displayedResponseData: IDisplayResponseData = {
        responded: '',
        responseTime: '',
        url: '',
        date: '',
    }

    // Verifica se houve resposta e atribui "Sim" ou "Não" à propriedade correspondente
    if (responseTime.responded) {
        displayedResponseData.responded = 'Sim'
    } else {
        displayedResponseData.responded = 'Não'
    }

    // Atribui os valores de tempo de resposta, URL e data ao objeto displayedResponseData
    displayedResponseData.responseTime = responseTime.responseTime as string;
    displayedResponseData.url = responseTime.url as string;
    displayedResponseData.date = getCurrentDate() as string;

    return displayedResponseData;
}