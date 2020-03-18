import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { WebService } from '../shared/services/web.service';

@Injectable()
export class IsLoggedIn implements CanActivate{
    constructor(private authService: WebService, private router: Router){}

    canActivate(){
        if(this.authService.isLoggedIn()){
                return true;
        }
        else{
            this.router.navigate(['main']);
            return false;
        }
    }
}