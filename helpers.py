import requests
BASE_URL = 'http://quotes.rest'


def get_todays_quote(category='inspire'):

    response = requests.get(f'{BASE_URL}/qod', params={'category': category})
    quote_data = response.json()
    return quote_data
