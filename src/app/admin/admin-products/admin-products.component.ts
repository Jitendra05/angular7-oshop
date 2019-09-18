import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/firebase/product.service';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular7-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products:Product[]=[];
  tableResource:DataTableResource<Product>;
  items:Product[]=[];
  itemCount = 0;

  constructor(private productService:ProductService) {
    this.productService.getAll().subscribe((products)=>{
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0, limit: 10 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

    reloadItems(params) {
      if(!this.tableResource) return;
      
      this.tableResource.query(params).then(items => this.items = items);
    }

    // special properties:

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.title);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.title);
    }

    rowTooltip(item) { return item.title; }


  ngOnInit() {
  }

  filter(query:string){
   let filteredProducts = (query) ? 
   this.products.filter((p)=> p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

   this.initializeTable(filteredProducts);
  }

}
