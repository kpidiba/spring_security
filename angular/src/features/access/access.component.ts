import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';
import { RoleDirective } from 'src/shared/directives/role.directive';
import { DestroyService } from 'src/shared/services/destroy/destroy.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  standalone: true,
  imports: [RoleDirective,MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule]

})
export class AccessComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyService = inject(DestroyService);

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','name' ,'role', 'action'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getAllAccess();
  }

  getAllAccess() {
    this.authService.user().pipe(takeUntil(this.destroyService.onDestroy$)).subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
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

}
