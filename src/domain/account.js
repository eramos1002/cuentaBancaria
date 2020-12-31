import ibanValidator from '../tools/iban-validator';
import documentValidator from '../tools/document-validator';

export default class Account {

    constructor(iban, document) {
        this.iban = ibanValidator.normalize(iban);

        if (!ibanValidator.isValid(this.iban)) {
            throw new Error(`IBAN ${iban} is not valid`);
        }

        this.document = documentValidator.normalize(document);

        if (!documentValidator.isValid(this.document)) {
            throw new Error(`Document ${document} is not valid`);
        }

        this.balance = 0;
        this.status = 'open';
    }

    open() {
        this.status = 'open';
    }

    close() {
        this.status = 'close';
    }

    deposit(amount) {
        if(this.status !== 'open') {
            throw new Error(`Account must be open to deposit`);
        }

        const amountToDeposit = Number(amount);

        if (isNaN(amountToDeposit)) {
            throw new Error(`${amount} is not a valid amount`);
        }

        if (amountToDeposit <= 0) {
            throw new Error(`${amount} is not a positive amount`);
        }

        this.balance += amountToDeposit;
    }

    withdrawal(amount) {
        if(this.status !== 'open') {
            throw new Error(`Account must be open to withdrawal`);
        }

        const amountToWithdraw = Number(amount);

        if (isNaN(amountToWithdraw)) {
            throw new Error(`${amount} is not a valid amount`);
        }

        if (amountToWithdraw <= 0) {
            throw new Error(`${amount} is not a positive amount`);
        }

        if (amountToWithdraw > this.balance) {
            throw new Error(`Account has not enough funds: ${amountToWithdraw}`);
        }

        this.balance -= amountToWithdraw;
    }
}
