export class User {
  uid: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  displayName: string;
  photoURL: string;
  provider: string;

  constructor(
    uid: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    displayName: string,
    photoURL: string,
    provider: string,
  ) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.provider = provider;
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): void {
    this.uid = uid;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getFirstname(): string {
    return this.firstname;
  }

  setFirstname(firstname: string): void {
    this.firstname = firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;
  }

  getPhotoURL(): string {
    return this.photoURL;
  }

  setPhotoURL(photoURL: string): void {
    this.photoURL = photoURL;
  }

  getProvider(): string {
    return this.provider;
  }

  setProvider(provider: string): void {
    this.provider = provider;
  }

  getJSON(): Object {
    return {
      uid : this.uid,
      email : this.email,
      username : this.username,
      firstname : this.firstname,
      lastname : this.lastname,
      displayName : this.displayName,
      photoURL : this.photoURL,
      provider : this.provider,
    };
  }
}

export class Instructor extends User {}

export class Student extends User {
  grupoId: string;

  getGroupId(): string {
    return  this.grupoId;
  }
}


