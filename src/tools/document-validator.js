/**
 * DocumentValidator. Returns the type of document and checks its validity.
 * 
 * The algorithm is adapted from other solutions found at:
 * - http://www.compartecodigo.com/javascript/validar-nif-cif-nie-segun-ley-vigente-31.html
 * - http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */

const DNI_REGEX = /^(\d{8})([A-Z])$/;
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

class DocumentValidator {

    normalize(str) {
        return String(str).toUpperCase().replace(/\s/, '');
    }

    isValid(str) {
        return this.validate(str).valid;
    }

    validate(str) {
        // Ensure upcase and remove whitespace
        str = this.normalize(str);
    
        let valid = false;
        let type = this.spainIdType(str);
    
        switch (type) {
            case 'dni':
                valid = this.validDNI(str);
                break;
            case 'nie':
                valid = this.validNIE(str);
                break;
            case 'cif':
                valid = this.validCIF(str);
                break;
        }

        return { type, valid };
    };

    spainIdType(str) {
        if (str.match(DNI_REGEX)) {
            return 'dni';
        }

        if (str.match(CIF_REGEX)) {
            return 'cif';
        }

        if (str.match(NIE_REGEX)) {
            return 'nie';
        }
    }

    validDNI(dni) {
        return DNI_LETTERS.charAt(parseInt(dni, 10) % 23) == dni.charAt(8);
    }
    
    validNIE(nie) {
        // Change the initial letter for the corresponding number and validate as DNI
        let nie_prefix = nie.charAt(0);
    
        switch (nie_prefix) {
            case 'X': nie_prefix = 0; break;
            case 'Y': nie_prefix = 1; break;
            case 'Z': nie_prefix = 2; break;
            default: return false;
        }
    
        return this.validDNI(nie_prefix + nie.substr(1));
    }
    
    validCIF(cif) {
        var match = cif.match(CIF_REGEX);
        var letter  = match[1],
            number  = match[2],
            control = match[3];
    
        var even_sum = 0;
        var odd_sum = 0;
        var n;
    
        for (var i = 0; i < number.length; i++) {
          n = parseInt(number[i], 10);
    
          // Odd positions (Even index equals to odd position. i=0 equals first position)
          if (i % 2 === 0) {
            // Odd positions are multiplied first.
            n *= 2;
    
            // If the multiplication is bigger than 10 we need to adjust
            odd_sum += n < 10 ? n : n - 9;
    
          // Even positions
          // Just sum them
          } else {
            even_sum += n;
          }
        }
    
        var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1));
        var control_letter = 'JABCDEFGHI'.substr(control_digit, 1);
    
        // Control must be a digit
        if (letter.match(/[ABEH]/)) {
            return control == control_digit;
        }

        // Control must be a letter
        if (letter.match(/[KPQS]/)) {
            return control == control_letter;
        }

        // Can be either
        return control == control_digit || control == control_letter;
    }
}

export default new DocumentValidator();
