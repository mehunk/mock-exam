import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';

/**
 * AdminComponent 类，表示管理员组件
 *
 * @todo 这里面判断当前用户是否为管理员的逻辑还是应该放在路由守卫中
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor (
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getUser)).subscribe(
      user => {
        if (!user || !user.roles || !user.roles['admin']) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

}
