document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

        const getCars = (url) => {
            return  new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if(request.readyState !== 4){
                        return
                    }
                    if(request.status === 200){
                        const data = JSON.parse(request.responseText);
                        console.log(data)
                        resolve(data)
                    }else {
                        reject(request.statusText);
                    }
                });
                request.send();
            })
        }

    const outPutcar = (data) => {
        console.log(cars);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                console.log(item);
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;

            }
        })
    };
    
    let url = './cars.json';
    
    select.addEventListener('change', () => {    
        getCars(url)
        .then(outPutcar)
        .catch(() => output.innerHTML = 'Произошла ошибка')
    });
})
