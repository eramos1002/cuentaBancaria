import ibanValidator from "../tools/iban-validator";
import documentValidator from "../tools/document-validator";

const apiUrl = 'https://api.exchangeratesapi.io/latest';

function changeToEur1(amount, currency) {
    return new Promise((resolve, reject) => {
        if(currency === 'EUR') {
            return resolve(amount);
        }

        fetch(apiUrl)
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(httpResponse.status + ': ' + httpResponse.statusText);
            }

            return httpResponse.json();
        })
        .then(jsonBody => {

            if (!jsonBody.rates[currency]) {
                throw new Error(`Currency not found: ${currency}`);
            }

            return resolve(amount / jsonBody.rates[currency]);
        })
        .catch(reject);
    });
}

function changeToEur2(amount, currency) {
    if(currency === 'EUR') {
        return new Promise(resolve => resolve(amount));
    }

    return fetch(apiUrl)
    .then(httpResponse => {
        if (!httpResponse.ok) {
            throw new Error(httpResponse.status + ': ' + httpResponse.statusText);
        }

        return httpResponse.json();
    })
    .then(jsonBody => {
        if (!jsonBody.rates[currency]) {
            throw new Error(`Currency not found: ${currency}`);
        }

        return resolve(amount / jsonBody.rates[currency]);
    });
}

export default class Account {
    constructor(iban, document) {
        const normalizedIban = ibanValidator.normalize(iban);
        
        if (!ibanValidator.isValid(normalizedIban)) {
            throw new Error(`IBAN ${iban} is invalid`);
        }

        const normalizedDocument = documentValidator.normalize(document);

        if (!documentValidator.isValid(normalizedDocument)) {
            throw new Error(`The document ${document} is invalid`);
        }

        this.iban = normalizedIban;
        this.document = normalizedDocument;
        this.balance = 0; // saldo
        this.status = "open";
    }

    open() {
        if (this.status === "close") {
            this.status = "open";
        }
    }

    close() {
        if (this.status === "open") {
            this.status = "close";
        }
    }

    deposit(amount) {
        if (this.status === "close") {
            throw new Error("La cuenta esta cerrada");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new Error("El importe debe ser una cantidad positiva");
        }
        this.balance += amount;
    }

    withdrawal(amount) {
        if (this.status === "close") {
            throw new Error("La cuenta esta cerrada");
        }
        if (isNaN(amount) || amount <= 0 || amount > this.balance) {
            throw new Error(
                "El importe debe ser una cantidad positiva y menor que el saldo"
            );
        }
        this.balance -= amount;
    }
    getBalance() {
        if (this.status === "close") {
            throw new Error("La cuenta esta cerrada");
        }
        return this.balance;
    }

    depositV2(amount, currency = 'EUR') {
        return changeToEur1(amount, currency)
        .then(this.deposit.bind(this));
    }
}
