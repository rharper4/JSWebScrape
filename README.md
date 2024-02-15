# JSWebScrape


## **Indeed Job Scraper**
A Node.js application designed to scrape job postings from Indeed. It utilizes rotating user agents to avoid detection, Cheerio for parsing HTML, and Nodemailer to send scraped data via email.


## **Features**

**Rotating User Agents:** Helps in mimicking requests from different browsers to reduce the chance of being blocked.
**Cheerio-based Scraping:** Efficiently parses HTML to extract job details.
**Email Integration:** Sends a digest of scraped job postings via email.


## **Getting Started**
Prerequisites: Node.js, NPM


## **Installation**
1. Clone the repository by typing: `git clone [https://github.com/rharper4/JSWebScrape]`

2. install the NPM packages by typing `npm install` into your console

3. Configure the SMTP settings in index.js for the nodemailer transporter

4. Run the script by utilizing the `node index.js` command in your console.

## **Configuration**

**User Agents:** Modify the userAgents array in index.js to include more or different user agent strings.
**SMTP Settings:** Update the Nodemailer transporter settings in index.js with your email service provider's details.

## **TO DO:**

Due to the implementation of Cloudflare protection on many websites, including Indeed, our project's approach to web scraping must adapt to respect these protections. This includes reevaluating our strategy such as implementing rotating proxies. Any contributions that you'd like to push to this project are welcomed as long as they are respecting the robots.txt file of indeed. If you have ideas or improvements that align with these principles, we encourage you to contribute to the project. 

NOTE: Other services are starting to pop up to solve these issues. If interested in utilizing this scraper, consider looking into these services.
