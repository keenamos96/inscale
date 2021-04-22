import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['full_name', 'date_joined', 'salary'];
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  highestEarning = '';
  recentlyJoined = '';

  constructor(private employeeServ: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    const result = await this.employeeServ.getEmployee();
    this.recentlyJoined = result.reduce((a: any, b: any) => a.date_joined > b.date_joined ? a : b).full_name;
    this.highestEarning = result.reduce((a: any, b: any) => a.salary > b.salary ? a : b).full_name;
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }
}
