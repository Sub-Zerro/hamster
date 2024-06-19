const puppeteer = require('puppeteer');
const fs = require("fs");

(async ()=>{
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()
    await page.goto('https://vk.com/kombat_hamster_ru')
    //await page.waitForSelector('body > div.wrapper > main > div.main__table > div > div > div.flex-table__r-box > div.flex-table__r-table-wrap > div.simplebar-wrapper > div.simplebar-mask > div > div > div > table > tbody > tr:nth-child(7) > td.trades-table__price');


    let data = await page.evaluate(()=>{
        let button_more_c = document.querySelectorAll('.PostTextMore');
        for (let i = 0; i < button_more_c.length; i++){
            button_more_c[i].click();
        }
        let headers = document.querySelectorAll('.wall_post_text');
        console.log(headers);

        let code;
        for (let i = 0; i < headers.length; i++){
            if (headers[i].outerText.includes('Новый шифр')){
                code = headers[i].outerText;
                break;
            }
        }



        //console.log(code);
        //alert(code);
        return code;
    })

    //console.log(data);

    fs.writeFile("code.txt", '', function(error){
        if(error){  // если ошибка
            return console.log(error);
        }
        console.log("Файл успешно записан");
    });
    //стераю инфу с файла
     
    fs.writeFile("code.txt", data, function(error){
        if(error){  // если ошибка
            return console.log(error);
        }
        console.log("Файл успешно записан");
    });

    


    await browser.close()
})()


