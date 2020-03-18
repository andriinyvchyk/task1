import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  token: any;
  usersarray: any;
  logined: boolean;
  constructor(private http: Http, private httpClient: HttpClient) { }

  authUser(users) {
    let headers = new Headers();
    return this.http.post('http://localhost:3000/api/auth',
      users,
      { headers: headers }).pipe(map((response: any) => response.json()));
  }
  storeUser(token, users) {
    localStorage.setItem('token', token);
    localStorage.setItem('users', JSON.stringify(users));
    this.token = token;
    this.usersarray = users;
  }
  logout() {
    this.token = null;
    this.usersarray = null;
    localStorage.clear();
  }
  isLoggedIn() {
    return tokenNotExpired();
  }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/api/get/users');
  }
  addUsers(data) {
    return this.httpClient.post('http://localhost:3000/api/add/users', data);
  }
  getUsersByID(id: string) {
    return this.httpClient.get(`http://localhost:3000/api/getbyid/users/edit/${id}`);
  }
  updateUsersByID(id: string, response: string) {
    return this.httpClient.patch(`http://localhost:3000/api/users/edit-update/${id}`, response);
  }
  deleteUsers(id: string) {
    return this.httpClient.delete(`http://localhost:3000/api/users/delete/${id}`);
  }



  addgroup(data) {
    return this.httpClient.post('http://localhost:3000/api/add/group', data);
  }
  getGroup() {
    return this.httpClient.get('http://localhost:3000/api/get/group');
  }
  getGroupByID(id: string) {
    return this.httpClient.get(`http://localhost:3000/api/getbyid/group/edit/${id}`);
  }
  updateGroupByID(id: string, response) {
    return this.httpClient.patch(`http://localhost:3000/api/group/edit-update/${id}`, response);
  }
  deleteGroup(id: string) {
    return this.httpClient.delete(`http://localhost:3000/api/group/delete/${id}`);
  }
}
