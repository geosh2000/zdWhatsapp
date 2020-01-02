import { Input, OnChanges, Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

declare var jQuery:any;

import { ApiService } from '../../../services/service.index';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styles: []
})
export class UploadImageComponent implements OnChanges {

  @Input() num:any
  @Input() name:any
  @Input() dir:any
  @Input() passFile:boolean = false
  @Output() loadResult = new EventEmitter<any>()
  @Output() getFile = new EventEmitter<any>()

  title:string
  invalidForm:boolean = true

  previewSrc:boolean = false

  imageForm: FormGroup
  imageFileUp: File
  @ViewChild('imageFile',{static:false}) image_File

  constructor(
                private fb:FormBuilder,
                private _api:ApiService) {

    this.imageForm = new FormGroup({
      fname:              new FormControl('', [ Validators.required,  ] ),
      dir:                new FormControl('', [ Validators.required,  ] ),
      imageFile:          new FormControl('', [ Validators.required,  ] )
    })



  }

  ngOnChanges() {
    if(this.num && this.name && this.dir){
      this.build( this.title, this.dir, this.num, false )
    }
  }

  build( title, dir, name, open = true ){
    if( open ){
      jQuery('#formUploadImageComponent').modal('show')
    }
    this.title = title
    this.imageForm.controls['fname'].setValue(name)
    this.imageForm.controls['dir'].setValue(dir)
    jQuery('#formUploadImage').val('')
    jQuery('#formUploadImagePreview').attr('src','')
    this.previewSrc = false
  }

  submit(){
    let Image = this.image_File.nativeElement

    if( Image.files && Image.files[0] ){
      this.imageFileUp = Image.files[0]
    }

    let ImageFile: File = this.imageFileUp

    if( this.passFile ){
      console.log('emit file', Image)
      this.getFile.emit(Image)
      jQuery('#formUploadImageComponent').modal('hide')
      return true
    }

    let formData: FormData = new FormData()
    formData.append( 'fname', this.imageForm.controls['fname'].value)
    formData.append( 'dir',   this.imageForm.controls['dir'].value)
    formData.append( 'image', ImageFile, ImageFile.name)

    this._api.restfulImgPost( formData, 'UploadImage/uploadImage' )
            .subscribe( res => {

              if( !res['ERR'] ){
                jQuery('#formUploadImageComponent').modal('hide')
              }

              this.loadResult.emit( res )
            })

  }

  setImagePath( event ){
    if( event.target.value != null ){
      this.invalidForm = false
    }

    this.readImg( this.image_File.nativeElement )
  }

  readImg( file ){

    if(file.files && file.files[0]){
      console.log('Imagen cargada')

      let reader = new FileReader();
      reader.onload = function(e){
        jQuery('#formUploadImagePreview').attr('src', e.target['result'])
      }
      this.previewSrc = true
      reader.readAsDataURL(file.files[0])
    }else{
      this.previewSrc = false
      console.error('No existe ninguna imagen cargada')
    }
  }

  imageExists( dir, fname, ext ){
    this._api.restfulGet( `${ dir }/${ fname }/jpg`, 'UploadImage/fileExists')
            .subscribe( res => {
              return res
            })
  }

  deleteFile( dir, fname, ext ){
    this._api.restfulDelete( `${ dir }/${ fname }/jpg`, 'UploadImage/imageDel')
            .subscribe( res => {
              return res
            })
  }

}
