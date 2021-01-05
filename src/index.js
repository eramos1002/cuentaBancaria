import Account from './domain/account';

// Cuenta creada, luego tiene saldo 0
const account = new Account('ES60 0049 1500 0512 3456 7892', '48942854g');

// Ejecuto un depósito asíncrono
const promise = account.depositV2(40, 'USD');

// Si hago el console.log inmediatamente, vemos que todavía no se ha hecho efectivo
console.log(`A) El saldo de la cuenta es ${account.balance}`); // A) El saldo de la cuenta es 0

// Pero aquí lo que digo es: haz el console.log cuando la promesa haya terminado
promise
.then(() => {
    console.log(`B) El saldo de la cuenta es ${account.balance}`); // B) El saldo de la cuenta es 40
})
.catch(err => {
    console.error('err', err);
});
