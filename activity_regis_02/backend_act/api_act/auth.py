from django.core.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

import requests


User = get_user_model()

def validate_id_token(token):
    response = requests.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params={'id_token': token}
        )
    if not response.ok:
        raise ValidationError('token is invalid')

    # if response().json()['aud'] != "802517673766-pmok9l0mlrg4os9c8bh765aomltuj4kt.apps.googleusercontent.com":
    #     raise ValidationError('Invalid audience') #! Not Work
    
    return {
        'email': response.json().get('email','None'),
        'firstname': response.json().get('given_name','None'),
        'lastname': response.json().get('family_name','None'),
        'picture': response.json().get('picture','None'),
        # 'name': response.json().get('name','None'),
        # 'picture': response.json().get('picture','None'),
    }


class SocialAuthorizationView(TokenViewBase):
    class CustomSerializer(serializers.Serializer):
        token = serializers.CharField()

        def validate(self, attrs):
            info = validate_id_token(attrs['token'])
            data = {}
            user, created = User.objects.get_or_create(
                username = info['firstname'],
                email=info['email'],
                google_image = info['picture'],
                defaults={
                    'first_name':info['firstname'],
                    'last_name':info['lastname']
                }
            )
            refresh = RefreshToken.for_user(user)

            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            data['defaults'] = info['lastname']
            data['username'] = info['firstname']
            data['email'] = info['email']
            data['picture'] = info['picture']
            data['is_staff'] = user.is_staff
            return data
    
    serializer_class = CustomSerializer


