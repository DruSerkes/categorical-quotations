import requests
BASE_URL = 'http://quotes.rest'


def get_todays_quote(category=""):
    try:
        response = requests.get(
            f'{BASE_URL}/qod', params={'category': category})
        quote_data = response.json()
        if response.status_code != 200:
            return quote_data.error
        else:
            quote = quote_data.contents.quotes[0]
            return quote
    except Error as e:
        print(e)
        quote = {message: "Something went wrong - please try again later"}
        return quote
