const forecast = require('../src/utils/forecast') 

test('Unit Test Forecat API', () => {


    return forecast(-23.5507 ,-46.6334, (error, forecastData) => {
        
        expect(forecastData).toMatch("A temperatura é de");
       
    })

    
  });
  