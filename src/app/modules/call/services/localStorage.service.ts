import { Injectable } from "@angular/core";

export interface User {
    userId: string;
    name: string;
    sex?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private key: string = 'LiveUser';

    public getUserInfor(): User {
        return JSON.parse(localStorage.getItem(this.key));
    }

    public settUserInfor(user: User): void {
        localStorage.setItem(this.key, JSON.stringify(user));
    }
}