import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {
  constructor() {}

  private convertDataURIToBinary(dataURI: string) {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    // const r = Base64Binary.decodeArrayBuffer(raw);

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    // array.
    return array;
  }

  getAsFile(name: string, dataURI: string): File {
    const patt: RegExp = /image\/[a-z]+/g;
    const type = dataURI.match(patt);
    const binary = this.convertDataURIToBinary(dataURI);
    const binary2: any[] = [];
    binary2.push(binary);
    const file = new File(binary2, name, {
      type: type[0]
    });
    return file;
  }

  getType(dataURI: string) {
    const patt: RegExp = /image\/[a-z]+/g;
    const type = dataURI.match(patt);
    return type;
  }
}
