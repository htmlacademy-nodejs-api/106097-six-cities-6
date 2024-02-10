export type User = {
  name: string;
  email: string;
  avatarPath: string;
  getPassword(): string;
  type: string;
}
