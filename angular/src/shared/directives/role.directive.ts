import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleService } from 'src/core/services/role/role.service';

@Directive({
  selector: '[appRole]',
  standalone:true
})
export class RoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {}

  @Input() set appRole(allowedRoles: string[]) {
    const hasPermission = allowedRoles.some(role =>
      this.roleService.hasRole(role)
    );

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
