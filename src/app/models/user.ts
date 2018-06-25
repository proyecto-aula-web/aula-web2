export interface UserInterface {
  uid: string;
  email: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  displayName?: string;
  photoURL?: string;
  provider?: string;
  id_course?: string[];
  groupId?: string[];

}


/*
export interface InstructorInterface extends UserInterface {
  other?: boolean;
  id_course: string [];
}
p
export interface StudentInterface extends UserInterface {
  grupoId: string [];

}*/


