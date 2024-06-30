from .models import Activity, User
from rest_framework import serializers


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    activity_set = ActivitySerializer(many=True)
    class Meta:
        model = User
        exclude = ('password',)

class NormalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
