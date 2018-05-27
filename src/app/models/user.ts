export interface UserInterface {
  uid: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  displayName: string;
  photoURL: string;
  provider: string;

}

export interface InstructorInterface extends UserInterface {
  other?: string; /** eliminar */
}

export interface StudentInterface extends UserInterface {
  grupoId: string;

}


