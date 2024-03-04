import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { IAccount } from 'src/app/api/account';
interface gender {
  name: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent {
  account: IAccount = {};
  value = '';
  passwordType: string = 'password';
  confirmPassword: string = '';
  genders: gender[] | undefined;
  selectGender: gender | undefined;
  ngOnInit() {
    this.genders = [
      { name: 'Nam' },
      { name: 'Nữ' }
    ]
  }
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.changeDetectorRef.detectChanges();
  }

  onSubmit() {
    if (this.account.passWord == this.confirmPassword) {
      this.accountService.signUp(this.account).subscribe({
        next: res => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 });
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Mật khẩu xác nhận không giống', life: 3000 });
    }

  }
}
