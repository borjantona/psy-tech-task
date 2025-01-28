import { NgClass } from '@angular/common';
import {
  Input,
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-styled-input',
  templateUrl: './styled-input.component.html',
  styleUrls: ['./styled-input.component.scss'],
  imports: [FormsModule, NgClass],
})
export class StyledInputComponent implements OnChanges {
  @Input() required = false;
  @Input() validateInput = true;
  @Input() name: string;
  @Input() value: string;
  @Input() type = 'text';
  @Input() label: string;
  @Input() showLabel = true;
  @Input() description: string;
  @Input() showDescription = false;
  @Input() isPassword = false;
  @Input() disabled = false;
  @Input() autocomplete = true;
  @Input() placeholder = '';
  @Input() showPasswordIcon: string;
  @Input() hidePasswordIcon: string;
  @Input() submitted = false;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('input') input: ElementRef;

  toggledShowPassword = false;
  valid = false;
  checked: boolean;
  msg = '';
  status = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['submitted']) {
      this.validateFormat();
    }
  }

  public isValid(): boolean {
	return this.valid;
  }

  public onInputChange($event?: any) {
    if ($event) {
      this.value = $event.target.value;
      this.validateFormat();
      this.valueChanged.emit($event);
    }
  }

  toggleShowPassword() {
    this.toggledShowPassword = !this.toggledShowPassword;
    this.type = this.toggledShowPassword ? 'text' : 'password';
  }

  validateFormat() {
    if (this.required) {
      this.msg =
        this.value !== '' && this.value != null ? '' : 'This field is required';
      this.status = this.value !== '' && this.value != null ? '' : 'error';
      this.valid = this.value !== '' && this.value != null ? true : false;
      this.checked = this.value !== '' && this.value != null ? false : true;
    } else {
      this.valid = true;
    }
    if (this.valid) {
      if (this.type === 'number') {
        this.checked = true;
        const regexMail: RegExp = REGEX.NUMBER;
        this.valid = regexMail.test(this.value);
        if (this.valid) {
          this.msg = 'This field is valid';
          this.status = 'valid';
        } else {
          this.msg = 'This field is incorrect';
          this.status = 'error';
        }
      } else if (this.type === 'number_with_decimals') {
        this.checked = true;
        const regexMail: RegExp = REGEX.NUMBER_WITH_DECIMALS;
        this.valid = regexMail.test(this.value);
        if (this.valid) {
          this.msg = 'This field is valid';
          this.status = 'valid';
        } else {
          this.msg = 'This field is incorrect';
          this.status = 'error';
        }
      } else if (this.type === 'email') {
        this.checked = true;
        const regexMail: RegExp = REGEX.MAIL;
        this.valid = regexMail.test(this.value);
        if (this.valid) {
          this.msg = 'Email is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Email not valid';
          this.status = 'error';
        }
      } else if (this.type === 'phone') {
        this.checked = true;
        const regexPhone: RegExp = REGEX.PHONE;
        this.valid = regexPhone.test(this.value);
        if (this.valid) {
          this.msg = 'Phone is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Phone not valid';
          this.status = 'error';
        }
      } else if (this.isPassword && this.validateInput) {
        this.checked = true;
        const regexPassword: RegExp = REGEX.PASSWORD;
        this.valid = regexPassword.test(this.value);
        if (this.valid) {
          this.msg = 'Password is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Password not valid';
          this.status = 'error';
        }
      } else if (this.type === 'zipCode') {
        this.checked = true;
        const regexZipCode: RegExp = REGEX.ZIP_CODE;
        this.valid = regexZipCode.test(this.value);
        if (this.valid) {
          this.msg = 'Zip code is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Zip code is not valid';
          this.status = 'error';
        }
      } else if (this.type === 'cvv') {
        this.checked = true;
        const regexCVV: RegExp = REGEX.CVV;
        this.valid = regexCVV.test(this.value);
        if (this.valid) {
          this.msg = 'CVV is valid';
          this.status = 'valid';
        } else {
          this.msg = 'CVV is not valid';
          this.status = 'error';
        }
      } else if (this.type === 'expirationDate') {
        this.checked = true;
        const regexExp: RegExp = REGEX.EXPIRATION_DATE;
        this.valid = regexExp.test(this.value);
        if (this.valid) {
          this.msg = 'Expiration date is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Expiration date is not valid (MM/YY required)';
          this.status = 'error';
        }
      } else if (this.type === 'card') {
        this.checked = true;
        const regexCard: RegExp = REGEX.CARD;
        this.valid = regexCard.test(this.value);
        if (this.valid) {
          this.msg = 'Card number is valid';
          this.status = 'valid';
        } else {
          this.msg = 'Card number is not valid';
          this.status = 'error';
        }
      }
    }
  }
}

export const REGEX = {
  MAIL: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  NIF: /([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/,
  PHONE: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,}$/,
  NUMBER: /^[0-9]*$/,
  NUMBER_WITH_DECIMALS: /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#'$^+=?¿!*()@%&,.|¬\-/_:[\]{}])[A-Za-z\d#'$^+=?¿!*()@%&,.|¬\-/_:[\]{}]{8,}$/,
  ALPHANUMERIC_UNDERSCORE_SPACE: /^[a-zA-Z_\d ]*$/,
  ALPHANUMERIC_UNDERSCORE: /^[a-zA-Z0-9_]{3,30}$/,
  ZIP_CODE: /^[\d]{5}$/,
  CVV: /^\d{3}$/,
  EXPIRATION_DATE: /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/,
  CARD: /^\d{13,19}$/
};
