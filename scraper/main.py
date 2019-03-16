import requests
from bs4 import BeautifulSoup as bs
# Firebase Python Wrapper
import pyrebase

BASE_URL = "http://indeed.com.au"

CITY = "Melbourne"
POSITION = "developer"

config = {

}


def get_element_text(soup, tag, attr):
    '''
    Fetch the text within a soup element, if not exist returns None
    :param
        soup: bs4.soup
        tag: str: HTML tag
        attr: dict: class attribute
    :return
        bs4.soup or None
    '''
    soup = soup.find(tag, attr)
    if not soup:
        return None
    return soup.prettify()



job_url_set = set()

for page_num in range(0, 10):
    print("Fetching page %s" % page_num)

    url = "%s/jobs?q=%s&l=%s+VIC&start=%s" % (BASE_URL, POSITION, CITY, page_num * 10)
    page_soup = bs(requests.get(url).content, "html.parser")

    for a_tag in page_soup.findAll("a", {"class": "jobtitle"}):
        # Fetch url for each positions listed on the search result page
        job_url = BASE_URL + a_tag["href"]
        # Put url into a set for fetching later (no duplicates)
        job_url_set.add(job_url)

# Now fetch the content of the job description pages
while len(job_url_set) > 0:
    job_url = job_url_set.pop()
    print("Fetching %s\n" % job_url)

    page_soup = bs(requests.get(job_url).content, "html.parser")
    section_soup = page_soup.find("div", {"class": "jobsearch-JobComponent"})

    job_title = get_element_text(section_soup, "h3", {"class": "jobsearch-JobInfoHeader-title"})
    company_name = get_element_text(section_soup, "div", {"class": "icl-u-lg-mr--sm"})
    job_type = get_element_text(section_soup, "div", {"class": "jobsearch-JobMetadataHeader"})
    job_description = get_element_text(section_soup, "div", {"class": "jobsearch-JobComponent-description"})
    if job_type:
        job_description = job_description.replace(job_type, "", 1)
    post_date = get_element_text(section_soup, "div", {"class": "jobsearch-JobMetadataFooter"})
    if post_date:
        post_date = post_date.replace("report job", "").replace("-","").replace("save job", "").replace("  ", " ")


    print("Job title: " + job_title)
    if company_name:
        print("Company: %s" % company_name)
    print("Date: %s" % post_date)
    if job_type:
        print(job_type)
    print(job_description)
    print("-" * 40 + "\n"*3)

    





'''
import requests
from selenium import webdriver

CITY = "Melbourne"
POSITION = "developer"
PAGE_NUM = 0


# Using chrome webdriver to simulate browser as indeed is having anti-scraper policies now...
# Using Chrome Webdriver v73
# https://chromedriver.storage.googleapis.com/index.html?path=73.0.3683.68/

url = "https://au.indeed.com/jobs?q=%s&l=%s+VIC&start=%s" % (POSITION, CITY, PAGE_NUM*10)

driver = webdriver.Chrome(
    executable_path="/Users/danny/Documents/projects/monorepo/scraper/chromedriver")
driver.get(url)

'''
