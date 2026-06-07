import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.html',
})
export class EditarProducto {
  producto: Producto = new Producto();
  id!: number;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private enrutador = inject(Router);

  ngOnInit(): void {
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => {
        this.producto = datos;
        this.cdr.detectChanges();
      },
      error: (error: any) => console.log(error)
    });
  }

  onSubmit() {
    this.guardarProducto();
  }

  guardarProducto() {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: (datos) => this.irProductoLista(),
      error: (error: any) => console.log(error)
    });
  }

  irProductoLista() {
    this.enrutador.navigate(['/productos']);
  }
}
