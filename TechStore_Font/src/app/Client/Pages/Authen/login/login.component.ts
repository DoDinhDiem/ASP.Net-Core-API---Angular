import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { IAccount } from 'src/app/api/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class LoginComponent {
  account: IAccount = {};
  passwordType: string = 'password';
  constructor(
    private accountService: AccountService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
  ) { }
  ngOnInit() {
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.changeDetectorRef.detectChanges();
  }
  onSubmit() {
    this.accountService.signInClient(this.account).subscribe({
      next: (data) => {
        if (data && data.accessToken) {
          this.accountService.storeTokenClient(data.accessToken);
          this.router.navigate(['/']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: "Đăng nhập không thành công", life: 3000 });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: "Đăng nhập không thành công", life: 3000 });
      }
    });
  }
}
