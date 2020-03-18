import { Component, OnInit } from '@angular/core';
import { WebService } from '../../shared/services/web.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isStatus: boolean = false;
  user;
  admin;
  formData: any;
  arrayUsers;
  arrayGroup;
  usersUpdate: boolean;
  editId: string;
  login: string;
  password: string;
  status: string;

  addGroupUser: string;
  nameGroup: string;
  editIdGroup: string;
  arrayUsersGroup;
  editGroups: boolean
  constructor(private api: WebService) { }

  ngOnInit(): void {
    this.resetForm();
    this.checkStatus();
    this.getUsersArray();
    this.getGroupArray();
  }
  checkStatus(){
    this.user = JSON.parse(localStorage.getItem('users'));
    this.api.getUsersByID(this.user.id).subscribe((res) => {
      this.admin = res as any[]
      if(this.admin.status == 'Користувач'){
        this.isStatus = true;
      }
      else {
          this.isStatus = false;
      }
})
  }
  getUsersArray() {
    this.api.getUsers().subscribe((res) => {
      this.arrayUsers = res;
    })
  }
  getGroupArray() {
    this.api.getGroup().subscribe((res) => {
      this.arrayGroup = res;
      console.log(res)
    })
  }
  editUsers(id) {
    this.usersUpdate = true;
    this.api.getUsersByID(id).subscribe((res: any) => {
      this.editId = res._id;
      this.formData.login = res.login,
        this.formData.password = res.password,
        this.formData.status = res.status;

    }, (err: any) => { console.log(err); })
  }
  deleteUsers(id) {
    this.api.deleteUsers(id).subscribe((res: any) => { }, (err: any) => { console.log(err); })
    setTimeout(() => {
      this.getUsersArray()
    }, 500);
  }

  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      _id: null,
      login: '',
      password: '',
      status: ''
    }
  }
  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    if (this.usersUpdate) {
      this.api.updateUsersByID(this.editId, data).subscribe((res: any) => { }, (err: any) => { console.log(err); })
      this.usersUpdate = false;
    }
    else {
      this.api.addUsers(data).subscribe((res: any) => { }, (err: any) => { console.log(err); })
    }
    this.resetForm();
    delete data.id;
    setTimeout(() => {
      this.getUsersArray();
    }, 500);

  }
  addGroups() {
    const data = {
      data: this.nameGroup,
      user: this.addGroupUser,
    }
    if (this.nameGroup && this.addGroupUser) {
      this.api.addgroup(data).subscribe((res: any) => { }, (err: any) => { console.log(err); })
      setTimeout(() => {
        this.getGroupArray();
      }, 500);
      this.nameGroup = ''
      this.addGroupUser = ''
    }
  }

  editGroup(id) {
    this.editGroups = true;
    this.api.getGroupByID(id).subscribe((res: any) => {
      this.editIdGroup = res._id;
      this.nameGroup = res.title;
      this.arrayUsersGroup = res.users;
    }, (err: any) => { console.log(err); })
  }
  saveGroups(){
    const data = {
      data: this.nameGroup,
      user: this.addGroupUser,
    }
    this.api.updateGroupByID(this.editIdGroup, data).subscribe((res: any) => { }, (err: any) => { console.log(err); })
    setTimeout(() => {
      this.getGroupArray();
    }, 500);
    this.nameGroup = ''
    this.addGroupUser = ''
    this.editGroups = false;
  }
  deleteGroup(id){
      this.api.deleteGroup(id).subscribe((res: any) => { }, (err: any) => { console.log(err); })
      setTimeout(() => {
        this.getGroupArray();
      }, 500);
  }
}
