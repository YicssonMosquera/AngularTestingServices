import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import {TokenService} from '../services/token.service'
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from '../environment/environment';

fdescribe('AuthService ',()=>{
    let authService: AuthService;
    let httpController : HttpTestingController;
    let tokenservice : TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports:[HttpClientTestingModule],
          providers:[
            AuthService,
            TokenService
          ]
        });
        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
        tokenservice = TestBed.inject(TokenService);
    });

    afterEach(()=>{
        httpController.verify();
    })
    
    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    describe('Pruebas para login ', ()=>{
        it('esto deberia retornar un token',(doneFn)=>{
            const mockData: Auth = {
                access_token: ''
            };
            const email = 'davidgmail.com'
            const password = '12345'

            //accion 
            authService.login(email,password)
            .subscribe((data)=>{
              //Assert
              expect(data).toEqual(mockData)
              doneFn();
    
            });
            //http config
            const url =  `${environment.API_URL}/api/v1/auth/login`;
            const req = httpController.expectOne(url)
            req.flush(mockData);
        });

        it('deberia llamar a saveToken',(doneFn)=>{
            const mockData: Auth = {
                access_token: '12222'
            };
            const email = 'davidgmail.com'
            const password = '12345'
            spyOn(tokenservice, 'saveToken').and.callThrough;

            //accion 
            authService.login(email,password)
            .subscribe((data)=>{
              //Assert
              expect(data).toEqual(mockData);
              expect(tokenservice.saveToken).toHaveBeenCalledTimes(1);
              //con que agumentos es llamado algo 
              expect(tokenservice.saveToken).toHaveBeenCalledOnceWith('12222');
              doneFn();
    
            });
            //http config
            const url =  `${environment.API_URL}/api/v1/auth/login`;
            const req = httpController.expectOne(url)
            req.flush(mockData);
        });
    });
});