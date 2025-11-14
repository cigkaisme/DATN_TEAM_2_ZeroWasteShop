import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  phone = '';
  username = '';
  fullName = '';
  password = '';
  otp = '';
  otpSent = false;
  otpVerified = false;
  generatedOtp: number | null = null;

  constructor(private authService: AuthService) {}

  sendOtp() {
    // Gửi OTP qua email hoặc số điện thoại
    this.generatedOtp = this.authService.simulateSendOtp(this.email);
    this.otpSent = true;
  }

  verifyOtp() {
    if (parseInt(this.otp) === this.generatedOtp) {
      this.otpVerified = true;
      alert('Xác thực OTP thành công! Vui lòng tạo mật khẩu.');
    } else {
      alert('OTP không đúng, vui lòng thử lại.');
    }
  }

  async completeRegistration() {
    if (!this.otpVerified) {
      alert('Vui lòng xác thực OTP trước khi đăng ký.');
      return;
    }
    try {
      await this.authService.registerUser({
        email: this.email,
        username: this.username,
        phone: this.phone,
        password: this.password,
      });
      alert('Đăng ký thành công! Bạn có thể đăng nhập.');
    } catch (error) {
      if (error instanceof Error) {
        alert('Lỗi đăng ký: ' + error.message);
      } else {
        alert('Lỗi đăng ký xảy ra');
      }
    }
  }

  onRegister() {
    // Hàm xử lý đăng ký của bạn
    console.log('Register button clicked');
  }
}
