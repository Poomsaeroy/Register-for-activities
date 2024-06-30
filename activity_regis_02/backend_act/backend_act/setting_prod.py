# from .settings import *

# #? python manage.py runserver --settings=backend_act.setting_prod

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'django',
#         'USER': 'root',
#         'PASSWORD':'ThisisP@ssw0rd',
#         'HOST':'django_mysql',
#         'PORT':'3306',
#     }
# }

# ALLOWED_HOSTS = [
#     "wd0101.coe.psu.ac.th"
# ]


# CSRF_TRUSTED_ORIGINS = [
#     "https://wd0101.coe.psu.ac.th"
# ]


# DEBUG = False

from .settings import *

# run manage.py with --settings=book_store.settings_prod

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dj',
        'USER': 'root',
        'PASSWORD': 'ThisisP@ssw0rd',
        'HOST': 'django_mysql',
        'PORT': '3306',
    }
}

ALLOWED_HOSTS = [
    "wd0101.coe.psu.ac.th"
]
CSRF_TRUSTED_ORIGINS = [
    "https://wd0101.coe.psu.ac.th"
]

DEBUG = False
