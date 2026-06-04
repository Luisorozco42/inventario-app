import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  imports: [FormsModule],
  templateUrl: './agregar-producto.html',
})
export class AgregarProducto {
  producto: Producto = new Producto();//Estamos usando el concepto de two way data binding, por lo que el objeto producto se va a llenar con los datos que el usuario ingrese en el formulario

  private productoServicio = inject(ProductoService);
  private router = inject(Router);

  onSubmit() {
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: (datos) =>{
        this.irListaProductos();
      },
      error: (error: any) => console.log(error)
    });
  }

  irListaProductos(){
    this.router.navigate(['/productos']);
  }
}
