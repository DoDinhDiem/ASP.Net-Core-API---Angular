import { Component } from '@angular/core';
import { LayoutService } from 'src/app/Admin/layout/service/app.layout.service';
import { IAccount } from 'src/app/api/account';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  account: IAccount = {};
  checked: boolean = false;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.accountService.signIn(this.account).subscribe({
      next: (data) => {
        if (data && data.accessToken) {
          this.accountService.storeToken(data.accessToken);
          this.router.navigate(['/admin']);
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
