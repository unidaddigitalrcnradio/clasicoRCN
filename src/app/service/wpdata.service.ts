import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule } from "@angular/http";
import 'rxjs/add/operator/map';
import {Noticia} from './noticia';

@Injectable()
export class WpdataService {

  constructor(private _http:Http) { }

  getDataWP(_url:string){
    return this._http.get(_url).map(res=>{
      
       return  res.json();
    });
  }

	crearObjNoti(_json){
    
  let ArregloNoticias:Noticia[] = [];

    for (let i = 0; i < _json.length; i++) {
  
    var id = _json[i].id;
    var titulo:string = _json[i].title.rendered;
    titulo = this.arreglarStrings('&#8216;','"', titulo);
    titulo = this.arreglarStrings('&#8217;','"', titulo);
    titulo = titulo.substr(0,71);
    
    var teaser: string = _json[i].excerpt.rendered;

    var fecha:Date = _json[i].date;
    var rutaUrl = _json[i].link;
    var logoMarca = _json[i].logomarca;
    var imgjson = _json[i].imgjson;
    var contenido = _json[i].content.rendered;
    if (teaser === ''){
      let contRemp:string = contenido;
      contRemp = this.arreglarStrings('<p style="text-align: justify;">','', contRemp).trim();
      contRemp = this.arreglarStrings('<!--more-->','', contRemp);
      contRemp = this.arreglarStrings('<p>','', contRemp);
      contRemp = this.arreglarStrings('</p>','', contRemp);
      contRemp = this.arreglarStrings('<strong>','', contRemp);
      contRemp = this.arreglarStrings('</strong>','', contRemp);
      contRemp = this.arreglarStrings('<br />','',contRemp);
      contRemp = contRemp.trim();
      teaser = contRemp.substring(0,73);
    }else{
      teaser = teaser.trim();
      teaser = this.arreglarStrings('<p>','', teaser);
      teaser = this.arreglarStrings('</p>','', teaser);
      teaser = this.arreglarStrings('<strong>','', teaser);
      teaser = this.arreglarStrings('</strong>','', teaser);
    }
    //console.log(teaser);
    teaser = this.arreglarStrings('<p>','',teaser);
    teaser = this.arreglarStrings('</p>','',teaser);
      let n = new Noticia(id, titulo.substring(0,73) ,teaser.substring(0,78) ,fecha , rutaUrl,logoMarca , imgjson ,contenido);	
      ArregloNoticias.push(n);
  }
  return ArregloNoticias;
}

arreglarStrings(_dato, _remplazo, _string:string){
  let StringArreglado = _string.replace(_dato,_remplazo);
  return StringArreglado;
}

addImagenJson(allnoti){
  let errorMessage;
  for (let i = 0; i < allnoti.length; i++) {
    let imgDatos;
    let valor:string = allnoti[i].urlImg;
    if (valor === 'sinImagen'){
      allnoti[i].urlImg = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/prev.jpg';
    }else{
      this.getDataWP(valor).subscribe(
        result => {
          imgDatos = result;
          allnoti[i].urlImg = imgDatos.source_url;
          
        },
        error => {
          errorMessage = <any>error;
          if (errorMessage !== null){
            allnoti[i].urlImg = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/prev.jpg';
            
          }
        });
    }
  }
return allnoti;
}

}
