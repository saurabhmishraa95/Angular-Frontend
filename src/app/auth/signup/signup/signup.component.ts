import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignup() {
    this.authService.createUser(
      this.signupForm.get('username').value,
      this.signupForm.get('password').value
    );
    // this.signupForm.reset();
  }
}
