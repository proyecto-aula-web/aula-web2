import { Component, OnInit, Input } from '@angular/core';
import { PostInterface } from '../models/post';
import { FileTypeService } from '../services/file-type.service';
import { PostService } from '../services/post.service';
import { ColorService, ColorRGBInterface } from '../services/color.service';

@Component({
  selector: 'au-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostInterface;

  // post_print: PostPrintInterface;

  @Input() id: string;

  constructor(
    private _PostService: PostService,
    private _FileTypeService: FileTypeService,
    private _ColorService: ColorService
  ) { }

  ngOnInit() {


    if (this.id) {
       this._PostService.getPost(this.id).subscribe((data) => {
         const currentDate = new Date();
          this.post = data;
          if (this.post.attachtment) {
            for (let i = 0; i < this.post.attachtment.length; i++) {
              const element = this.post.attachtment[i];
              const iconPath = this._FileTypeService.getIconPath(element.type);
              this.post.attachtment[i].iconPath = iconPath;
              const date = new Date();
              date.setTime(this.post.createdDate);

              // hora a imprimir en el post
              const printDate = date.toDateString().split(' ');
              this.post.date = '' + printDate.slice(0, 4).join(' ');

              // Genera el color del avatar
              const color: ColorRGBInterface =  this._ColorService.getColorRGB(data.user);
              const _color = `rgb(${color.r},${color.g},${color.b})`;
              this.post.color = _color;

            }
          }
       });
    }
  }

}
