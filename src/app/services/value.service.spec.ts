
import {TestBed} from '@angular/core/testing'
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [ValueService]
    })
    service = TestBed.inject(ValueService);
  })

  it('el servicio debio ser creado',()=>{
    expect(service).toBeTruthy();
  });

  describe('test para los metodos getValue',()=>{
    it('deberia retornar "my value"', ()=>{
      expect(service.getValue()).toBe('my value')
    })
  });

  describe('test para los metodos setValue',()=>{
    it('deberia retornar "change"', ()=>{
      expect(service.getValue()).toBe('my value')
      service.setValue('change')
      expect(service.getValue()).toBe('change')
    })
  });

  
  describe('test para las promesas',()=>{
    it('deberia retornar "promise value" desde una promesa whith then', (doneFn)=>{
      service.getPromiseValue()
      .then((value)=>{
        expect(value).toBe('promise value')
        doneFn();
      })
    });

    it('deberia retornar "promise value" desde una promesa usando async', async ()=>{
      const rta = await service.getPromiseValue();
        expect(rta).toBe('promise value')
      
      
    });
  });
});
