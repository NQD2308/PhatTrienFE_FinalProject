export class Member {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
  ) {
    this.id = id ?? 0;
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
  }
  toPlainObject(): object {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  };
};
