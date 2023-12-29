import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class RegisterComponent implements OnInit {
    validateForm!: FormGroup;
    credentials = {
        username: '',
        password: ''
    }
    private authService = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    ngOnInit() {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    reset() {
        console.log("reset");
        this.validateForm.reset();
    }

    register(){

    }
}
