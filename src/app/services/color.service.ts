import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // private _color = this.getColorRGB("un dos tres");
  constructor() {}

  private suma(string) {
    let sum = 0;
    for (let i = 0; i < string.length; i++) {
      sum += string.charCodeAt(i);
    }
    return sum;
  }

  private num1(num) {
    return num % 255;
  }

  private num2(num) {
    let aux = num % 255;
    aux = 255 - aux;
    aux = (aux * aux) % 255;
    return aux;
  }

  private num3(num) {
    let aux = num % 255;
    aux = Math.floor(aux / 2);
    aux = (aux * aux) % 255;
    return aux;
  }

  getColorRGB(str: string): ColorRGBInterface {
    const str1 = str.toUpperCase();
    const sum = this.suma(str1);
    const n1 = this.num1(sum);
    const n2 = this.num2(sum);
    const n3 = this.num3(sum);

    return {
      r: n1,
      g: n2,
      b: n3
    };
  }

  // getRGB() {}
}

export interface ColorRGBInterface {
  r: number;
  g: number;
  b: number;
}
