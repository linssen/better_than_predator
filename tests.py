import imdb_versus
import unittest


class IMDBVersusTestCase(unittest.TestCase):

    def setUp(self):
        imdb_versus.app.config['TESTING'] = True
        self.app = imdb_versus.app.test_client()

    def tearDown(self):
        pass

    def test_home(self):
        """Are we getting Predator?"""
        rv = self.app.get('/')
        assert 'Predator' in rv.data

    def test_post_versus(self):
        """Send a film for comparison."""
        rv = self.app.post('/', data=dict(
            versus='Honey, I Shrunk the Kids'
        ), follow_redirects=True)
        assert 'Honey, I Shrunk the Kids' in rv.data
        assert 'No. Obviously Predator is better.' in rv.data

    def test_not_found(self):
        """Send something we know we won't find."""
        rv = self.app.post('/', data=dict(
            versus='Some film I just made up that doesn\'t exist, at all'
        ), follow_redirects=True)
        assert 'Sorry, I could&rsquo;t find &lsquo;some-film-i-just-made-up-that-doesnt-exist-at-all&rsquo;' in rv.data

if __name__ == '__main__':
    unittest.main()
