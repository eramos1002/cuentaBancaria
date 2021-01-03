import ibanValidator from "../tools/iban-validator";
import documentValidator from "../tools/document-validator";

export default class Account {
    constructor(iban, document) {
        const normalizedIban = ibanValidator.normalize(iban);
        const normalizedDocument = documentValidator.normalize(document);

        if (!ibanValidator.isValid(normalizedIban)) {
            throw new Error(`IBAN ${iban} is invalid`);
        }
        if (!normalizedDocument.isValid(documentValidator)) {
            throw new Error(`The document ${document} is invalid`);
        }
        this.iban = iban;
        this.document = document;
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
}