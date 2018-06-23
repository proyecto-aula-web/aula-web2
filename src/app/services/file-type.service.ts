import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {

  constructor() { }

  getIconPath(type: string): string {
    switch (type) {
      case 'doc':
      case 'docx':
      case 'docm':
      case 'dotx':
      case 'dotm': return '/assets/images/word.png';
      case 'xls':
      case 'xlsx':
      case 'xlsm':
      case 'xltx':
      case 'xltm':
      case 'xlsb':
      case 'xlam': return '/assets/images/excel.png';
      case 'ppt':
      case 'pptx':
      case 'pptm':
      case 'potx':
      case 'potm':
      case 'ppam':
      case 'pps':
      case 'ppsx': return '/assets/images/powerpoint.png';
      case 'pdf': return '/assets/images/pdf.png';
      case 'rar': return '/assets/images/winrar.png';
      case 'zip': return '/assets/images/zip.png';
      case 'ace':
      case 'rtf': return '/assets/images/file.png';
      default: return '/assets/images/file.png';
    }
  }
}
