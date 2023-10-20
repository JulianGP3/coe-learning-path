import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs";
import { Team } from "../models/team.model";
import { Member } from "../models/member.model";
import { LearningPath } from "../models/learningPath.model";

@Injectable({ providedIn: "root" })
export class ApiService {
  STORAGE_KEY = "COELP_USER_INFO";
  UNOSQUARE_HEADER = "x-custom-unosquare-token";

  constructor(private http: HttpClient) {}

  getUserInfo(): User | null {
    const userData = localStorage.getItem(this.STORAGE_KEY);
    if (userData) {
      try {
        const userObject: User = JSON.parse(userData);
        return userObject;
      } catch (error) {
        console.error(
          "Error al analizar el valor almacenado en localStorage:",
          error
        );
        return null;
      }
    } else {
      return null; // No se encontraron datos en localStorage
    }
  }

  UpdateUserInfo(user: User) {
    if (!Array.isArray(user) && user !== null) {
      if (user.pat) {
        user.isStored = true;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  ClearUserInfo() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  fetchTeams() {
    const userInfo = this.getUserInfo();
    let headers;
    if (userInfo?.pat) {
      headers = new HttpHeaders().set(this.UNOSQUARE_HEADER, userInfo?.pat);
    }
    return this.http.get<Team[]>(`${environment.urlBase}teams`, {
      headers: headers,
    });
  }

  fetchTeamMembers(defaultTeam: string){
    const userInfo = this.getUserInfo();
    let headers;
    if (userInfo?.pat) {
      headers = new HttpHeaders().set(this.UNOSQUARE_HEADER, userInfo?.pat);
    }
    return this.http.get<Member[]>(`${environment.urlBase}teams/${defaultTeam}/members`, {
      headers: headers,
    });
  }
  fetchFeatureForUser(email: string) {
    const userInfo = this.getUserInfo();
    let headers;
    if (userInfo?.pat) {
      headers = new HttpHeaders().set(this.UNOSQUARE_HEADER, userInfo?.pat);
    }
    try {
      return this.http.get<LearningPath>(`${environment.urlBase}learningpath/${email}`, 
      { headers });       
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


}
