export class User {
  constructor(
    public email: string,
    public pat: string,
    public lastUpdated: Date,
    public isStored: boolean,
    public defaultTeam: string
  ) {}
}
