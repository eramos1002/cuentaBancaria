import ibanValidator from "../tools/iban-validator";
import documentValidator from "../tools/document-validator";

export default class Bank {
    constructor() {
        this.accounts = {};
    }

    getAccountsCount() {} // devuelve el numero de cuentas

    addAccount(account) {
        if (typeof this.accounts[account] === undefined) {
            throw new Error("La cuenta no es valida");
        }
        this.accounts[account.iban] = account;
    }

    getAccountByIban(iban) {
        return Object.values(this.accounts).filter((account) =>
            contact.iban.startsWith(iban)
        );
    }

    getAccountsByDocument(document) {
        return Object.values(this.accounts).filter((account) =>
            contact.document.startsWith(document)
        );
    }
}