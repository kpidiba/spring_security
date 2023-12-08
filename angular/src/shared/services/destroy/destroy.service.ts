import { Subject } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestroyService  implements OnDestroy{
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get onDestroy$(): Subject<void> {
    return this.destroy$;
  }
}
