"""
Updated: April 10, 2016

Routes in api:
- /requests - add request
- /requests/<int:request_id> - add offer
- /users/<int:user_id>/photos - add user photo
- /users/<int:user_id> - update user profile info

Routes in auth:
- /signup
- /login
- /fb_login
- /logout

Routes in dashboard:
- /browse
- /requests
- /complete
- /offers
- /profile
- /offerhelp
- /chatroom/<int:request_id>

Routes in home:
- / - redirect to dashboard.browse
- /privacy
- /terms
- /examples
"""

from api import api
from auth import auth
from dashboard import dashboard
from settings import settings
from home import home
from users import users
