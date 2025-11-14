import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).then(() => {
      alert('Đăng nhập thành công!');
    }).catch((err) => {
      alert('Lỗi đăng nhập: ' + err.message);
    });
  }

  goToRegister() {
    // Chuyển sang trang đăng ký
  }
}
