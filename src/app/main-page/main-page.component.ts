import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../Services/employee.service';
import { error } from 'node:console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  employees: Employee[] = [];
  deletedEmployees: Employee[] = [];
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  selectedEmployeeId: number | null = null;
  newEmployee: Employee = {employeeID: 0, firstName: '', lastName: '', email: '', phoneNumber: '',jobTitle:'',hireDate:'' ,isDeleted:false };
  editingEmployee: Employee | null = null;
  isAddEmployeeFormOpen: boolean = false; // State for the modal
  showDeletedEmployees: boolean = false;
  constructor(private employeeService: EmployeeService , private router:Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  toggleView(showDeleted: boolean): void {
    this.showDeletedEmployees = showDeleted;
    
    if (showDeleted) {
      this.loadDeletedEmployees();
    } else {
      this.fetchEmployees();
    }
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log('Employees Array:', this.employees);  // Confirm that employees array has data
      },
      (error) => console.error('Error fetching employees:', error)
    );
  }

  loadDeletedEmployees(): void {
    this.employeeService.getDeletedEmployees().subscribe(
      (data) => {
        this.deletedEmployees = data;
      },
      (error) => {
        console.error('Error fetching deleted employees', error);
      }
    );
  }
  confirmUnDeleteEmployee(id: number): void {
    const confirmed = window.confirm('Are you sure you want to retreive this employee?');
    if (confirmed) {
      this.undeleteEmployee(id);
    }
  }
  undeleteEmployee(id: number): void {
    this.employeeService.undeleteEmployee(id).subscribe(
      () => {
        // Remove the undeleted employee from the deletedEmployees array
        this.deletedEmployees = this.deletedEmployees.filter(employee => employee.employeeID !== id);
        // Optionally refresh the active employees list
        this.fetchEmployees(); 
        alert('Employee successfully undeleted');
        this.fetchEmployees();
        this.loadDeletedEmployees();
      },
      (error) => {
        console.error('Failed to undelete employee:', error);
        alert('Error: Failed to undelete employee');
      }
    );
  }

  openAddEmployeeForm() {
    this.isFormVisible = true;
  this.isEditMode = false; // Set to Add mode
  this.resetForm(); // Ensure form fields are empty
  }
  openEditEmployeeForm(employee: Employee): void {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.selectedEmployeeId = employee.employeeID;
    this.newEmployee = { ...employee }; // Populate form with selected employee's data
  }

  
  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      (newEmployee) => {
        this.employees.push(newEmployee); // Add the new employee to the list
        this.closeAddEmployeeForm(); // Close the form
        alert("employee added successfully")
        this.fetchEmployees();
      },
      (error) => {
        console.error("Failed to add employee:", error);
        // Display specific error message if available, otherwise a default message
        const errorMessage = error.error?.message || "An unexpected error occurred.";
        alert(`Error: ${errorMessage}`);
      }
    );
  }

  closeAddEmployeeForm() {
    this.isAddEmployeeFormOpen = false; // Hide the form
    this.newEmployee = { employeeID: 0, firstName: '', lastName: '', email: '', phoneNumber: '',jobTitle:'',hireDate:'' ,isDeleted:false}; // Reset form
  }

  resetForm(): void {
    this.newEmployee = { employeeID: 0, firstName: '', lastName: '', email: '', phoneNumber: '', jobTitle: '', hireDate: '', isDeleted: false };
    this.selectedEmployeeId = null;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = { ...employee }; // Create a copy to edit
  }


  updateEmployee(): void {
    if (!this.selectedEmployeeId) return;

    this.employeeService.updateEmployee(this.selectedEmployeeId, this.newEmployee).subscribe(
      (updatedEmployee) => {
        const index = this.employees.findIndex(e => e.employeeID === this.selectedEmployeeId);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
        }
        this.closeForm();
        alert("Employee updated successfully!");
        this.fetchEmployees();
      },
      (error) => {
        console.error("Failed to update employee:", error);
        alert("Error: Failed to update employee.");
      }
    );
  }
  closeForm(): void {
    this.isFormVisible = false;
    this.isEditMode = false;
    this.resetForm();
  }
  cancelEdit(): void {
    this.editingEmployee = null;
  }
  logout() {
    localStorage.removeItem('Token'); // Clear token from local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
 
  confirmDeleteEmployee(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.deleteEmployee(id);
    }
  }
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        alert("Employee deleted successfully!");
        this.fetchEmployees(); // Re-fetch the employee list after deletion
      },
      (error) => {
        console.error("Failed to delete employee:", error);
        alert("Error: Failed to delete employee.");
      }
    );
  }
}
