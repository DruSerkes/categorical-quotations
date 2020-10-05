from unittest import TestCase, main
from app import app
from flask import session

app.config['TESTING'] = True


class AppTestCase(TestCase):
    """
    App Integration Tests 
    """

    def test_homepage(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('Categorical Quotations', html)

    def test_category_quotes(self):
        with app.test_client() as client:
            res = client.get('/quotes?category=inspire')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('Inspiring Quote of the day', html)

    def test_category_quotes_invalid(self):
        with app.test_client() as client:
            res = client.get('/quotes')
            self.assertEqual(res.status_code, 302)
            res2 = client.get('/quotes', follow_redirects=True)
            html = res2.get_data(as_text=True)
            self.assertEqual(res2.status_code, 200)
            self.assertIn('Quote of the day', html)

    def test_favorites(self):
        with app.test_client() as client:
            res = client.get('/favorites')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('Favorites', html)
