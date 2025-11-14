import { Injectable, signal, computed } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, signOut, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';

// Khai báo biến toàn cục (MANDATORY for Canvas Environment)
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string | undefined;

// Định nghĩa cấu trúc người dùng cho Firestore
export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: any; // Timestamp
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // State Signals
  private firebaseApp = initializeApp(JSON.parse(__firebase_config));
  private auth = getAuth(this.firebaseApp);
  private db = getFirestore(this.firebaseApp);

  // User status
  private currentUserSig = signal<User | null | undefined>(undefined); // undefined: loading, null: signed out, User: signed in

  // Public signal for UI components
  public readonly currentUser = this.currentUserSig.asReadonly();
  public readonly isLoggedIn = computed(() => !!this.currentUserSig());
  public readonly isAuthReady = computed(() => this.currentUserSig() !== undefined);

  // Firestore path constants
  private readonly appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  constructor(private router: Router) {
    this.initAuth();
  }

  // Khởi tạo Auth: Đăng nhập với token tùy chỉnh hoặc ẩn danh
  private async initAuth(): Promise<void> {
    try {
      if (typeof __initial_auth_token !== 'undefined') {
        await signInWithCustomToken(this.auth, __initial_auth_token);
      } else {
        await signInAnonymously(this.auth);
      }

      this.auth.onAuthStateChanged(user => {
        this.currentUserSig.set(user);
        if (user) {
            console.log("Firebase Auth State Changed: User signed in:", user.uid);
        } else {
            console.log("Firebase Auth State Changed: User signed out (or anonymous)");
        }
      });
    } catch (error) {
      console.error("Error during initial Firebase sign-in:", error);
      this.currentUserSig.set(null);
    }
  }

  /**
   * MÔ PHỎNG: Gửi OTP (Mã xác thực) đến email.
   * Do không thể cấu hình Email Service thực tế trong môi trường này,
   * hàm này sẽ trả về một mã OTP giả.
   * @param email Email người dùng đăng ký.
   * @returns Mã OTP giả.
   */
  simulateSendOtp(email: string): number {
    // Luôn tạo mã OTP 6 chữ số ngẫu nhiên
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`[AUTH SERVICE]: Mã OTP giả cho ${email} là: ${otp}`);
    // Trong ứng dụng thực tế: gọi API backend để gửi email
    return otp;
  }

  // =========================================================
  // AUTHENTICATION FUNCTIONS (MOCK/SIMULATED)
  // =========================================================

  /**
   * MÔ PHỎNG: Đăng ký người dùng mới.
   * Ghi dữ liệu vào Firestore.
   */
  async registerUser(userData: {email: string, username: string, phone: string, password: string}): Promise<void> {
    if (!this.currentUser()) {
        throw new Error("Auth service is not ready or user is not authenticated.");
    }

    // Tạo ID người dùng mới (dùng email làm ID cho đơn giản trong mô phỏng)
    // Trong ứng dụng thực tế: dùng Firebase Auth Email/Password để tạo user và nhận UID
    const simulatedUid = btoa(userData.email).slice(0, 20); // Tạo UID giả

    const userDocRef = doc(this.db, 'artifacts', this.appId, 'users', simulatedUid, 'profile', 'data');

    const newUserProfile: UserProfile = {
      uid: simulatedUid,
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      role: 'user',
      createdAt: new Date(),
    };

    try {
      await setDoc(userDocRef, newUserProfile);
      console.log("Simulated User Registered and profile saved to Firestore for UID:", simulatedUid);
      // MÔ PHỎNG ĐĂNG NHẬP SAU KHI ĐĂNG KÝ: Cần có một hàm để tạo token tùy chỉnh và đăng nhập
      // Tạm thời chỉ ghi log.
    } catch (error) {
      console.error("Error saving user profile to Firestore:", error);
      throw new Error("Lỗi lưu thông tin người dùng. Vui lòng thử lại.");
    }
  }

  /**
   * MÔ PHỎNG: Đăng nhập người dùng.
   * Trong ứng dụng thực tế, sẽ dùng signInWithEmailAndPassword.
   */
  async login(email: string, password: string): Promise<void> {
    console.log(`Simulated login attempt for: ${email}`);

    // Logic kiểm tra mật khẩu và đăng nhập thực tế sẽ diễn ra ở đây
    // VÌ CHÚNG TA CHỈ MÔ PHỎNG, NÊN TA GIẢ ĐỊNH ĐĂNG NHẬP THÀNH CÔNG VÀ CHUYỂN HƯỚNG

    // Tìm kiếm profile người dùng giả lập
    const simulatedUid = btoa(email).slice(0, 20);
    const userDocRef = doc(this.db, 'artifacts', this.appId, 'users', simulatedUid, 'profile', 'data');

    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            console.log("Simulated Login Success. Redirecting...");
            // Thực tế sẽ dùng: await signInWithEmailAndPassword(this.auth, email, password);
            this.router.navigate(['/trang-chu']);
        } else {
            throw new Error("Email hoặc mật khẩu không đúng.");
        }
    } catch (error) {
        console.error("Simulated Login Failed:", error);
        throw new Error("Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.");
    }
  }

  /**
   * Đăng xuất.
   */
  async logout(): Promise<void> {
    try {
        await signOut(this.auth);
        this.router.navigate(['/trang-chu']);
    } catch (error) {
        console.error("Error signing out:", error);
    }
  }

  // =========================================================
  // MIDDLEWARE GUARD (Angular Route Guard)
  // =========================================================

  /**
   * Hàm bảo vệ route: Kiểm tra xem người dùng đã đăng nhập chưa.
   * Trong ứng dụng Angular thực tế, đây sẽ là một Route Guard.
   */
  canActivate(redirectUrl: string = '/dang-nhap'): boolean {
    if (this.isAuthReady() === false) {
        // Tạm thời cho phép truy cập nếu đang tải (hoặc có thể trả về false và chờ)
        return true;
    }
    if (this.isLoggedIn()) {
      return true;
    } else {
      console.log('Access denied: User not logged in. Redirecting...');
      this.router.navigate([redirectUrl]);
      return false;
    }
  }

}
