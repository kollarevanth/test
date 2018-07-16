from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from twitter.models import *
from django.contrib.auth.models import User
class following_serializer(ModelSerializer):
    class Meta:
        model=Following
        exclude=['user']
class posts_serializer(ModelSerializer):
    class Meta:
        model=Posts
        fields=('id','post','likes','user_id','name')

class profilepic_serializer(ModelSerializer):
    class Meta:
        model=Profilepics
        fields=('id','pic','name','user_id')

class comments_serializer(ModelSerializer):
    class Meta:
        model=Comments
        exclude=['post']
class reply_serializer(ModelSerializer):
    class Meta:
        model=Replys
        exclude=['comment']

class UserSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField()
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ( 'username',  'id')