# Ejercicios

## Cuenta bancaria

Simula una cuenta bancaria que permita `open/close`, `withdraw` y `deposit`.
Se puede acceder a una cuenta bancaria de varias formas. Los clientes pueden realizar depositos y retiros a traves de Intener, telefonos, etc. Las tiendas pueden cargar contra la cuenta.
Debe ser posible cerrar la cuenta, las operaciones contra una cuenta cerrada deben lanzar un error.

## Notas

Este proyecto contmepla tener una serie de cuentas bancarias identificadas por el código IBAN

Las cuentas seran creadas. Para crear una cuenta
es necesrio especificar IBAN, nombre, apellidos y documento de identidad del titular de la cuenta.

Si el IBAN o el número de identidad no es válido, lanza un error y la cuenta no se crea.

Para las cuentas ya creadas, se pueden abrir o cerrar.

Al depositar solo se debe comprobar que la cuenta este abierta, si esta cerrada lanza error.

Al retirar, ademas de comprobar si la cuenta esta abierta, se debe verificar que dispone del dinero suficiente.
