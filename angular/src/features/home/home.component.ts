import { TokenService } from 'src/core/services/token/token.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { takeUntil } from 'rxjs';
import { User } from 'src/core/models/User';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DestroyService } from 'src/shared/services/destroy/destroy.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule ,MatInputModule,MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule]
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyService = inject(DestroyService);
 private tokenService = inject(TokenService);
  //NOTE: TABLE
  private users !: User[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'name', 'role', 'action'];
  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getUsers() {
    this.authService.user().pipe(takeUntil(this.destroyService.onDestroy$)).subscribe(
      {
        next: (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          return res;
        },
        error: (error) => {
          console.log(error);
          return error;
        }
      }
    );
  }


  edit(value:number){


  }

}
