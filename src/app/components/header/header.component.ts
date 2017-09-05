import { Component, OnInit } from '@angular/core';
import { WpdataService } from '../../service/wpdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public ObjClasico;

  constructor(private _wp:WpdataService) { 

    this._wp.getDataWP("http://www.clasicorcn.co/wp-json/wp/v2/posts?categories=426")
    .subscribe(data=>{
      let jsonClasico = data;
      for (let _p of jsonClasico){
        _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/lafm.png';
        let valor;
        if (_p._links['wp:featuredmedia']){
            valor = _p._links['wp:featuredmedia']['0']['href'];
        }else{
            valor = 'sinImagen';
        }
        _p.imgjson = valor;
    }
    this.ObjClasico =  this.traerimagenes(this._wp.crearObjNoti(jsonClasico));
    console.log(this.ObjClasico);
    });

  }

  ngOnInit() {
   
  }

  traerimagenes(_arrayFinal){
    return this._wp.addImagenJson(_arrayFinal);
}
}


