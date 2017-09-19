import { Component, OnInit, ViewChild, ElementRef, DoCheck, AfterContentInit } from '@angular/core';
import { WpdataService } from '../../service/wpdata.service';
import { SwiperModule } from 'angular2-useful-swiper';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  public ObjClasico;

  config: SwiperOptions= {
    slidesPerView: 3,
    paginationClickable: false,
    spaceBetween: 30,
    loop:true,
    autoplay: 4000,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        }, 
        520: {
            slidesPerView: 1,
            spaceBetween: 10
        },      
    }
    };


  

  constructor(private _wp:WpdataService) { 
    
    this._wp.getDataWP("http://www.clasicorcn.co/wp-json/wp/v2/posts?categories=426")
    .subscribe(data=>{
      let jsonClasico = data;
      for (let _p of jsonClasico){
        _p.logomarca = 'assets/img/antena2.jpg';
        let valor;
        if (_p._links['wp:featuredmedia']){
            valor = _p._links['wp:featuredmedia']['0']['href'];
        }else{
            valor = 'sinImagen';
        }
        _p.imgjson = valor;
    }
    console.log(jsonClasico);
    this.ObjClasico =  this.traerimagenes(this._wp.crearObjNoti(jsonClasico));
    //console.log(this.ObjClasico);
    });

  }

  ngOnInit() {
   
  }

  traerimagenes(_arrayFinal){
    return this._wp.addImagenJson(_arrayFinal);
}
}


