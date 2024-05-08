import {Calculator} from './calculator';

describe('pruebas para calculator', ()=>{
    it('Multiply, este medoto deberia retornar un 9',()=>{
        //Arrange
        const calculator = new Calculator();
        //Act
        const tra = calculator.multiply(3,3);
        //Assert
        expect(tra).toEqual(9);

    });
    it('Multiply, este medoto deberia retornar un 4',()=>{
        //Arrange
        const calculator = new Calculator();
        //Act
        const tra = calculator.multiply(1,4);
        //Assert
        expect(tra).toEqual(4);

    });

    it('divide, este medoto deberia retornar un numero',()=>{
        //Arrange
        const calculator = new Calculator();
        //Assert
        expect( calculator.divide(6,3)).toEqual(2);
        expect(calculator.divide(5,2)).toEqual(2.5);
    });

    it('#divide, en cero',()=>{
        //Arrange
        const calculator = new Calculator();
        //Assert
        expect( calculator.divide(6,0)).toBeNull();
        expect(calculator.divide(5,0)).toBeNull();
    });

    it('test matchers',()=>{
        const name = 'nicolas';
        let name2 
        expect(name).toBeDefined();
        expect(name2).toBeUndefined();

        expect(1 + 3 === 4).toBeTruthy();
        expect(1 + 1 === 3).toBeFalse();

        //mayor o menor que
        expect(5).toBeLessThan(10);

        //arrays
        expect(['mansanas', 'naranjas','peras']).toContain('naranjas');
    })
})