import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { CreateProductDto, Product, UpdateProductDto } from '../models/product.model';
import {generateManyProducts,generateOneProduct} from '../models/product.mock'
import { environment } from '../environment/environment';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/TokenInterceptor';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController : HttpTestingController;
  let tokenservice : TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true
        }
      ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenservice = TestBed.inject(TokenService);
  });

  afterEach(()=>{
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    describe('test metodo getAllSimple', ()=>{
      it('deberia retornar una lista de productos', (doneFn)=>{
        //prepare
        const mockData:Product[] = generateManyProducts(2);
        spyOn(tokenservice, 'getToken').and.returnValue('123');
        //accion 
        service.getAllSimple()
        .subscribe((data)=>{
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(mockData)
          doneFn();

        });
        //http config
        const url =  `${environment.API_URL}/api/v1/products`;
        const req = httpController.expectOne(url)
        const header = req.request.headers;
        expect(header.get('Authorization')).toEqual(`Bearer 123`);
        req.flush(mockData);
      })
    });

    describe('test metodo getAll', ()=>{
      it('deberia retornar una lista de productos', (doneFn)=>{
        //prepare
        const mockData:Product[] = generateManyProducts(3);
        //accion 
        service.getAll()
        .subscribe((data)=>{
          //Assert
          expect(data.length).toEqual(mockData.length);
         
          doneFn();

        });
        //http config
        const url =  `${environment.API_URL}/api/v1/products`;
        const req = httpController.expectOne(url)
        req.flush(mockData);
      });

      it('deberia retornar una lista de productos con impuestos',(doneFn)=>{
          //Arrange
          const mockData:Product[] = [{
            ...generateOneProduct(),
            price: 100, // 100 * .19 = 19
          }];
          service.getAll()
          .subscribe((data)=>{
            //Assert
            console.log(data)
            expect(data.length).toEqual(mockData.length);
            doneFn();
  
          });
          //http config
          const url =  `${environment.API_URL}/api/v1/products`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
        })

        it('deberia enviar query params con un limit en 10 y un offset 3', (doneFn)=>{
          //prepare
          const mockData:Product[] = generateManyProducts(3);
          const limit = 10;
          const offset = 3;
          //accion 
          service.getAll(limit,offset)
          .subscribe((data)=>{
            //Assert
            expect(data.length).toEqual(mockData.length);
           
            doneFn();
  
          });
          //http config
          const url =  `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
          const params = req.request.params;
          expect(params.get('limit')).toEqual(`${limit}`);
          expect(params.get('offset')).toEqual(`${offset}`)
        });
      });

      describe('test para crear un producto',()=>{
        it('esto deberia retornar un nuevo producto',(doneFn)=>{
            //Arrange
            const mockData = generateOneProduct();
            const dto: CreateProductDto ={
              title: 'new product',
              price: 100,
              images:['img'],
              description: 'esto es  un prod',
              categoryId:2
            }
            //act
            service.create(dto)
            .subscribe(data=>{
             //Assert
             expect(data).toEqual(mockData);
              doneFn()
            });
            const url =  `${environment.API_URL}/api/v1/products`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
        });
      });

      describe('test para actualizar un producto',()=>{
        it('esto deberia actualizar un producto',(doneFn)=>{
            //Arrange
            const mockData = generateOneProduct();
            const dto: UpdateProductDto ={
              title: 'new product',
            }
            const productId = '1';
            //act
            service.update(productId, dto)
            .subscribe(data=>{
             //Assert
             expect(data).toEqual(mockData);
              doneFn()
            });
            const url =  `${environment.API_URL}/api/v1/products/${productId}`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
        });
      });

      describe('test para eliminar un producto',()=>{
        it('esto deberia eliminar un producto',(doneFn)=>{
            //Arrange
            const mockData = true;
            const productId = '1';
            //act
            service.delete(productId)
            .subscribe(data=>{
             //Assert
             expect(data).toEqual(mockData);
              doneFn()
            });
            const url =  `${environment.API_URL}/api/v1/products/${productId}`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
        });
      });

      describe('test para cargar uno ',()=>{
        it('esto deberia retoernar un ptoducto',(doneFn)=>{
            //Arrange
            const mockData = generateOneProduct();
            const productId = '1';
            //act
            service.getOne(productId)
            .subscribe(data=>{
             //Assert
             expect(data).toEqual(mockData);
              doneFn()
            });
            const url =  `${environment.API_URL}/api/v1/products/${productId}`;
          const req = httpController.expectOne(url)
          req.flush(mockData);
        });

        it('la prueba deberia retornar el correcto mensaje cuando el status es 404',(doneFn)=>{
          //Arrange
          const messageError = '404 message';
          const mockError = {
            status: HttpStatusCode.NotFound,
            statusText: messageError
          }
          const productId = '1';
          //act
          service.getOne(productId)
          .subscribe({ //error
            error: (error) =>{
              //assert
              expect(error).toEqual('El producto no existe')
              doneFn();
            }
         });
          const url =  `${environment.API_URL}/api/v1/products/${productId}`;
        const req = httpController.expectOne(url)
        req.flush(messageError,mockError);
      });

      it('la prueba deberia retornar el correcto mensaje cuando el status code es 401',(doneFn)=>{
        //Arrange
        const messageError = '401 message';
        const mockError = {
          status: HttpStatusCode.Unauthorized,
          statusText: messageError
        }
        const productId = '1';
        //act
        service.getOne(productId)
        .subscribe({ //error
          error: (error) =>{
            //assert
            expect(error).toEqual('No estas permitido')
            doneFn();
          }
       });
        const url =  `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url)
      req.flush(messageError,mockError);
    });

    it('la prueba deberia retornar el correcto mensaje cuando el status code es 409',(doneFn)=>{
      //Arrange
      const messageError = '401 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: messageError
      }
      const productId = '1';
      //act
      service.getOne(productId)
      .subscribe({ //error
        error: (error) =>{
          //assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        }
     });
      const url =  `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError,mockError);
    });
  });

  
});
