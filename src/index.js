class Account {
    constructor(iban, document) {
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
    withdraw(amount) {
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
class Bank {
    constructor() {
        this.accounts = {};
    }
    addAccount(account) {
        // falta especificar si no es valido y dni
        if (typeof this.accounts[account] === undefined) {
            throw new Error("La cuenta no es valida");
        }
        this.accounts[account.iban] = account;
    }
    getAccountbyIban(Iban) {}

    findAccountbyDocument(document) {}
}