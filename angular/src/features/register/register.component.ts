import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DestroyService } from 'src/core/services/destroy/destroy.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule,MatSelectModule, MatInputModule, MatButtonModule,JsonPipe]
})
export class RegisterComponent implements OnInit {

    validateForm!: FormGroup;
    private  authService = inject(AuthService);
    private router = inject(Router);
    private destroyService = inject(DestroyService);
    private fb = inject(FormBuilder);
    ngOnInit() {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            role: [null,[Validators.required]]
        });
    }

    reset() {
        console.log("reset");
        this.validateForm.reset();
    }

    register(){
        this.authService.register(this.validateForm.value).pipe(takeUntil(this.destroyService.onDestroy$)).subscribe(
            {
                next:(response) =>{
                    console.log(response);
                    this.reset();
                },
                error(err) {
                    console.log(err);
                    console.log("Registration failed");
                }
            }
        );
    }
}
