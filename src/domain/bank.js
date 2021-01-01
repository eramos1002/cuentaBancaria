import ibanValidator from '../tools/iban-validator';
import documentValidator from '../tools/document-validator';

export default class Bank {
    constructor() {
        this.accounts = {};
    }

    getAccountsCount() {
        return Object.values(this.accounts).length;
    }

    addAccount(account) {
        if(account.constructor.name !== 'Account') {
            throw new Error(`Wrong Account class: ${account.constructor.name}`);
        }

        if (typeof(this.accounts[account.iban]) === 'object') {
            throw new Error(`Account with IBAN ${account.iban} is already in bank`);
        }

        this.accounts[account.iban] = account;
    }

    getAccountByIban(iban) {
        const normalizedIban = ibanValidator.normalize(iban);

        if (ibanValidator.isValid(normalizedIban)) {
            throw new Error(`Invalid IBAN '${iban}'`);
        }

        return this.accounts[normalizedIban];
    }

    getAccountsByDocument(document) {
        const normalizedDocument = documentValidator.normalize(document);
        
        if (!documentValidator.isValid(normalizedDocument)) {
            throw new Error(`Invalid document '${document}'`);
        }

        return Object.values(this.accounts).filter(account => account.document === normalizedDocument);
    }
}
