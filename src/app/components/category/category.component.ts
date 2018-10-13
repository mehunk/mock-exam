import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Category } from '../../model';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor (private store: Store<fromRoot.State>) {
    this.categories$ = store.pipe(select(fromRoot.getCategories));
  }

  ngOnInit() {}
}
