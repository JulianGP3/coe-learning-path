import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { catchError } from "rxjs";
import { LearningPath } from "src/app/models/learningPath.model";
import { Member } from "src/app/models/member.model";
import { Team } from "src/app/models/team.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-mentor",
  templateUrl: "mentor.component.html",
  styles: [],
})
export class MentorComponent implements OnInit {
  mentorsForm: FormGroup;
  mentorTeams: Team[];
  selectedTeam = false;
  members: Member[];
  learningPathData : LearningPath;
  onLoadInfo = false;
  constructor(private srvApi: ApiService) {}

  ngOnInit(): void {
    this.srvApi
      .fetchTeams()
      .pipe(
        catchError((error) => {
          console.error("Error en la solicitud:", error);
          throw error;
        })
      )
      .subscribe((data) => {
        debugger;
        console.log("Respuesta exitosa:", data);
        this.mentorTeams = data;
      });
  }

  onSelect(team: Team) {
    debugger;
    this.srvApi
    .fetchTeamMembers(team.id)
    .pipe(
      catchError((error) => {
        this.selectedTeam = false;
        console.error("Error en la solicitud:", error);
        throw error;
      })
      )
      .subscribe((members) => {
        this.selectedTeam = true;
        console.log("Respuesta exitosa team members:", members);
        this.members = members;
      });
  }

  onSelectMember(member: Member) {
    this.srvApi
    .fetchFeatureForUser(member.uniqueName)
    .pipe(
      catchError((error) => {
        this.onLoadInfo = false;
        console.error("Error en la solicitud:", error);
        throw error;
      })
      )
      .subscribe((learningPath) => {
        this.onLoadInfo = true;
        console.log("Respuesta exitosa learningPath:", learningPath);
        this.learningPathData = learningPath;
      });
  }

  fetchTeams() {
    let result = this.srvApi
      .fetchTeams()
      .pipe(
        catchError((error) => {
          console.error("Error en la solicitud:", error);
          throw error;
        })
      )
      .subscribe((teams) => {
        debugger;
        console.log("Respuesta exitosa teams:", teams);
        this.mentorTeams = teams;
      });
  }
}
