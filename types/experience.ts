export interface Role {
  title: string;
  period: string;
  responsibilities: string[];
}

export interface Experience {
  company: string;
  location: string;
  roles: Role[];
}
