import {Component, effect, inject, WritableSignal} from '@angular/core';
import {RegisterComponent} from '../../features/auth/pages/register/register.component';
import {LoginComponent} from '../../features/auth/pages/login/login.component';
import {UserTokenDto} from '../../features/auth/models/user-token-dto.model';
import {AuthService} from '../../features/auth/services/auth.service';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Dialog} from 'primeng/dialog';
import {DashComponent} from '../../features/dashboard/pages/dash/dash.component';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar,
    Dialog,
    RegisterComponent,
    LoginComponent,
    DashComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private readonly _authService: AuthService = inject(AuthService);


  items!: MenuItem[];
  registerVisible: boolean = false;
  loginVisible: boolean = false;
  dashboardVisible = false;
  currentUser: WritableSignal<UserTokenDto|undefined>;

  constructor() {
    this.currentUser = this._authService.currentUser;

    effect(() => {
      this.initNav(this.currentUser());
    });
  }

  closeForm(): void {
    this.registerVisible = false;
    this.loginVisible = false;
  }

  initNav(currentUser: UserTokenDto | undefined) {
    console.log(currentUser);
    console.log("initNav appelé", currentUser);
    if (currentUser) {
      this.items =
        [
          {
            label: 'home',
            icon: 'pi pi-home',
            routerLink: '/home',
          },
          {
            label: currentUser.user.lastname + ' ' + currentUser.user.firstname + ' (' + currentUser.user.email + ')',
            icon: 'pi pi-user',
            routerLink: '/management',
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-tachometer',
            routerLink: '/dashboard',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this._authService.logout();
              setTimeout(() => {
                window.location.href = '/home';
              }, 100);
            }
          }
        ];
    } else {
      this.items = [
        {
          label: 'home',
          icon: 'pi pi-home',
          routerLink: '/home',
        },
        {
          label: 'Register',
          icon: 'pi pi-user',
          command: () => {
            this.registerVisible = true;
          }
        },
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          command: () => {
            this.loginVisible = true;
          }
        }
      ];
    }
  }
}
