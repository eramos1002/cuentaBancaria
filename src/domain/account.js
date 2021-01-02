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
            throw new Error(`IBAN ${iban} is invalid`);
        }
    }

    open() {}

    close() {}

    deposit(amount) {}

    withdrawal(amount) {}
}