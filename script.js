document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

        const getCars = (url) => {
            return  new Promise((resolve, reject) => {
                event.preventDefault();
                const request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if(request.readyState !== 4){
                        return
                    }
                    if(request.status === 200){
                        const cars = JSON.parse(request.responseText);
                        console.log(cars);
                        resolve(cars)
                    }else {
                        reject(request.statusText);
                    }
                });
                request.send();
            })
        }

    

    const outPutcar = (cars) => {
        cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        })
    };
    
    let url = './cars.json';
    
    select.addEventListener('change', 
    getCars(url)
        .then(outPutcar)
        .catch(() => output.innerHTML = 'Произошла ошибка')
    );
})
