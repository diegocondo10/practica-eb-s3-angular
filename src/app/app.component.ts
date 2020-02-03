import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public archivo = null;

  public imagenDeS3 = null;

  constructor(
    private http: HttpClient
  ) {

  }

  changeInput(event) {
    this.archivo = event.target.files[0]
  }


  async subirImagen() {

    if (this.archivo) {
      this.imagenDeS3 = null;
      const body = new FormData();
      body.append('imagen', this.archivo)

      const respuesta = await this.http.post(
        'http://practicatendencias-env.bmcingrtpt.us-east-1.elasticbeanstalk.com/subir-imagen',
        body
      )
        .toPromise()
      this.imagenDeS3 = respuesta['url'];
    }

    /*
        this.http.get('http://127.0.0.1:8000/subir-imagen')
          .subscribe(respuesta => {
            console.log(respuesta)
          })
    */

  }


}
