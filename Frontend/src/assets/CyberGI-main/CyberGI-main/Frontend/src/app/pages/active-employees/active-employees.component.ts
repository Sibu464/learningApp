import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-active-employees',
  templateUrl: './active-employees.component.html',
  styleUrls: ['./active-employees.component.scss']
})
export class ActiveEmployeesComponent implements OnInit {
navigateToEmployerPages(arg0: string) {
throw new Error('Method not implemented.');
}

  searchText = '';
  employeesDetails: any[] = [];
  isLoggedIn: boolean = false;
  employees: any;
  data:any
  selectedFilter: string | undefined;
employee = ''; 
isEmployer: any;
 
// employee: any;
  

  constructor(private router: Router, private authService: AuthService, private employeesService:EmployeesService) {}



  ngOnInit(): void {
    this.checkLoginStatus();
    
  }

  // ngOnInit(): void {
  //   this.checkLoginStatus();
  // }

  checkLoginStatus(): void {

   this.authService.isLoggedIn()
    if(this.isLoggedIn=true){
      this.employeesService.getEmployees().subscribe((data) => {
         this.employees = data;
          console.log("return employees", this.employees)
        
        });
    }
    else{
       alert("Cannot show this page without authorized user")
    }
    
  }

  onProfileIconClick(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigate(['/signin']);
    }
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  // logout() {
  //   throw new Error('Method not implemented.');
  // }

  onLogoClick(): void {
    this.router.navigate(['/landing-page']);
  }

  loadEmployees(): void {
    this.employeesService.getEmployees().subscribe(data => {
      this.employees = data;
      console.log("Employees loaded", this.employees);
    });
  }

  searchEmployees(): any[] {
    if (!this.searchText) {
      return this.employees;
    }

    const searchTextLower = this.searchText.toLowerCase();

    return this.employees.filter((employee: { employee: { id: { toString: () => string; }; username: string; }; }) => {
      if (this.selectedFilter === 'id') {
        return employee.employee.id.toString().toLowerCase().includes(searchTextLower);
      } else if (this.selectedFilter === 'name') {
        return employee.employee.username.toLowerCase().includes(searchTextLower);
      }
      return false;
    });
  }


  softDeleteEmployee(id: number): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeesService.softDeleteEmployee(id).subscribe({
        next: () => {
          console.log('Employee soft deleted successfully');
          this.loadEmployees(); // Refresh the list
        },
        error: err => {
          console.error('Error deleting employee', err);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }
  
  gout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/signin']);
      },
      error: err => {
        console.error('Logout error', err);
      }
    });
  }

  navigateToProfile(employeeId: number): void {
    this.router.navigate([`/profile/${employeeId}`]);
  }

}
