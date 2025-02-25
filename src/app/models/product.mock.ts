import faker from "faker";
import{Product} from './product.model'

export const generateOneProduct = ()=>{
    return{
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category:{
          id: faker.datatype.number(),
          name:faker.commerce.department(),
        },
        images: [faker.image.imageUrl(),faker.image.imageUrl()]
    }
}


export const generateManyProducts = (size = 10):Product[]=>{
    const products :Product[]=[]
    for(let index = 0; index < size; index++){
        products.push(generateOneProduct());
    }
    return [...products]

}