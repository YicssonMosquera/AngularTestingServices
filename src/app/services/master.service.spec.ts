import {TestBed} from '@angular/core/testing'

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.services';

describe('MasterService', () => {
  let masterServce: MasterService;
  let valueServiceSpy : jasmine.SpyObj<ValueService>

  beforeEach(()=>{
    const spy = jasmine.createSpyObj('ValueService', ['getValue'])
    TestBed.configureTestingModule({
      providers: [MasterService,{ provide: ValueService, useValue: spy}]
    })
    masterServce = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  })

  it('el servicio debio ser creado',()=>{
    expect(masterServce).toBeTruthy();
  });



 /* it('retornar el otro valor desde un fake ', () => {
    const fakeValueService = new FakeValueService();
    const masterServce = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterServce.getValue()).toBe('fake value');
  });

  it('retornar el otro valor desde un fake object ', () => {
    const fake = { getValue: ()=> 'fake from obj'}
    const masterServce = new MasterService(fake as ValueService);
    expect(masterServce.getValue()).toBe('fake from obj');
  });*/

  it('deberia llamar getValue desde valueService ', () => {
   valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterServce.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
