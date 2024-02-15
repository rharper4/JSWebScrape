//imports
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const nodemailer = require('nodemailer');

//init express app and set the port
const app = express();
const PORT = 8000;


//url we are scraping
const url = 'https://www.indeed.com/jobs?q=Software+engineering+internship&l=Woodbridge%2C+VA&radius=15';


//implementing rotating proxies





//please stop blocking me cloudflare (array of user agents for each request)
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Mozilla/5.0 (Linux; Android 10; SM-A305G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.96 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 8.0.0; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 YaBrowser/20.4.3.90.00 SA/1 Mobile Safari/537.36',
    'Dalvik/2.1.0 (Linux; U; Android 11; Pixel 3a XL Build/RP1A.200720.009)',
    'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-J400F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/12.1 Chrome/79.0.3945.136 Mobile Safari/537.36',
    'Apache-HttpClient/4.5.11 (Java/1.8.0_171)',
    'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; SM-A015M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36',
    'Dalvik/1.6.0 (Linux; U; Android 4.4.2; HiDPTAndroid_Hi3751V510 Build/KOT49H)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36,gzip(gfe)',
    'Dalvik/2.1.0 (Linux; U; Android 6.0; CX1 Build/CX1)',
    'Dalvik/2.1.0 (Linux; U; Android 5.0; GEM-701L Build/HUAWEIGEM-701L)',
    'Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.14320/191.212; U; ru) Presto/2.12.423 Version/12.16',
    'Mozilla/5.0 (Linux; Android 9; BND-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 9; VTR-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.181 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 5.1; HUAWEI CUN-L03) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3882.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.165'
];

//Axios will return a promise and once the promise is returned we will get the response(data)
const headers = {
    'User-Agent': getRandomUserAgent()
};


//Function to get a random user-agent to avoid being banned by cloudflares anti scraping
function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

//create instance with randomized agents
const axiosInstance = axios.create({
    headers: {
        'User-Agent': getRandomUserAgent()
    },
    withCredentials: true //This is important if you need to handle cookies
});

//delay execution to be human-like
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

//begin scraping
axios.get(url, { headers })
    .then(async response => {
        const html = response.data; //html data from response
        const $ = cheerio.load(html); //load html into cheerio for parsing
        const indeedJobPostings = []; //array to hold the scraped jobs

            //parse the html and extract postings
        $('.resultContent', html).each(function () {
            const title = $(this).find('.jobTitle').text();
            const company = $(this).find('.companyName').text();
            //add job posting to the array
            indeedJobPostings.push({title, company});
        });

        //Delay between requests to respect the website's policy
        await delay(2000); //2 seconds delay
        
        //construct the html string for the email
        var arrayPostings = "";
        var n;
        for (n in indeedJobPostings) {
         arrayPostings += "<br /><li>" + indeedJobPostings[n] + "</li><br />";
        }

        //initialize node transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: '',
                pass: ''
            }
        });
        //email options
        let mailOptions = {
            //email details
            from: '',
            to: '',
            subject: '',
            html: ``
        };
        
        console.log(mailOptions);
        //send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //log any errors sending
                return console.log(error.message);
            }
            //was good
            console.log('success');
        });

    }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))