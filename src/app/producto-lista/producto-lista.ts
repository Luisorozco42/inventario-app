import { Component, inject } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-lista',
  imports: [],
  templateUrl: './producto-lista.html',
})
export class ProductoLista {
  productos!: Producto[];
  private productoServicio = inject(ProductoService);

  ngOnInit(){
    //cargar productos
    this.obtenerProductos();
  }

  private obtenerProductos():void {
    this.productoServicio.obtenerProductosLista().subscribe(
      {
        next: (datos) =>{
          this.productos = datos;
          console.log(this.productos[1].nombre);
        },
        error: (error) =>{
          console.error("Error al obtener los productos", error);
        }
      }
    );
  }
}
