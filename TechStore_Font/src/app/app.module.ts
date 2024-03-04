import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './Admin/layout/layout/app.layout.module';
import { LayoutModule } from './Client/Layout/layout/layout.module';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { CartService } from './service/cart.service';
import { InterceptorInterceptor } from './Interceptor/interceptor.interceptor';
import { AuthGuard } from './Guard/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export function jwtOptionsFactory() {
    return {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['https://localhost:44363/api']
    };
}
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        LayoutModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory
            }
        })
    ],
    providers: [
        CartService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
