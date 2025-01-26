/* eslint-disable @typescript-eslint/no-use-before-define */
import { Input, Component, HostListener, ViewChild, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
	selector: 'styled-input',
	templateUrl: './styled-input.component.html',
	styleUrls: ['./styled-input.component.scss'],
	providers: [],
	imports: [FormsModule]
})
export class StyledInputComponent implements OnInit, OnDestroy {

	@Input() required = false;
	@Input() validateInput = true;
	@Input() name: string;
	@Input('value') val: string;
	
	@Input() type = 'text';
	@Input() label: string;
	@Input() showLabel = true;
	@Input() description: string;
	@Input() showDescription = false;
	@Input() isPassword = false;
	@Input() disabled = false;
	@Input() autocomplete = true;
	@Input() placeholder = '';
	@Input() addedStyle = {};

	@Input() showPasswordIcon: string;
	@Input() hidePasswordIcon: string;
	@Input() submitted = false;
	@Output() enterKeyPressed: EventEmitter<boolean> = new EventEmitter();
	@Output() valueChanged: EventEmitter<any> = new EventEmitter();

	@ViewChild('input') input: ElementRef;

	toggledShowPassword = false;
	valid = false;
	checked: boolean;
	msg = '';
	status = '';

	private internalInputChange: Function;

	constructor() {
	}

	ngOnInit() {
	}

	public onInputChange($event?: any) {
		if ($event) {
			this.val = $event.target.value;
			this.internalInputChange(this.val);
			this.validateFormat();
			this.valueChanged.emit($event);
		}
	}

	onEnterKeyPress() {
		this.enterKeyPressed.emit();
	}

	toggleShowPassword() {
		this.toggledShowPassword = !this.toggledShowPassword;
		this.type = this.toggledShowPassword ? 'text' : 'password';
	}

	writeValue(value: any): void {
		if (value !== undefined && value !== null) {
			this.val = value;
		}
	}
	registerOnChange(fn: any): void {
		this.internalInputChange = fn;
	}

	validateFormat() {
		if (this.required) {
			this.msg = this.val !== '' && this.val != null ? '' : 'common.validation.required';
			this.status = this.val !== '' && this.val != null ? '' : 'error';
			this.valid = this.val !== '' && this.val != null ? true : false;
			this.checked = this.val !== '' && this.val != null ? false : true;
		} else {
			this.valid = true;
		}
		if (this.valid) {
			if (this.type === 'number') {
				this.checked = true;
				const regexMail: RegExp = REGEX.NUMBER;
				this.valid = regexMail.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.number.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.number.error';
					this.status = 'error';
				}
			} else if (this.type === 'number_with_decimals') {
				this.checked = true;
				const regexMail: RegExp = REGEX.NUMBER_WITH_DECIMALS;
				this.valid = regexMail.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.number.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.number.error';
					this.status = 'error';
				}
			} else if (this.type === 'email') {
				this.checked = true;
				const regexMail: RegExp = REGEX.MAIL;
				this.valid = regexMail.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.email.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.email.error';
					this.status = 'error';
				}
			} else if (this.type === 'phone') {
				this.checked = true;
				const regexPhone: RegExp = REGEX.PHONE;
				this.valid = regexPhone.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.phone.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.phone.error';
					this.status = 'error';
				}
			} else if (this.isPassword && this.validateInput) {
				this.checked = true;
				const regexPassword: RegExp = REGEX.PASSWORD;
				this.valid = regexPassword.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.password.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.password.error';
					this.status = 'error';
				}
			} else if (this.type === 'nickname') {
				this.checked = true;
				const regexNickname: RegExp = REGEX.ALPHANUMERIC_UNDERSCORE;
				this.valid = regexNickname.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.nickname.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.nickname.error';
					this.status = 'error';
				}
			} else if (this.type === 'deviceName') {
				this.checked = true;
				const regexDeviceName: RegExp = REGEX.ALPHANUMERIC_UNDERSCORE_SPACE;
				this.valid = regexDeviceName.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.device-name.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.device-name.error';
					this.status = 'error';
				}
			} else if (this.type === 'zipCode') {
				this.checked = true;
				const regexZipCode: RegExp = REGEX.ZIP_CODE;
				this.valid = regexZipCode.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.zip-code.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.zip-code.error';
					this.status = 'error';
				}
			} else if (this.type === 'wifiPassword') {
				this.checked = true;
				const regexWifi: RegExp = REGEX.WIFI_PASSWORD;
				this.valid = regexWifi.test(this.val);
				if (this.valid) {
					this.msg = 'common.validation.wifi-password.ok';
					this.status = 'valid';
				} else {
					this.msg = 'common.validation.wifi-password.error';
					this.status = 'error';
				}
			}
		}
	}

	ngOnDestroy() {
	}
}

export const REGEX = {
	MAIL: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	NIF: /([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])/,
	PHONE: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{5,}$/,
	NUMBER: /^[0-9]*$/,
	NUMBER_WITH_DECIMALS: /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/,
	PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#'$^+=?¿!*()@%&,.|¬\-/_:[\]{}])[A-Za-z\d#'$^+=?¿!*()@%&,.|¬\-/_:[\]{}]{8,}$/,
	ALPHANUMERIC_UNDERSCORE_SPACE: /^[a-zA-Z_\d ]*$/,
	ALPHANUMERIC_UNDERSCORE: /^[a-zA-Z0-9_]{3,30}$/,
	ZIP_CODE: /^[\d]{5}$/,
	WIFI_PASSWORD: /^.{8,}$/,
};
